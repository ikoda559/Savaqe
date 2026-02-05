export default function Header({ onNewChat, onWireframeClick }) {  
    const handleLogoClick = () => {
        window.location.href = '/'
    }

    return (
    <header className="bg-black border-b border-gray-800 py-6 w-full">
        <div className="px-6 flex items-center justify-between">
            {/* Logo and header text */}
            <div 
                onClick={handleLogoClick}
                className="flex items-end gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
                <img 
                    src="/logo.png"
                    alt="Savaqe Logo" 
                    className="h-12 w-12 rounded"
                />
                <h1 
                    className="text-white text-2xl font-absans -mt-2"
                >
                    Savaqe.
                </h1>
            </div>
            
            {/* Buttons section */}
            <div className="flex items-center pr-8">
              <button 
                onClick={onWireframeClick}
                className="px-4 py-2 text-purple-400 bg-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-transparent hover:text-white rounded-lg transition-all duration-300"
                title="Open Wireframe Editor"
              >
                📐 Wireframe
              </button>
              
              {/* Divider line */}
              <div className="h-6 w-px bg-gray-700 mx-1"></div>
              
              {/* New Chat button - only shows when onNewChat is passed */}
              {onNewChat && (
                <button 
                  onClick={onNewChat}
                  className="px-4 py-2 text-blue-400 bg-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-transparent hover:text-white rounded-lg transition-all duration-300"
                >
                  + New Chat
                </button>
              )}
            </div>
        </div>
    </header>
  )
}