export default function Header({ onNewChat, onWireframeClick }) {  
    const handleLogoClick = () => {
        window.location.href = '/'
    }

    return (
    <header className="bg-black border-b border-gray-800/60 py-4 w-full fixed top-0 left-0 right-0 z-40">
      <div className="px-6 flex items-center justify-between">
            {/* Logo and header text */}
            <div 
                onClick={handleLogoClick}
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
                <img 
                    src="/logo.png"
                    alt="Savaqe Logo" 
                    className="h-10 w-10 rounded"
                />
                <h1 
                    className="text-white text-2xl font-absans"
                >
                    Savaqe.
                </h1>
            </div>
            
            {/* Buttons section */}
            <div className="flex items-center pr-6">
              <button 
                onClick={onWireframeClick}
                className="px-4 py-2 text-base text-purple-300 bg-transparent hover:bg-purple-900/40 hover:text-white rounded-md transition-colors duration-200"
                title="Open Wireframe Editor"
              >
                📐 Wireframe
              </button>
              
              {/* Divider line */}
              <div className="h-6 w-px bg-gray-700/70 mx-3"></div>
              
              {/* New Chat button - only shows when onNewChat is passed */}
              {onNewChat && (
                <button 
                  onClick={onNewChat}
                  className="px-4 py-2 text-base text-blue-300 bg-transparent hover:bg-blue-900/40 hover:text-white rounded-md transition-colors duration-200"
                >
                  + New Chat
                </button>
              )}
            </div>
        </div>
    </header>
  )
}