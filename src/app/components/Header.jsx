export default function Header({ onNewChat }) {  
    const handleLogoClick = () => {
        window.location.href = '/'
    }

    return (
    <header className="bg-black border-b border-gray-800 py-6">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
            {/* Header aka logo text */}
            <h1 
                onClick={handleLogoClick}
                className="text-white text-2xl font-absans absolute left-6 cursor-pointer hover:opacity-80 transition-opacity"
            >
                Savaqe.
            </h1>
            
            {/* New Chat button - only shows when onNewChat is passed */}
            {onNewChat && (
              <button 
                onClick={onNewChat}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-auto"
              >
                + New Chat
              </button>
            )}
        </div>
    </header>
  )
}