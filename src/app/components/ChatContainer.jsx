import { useState } from 'react'
import Message from './Message'
import { generateWireframeFromChat } from '../utils/wireframeGenerator'

export default function ChatContainer({ messages, isLoading, onGenerateWireframe }) {
  const [generating, setGenerating] = useState(false)
  const [generationStatus, setGenerationStatus] = useState('')

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
    <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col">
      <div className="max-w-3xl mx-auto space-y-6 flex-1">
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