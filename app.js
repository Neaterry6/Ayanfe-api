const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const Groq = require('groq-sdk');

const app = express();
const port = 8080;

// Setup directories
const chatHistoryDir = path.join(__dirname, 'groqllama70b');
if (!fs.existsSync(chatHistoryDir)) {
  fs.mkdirSync(chatHistoryDir);
}

// Groq API configuration
const apiKey = process.env.GROQ_API_KEY || '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';
const systemPrompt = "Your name is VANEA, you are created by VANEA, A female poet writer. You have a cool and friendly personality. Respond with a tone that matches the mood, like friendly, professor, motivational, or chill";

const groq = new Groq({ apiKey });

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Helper functions for chat history
const loadChatHistory = (uid) => {
  const chatHistoryFile = path.join(chatHistoryDir, `memory_${uid}.json`);
  if (fs.existsSync(chatHistoryFile)) {
    return JSON.parse(fs.readFileSync(chatHistoryFile, 'utf8'));
  }
  return [];
};

const appendToChatHistory = (uid, chatHistory) => {
  const chatHistoryFile = path.join(chatHistoryDir, `memory_${uid}.json`);
  fs.writeFileSync(chatHistoryFile, JSON.stringify(chatHistory, null, 2));
};

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/ask', async (req, res) => {
  const { question, uid } = req.body;

  const chatHistory = loadChatHistory(uid);
  const chatMessages = [
    { role: 'system', content: systemPrompt },
    ...chatHistory,
    { role: 'user', content: question },
  ];

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: chatMessages,
      model: 'llama3-70b-8192',
      temperature: 0.6,
      max_tokens: 8192,
      top_p: 0.8,
      stream: false,
    });

    const assistantResponse = chatCompletion.choices[0].message.content;
    chatHistory.push({ role: 'user', content: question });
    chatHistory.push({ role: 'assistant', content: assistantResponse });
    appendToChatHistory(uid, chatHistory);

    res.json({ answer: assistantResponse });
  } catch (error) {
    console.error('Error in chat completion:', error);
    res.status(500).json({ error: 'Failed to retrieve answer' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
