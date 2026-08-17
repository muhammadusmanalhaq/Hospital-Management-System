const axios = require('axios');

async function testAI() {
  try {
    console.log('Testing AI Chatbot...');
    const res = await axios.post('http://localhost:8000/api/v1/ai/chatbot', {
      session_id: 'test-session-123',
      message: 'Hello, can you tell me what this hospital management system does?',
      conversation_history: []
    });
    console.log('AI Response SUCCESS:', res.data.data.reply.substring(0, 100) + '...');
    console.log('Model used:', res.data.meta.model_used, '| Provider:', res.data.meta.provider);
  } catch (err) {
    console.error('AI Chatbot FAILED:', err.response?.data || err.message);
  }
}

testAI();
