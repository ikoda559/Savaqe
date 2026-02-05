import { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function WireframeHistory({ onSelectWireframe, currentWireframeId }) {
  const [wireframes, setWireframes] = useState([])

  useEffect(() => {
    loadWireframes()
  }, [])

  const loadWireframes = async () => {
    const { data } = await supabase
      .from('wireframes')
      .select('*')
      .order('created_at', { ascending: false })
    
    setWireframes(data || [])
  }

  const handleDeleteWireframe = async (id, e) => {
    e.stopPropagation()
    await supabase.from('wireframes').delete().eq('id', id)
    loadWireframes()
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-400 px-3 mt-4">Wireframe History</h3>
      {wireframes.length === 0 ? (
        <p className="text-xs text-gray-500 px-3">No wireframes yet</p>
      ) : (
        wireframes.map((wf) => (
          <div
            key={wf.id}
            onClick={() => onSelectWireframe(wf.id, wf.data)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate group cursor-pointer flex items-center justify-between ${
              currentWireframeId === wf.id
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span className="truncate flex-1">{wf.title || 'Untitled Wireframe'}</span>
            <button
              onClick={(e) => handleDeleteWireframe(wf.id, e)}
              className="opacity-0 group-hover:opacity-100 text-xs ml-2 hover:text-red-400 transition-opacity"
            >
              ✕
            </button>
          </div>
        ))
      )}
    </div>
  )
}
