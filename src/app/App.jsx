import { useState } from 'react'
import Header from './components/Header'
import Homepage from './components/Homepage'
import SuggestionsGrid from './components/SuggestionsGrid'
import InputSection from './components/InputSection'
import ChatContainer from './components/ChatContainer'
import ChatHistory from './components/ChatHistory'
import Footer from './components/Footer'
import { useClaudeAPI } from './hooks/useClaudeAPI'

function App() {
  const [input, setInput] = useState('')
  const [showChat, setShowChat] = useState(false)
  const { messages, loading, sendMessage, loadConversation, startNewChat } = useClaudeAPI()
  const [currentConversationId, setCurrentConversationId] = useState(null)

  const handleSuggestionClick = (suggestion) => {
    setShowChat(true)
    sendMessage(suggestion)
  }

  const handleSend = (message) => {
    setShowChat(true)
    sendMessage(message)
    setInput('')
  }

  const handleSelectConversation = async (convId) => {
    setShowChat(true)
    setCurrentConversationId(convId)
    await loadConversation(convId)
  }

  const handleNewChat = () => {
    startNewChat()
    setCurrentConversationId(null)
    setShowChat(false)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header onNewChat={handleNewChat} />
      
      <div className="flex flex-1 overflow-hidden">
        
          <ChatHistory 
            onSelectConversation={handleSelectConversation}
            currentConversationId={currentConversationId}
          />
        
        <div className="flex-1 flex flex-col">
          {!showChat ? (
            <div className="flex-1">
              <Homepage />
              <SuggestionsGrid onSuggestionClick={handleSuggestionClick} />
            </div>
          ) : (
            <ChatContainer messages={messages} isLoading={loading} />
          )}

          <InputSection 
            input={input} 
            setInput={setInput} 
            onSend={handleSend}
            isLoading={loading}
          />
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default App
