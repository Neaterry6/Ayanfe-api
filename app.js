<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VANEA ChatBot</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background: url('https://i.imgur.com/K4hhnOn.jpeg') no-repeat center center fixed;
      background-size: cover;
      overflow: hidden;
    }

    .login-container, .signup-container, .chat-container {
      display: none;
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.8);
      border-radius: 10px;
      color: #fff;
      text-align: center;
    }

    .login-container.active, .signup-container.active, .chat-container.active {
      display: flex;
    }

    .input-field {
      width: 90%;
      max-width: 300px;
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
      height: calc(100vh - 150px);
      overflow-y: auto;
      border: 1px solid #555;
      padding: 10px;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 5px;
      margin-bottom: 20px;
      width: 90%;
      max-width: 300px;
    }

    .message {
      margin: 10px 0;
      padding: 10px;
      border-radius: 5px;
      word-break: break-word;
    }

    .user-message {
      background: #1a73e8;
      color: #fff;
      text-align: right;
    }

    .bot-message {
      background: #444;
      color: #fff;
      text-align: left;
    }

    .chat-input {
      display: flex;
      width: 90%;
      max-width: 300px;
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
      padding: 10px;
      background: #00ff00;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      color: #000;
      font-size: 16px;
    }
    .chat-input button:focus {
      outline: none;
    }
    .chat-input button::before {
      content: "\2709";
      font-size: 18px;
    }

    .tabs {
      display: flex;
      margin-bottom: 20px;
    }

    .tab {
      padding: 10px 20px;
      cursor: pointer;
      border: 1px solid #fff;
      border-bottom: none;
      background-color: #00ff00;
      color: #000;
      margin-right: 10px;
    }

    .tab.active {
      border-bottom: 2px solid #00ff00;
    }
  </style>
</head>
<body>
  <div class="login-container active" id="login-container">
    <h2>Welcome to VANEA</h2>
    <div class="tabs">
      <div class="tab active" id="login-tab">Login</div>
      <div class="tab" id="signup-tab">Sign Up</div>
    </div>
    <div id="login-content">
      <p>Please log in to continue.</p>
      <input type="email" id="email" class="input-field" placeholder="Enter your email" />
      <input type="password" id="password" class="input-field" placeholder="Enter your password" />
      <button class="btn" id="login-btn">Login</button>
    </div>
    <div id="signup-content" style="display: none;">
      <p>Please sign up if you are new.</p>
      <input type="email" id="newEmail" class="input-field" placeholder="Enter your email" />
      <input type="password" id="newPassword" class="input-field" placeholder="Enter your password" />
      <button class="btn" id="signup-btn">Sign Up</button>
    </div>
  </div>

  <div class="chat-container" id="chat-container">
    <h2>VANEA ChatBot</h2>
    <div class="chat-messages" id="chat-messages"></div>
    <div class="chat-input">
      <input type="text" id="chat-input" placeholder="Type your message..." />
      <button id="send-btn"></button>
    </div>
  </div>

  <script>
    const loginContainer = document.getElementById('login-container');
    const chatContainer = document.getElementById('chat-container');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const newEmailInput = document.getElementById('newEmail');
    const newPasswordInput = document.getElementById('newPassword');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginContent = document.getElementById('login-content');
    const signupContent = document.getElementById('signup-content');

    loginBtn.addEventListener('click', () => {
      const emailValue = emailInput.value.trim();
      const passwordValue = passwordInput.value.trim();
      if (emailValue && passwordValue) {
        fetch('/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailValue, password: passwordValue }),
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Login failed');
            }
          })
          .then(data => {
            localStorage.setItem('uid', data.uid);
            localStorage.setItem('username', data.username);
            loginContainer.classList.remove('active');
            chatContainer.classList.add('active');
          })
          .catch(error => {
            console.error('Error:', error);
            alert('Login failed. Please check your credentials.');
          });
      }
    });

    signupBtn.addEventListener('click', () => {
      const newEmailValue = newEmailInput.value.trim();
      const newPasswordValue = newPasswordInput.value.trim();
      if (newEmailValue && newPasswordValue) {
        fetch('/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: newEmailValue, password: newPasswordValue }),
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Signup failed');
            }
          })
          .then(data => {
            localStorage.setItem('uid', data.uid);
            localStorage.setItem('username', data.username);
            loginContainer.classList.remove('active');
            chatContainer.classList.add('active');
          })
          .catch(error => {
            console.error('Error:', error);
            alert('Signup failed. Please try again.');
          });
      }
    });

    const sendMessage = () => {
      const message = chatInput.value.trim();
      if (!message) return;

      const userMessage = document.createElement('div');
      userMessage.classList.add('message', 'user-message');
      userMessage.textContent = message;
      chatMessages.appendChild(userMessage);

      chatInput.value = '';

      fetch('/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: message, uid: localStorage.getItem('uid') }),
      })
        .then(response => response.json())
        .then(data => {
          const botMessage = document.createElement('div');
          botMessage.classList.add('message', 'bot-message');
          botMessage.textContent = data.answer;
          chatMessages.appendChild(botMessage);

          chatMessages.scrollTop = chatMessages.scrollHeight;
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });

    loginTab.addEventListener('click', () => {
      loginTab.classList.add('active');
      signupTab.classList.remove('active');
      loginContent.style.display = 'block';
      signupContent.style.display = 'none';
    });

    signupTab.addEventListener('click', () => {
      signupTab.classList.add('active');
      loginTab.classList.remove('active');
      signupContent.style.display = 'block';
      loginContent.style.display = 'none';
    });
  </script>
</body>
</html>
