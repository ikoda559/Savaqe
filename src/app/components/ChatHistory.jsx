import { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import WireframeHistory from './WireframeHistory'

export default function ChatHistory({ onSelectConversation, currentConversationId, onSelectWireframe, currentWireframeId, isExpanded, onToggleExpand }) {
  const [conversations, setConversations] = useState([])
  const [activeTab, setActiveTab] = useState('chat')

  useEffect(() => {
    loadConversations()
  }, [])

  const loadConversations = async () => {
    const { data } = await supabase
      .from('conversations')
      .select('*')
      .order('created_at', { ascending: false })
    
    setConversations(data || [])
  }

  return (
    <div className={`${isExpanded ? 'w-64' : 'w-16'} bg-gray-900 border-r border-gray-800 overflow-y-auto flex flex-col fixed left-0 top-16 bottom-0 z-30 transition-all duration-300`}>
      {/* Toggle Button */}
      <button
        onClick={() => onToggleExpand(!isExpanded)}
        className="flex items-center justify-center h-10 w-10 rounded-lg hover:bg-gray-800 transition-colors mb-4 text-gray-400 hover:text-gray-200 absolute right-3 top-2"
      >
        {isExpanded ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </button>

      {isExpanded && (
        <div className="flex flex-col flex-1 px-4 py-4">
      {/* Tab buttons */}
      <div className="flex gap-2 mb-4 border-b border-gray-800">
        <button
          onClick={() => setActiveTab('chat')}
          className={`pb-2 px-2 text-sm font-medium transition-colors ${
            activeTab === 'chat'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Chat
        </button>
        <button
          onClick={() => setActiveTab('wireframe')}
          className={`pb-2 px-2 text-sm font-medium transition-colors ${
            activeTab === 'wireframe'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Wireframe
        </button>
      </div>

      {/* Chat History Tab */}
      {activeTab === 'chat' && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Chat History</h2>
          
          <div className="space-y-2">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate ${
                  currentConversationId === conv.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {conv.title || 'New conversation'}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Wireframe History Tab */}
      {activeTab === 'wireframe' && (
        <WireframeHistory 
          onSelectWireframe={onSelectWireframe}
          currentWireframeId={currentWireframeId}
        />
      )}
        </div>
      )}
    </div>
  )
}
