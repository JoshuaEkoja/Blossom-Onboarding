import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const res = await axios.post('http://localhost:5000/chat', {
        message: input,
      });

      const botReply = { role: 'assistant', content: res.data.reply };
      setMessages(prev => [...prev, botReply]);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="chat-container">
      <h2>🌸 Blossom Chatbot</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={msg.role}>
            <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="input-section">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;