import { useState } from 'react'
import Header from './components/Header'
import Homepage from './components/Homepage'
import SuggestionsGrid from './components/SuggestionsGrid'
import InputSection from './components/InputSection'
import ChatContainer from './components/ChatContainer'
import ChatHistory from './components/ChatHistory'
import Footer from './components/Footer'
import Wireframe from './components/Wireframe'
import { useClaudeAPI } from './hooks/useClaudeAPI'

function App() {
  const [input, setInput] = useState('')
  const [showChat, setShowChat] = useState(false)
  const [showWireframe, setShowWireframe] = useState(false)
  const [currentWireframeId, setCurrentWireframeId] = useState(null)
  const [currentWireframeData, setCurrentWireframeData] = useState(null)
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

  const handleSelectWireframe = (wireframeId, wireframeData) => {
    console.log('Selected wireframe:', wireframeId, wireframeData) // Debug log
    setCurrentWireframeId(wireframeId)
    setCurrentWireframeData(wireframeData)
    setShowWireframe(true)
  }

  const handleCloseWireframe = () => {
    setShowWireframe(false)
    // Don't clear the data immediately in case user wants to reopen
  }

  const handleNewWireframe = () => {
    setCurrentWireframeId(null)
    setCurrentWireframeData(null)
    setShowWireframe(true)
  }

  const handleGenerateWireframeFromChat = (wireframeData) => {
    setCurrentWireframeData(wireframeData)
    setCurrentWireframeId(null)
    setShowWireframe(true)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header onNewChat={handleNewChat} onWireframeClick={handleNewWireframe} />
      
      <div className="flex flex-1 overflow-hidden">
        {!showWireframe && (
          <ChatHistory 
            onSelectConversation={handleSelectConversation}
            currentConversationId={currentConversationId}
            onSelectWireframe={handleSelectWireframe}
            currentWireframeId={currentWireframeId}
          />
        )}
        
        <div className="flex-1 flex flex-col relative">
          {showWireframe && (
            <Wireframe 
              onClose={handleCloseWireframe} 
              initialData={currentWireframeData} 
            />
          )}
          
          {!showWireframe && (
            <>
              {!showChat ? (
                <div className="flex-1">
                  <Homepage />
                  <SuggestionsGrid onSuggestionClick={handleSuggestionClick} />
                </div>
              ) : (
                <ChatContainer 
                  messages={messages} 
                  isLoading={loading}
                  onGenerateWireframe={handleGenerateWireframeFromChat}
                />
              )}

              <InputSection 
                input={input} 
                setInput={setInput} 
                onSend={handleSend}
                isLoading={loading}
              />
            </>
          )}
        </div>
      </div>
      
      {!showWireframe && <Footer />}
    </div>
  )
}

export default App