import { useState, useRef, useEffect } from 'react';
import { Container, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { aiApi } from '../services/api';

function AIChatbot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am the CareInFlow AI Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  
  // A random session ID for this demo
  const [sessionId] = useState(`session_${Math.random().toString(36).substr(2, 9)}`);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const response = await aiApi.post('/chatbot', {
        session_id: sessionId,
        message: userMessage.content,
        conversation_history: messages.filter(m => m.role === 'user' || m.role === 'assistant')
      });

      if (response.data.success) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: response.data.data.reply }
        ]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (err) {
      setError('Error connecting to AI Assistant. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <h3 className="fw-bold mb-4">AI Assistant</h3>
      <Card className="shadow-sm border-0" style={{ height: '70vh' }}>
        <Card.Body className="d-flex flex-column">
          <div className="flex-grow-1 overflow-auto mb-3 p-3 bg-light rounded">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`d-flex mb-3 ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
              >
                <div
                  className={`p-3 rounded-3 shadow-sm`}
                  style={{
                    maxWidth: '75%',
                    backgroundColor: msg.role === 'user' ? '#0d6efd' : '#ffffff',
                    color: msg.role === 'user' ? 'white' : 'black',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="d-flex justify-content-start mb-3">
                <div className="p-3 rounded-3 shadow-sm bg-white">
                  <Spinner animation="dots" size="sm" /> Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {error && <Alert variant="danger" className="py-2">{error}</Alert>}
          
          <Form onSubmit={sendMessage} className="d-flex gap-2">
            <Form.Control
              type="text"
              placeholder="Ask me about appointments, bills, or medical advice..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <Button variant="primary" type="submit" disabled={loading || !input.trim()}>
              Send
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AIChatbot;
