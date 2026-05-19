const navItems = [
  { label: 'Flow Builder', active: true },
  { label: 'Preview Mode', active: false },
  { label: 'Settings', active: false },
]

function Sidebar({ messages, options, handleOptionSelect, restartConversation }) {
  const isComplete = !options.length

  return (
    <aside className="w-full max-w-none shrink-0 space-y-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-panel">
      <div className="space-y-3">
        <div className="rounded-[32px] border border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Technical support</p>
          <div className="mt-3 inline-flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-indigo-500 text-white shadow-sm">
              SF
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">SupportFlow Chat</p>
              <p className="text-xs text-slate-500">Choose a support path and preview replies.</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Workspace</p>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                  item.active
                    ? 'bg-indigo-500 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
                {item.active && (
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold">Active</span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-4 rounded-[28px] border border-slate-200 bg-slate-50 p-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Support Chat</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">Customer flow preview</h2>
          </div>
          <p className="text-sm leading-6 text-slate-600">
            Choose a support path and watch the chat history update as if a user is responding in a help conversation.
          </p>
        </div>

        <div className="flex h-[520px] flex-col rounded-[30px] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">Live support chat</p>
              <p className="text-xs text-slate-500">The sidebar shows your current path and user replies.</p>
            </div>
            <button
              type="button"
              onClick={restartConversation}
              className="rounded-2xl bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200"
            >
              Restart
            </button>
          </div>

          <div className="mt-4 flex-1 space-y-4 overflow-y-auto pr-1">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[84%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm ${
                    message.role === 'user'
                      ? 'rounded-br-[6px] rounded-tl-[28px] rounded-tr-[28px] rounded-bl-[28px] bg-indigo-500 text-white'
                      : 'rounded-bl-[6px] rounded-tr-[28px] rounded-tl-[28px] rounded-br-[28px] bg-slate-100 text-slate-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            {options.length > 0 ? (
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.25em] text-slate-400">Your reply options</p>
                <div className="grid gap-2">
                  {options.map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => handleOptionSelect(option)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                <p className="font-semibold text-slate-900">Support path complete</p>
                <p className="mt-2">No further options are available for this node. Restart to begin again.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
