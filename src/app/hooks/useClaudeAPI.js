import { useState } from "react";
import { supabase } from "../../supabaseClient";

export function useClaudeAPI() {
    // State management for chat
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [conversationId, setConversationId] = useState(null)

    // Send message to Claude and save to database
    const sendMessage = async (userMessage) => {
        setLoading(true)
        setError(null)

        try {
            // Use local variable to avoid async state issues
            let currentConvId = conversationId

            // Create new conversation if first message
            if (!currentConvId) {
                const { data: conv, error: convError } = await supabase
                    .from('conversations')
                    .insert({ title: userMessage.slice(0, 50) })
                    .select()
                    .single()
                
                if (convError) throw convError
                currentConvId = conv.id
                setConversationId(conv.id)
            }

            // Add user message to UI
            setMessages(prev => [...prev, { role: 'user', content: userMessage }])

            // Save user message to Supabase
            const { error: userMsgError } = await supabase.from('messages').insert({
                conversation_id: currentConvId,
                role: 'user',
                content: userMessage
            })
            
            if (userMsgError) {
                console.error('Error saving user message:', userMsgError)
            }

            // Call Claude API through backend
            const response = await fetch('http://localhost:3001/api/claude', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    system: `You are Savaqe, an AI assistant that helps users build projects based on their interests, skills, and problems.
                    - Help users discover app ideas based on their interests, skills, and problems
                    - Provide creative suggestions for digitizing business processes
                    - Ask clarifying questions when needed
                    - Be reinforcing but not overly positive
                    - Be specific with your recommendations
                    - Do not use emojis in your responses`,
                    messages: [...messages, { role: 'user', content: userMessage }],
                }),
            });

            if (!response.ok) throw new Error(`API error: ${response.status}`)

            // Extract AI response
            const data = await response.json()
            const assistantMessage = data.content[0].text

            // Add AI response to UI
            setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }])

            // Save AI response to Supabase
            await supabase.from('messages').insert({
                conversation_id: currentConvId,
                role: 'assistant',
                content: assistantMessage
            })

        } catch (err) {
            setError(err.message)
            console.error('Error:', err)
        } finally {
            setLoading(false)
        }
    }

    // Load conversation messages from database
    const loadConversation = async (convId) => {
        setLoading(true)
        setConversationId(convId)

        try {
            // Fetch all messages for this conversation
            const { data, error: loadError } = await supabase
                .from('messages')
                .select('*')
                .eq('conversation_id', convId)
                .order('created_at', { ascending: true })

            if (loadError) throw loadError

            setMessages(data || [])
        } catch (err) {
            console.error('Error loading conversation:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // Clear messages and start fresh conversation
    const startNewChat = () => {
        setMessages([])
        setConversationId(null)
    }

    return { messages, loading, error, sendMessage, loadConversation, startNewChat }
}