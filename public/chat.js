const socket = io();

const chatForm = document.getElementById('chat-form');
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    if (message) {
        socket.emit('chatMessage', message);

        if (message.includes('@Vanea')) {
            socket.emit('aiMessage', message);
        }

        messageInput.value = '';
    }
});

socket.on('message', (message) => {
    displayMessage(message);
});

function displayMessage(message) {
    const p = document.createElement('p');
    p.textContent = message;
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;
}
``
