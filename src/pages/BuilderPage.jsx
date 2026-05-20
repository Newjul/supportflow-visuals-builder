import flow from "../data/flow_data.json"
import Node from "../components/Node"
import ConnectorLayer from "../components/ConnectorLayer";
import PropertiesPanel from "../components/PropertiesPanel";
import { useState } from "react";

export default function BuilderPage(){
  const [mode, setMode] = useState("edit");
  const [currentNodeId, setCurrentNodeId] = useState("1");

  const {meta, nodes} = flow;
  const {w, h} = meta.canvas_size;

  const [selectNodeId, setSelectNodeId]=useState(null);
  const [nodeState, setNodestate]=useState(nodes);

  const nodeMap = Object.fromEntries(
    nodeState.map((n)=>[n.id, n])
  );

  const selectedNode = nodeState.find((n) => 
    n.id === selectNodeId);

  const currentNode = nodeMap[currentNodeId];

  return(
    <div className="bg-gray-200 flex-1 overflow-auto p-6">
        <button
           onClick={() => setMode(mode === "edit" ? "preview":"edit")}
           className="absolute top-4 left-4 z-50 bg-black text-white px-3 py-1 rounded">
            {mode === "edit" ? "Play Preview":"Back to Editor"}
           </button>
     { mode === "edit" ? (<>
      <div className="relative bg-white shadow-xl"
       style={{
        width:w,
        height:h,
        position: "relative",
       }}>
        <div className="absolute inset-0"
         style={{
          backgroundSize: "40px 40px"
         }}>
          <ConnectorLayer nodes={nodeState}/>
          {nodeState.map((node)=>(
            <Node key={node.id} node={node}
            onSelect={setSelectNodeId}
            selected={selectNodeId === node.id}/>
          ))}
         </div>
      </div>
      <PropertiesPanel
         selectedNode={selectedNode}
         nodesState={nodeState}
         setNodesState={setNodestate}/>
      </>):(<div>
        <h2 className="text-color-black">Previw pannel</h2>
      </div>)}
        
    </div>
    
)
}