import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [messages]);

  const sendMessage = () => {
    socket.emit('sendMessage', message);
    setMessage('');
  };

  console.log("messages::::::",messages)

  return (
      <div style={{
          display: 'flex',
          justifyContent: 'center', // Centers horizontally
          alignItems: 'center',    // Centers vertically
          height: '100vh',         // Full viewport height
          flexDirection: 'column', // Stacks children vertically
          textAlign: 'center',     // Centers text horizontally
      }}>
        <h1>Chat Help</h1>
        <p>Please send your </p>
        <div>
          {messages.map((msg, index) => (
              <div key={index}>{msg}</div>
          ))}
        </div>
        <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
  );
}

export default App;