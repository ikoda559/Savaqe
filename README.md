# Savaqe - AI-Powered Business Idea Generator & Wireframe Tool

An intelligent application that helps entrepreneurs transform their business ideas into actionable app concepts with integrated AI-powered wireframing capabilities.

## Features

- 💬 **AI Chat Assistant** - Interactive conversation with Claude AI to refine and develop your business ideas
- 🎨 **Integrated Wireframe Editor** - Built-in Excalidraw-based wireframing tool for visualizing your app concepts
- 🤖 **AI Wireframe Generation** - Automatically generate wireframes from your chat conversations
- 💾 **Conversation History** - Save and revisit past business idea discussions
- 📋 **Wireframe History** - Store and manage multiple wireframe designs
- ⚡ **Real-time Updates** - Instant AI responses and seamless wireframe editing

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **AI**: Anthropic Claude API (Claude Sonnet 4.5)
- **Wireframing**: Excalidraw
- **Backend**: Node.js + Express

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- Anthropic API key

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd savaqe
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

4. Set up the database:

Run the following SQL in your Supabase SQL editor:
```sql
-- Table for storing conversations
CREATE TABLE conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text,
  title text,
  created_at timestamp DEFAULT now()
);

-- Table for storing messages
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES conversations(id),
  role text,
  content text,
  created_at timestamp DEFAULT now()
);

-- Table for storing wireframes
CREATE TABLE wireframes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  data JSONB,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_wireframes_created_at ON wireframes(created_at DESC);

-- Enable RLS
ALTER TABLE wireframes ENABLE ROW LEVEL SECURITY;

-- Security policies (adjust based on your auth needs)
CREATE POLICY "Allow all operations on wireframes" ON wireframes
  FOR ALL USING (true) WITH CHECK (true);
```

5. Start the backend server:
```bash
cd backend
npm install
node server.js
```

6. Start the development server:
```bash
npm run dev
```

## Usage

1. **Start a Conversation**: Click "+ New Chat" to begin discussing your business idea
2. **Generate Wireframes**: Click "Generate Wireframe" to create visual representations from your conversation
3. **Edit Wireframes**: Use the integrated Excalidraw editor to manually refine wireframes
4. **Save Your Work**: All conversations and wireframes are automatically saved to your history

## Keyboard Shortcuts

- `Ctrl/Cmd + S` - Save current wireframe to history
- `Esc` - Close wireframe editor

## Attributions & Licenses

This project uses the following open-source libraries:

### Excalidraw
- **License**: MIT License
- **Copyright**: © 2020 Excalidraw contributors
- **Website**: https://excalidraw.com
- **Repository**: https://github.com/excalidraw/excalidraw

### Other Dependencies
- React - MIT License
- Vite - MIT License
- Tailwind CSS - MIT License
- Supabase - Apache 2.0 License

## API Costs

This application uses the Anthropic Claude API. Please be aware of API usage costs. Consider switching to free alternatives like Groq or Google Gemini if needed.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT]

## Contact

[www.linkedin.com/in/dakotasmith-dev]

---

Built with lots of love and if you read this far give me a hug man.
