<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VANEA AI ❣️🌺</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: url('https://i.imgur.com/K4hhnOn.jpeg') no-repeat center center fixed;
      background-size: cover;
    }

    .container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .login-container, .chat-container {
      display: none;
      width: 90%;
      max-width: 600px;
      height: 90%;
      padding: 20px;
      background: rgba(0, 0, 0, 0.8);
      border-radius: 10px;
      text-align: center;
      color: #fff;
    }

    .login-container.active, .chat-container.active {
      display: flex;
      flex-direction: column;
    }

    .input-field {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border: none;
      border-radius: 5px;
      font-size: 16px;
    }

    .btn {
      padding: 10px 20px;
      background: #00ff00;
      color: #000;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }

    .btn:hover {
      background: #00cc00;
    }

    .chat-messages {
      flex-grow: 1;
      overflow-y: auto;
      border: 1px solid #555;
      padding: 10px;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 5px;
      margin-bottom: 20px;
    }

    .message {
      margin: 10px 0;
      padding: 10px;
      border-radius: 5px;
      position: relative;
    }

    .user-message {
      background: #1a73e8;
      color: #333333; /* Changed user message color to light black */
      text-align: right;
    }

    .bot-message {
      background: #444;
      color: #fff;
      text-align: left;
    }

    .copy-btn {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      padding: 5px 10px;
      background: #00ff00;
      color: #000;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 12px;
    }

    .copy-btn:hover {
      background: #00cc00;
    }

    .chat-input {
      display: flex;
      gap: 10px;
    }

    .chat-input input {
      flex-grow: 1;
      padding: 10px;
      border-radius: 5px;
      border: none;
      background: #333;
      color: #fff;
    }

    .chat-input button {
      padding: 10px 20px;
      background: transparent;
      border: none;
      cursor: pointer;
    }

    .chat-input button img {
      width: 24px;
      height: 24px;
    }

    .links {
      margin-top: 20px;
    }

    .links a {
      display: block;
      color: #fff;
      text-decoration: none;
      margin: 10px 0;
      font-size: 16px;
    }

    .links a:hover {
      color: #00ff00;
    }
  </style>
</head>
<body>
  <!-- Login Screen -->
  <div class="container">
    <div class="login-container active" id="login-container">
      <h2>Welcome to VANEA</h2>
      <p>Please log in to continue.</p>
      <input type="text" id="username" class="input-field" placeholder="Enter your username" />
      <button class="btn" id="login-btn">Login</button>
    </div>

    <!-- Chat Screen -->
    <div class="chat-container" id="chat-container">
      <h2>VANEA AI 🌺❣️</h2>
      <div class="chat-messages" id="chat-messages"></div>
      <div class="chat-input">
        <input type="text" id="chat-input" placeholder="Type your message..." />
        <button id="send-btn">
          <img src="https://img.icons8.com/material-outlined/24/000000/send.png" alt="Send">
        </button>
      </div>

      <!-- Links Section -->
      <div class="links">
        <a href="https://www.facebook.com/profile.php?id=100090443419982" target="_blank">Visit my Facebook Profile</a>
        <a href="https://wa.me/2348039896597" target="_blank">Contact me on WhatsApp</a>
        <a href="https://whatsapp.com/channel/0029VaszFrk3LdQLKvzM8B1Y" target="_blank">Follow the VANEA💜🫂&SUPERMAN🌹🦋 channel on WhatsApp</a>
      </div>
    </div>
  </div>

  <script>
    const loginContainer = document.getElementById('login-container');
    const chatContainer = document.getElementById('chat-container');
    const loginBtn = document.getElementById('login-btn');
    const usernameInput = document.getElementById('username');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');

    let uid = localStorage.getItem('uid'); // Save user ID persistently
    let username = localStorage.getItem('username');

    // Show login screen if not logged in
    if (!uid || !username) {
      loginContainer.classList.add('active');
      chatContainer.classList.remove('active'); // Ensure chat is hidden until login
    } else {
      chatContainer.classList.add('active');
      loginContainer.classList.remove('active'); // Hide login screen after successful login
    }

    // Handle login
    loginBtn.addEventListener('click', () => {
      const usernameValue = usernameInput.value.trim();
      if (usernameValue) {
        uid = Math.random().toString(36).substring(2, 15); // Generate unique ID
        username = usernameValue;

        localStorage.setItem('uid', uid);
        localStorage.setItem('username', username);

        loginContainer.classList.remove('active');
        chatContainer.classList.add('active');
      }
    });

    // Copy message to clipboard
    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    };

    // Send message
    const sendMessage = () => {
      const message = chatInput.value.trim();
      if (!message) return;

      // Append user message to chat
      const userMessage = document.createElement('div');
      userMessage.classList.add('message', 'user-message');
      userMessage.textContent = message;
      chatMessages.appendChild(userMessage);

      chatInput.value = '';

      // Send message to server
      fetch('/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: message, uid }),
      })
        .then(response => response.json())
        .then(data => {
          // Append bot response to chat
          const botMessage = document.createElement('div');
          botMessage.classList.add('message', 'bot-message');
          botMessage.textContent = data.answer;

          // Add copy button
          const copyButton = document.createElement('button');
          copyButton.classList.add('copy-btn');
          copyButton.textContent = 'Copy';
          copyButton.addEventListener('click', () => copyToClipboard(data.answer));
          botMessage.appendChild(copyButton);

          chatMessages.appendChild(botMessage);
          chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the bottom
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  </script>
</body>
</html>
