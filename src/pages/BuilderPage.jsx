import { useMemo, useState } from 'react'
import { initialFlow } from '../data/initialFlow'
import Sidebar from '../components/Sidebar'
import CanvasPanel from '../components/CanvasPanel'
import PropertiesPanel from '../components/PropertiesPanel'

function BuilderPage() {
  const [flow, setFlow] = useState(initialFlow?.[0])
  const nodesById = useMemo(
    () => new Map(flow?.nodes?.map((node) => [node.id, node]) || []),
    [flow]
  )

  const startNode = nodesById.get('1') || flow?.nodes?.[0]
  const [currentNodeId, setCurrentNodeId] = useState(startNode?.id || null)
  const [messages, setMessages] = useState(
    startNode
      ? [
          {
            id: `bot-${startNode.id}`,
            role: 'bot',
            text: startNode.text,
          },
        ]
      : []
  )
  const [pathIds, setPathIds] = useState(startNode ? [startNode.id] : [])

  const currentNode = currentNodeId ? nodesById.get(currentNodeId) : null
  const options = currentNode?.options || []

  const handleOptionSelect = (option) => {
    const nextNode = nodesById.get(option.nextId)
    if (!nextNode) return

    setMessages((prev) => [
      ...prev,
      {
        id: `user-${option.nextId}-${prev.length}`,
        role: 'user',
        text: option.label,
      },
      {
        id: `bot-${nextNode.id}-${prev.length}`,
        role: 'bot',
        text: nextNode.text,
      },
    ])
    setCurrentNodeId(nextNode.id)
    setPathIds((prev) => [...prev, nextNode.id])
  }

  const updateNodeText = (nodeId, text) => {
    setFlow((prev) => ({
      ...prev,
      nodes: prev.nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              text,
            }
          : node
      ),
    }))
  }

  const restartConversation = () => {
    if (!startNode) return
    setCurrentNodeId(startNode.id)
    setMessages([
      {
        id: `bot-${startNode.id}`,
        role: 'bot',
        text: startNode.text,
      },
    ])
    setPathIds([startNode.id])
  }

  return (
    <div className="min-h-screen bg-surface text-slate-900">
      <div className="mx-auto grid min-h-screen max-w-[1600px] gap-6 px-4 py-6 sm:px-6 lg:px-8 grid-cols-[1fr] lg:grid-cols-[360px_minmax(0,1fr)]">
        <Sidebar
          messages={messages}
          options={options}
          currentNode={currentNode}
          onUpdateNodeText={updateNodeText}
          handleOptionSelect={handleOptionSelect}
          restartConversation={restartConversation}
        />

        <main className="flex min-h-screen flex-col gap-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-panel">
          <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Flow workspace</p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900">SupportFlow</h1>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600 shadow-sm">
              Canvas mode enabled
            </div>
          </header>

          <div className="grid flex-1 gap-6 lg:grid-cols-[1.5fr_0.75fr]">
            <CanvasPanel pathIds={pathIds} nodesById={nodesById} messages={messages} />
            <PropertiesPanel />
          </div>
        </main>
      </div>
    </div>
  )
}

export default BuilderPage
