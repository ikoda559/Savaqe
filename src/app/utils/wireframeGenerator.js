import { supabase } from '../../supabaseClient'

export async function generateWireframeFromChat(messages) {
  try {
    // Prepare chat context
    const chatContext = messages
      .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n\n')

    console.log('Starting wireframe generation with messages:', chatContext)

    // Call Claude API with wireframe generation prompt
    const response = await fetch('/api/claude', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: `You are a wireframe designer. Based on this conversation, create a detailed wireframe in JSON format.

IMPORTANT: You MUST return ONLY a valid JSON object with this exact structure:
{
  "name": "Wireframe Name",
  "description": "What this wireframe shows",
  "elements": [
    {"type": "rectangle", "x": 50, "y": 20, "width": 500, "height": 60, "text": "Header", "strokeColor": "#000000", "backgroundColor": "#e0e0e0"},
    {"type": "rectangle", "x": 50, "y": 100, "width": 200, "height": 300, "text": "Sidebar", "strokeColor": "#000000"},
    {"type": "rectangle", "x": 270, "y": 100, "width": 280, "height": 300, "text": "Main Content", "strokeColor": "#000000"},
    {"type": "rectangle", "x": 50, "y": 420, "width": 500, "height": 50, "text": "Footer", "strokeColor": "#000000", "backgroundColor": "#e0e0e0"}
  ]
}

Do NOT include any markdown, code blocks, or explanatory text. Return ONLY the JSON.

Conversation to analyze:
${chatContext}

Create a wireframe based on this discussion:`
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error('Failed to generate wireframe')
    }

    const data = await response.json()
    
    // Extract the actual content - handle different response formats
    let content = data.content || data.message || data
    
    console.log('Raw response from Claude:', data)
    
    // If content is an array (from content_block), extract the text
    if (Array.isArray(content)) {
      console.log('Content is array, extracting text:', content)
      content = content[0]?.text || JSON.stringify(content)
    }
    
    // If content is an object, stringify it
    if (typeof content === 'object') {
      content = JSON.stringify(content)
    }
    
    // Remove markdown code blocks if present
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    
    console.log('Cleaned content:', content)
    
    // Parse the JSON
    const wireframeJson = JSON.parse(content)
    
    console.log('Parsed wireframe JSON:', wireframeJson)
    
    // Make sure we have elements - wireframeJson might be the object or might be in an array
    let elements = []
    if (Array.isArray(wireframeJson)) {
      elements = convertToExcalidrawElements(wireframeJson[0]?.elements || [])
    } else {
      elements = convertToExcalidrawElements(wireframeJson.elements || [])
    }
    
    console.log('Generated wireframe:', { wireframeJson, elements })
    
    return {
      title: wireframeJson.name || 'AI Generated Wireframe',
      elements,
      appState: {
        viewBackgroundColor: '#ffffff',
        theme: 'dark'
      }
    }
  } catch (error) {
    console.error('Error generating wireframe:', error)
    throw error
  }
}

function convertToExcalidrawElements(elements) {
  const excalidrawElements = []
  
  elements.forEach((el, index) => {
    if (!el || !el.type) return
    
    const id = `element-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`
    
    // Create the shape element (rectangle, diamond, etc.)
    const shapeElement = {
      id: id,
      type: el.type === 'rectangle' ? 'rectangle' : el.type === 'circle' ? 'ellipse' : 'rectangle',
      x: el.x || 0,
      y: el.y || 0,
      width: el.width || 150,
      height: el.height || 75,
      angle: 0,
      strokeColor: el.strokeColor || '#1e1e1e',
      backgroundColor: el.backgroundColor || 'transparent',
      fillStyle: 'solid',
      strokeWidth: 2,
      strokeStyle: 'solid',
      roughness: 0,
      opacity: 100,
      groupIds: [],
      frameId: null,
      roundness: { type: 3 },
      seed: Math.floor(Math.random() * 1000000),
      version: 1,
      versionNonce: Math.floor(Math.random() * 1000000),
      isDeleted: false,
      boundElements: el.text ? [{ type: 'text', id: `${id}-text` }] : null,
      updated: Date.now(),
      link: null,
      locked: false
    }

    excalidrawElements.push(shapeElement)

    // If there's text, create a separate text element
    if (el.text) {
      const textElement = {
        id: `${id}-text`,
        type: 'text',
        x: el.x + (el.width / 2) - (el.text.length * 4), // Center text horizontally
        y: el.y + (el.height / 2) - 10, // Center text vertically
        width: Math.max(100, el.text.length * 8),
        height: 25,
        angle: 0,
        strokeColor: '#1e1e1e',
        backgroundColor: 'transparent',
        fillStyle: 'solid',
        strokeWidth: 1,
        strokeStyle: 'solid',
        roughness: 0,
        opacity: 100,
        groupIds: [],
        frameId: null,
        roundness: null,
        seed: Math.floor(Math.random() * 1000000),
        version: 1,
        versionNonce: Math.floor(Math.random() * 1000000),
        isDeleted: false,
        boundElements: null,
        updated: Date.now(),
        link: null,
        locked: false,
        text: el.text,
        fontSize: 16,
        fontFamily: 1,
        textAlign: 'center',
        verticalAlign: 'middle',
        baseline: 18,
        containerId: id,
        originalText: el.text,
        autoResize: true,
        lineHeight: 1.25
      }

      excalidrawElements.push(textElement)
    }
  })
  
  return excalidrawElements
}
