import { useEffect, useState } from 'react'
import { Excalidraw } from '@excalidraw/excalidraw'
import '@excalidraw/excalidraw/index.css'
import { supabase } from '../../supabaseClient'

export default function Wireframe({ onClose, initialData }) {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null)
  const [saveStatus, setSaveStatus] = useState('')
  const [isWideScreen, setIsWideScreen] = useState(false)
  const [screenWidth, setScreenWidth] = useState(0)

  const preparedInitialData = initialData ? {
    elements: initialData.elements || [],
    appState: {
      viewBackgroundColor: "#ffffff",
      theme: 'dark',
      currentItemStrokeColor: initialData.appState?.currentItemStrokeColor,
      currentItemBackgroundColor: initialData.appState?.currentItemBackgroundColor,
      currentItemFillStyle: initialData.appState?.currentItemFillStyle,
      currentItemStrokeWidth: initialData.appState?.currentItemStrokeWidth,
      currentItemRoughness: initialData.appState?.currentItemRoughness,
      currentItemOpacity: initialData.appState?.currentItemOpacity,
    }
  } : {
    appState: {
      viewBackgroundColor: "#ffffff",
      theme: 'dark'
    }
  }

  useEffect(() => {
    const updateScreenWidth = () => {
      const width = window.innerWidth
      setScreenWidth(width)
      setIsWideScreen(width >= 2200)
    }

    updateScreenWidth()
    window.addEventListener('resize', updateScreenWidth)

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault()
        handleSaveWireframe()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', updateScreenWidth)
    }
  }, [onClose, excalidrawAPI])

  const wideShiftPx = Math.round(1750 + Math.max(0, screenWidth - 1920) * 0.85)

  const handleSaveWireframe = async () => {
    if (!excalidrawAPI) return

    setSaveStatus('saving')
    try {
      const elements = excalidrawAPI.getSceneElements()
      const appState = excalidrawAPI.getAppState()
      
      const cleanAppState = {
        viewBackgroundColor: appState.viewBackgroundColor,
        currentItemStrokeColor: appState.currentItemStrokeColor,
        currentItemBackgroundColor: appState.currentItemBackgroundColor,
        currentItemFillStyle: appState.currentItemFillStyle,
        currentItemStrokeWidth: appState.currentItemStrokeWidth,
        currentItemRoughness: appState.currentItemRoughness,
        currentItemOpacity: appState.currentItemOpacity,
      }
      
      const timestamp = new Date().toLocaleString()
      const title = `Wireframe - ${timestamp}`

      const { error } = await supabase.from('wireframes').insert({
        title: title,
        data: { elements, appState: cleanAppState },
        created_at: new Date().toISOString()
      })

      if (error) throw error
      
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus(''), 2000)
    } catch (error) {
      console.error('Error saving wireframe:', error)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus(''), 2000)
    }
  }

  return (
    <div className="absolute inset-0 bg-black flex flex-col">
      <div style={{ width: '100%', height: '100%' }}>
        <Excalidraw
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
          initialData={preparedInitialData}
          renderTopRightUI={() => (
  <div style={{ 
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    transform: isWideScreen
      ? `translateX(-${wideShiftPx}px)`
      : 'translateX(clamp(-1530px, -90vw, -1300px))',
  }}>
    <button
      onClick={handleSaveWireframe}
      title="Save to Wireframe History (Ctrl+S)"
      disabled={saveStatus === 'saving'}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '34px',
        height: '34px',
        backgroundColor: saveStatus === 'saved' ? '#22c55e' : saveStatus === 'error' ? '#ef4444' : 'var(--color-primary)',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: saveStatus === 'saving' ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
        opacity: saveStatus === 'saving' ? 0.6 : 1,
      }}
      onMouseEnter={(e) => {
        if (saveStatus !== 'saving') {
          e.currentTarget.style.backgroundColor = saveStatus === 'saved' ? '#16a34a' : saveStatus === 'error' ? '#dc2626' : 'var(--color-primary-darker)'
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = saveStatus === 'saved' ? '#22c55e' : saveStatus === 'error' ? '#ef4444' : 'var(--color-primary)'
      }}
    >
      {saveStatus === 'saving' ? '⏳' : saveStatus === 'saved' ? '✓' : '💾'}
    </button>
  </div>
)}
        />
      </div>
    </div>
  )
}