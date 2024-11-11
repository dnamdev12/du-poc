import React, { useState } from 'react';

function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleSendText = () => {
    if (text.trim()) {
      setMessages([...messages, { type: 'text', content: text }]);
      setText('');
    }
  };

  const handleSendImage = () => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMessages([...messages, { type: 'image', content: reader.result }]);
      };
      reader.readAsDataURL(image);
      setImage(null);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div key={index} style={styles.message}>
            {msg.type === 'text' ? (
              <p style={styles.textMessage}>{msg.content}</p>
            ) : (
              <img src={msg.content} alt="Sent" style={styles.imageMessage} />
            )}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.textInput}
        />
        <button onClick={handleSendText} style={styles.sendButton}>Send</button>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={styles.fileInput}
        />
        <button onClick={handleSendImage} style={styles.sendButton}>Send Image</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '500px',
    margin: 'auto',
    height: '100vh',
    boxSizing: 'border-box',
    padding: '10px',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '10px',
    border: '1px solid #ddd',
    marginBottom: '10px',
    height: '80vh',
    boxSizing: 'border-box',
  },
  message: {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  textMessage: {
    padding: '8px',
    borderRadius: '8px',
    backgroundColor: '#e1ffc7',
    maxWidth: '80%',
    wordWrap: 'break-word',
  },
  imageMessage: {
    width: '100%',
    maxWidth: '200px',
    borderRadius: '8px',
    margin: '5px 0',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '5px',
    padding: '10px 0',
    borderTop: '1px solid #ddd',
    width: '100%',
  },
  textInput: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  fileInput: {
    display: 'none',
  },
  sendButton: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontSize: '0.9em',
  },
};

export default ChatScreen;
