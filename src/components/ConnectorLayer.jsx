export default function ConnectorLayer({nodes}){
  const nodeMap = Object.fromEntries(
    nodes.map((n) => [n.id,n])
  );

  const NODE_WIDTH = 288;
  const NODE_HEIGHT = 120;

  const getCenter = (node) => ({
    x: node.position.x + NODE_WIDTH/2,
    y: node.position.y + NODE_HEIGHT/2,
  });

  const paths = [];

  nodes.forEach((node) => {
    const from = getCenter(node);
    node.options.forEach((opt)=>{
      const target = nodeMap[opt.nextId];
      if (!target) return;

      const to = getCenter(target);

      const midX = (from.x + to.x)/2;

      const path = `
      M ${from.x} ${from.y}
      C ${midX} ${to.y}
        ${midX} ${from.y}
        ${to.x} ${to.y}`;
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