import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, CircularProgress } from '@mui/material';
import { sendMessageToChatbot, searchProducts } from '../services/api';

const Chatbot = ({ userSession }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle sending message
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = { user: 'user', text: message };
    setChatHistory([...chatHistory, newMessage]);
    setLoading(true);
    setMessage('');

    try {
      const chatbotResponse = await sendMessageToChatbot(message, userSession);
      const botMessage = { user: 'bot', text: chatbotResponse.reply };
      setChatHistory([...chatHistory, newMessage, botMessage]);

      // Optionally search for products after the bot responds
      const products = await searchProducts(message, userSession);
      if (products.length) {
        const productList = products.map(product => `${product.name} - $${product.price}`);
        const productMessage = { user: 'bot', text: `Here are some products: ${productList.join(', ')}` };
        setChatHistory(prev => [...prev, productMessage]);
      }
    } catch (error) {
      setChatHistory(prev => [...prev, { user: 'bot', text: 'Sorry, something went wrong.' }]);
    }
    setLoading(false);
  };

  return (
    <Box>
      <div className="chat-box">
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={msg.user}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <TextField
        label="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={handleSendMessage} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Send'}
      </Button>
    </Box>
  );
};

export default Chatbot;
