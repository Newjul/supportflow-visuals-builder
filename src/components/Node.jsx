export default function Node({node, onSelect, selected}){
  return (
    <div 
    onClick={()=>onSelect(node.id)}
    className={`absolute w-72 rounded-x1 border bg-blue-100 p-4 shadow 
      ${selected ? "border-blue-500 ring-2 ring-blue-200":""}`}
    style={{
      left: `${node.position.x}px`,
      top:`${node.position.y}px`,
    }}>
      <div className="mb-2 text-xs text-gray-400">
        {node.type}
      </div>
      <div className="text-sm font-medium text-gray-800">
        {node.text}
      </div>
      <div className="mt-3 spce-y-2">
        {node.options.map((opt, i) => (
          <div
          key={i}
          className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  )
}