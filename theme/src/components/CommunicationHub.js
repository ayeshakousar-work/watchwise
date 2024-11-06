// src/components/CommunicationHub.js
import React, { useState } from 'react';
import { Typography, TextField, Button, Paper, Grid, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import './CommunicationHub.css';

const CommunicationHub = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  const handleSendEmail = () => {
    alert(`Email sent to: ${email}\nSubject: ${subject}\nMessage: ${message}`);
    setEmail('');
    setSubject('');
    setMessage('');
  };

  const handleToggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, chatInput]);
      setChatInput('');
    }
  };

  return (
    <div className="communication-hub">
      <Typography variant="h4" align="center" className="hub-title">
        Communication Hub
      </Typography>
      <Paper elevation={3} className="email-form">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Recipient's Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-field"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Subject"
              variant="outlined"
              fullWidth
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="form-field"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              variant="outlined"
              multiline
              rows={6}
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form-field"
            />
          </Grid>
          <Grid item xs={12} className="button-container">
            <Button
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
              onClick={handleSendEmail}
              className="send-button"
            >
              Send Email
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Chat Box */}
      {chatOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <Typography variant="h6">Live Chat</Typography>
            <IconButton onClick={handleToggleChat} className="chat-toggle-button">
              <CloseIcon />
            </IconButton>
          </div>
          <div className="chat-content">
            <div className="chat-messages">
              {chatMessages.map((msg, index) => (
                <div key={index} className="chat-message">
                  {msg}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <TextField
                placeholder="Type a message..."
                variant="outlined"
                fullWidth
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <IconButton onClick={handleSendMessage} color="primary">
                <SendIcon />
              </IconButton>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Toggle Button */}
      <IconButton onClick={handleToggleChat} className="floating-chat-toggle">
  <ChatIcon fontSize="large" />
</IconButton>

    </div>
  );
};

export default CommunicationHub;
