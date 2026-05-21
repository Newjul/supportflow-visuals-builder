export default function PropertiesPanel({
    selectedNode,
    nodesState,
    setNodesState,
    
}){ 
    if (!selectedNode) return null;
    const panelOffsetX = 320;
    const panelOffsetY = -20;
    return (
        <div className="absolute w-64 bg-white border shadow-lg rounded-lg p-3 z-50"
        style={{
            left:selectedNode.position.x + panelOffsetX,
            top:selectedNode.position.y + panelOffsetY,
        }}>
            <div className="text-xs text-gray-500 mb-2">
                Editing Node
            </div>
            {!selectedNode ? (
                <div className="text-sm text-gray-400">
                    Select a node </div>):(
                <div>
                    <label className="text-xs text-gray-500">
                        Question Text
                    </label>
                    <textarea className="
                    mt-2 w-full rounded border p-2 text-sm"
                    value={selectedNode.text}
                    onChange={(e)=> {
                        const updated = nodesState.map((n)=>
                        n.id === selectedNode.id ? {
                            ...n, text: e.target.value,
                        } : n);
                        setNodesState(updated);
                    }}/>
                </div>
                    
            )}
        </div>
    );
}