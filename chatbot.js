
let questions = [
    {
        question: "Do you feel happy?",
        options: {
            a: "Yes",
            b: "No"
        },
        correctAnswer: "a",
        correctResponse: "Super!",
        incorrectResponse: "I am sorry"
    },

    {
        question: "Did you eat this morning?",
        options: {
            a: "Yes",
            b: "No"
        },
        correctAnswer: "a",
        correctResponse: "Perfect! That's a healthy habit!",
        incorrectResponse: "Breakfast is very important. Please remember to have it next time."
    },

    {
        question: "Is it sunny today?",
        options: {
            a: "Yes",
            b: "No"
        },
        correctAnswer: "a",
        correctResponse: "That's nice!",
        incorrectResponse: "Hopefully nice weather will come soon."
    }
];

let currentQuestionIndex = 0;
let chatContainer = document.getElementById("chat-container");
let chatForm = document.getElementById("chat-form");
let userInput = document.getElementById("user-input");
displayQuestion();


function displayQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let optionsHTML = Object.keys(currentQuestion.options).map(key => `${key}. ${currentQuestion.options[key]}`).join(' ');

    let botResponse = document.createElement("div");
    botResponse.classList.add("message");
    botResponse.innerHTML = `<strong>CHATBOT:</strong> ${currentQuestion.question} ${optionsHTML}`;
    chatContainer.appendChild(botResponse);
}

function scrollChatContainerToBottom() {
    let chatContainer = document.getElementById("chat-container");
    chatContainer.scrollTop = chatContainer.scrollHeight;
}


chatForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let userResponse = userInput.value.toLowerCase();

    let userMessage = document.createElement("div");
    userMessage.classList.add("message");
    userMessage.innerHTML = `<strong>USER:</strong> ${userResponse}`;
    chatContainer.appendChild(userMessage);

    let currentQuestion = questions[currentQuestionIndex];
    let botResponse = document.createElement("div");
    botResponse.classList.add("message");
    botResponse.innerHTML = `<strong>CHATBOT :</strong> `;
    if (userResponse === currentQuestion.correctAnswer) {
        botResponse.innerHTML += currentQuestion.correctResponse;
    } else {
        botResponse.innerHTML += currentQuestion.incorrectResponse;
    }
    chatContainer.appendChild(botResponse);

    currentQuestionIndex = (currentQuestionIndex + 1 ) % questions.length;
    userInput.value = "";
    displayQuestion();

    scrollChatContainerToBottom();
});