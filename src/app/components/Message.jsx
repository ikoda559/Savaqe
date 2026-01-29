import ReactMarkdown from 'react-markdown'

export default function Message({ role, content }) {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div
        className={`max-w-3xl ${
          isUser
            ? 'bg-blue-600 text-white rounded-2xl px-6 py-4'
            : 'text-gray-100 px-2 py-1'
        }`}
      >
        <ReactMarkdown
          components={{
            // Paragraphs
            p: ({ children }) => <p className="mb-4 last:mb-0 leading-7 text-base">{children}</p>,
            
            // Bold text
            strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
            
            // Numbered lists
            ol: ({ children }) => <ol className="list-decimal ml-6 my-4 space-y-2 text-base">{children}</ol>,
            
            // Bullet lists
            ul: ({ children }) => <ul className="list-disc ml-6 my-4 space-y-2 text-base">{children}</ul>,
            
            // List items
            li: ({ children }) => <li className="ml-2 leading-7">{children}</li>,
            
            // Headings
            h1: ({ children }) => <h1 className="text-xl font-semibold mb-3 mt-4 first:mt-0">{children}</h1>,
            h2: ({ children }) => <h2 className="text-lg font-semibold mb-3 mt-4 first:mt-0">{children}</h2>,
            h3: ({ children }) => <h3 className="text-base font-semibold mb-2 mt-3 first:mt-0">{children}</h3>,
            
            // Code blocks
            code: ({ node, inline, children }) => 
              inline 
                ? <code className="bg-gray-700 px-1.5 py-0.5 rounded text-sm">{children}</code>
                : <code className="block bg-gray-700 p-3 rounded-lg my-3 overflow-x-auto text-sm leading-6">{children}</code>,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}