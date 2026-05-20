export default function Node({node}){
  return (
    <div className="absolute w-72 rounded-x1 border bg-white p-4 shadow"
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