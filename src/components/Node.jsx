export default function Node({node, onSelect, selected, onMouseDown, faded}){


  return (
    <div 
    onClick={()=>onSelect(node.id)}
    onMouseDown={(e) => onMouseDown(e, node.id)}
    className={`absolute w-72 rounded-xl border bg-blue-100 p-4 shadow transition-opacity duration-300
          ${selected ? "border-blue-500 ring-2 ring-blue-200":""}
          ${faded ? "opacity-20" : "opacity-100"}`}
    style={{
      left: `${node.position.x}px`,
      top:`${node.position.y}px`,
    }}
    >
      <div className="mb-2 text-xs text-gray-400">
        {node.type}
      </div>
      <div className="text-sm font-medium text-gray-800">
        {node.text}
      </div>
      <div className="mt-3 space-y-2">
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