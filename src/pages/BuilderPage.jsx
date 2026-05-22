import flow from "../data/flow_data.json"
import Node from "../components/Node"
import ConnectorLayer from "../components/ConnectorLayer";
import PropertiesPanel from "../components/PropertiesPanel";
import { useState  } from "react";
import { useRef } from "react";
import {useCallback} from "react";

export default function BuilderPage(){

 const dragOffset = useRef({ x: 0, y: 0 });
 const draggingId = useRef(null);

  const [mode, setMode] = useState("edit");
  const [currentNodeId, setCurrentNodeId] = useState("1");
  

  const {meta, nodes} = flow;
  const {w, h} = meta.canvas_size;

  const [selectNodeId, setSelectNodeId]=useState(null);
  const [nodeState, setNodestate]=useState(nodes);

  const nodeMap = Object.fromEntries(
    nodeState.map((n)=>[n.id, n])
  );
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const selectedNode = nodeState.find((n) => 
    n.id === selectNodeId);

  const currentNode = nodeMap[currentNodeId];


const handleMouseMove = useCallback((e) => {
    if (!draggingId.current) return;
    setNodestate((prev) =>
      prev.map((n) =>
        n.id === draggingId.current
          ? {
              ...n,
              position: {
                x: e.clientX - dragOffset.current.x,
                y: e.clientY - dragOffset.current.y,
              },
            }
          : n
      )
    );
  }, []);

const handleMouseUp = useCallback(() => {
    draggingId.current = null;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = useCallback((e, nodeId) => {
    e.stopPropagation();
    draggingId.current = nodeId;

    const node = nodeState.find((n) => n.id === nodeId);
    dragOffset.current = {
      x: e.clientX - node.position.x,
      y: e.clientY - node.position.y,
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }, [nodeState, handleMouseMove, handleMouseUp]);


  return(
    <div className="bg-slate-100 flex-1 overflow-auto p-8">
     { mode === "edit" ? (<>
      
      <div className="relative bg-white shadow-xl rounded-2xl overflow-hidden"
       
       style={{
        width:w,
        height:h,
        position: "relative",
        backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
        backgroundSize: "28px 28px",
       }}
       >
        <button
           onClick={() => {
     if (mode === "edit") {
       if (messages.length === 0) {
         setMessages([{ from: "bot", text: nodeMap["1"]?.text }]);
       }
       setMode("preview");
     } else {
       setMode("edit");
     }
   }}
           className="absolute top-4 left-4 z-50 bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-4 py-1.5 rounded-xl shadow transition-colors">
            {mode === "edit" ? "▶ Preview":"← Editor"}
           </button>
        <div className="absolute inset-0"
         style={{
          backgroundSize: "40px 40px"
         }}>
    <div className="absolute inset-0 flex flex-col items-center pointer-events-none">
         
          <span className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-slate-400 select-none tracking-wide">
               Click and Hold to Drag and Drop the Node
          </span>
          <div className="absolute top-2 right-4 pointer-events-auto">
              <input
                  type="text"
                  placeholder="Search nodes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-52 px-4 py-1.5 text-sm rounded-xl border border-slate-300 
                  shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              </div>
            
            <div className="flex-1 flex items-center justify-center">
                <span className="text-8xl font-black text-slate-200 select-none tracking-widest">
                     EDITOR MODE
              </span>
            </div>
          </div>
          <ConnectorLayer nodes={nodeState}/>
          {nodeState.map((node)=>(
            <Node key={node.id} node={node}
            onSelect={setSelectNodeId}
            selected={selectNodeId === node.id}
            onMouseDown={handleMouseDown}
            faded={searchQuery.trim() !== "" && !node.text.toLowerCase().includes(searchQuery.toLowerCase())}
            />
             
          ))}
         </div>
      </div>
      <PropertiesPanel
         selectedNode={selectedNode}
         nodesState={nodeState}
         setNodesState={setNodestate}
         onClose={() => setSelectNodeId(null)}
        />
      </>):(
        <div className="absolute inset-0 flex flex-col bg-[#f0f4f8] z-[100]">
  
  {/* Header */}
  <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
    <div>
      <div className="text-white font-bold text-lg">SupportFlow AI</div>
      <div className="text-blue-200 text-xs">Visual Decision Tree Editor</div>
    </div>
    <button
      onClick={() => {
        setMode("edit");
      }}
      className="bg-white text-blue-600 text-sm px-4 py-1.5 rounded-xl shadow font-medium">
      ← Editor
    </button>
  </div>

  {/* Chat area */}
  <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
    {messages.map((msg, i) => (
      <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
        <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm
          ${msg.from === "user"
            ? "bg-blue-600 text-white rounded-br-sm"
            : "bg-white text-gray-800 shadow rounded-bl-sm"}`}>
          {msg.text}
        </div>
      </div>
    ))}

    {/* Current options */}
    <div className="flex flex-col items-end space-y-2 mt-2">
      {currentNode?.options.map((opti, i) => (
        <button
          key={i}
          onClick={() => {
            setMessages((prev) => [
              ...prev,
              { from: "user", text: opti.label },
              { from: "bot", text: nodeMap[opti.nextId]?.text },
            ]);
            setCurrentNodeId(opti.nextId);
          }}
          className="bg-white border border-gray-300 hover:bg-blue-50 
          text-gray-700 text-sm px-4 py-2 rounded-2xl shadow-sm transition-colors">
          {opti.label}
        </button>
      ))}
    </div>

    {/* Restart button at end node */}
    {!currentNode?.options?.length && (
      <div className="flex justify-center mt-4">
        <button
          onClick={() => {
            setCurrentNodeId("1");
            setMessages([{ from: "bot", text: nodeMap["1"]?.text }]);
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm">
          Restart
        </button>
      </div>
    )}
  </div>
</div>
      )}
        
    </div>
    
)
}