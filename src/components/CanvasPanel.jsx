import { useMemo } from 'react'

function CanvasPanel({ pathIds, nodesById }) {
  const pathNodes = useMemo(
    () => pathIds.map((id) => nodesById.get(id)).filter(Boolean),
    [nodesById, pathIds]
  )

  const chosenLabelByNodeId = useMemo(() => {
    const map = new Map()
    pathIds.forEach((id, index) => {
      const node = nodesById.get(id)
      const nextId = pathIds[index + 1]
      if (!node?.options?.length || !nextId) return
      const option = node.options.find((opt) => opt.nextId === nextId)
      if (option) map.set(id, option.label)
    })
    return map
  }, [nodesById, pathIds])

  // Unchosen branch stops removed — UI will only show chosen path

  return (
    <section className="flex min-h-[560px] flex-col rounded-[28px] border border-slate-200 bg-surface p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Flow canvas</h2>
          <p className="mt-1 text-sm text-slate-500">Tree-like visualization for the current support journey.</p>
        </div>
        <div className="rounded-2xl bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-sm">
          Live preview
        </div>
      </div>

      <div className="flex-1 overflow-hidden rounded-[26px] border border-dashed border-slate-300 bg-white p-6 shadow-inner">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">Support path tree</p>
            <p className="text-sm text-slate-500">Chosen branches are highlighted in green, while unchosen branch stops appear as red nodes.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
            {pathNodes.length} steps
          </div>
        </div>

        <div className="overflow-x-auto py-4">
          <div className="min-w-[780px]">
            <div className="space-y-10">
              {pathNodes.map((node, index) => (
                <div key={node.id} className="flex flex-col items-center gap-6">
                  {index > 0 && (
                    <svg width="28" height="88" viewBox="0 0 28 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 0V72" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
                      <path d="M8 66L14 72L20 66" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}

                  <div className="min-w-[340px] rounded-[28px] border border-emerald-600 bg-emerald-600 p-6 text-white shadow-lg">
                    <div className="text-[11px] uppercase tracking-[0.25em] text-emerald-100">
                      {index === 0 ? 'Start' : node.type === 'end' ? 'Resolution' : `Step ${index}`}
                    </div>
                    <p className="mt-3 text-sm font-semibold leading-6">{node.text}</p>
                    {chosenLabelByNodeId.has(node.id) && (
                      <div className="mt-4 rounded-3xl bg-white/15 px-3 py-3 text-xs text-white shadow-sm">
                        <span className="font-semibold">Chosen:</span> {chosenLabelByNodeId.get(node.id)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CanvasPanel
