function PropertiesPanel() {
  return (
    <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-panel">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Properties Panel</h2>
          <p className="text-sm text-slate-500">Edit selected node details and control display settings.</p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-7 text-center text-slate-500">
        <p className="text-sm font-medium text-slate-700">Select a node to edit</p>
        <p className="mt-3 text-sm leading-6">
          Node content, buttons, and transition settings will appear here once a node is selected from the canvas.
        </p>
      </div>
    </aside>
  )
}

export default PropertiesPanel
