import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
console.log('API Key loaded:', process.env.CLAUDE_API_KEY ? 'YES' : 'NO');
console.log('First 10 chars:', process.env.CLAUDE_API_KEY?.substring(0, 10));

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/claude', async (req, res) => {
  try {
    const { messages, system } = req.body;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 1024,
        system,
        messages,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Claude API Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
