import { useState, useRef, useEffect } from 'react'
import Message from './Message'
import { generateWireframeFromChat } from '../utils/wireframeGenerator'

export default function ChatContainer({ messages, isLoading, onGenerateWireframe }) {
  const [generating, setGenerating] = useState(false)
  const [generationStatus, setGenerationStatus] = useState('')
  const scrollContainerRef = useRef(null)



  const handleGenerateWireframe = async () => {
    if (messages.length === 0) {
      alert('No messages to generate wireframe from')
      return
    }

    setGenerating(true)
    setGenerationStatus('Generating wireframe from chat...')
    console.log('Starting wireframe generation...')
    
    try {
      const wireframeData = await generateWireframeFromChat(messages)
      console.log('Wireframe generation complete:', wireframeData)
      setGenerationStatus('Wireframe generated!')
      onGenerateWireframe(wireframeData)
      setTimeout(() => setGenerationStatus(''), 2000)
    } catch (error) {
      console.error('Error generating wireframe:', error)
      setGenerationStatus('Error generating wireframe')
      setTimeout(() => setGenerationStatus(''), 3000)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-6 py-8 flex flex-col">
      <div className="max-w-3xl mx-auto space-y-6 flex-1 pb-24">
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} content={msg.content} />
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-3">
              <div className="p-0.5 rounded-xl bg-gradient-to-br from-gray-400 via-gray-200 to-gray-400 bg-[length:200%_auto] animate-shimmer shadow-lg border border-gray-200 loading-icon-fade">
                <img
                  src="/logo.png"
                  alt="Savaqe logo"
                  className="h-7 w-7 rounded-lg loading-icon-shine"
                />
              </div>
              <span className="text-sm loading-text-shimmer loading-text-reveal loading-icon-fade">
                Contemplating...
              </span>
            </div>
          </div>
        )}
      </div>

      {messages.length > 0 && !isLoading && (
        <div className="max-w-3xl mx-auto mt-6 flex items-center gap-3">
          <button
            onClick={handleGenerateWireframe}
            disabled={generating}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generating ? '⏳ Generating...' : '🎨 Generate Wireframe'}
          </button>
          {generationStatus && (
            <span className="text-sm text-gray-400">
              {generationStatus}
            </span>
          )}
        </div>
      )}
    </div>
  )
}