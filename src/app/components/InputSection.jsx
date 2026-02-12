export default function InputSection({ input, setInput, onSend, isLoading, sidebarExpanded }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSend(input)
    }
  }

  return (
    <section className="bg-gradient-to-b from-black/0 to-black py-3 fixed bottom-0 right-0 z-50 transition-all duration-300" style={{ left: sidebarExpanded ? '16rem' : '4rem' }}>
      <div className="px-2 max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your interests, skills, or a problem you'd like to solve..."
            className="w-full bg-gray-900 text-white border border-gray-700 rounded-2xl px-6 py-6 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="2"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-3 bottom-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white w-10 h-10 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center text-xl"
          >
            {isLoading ? '...' : '→'}
          </button>
        </form>
      </div>
    </section>
  )
}
