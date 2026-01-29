import { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function ChatHistory({ onSelectConversation, currentConversationId }) {
  const [conversations, setConversations] = useState([])

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
    <div className="w-64 bg-gray-900 border-r border-gray-800 p-4 overflow-y-auto">
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
  )
}
