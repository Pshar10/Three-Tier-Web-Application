document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.fade-up');

    window.addEventListener('scroll', function() {
        elements.forEach(function(element) {
            let position = element.getBoundingClientRect().top;
            let windowHeight = window.innerHeight;

            if (position < windowHeight - 100) {
                console.log('Adding active class to:', element);
                element.classList.add('active');
            }
        });
    });
});








document.addEventListener("DOMContentLoaded", function () {
    const chatButton = document.getElementById("chat-button");
    const chatWindow = document.getElementById("chat-window");
    const closeChat = document.getElementById("close-chat");
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");
    const chatBody = document.getElementById("chat-body");

    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    chatButton.addEventListener("click", function () {
        chatWindow.style.display = "block";
    });

    closeChat.addEventListener("click", function () {
        chatWindow.style.display = "none";
    });

    let userName = "";
    let userEmail = "";
    let userMessage = "";
    let isConfirmingMessage = false;

    chatForm.addEventListener("submit", handleFormSubmit);

    function handleFormSubmit(e) {
        e.preventDefault();
        const userInput = chatInput.value.trim();

        if (userInput) {
            if (!userName) {
                userName = userInput;
                updateChat(`<p>You: ${userName}</p><p>Bot: Nice to meet you, ${userName}! Could you please provide your email?</p>`);
            } else if (!userEmail) {
                if (isValidEmail(userInput)) {
                    userEmail = userInput;
                    updateChat(`<p>You: ${userEmail}</p><p>Bot: Thank you! What's the message you would like to send?</p>`);
                } else {
                    updateChat(`<p>You: ${userInput}</p><p>Bot: Hmm, that doesn't look like a valid email. Could you please try again?</p>`);
                }
            } else if (!isConfirmingMessage) {
                userMessage = userInput;
                updateChat(`<p>You: ${userMessage}</p><p>Bot: Would you like to send this message?</p>`, addConfirmButtons);
                isConfirmingMessage = true;
                chatForm.querySelector("button").disabled = true;
            }
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function addConfirmButtons() {
        chatBody.innerHTML += `<div id="confirm-buttons">
                                    <button id="yes-button">Yes</button>
                                    <button id="no-button">No</button>
                               </div>`;
        document.getElementById("yes-button").addEventListener("click", sendMessageAndShowSuccess);
        document.getElementById("no-button").addEventListener("click", askDeleteOrEdit);
    }

    function sendMessageAndShowSuccess() {
        fetch("/submit/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken
            },
            body: JSON.stringify({ name: userName, email: userEmail, message: userMessage })
        })
            .then(response => response.json())
            .then(result => {
                const responseMessage = result.status === "success"
                    ? "Great! Your message has been sent successfully."
                    : `Oh no, there was an error: ${result.message}`;
                updateChat(`<p>Bot: ${responseMessage}</p>`, resetChat);
            })
            .catch(error => {
                console.error("Error sending message:", error);
                updateChat("<p>Bot: There was an error sending your message. Please try again.</p>");
            });
    }

    function askDeleteOrEdit() {
        document.getElementById("confirm-buttons").remove();
        updateChat(`<p>Bot: Would you like to edit your message, or start over?</p>`, addEditOptions);
    }

    function addEditOptions() {
        chatBody.innerHTML += `<div id="edit-buttons">
                                    <button id="delete-button">Start Over</button>
                                    <button id="edit-button">Edit Message</button>
                               </div>`;
        document.getElementById("delete-button").addEventListener("click", resetChat);
        document.getElementById("edit-button").addEventListener("click", function () {
            updateChat("<p>Bot: Please edit your message below:</p>");
            chatInput.value = userMessage;
            chatForm.querySelector("button").disabled = false;
            isConfirmingMessage = false; // Reset confirmation state
        });
    }

    function resetChat() {
        setTimeout(() => {
            chatBody.innerHTML = "<p>Bot: Hello! What’s your name?</p>";
            userName = "";
            userEmail = "";
            userMessage = "";
            isConfirmingMessage = false;
            chatForm.querySelector("button").disabled = false;
            chatInput.value = ""; // Clear input field
        }, 1500);
    }

    function updateChat(html, callback) {
        chatBody.innerHTML += html;
        chatInput.value = ""; // Clear input field for new input
        if (callback) callback();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`; // Use clientX to handle fixed position
        cursor.style.top = `${e.clientY}px`;  // Use clientY to handle fixed position
    });

    document.addEventListener('mousedown', () => {
        cursor.classList.add('click-effect');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click-effect');
    });
});