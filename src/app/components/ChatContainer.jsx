import Message from './Message'

export default function ChatContainer({ messages, isLoading }) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} content={msg.content} />
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="text-gray-100">
              <div className="text-lg font-light">
                <span className="inline-block bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent">
                  Loading...
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}