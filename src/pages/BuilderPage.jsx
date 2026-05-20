import flow from "../data/flow_data.json"
import Node from "../components/Node"

export default function BuilderPage(){
  const {meta, nodes} = flow;
  const {w, h} = meta.canvas_size;
  return(
    <div className="h-screen w-full bg-gray-100">
      <div className="relative overflow-hidden bg-white shadow-xl"
       style={{
        width:w,
        height:h,
        position: "relative",
       }}>
        <div className="absolute inset-0"
         style={{
          backgroundSize: "40px 40px"
         }}>
          {flow.nodes.map((node)=>(
            <Node key={node.id} node={node}/>
          ))}
         </div>
      </div>
    </div>
  )
}