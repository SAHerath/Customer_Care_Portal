import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { 
  Box,
  Paper,
  Avatar,
  Button,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

const socket = io('https://localhost:7300');

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  // const [messages, setMessages] = useState<string[]>([]);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);

  // useEffect(() => {
  //   socket.on('receiveMessage', (message) => {
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //   });

  //   return () => {
  //     socket.off('receiveMessage');
  //   };
  // }, [messages]);

  // const sendMessage = () => {
  //   socket.emit('sendMessage', message);
  //   setMessage('');
  // };

  useEffect(() => {

    socket.on('receiveMessage', (message: { sender: string; text: string }) => {
      console.log('New message received:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('sendMessage', { sender: 'Customer', text: message });
      setMessages((prevMessages) => [...prevMessages, { sender: 'You', text: message }]);
      setMessage('');
    }
  };

  return (
      <Paper
        elevation={3}
        sx={{
          padding: '2rem',
          textAlign: 'center',
          display: 'flex', 
          flexDirection: 'column', 
          height: 'calc(100vh - 12rem)',
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            padding: 1,
            border: '1px solid #ddd',
            borderRadius: 1.5,
            backgroundColor: '#fff',
            marginBottom: 2,
          }}
        >
          <List>
            {messages.map((msg, index) => (
              <ListItem key={index} alignItems="flex-start" sx={{ marginBottom: 1 }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: msg.sender === 'You' ? 'primary.main' : 'secondary.main' }}>
                    {msg.sender.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                {/* <ListItemText
                  primary={msg.sender}
                  secondary={msg.text}
                  primaryTypographyProps={{ fontWeight: msg.sender === 'You' ? 'bold' : 'normal' }}
                /> */}
                <ListItemText
                  primary={msg.sender}
                  secondary={msg.text}
                  slotProps={{
                    primary: { variant: 'h6', color: 'primary' },
                    secondary: { variant: 'body2', color: 'textSecondary' },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button 
            variant="contained"
            sx={{ backgroundColor: "#9F774E", }}
            onClick={sendMessage}>
            Send
          </Button>
        </Box>
      </Paper>    

  );
};

export default Chat;
