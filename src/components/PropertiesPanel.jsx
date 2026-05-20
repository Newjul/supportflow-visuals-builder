export default function PropertiesPanel({
    selectedNode,
    nodesState,
    setNodesState,
}){

    return (
        <div className="w-80 border-l bg-red p-4 h-full">
            <h2 className="mb-4 text-sum font-semibold">
                Edit Panel
            </h2>
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