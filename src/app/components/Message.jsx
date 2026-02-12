import ReactMarkdown from 'react-markdown'

export default function Message({ role, content }) {
  const isUser = role === 'user'
  const paragraphClass = isUser
    ? 'mb-4 last:mb-0 leading-7 text-lg'
    : 'mb-3 last:mb-0 leading-7 text-lg'
  const listClass = isUser
    ? 'list-decimal ml-6 my-4 space-y-2 text-lg'
    : 'list-decimal ml-6 my-3 space-y-2 text-lg'
  const bulletClass = isUser
    ? 'list-disc ml-6 my-4 space-y-2 text-lg'
    : 'list-disc ml-6 my-3 space-y-2 text-lg'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 ${!isUser ? 'ai-response-fade' : ''}`}>
      <div
        className={`${
          isUser
            ? 'bg-[#B2BEB5] text-black rounded-2xl px-5 py-2 w-fit max-w-3xl border border-black/10 shadow-[0_2px_10px_rgba(0,0,0,0.08)]'
            : 'text-gray-100 px-1 py-2 w-full'
        }`}
      >
        <ReactMarkdown
          components={{
            // Paragraphs
            p: ({ children }) => <p className={paragraphClass}>{children}</p>,
            
            // Bold text
            strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
            
            // Numbered lists
            ol: ({ children }) => <ol className={listClass}>{children}</ol>,
            
            // Bullet lists
            ul: ({ children }) => <ul className={bulletClass}>{children}</ul>,
            
            // List items
            li: ({ children }) => <li className="ml-2 leading-7 text-lg">{children}</li>,
            
            // Headings
            h1: ({ children }) => <h1 className="text-xl font-semibold mb-3 mt-4 first:mt-0">{children}</h1>,
            h2: ({ children }) => <h2 className="text-xl font-semibold mb-3 mt-4 first:mt-0">{children}</h2>,
            h3: ({ children }) => <h3 className="text-lg font-semibold mb-2 mt-3 first:mt-0">{children}</h3>,
            
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