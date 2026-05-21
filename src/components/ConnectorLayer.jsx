export default function ConnectorLayer({nodes}){
  const nodeMap = Object.fromEntries(
    nodes.map((n) => [n.id,n])
  );

  const NODE_WIDTH = 288;
  const NODE_HEIGHT = 100;

  const getBottom = (node) => ({
  x: node.position.x + NODE_WIDTH / 2,
  y: node.position.y + NODE_HEIGHT,   
});

const getTop = (node) => ({
  x: node.position.x + NODE_WIDTH / 2,
  y: node.position.y,                  
});

  const paths = [];

  nodes.forEach((node) => {
    node.options.forEach((opt)=>{
      const target = nodeMap[opt.nextId];
      if (!target) return;

      const from = getBottom(node);   
      const to = getTop(target);      
      const dy = Math.abs(to.y - from.y) * 0.5;  
      const path = `
          M ${from.x} ${from.y}
          C ${from.x} ${from.y + dy}   
            ${to.x}   ${to.y - dy}      
            ${to.x}   ${to.y}`;
      paths.push({path});
    });
  });

  return (
    <svg className="absolute inset-0 w-full h-full 
    pointer-events-none">
      {paths.map((p,i)=>(
        <path
         key={i}
         d={p.path}
         stroke="#94a3b8"
         strokeWidth="2"
         fill="none"/>
      ))}
    </svg>
  )

}