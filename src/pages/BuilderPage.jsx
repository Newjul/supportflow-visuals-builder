import flow from "../data/flow_data.json"
import Node from "../components/Node"
import ConnectorLayer from "../components/ConnectorLayer";
import PropertiesPanel from "../components/PropertiesPanel";
import { useState } from "react";

export default function BuilderPage(){

  const {meta, nodes} = flow;
  const {w, h} = meta.canvas_size;

  const [selectNodeId, setSelectNodeId]=useState(null);
  const [nodeState, setNodestate]=useState(nodes);

  const selectedNode = nodeState.find((n) => 
    n.id === selectNodeId);

  return(
    <div className="bg-gray-200 flex-1 overflow-auto p-6">
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
    </div>
  )
}