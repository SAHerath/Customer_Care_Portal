
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getCurrentUser } from "../services/authService";
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

const socket = io("https://localhost:7300");

interface Message {
  sender: string;
  text: string;
}

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>(""); // Current input message
  const [messages, setMessages] = useState<Message[]>([]); // Array of messages
  const currentUser = getCurrentUser();

  useEffect(() => {
    socket.on("receiveMessage", (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = { sender: currentUser, text: message };
      socket.emit("sendMessage", newMessage);

      // setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 12rem)",
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          border: "1px solid #ddd",
          borderRadius: 1.5,
          backgroundColor: "#f8f8f8",
          marginBottom: 2,
          paddingLeft: 1,
          paddingRight: 1,
        }}
      >
        <List>
          {messages.map((msg, index) => (
            <ListItem
              key={index}
              alignItems="center"
              sx={{
                marginBottom: 1,
                flexDirection: msg.sender === currentUser ? "row-reverse" : "row",
                justifyContent: msg.sender === currentUser ? "flex-end" : "flex-start",
              }}
            >
              {/* {msg.sender !== currentUser && ( */}
                <ListItemAvatar sx={{
                  display: "flex",
                  justifyContent: "center",
                }}>
                  <Avatar>
                    {msg.sender.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
              {/*  )} */}
              <ListItemText
                primary={msg.sender === currentUser ? "You" : msg.sender}
                secondary={msg.text}
                sx={{
                  textAlign: msg.sender === currentUser ? "right" : "left",
                  backgroundColor:
                    msg.sender === currentUser ? "#d1e7dd" : "#dad7f8",
                  padding: "0.5rem",
                  borderRadius: "8px",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ display: "flex", gap: 1 }}>
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
          sx={{ backgroundColor: "#9F774E" }}
          onClick={sendMessage}
        >
          Send
        </Button>
      </Box>
    </Paper>
  );
};

export default Chat;
