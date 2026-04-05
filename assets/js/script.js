// These are the DOM elements we'll need to interact with.

const questionsEl = document.querySelector("#questions");
const timerEl = document.querySelector("#time");
const choicesEl = document.querySelector("#choices");
const submitBtn = document.querySelector("#submit");
const startBtn = document.querySelector("#start");
const initialsEl = document.querySelector("#initials");
const feedbackEl = document.querySelector("#feedback");

// There are the variables we'll need to keep track of for when the quiz is active.
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;


function startQuiz() {
    // Hide the start screen, then unhide the questions screen.
    let startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");

    // Start the timer. Remember that this is in milliseconds!!
    timerId = setInterval(ClockTimer, 1000);
    timerEl.textContent = time;
    getQuestion();
}

function getQuestion() {
    // Get the current question from the questions array.
    let currentQuestion = questions[currentQuestionIndex];

    // Update the text of the question screen with the current question.
    let titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;

    // Clear out old choices.
    choicesEl.innerHTML = "";

    // Loop through each choice
    currentQuestion.choices.forEach(function(choice, i) {
        // create new button for each choice
        let choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);

        choiceNode.textContent = i + 1 + ". " + choice;

        // attach click event listener to each choice
        choiceNode.addEventListener('click', questionClick);

        // display on the page
        choicesEl.appendChild(choiceNode);
    });
}

function questionClick(event) {
    // Did user guess the correct answer?
    if (event.target.value !== questions[currentQuestionIndex].answer) {
        // IF not, remove an extra 15 seconds from the timer.
        time -= 15;

        if (time < 0) {
            time = 0;
        }
        // This puts the new time on the timer.
        timerEl.textContent = time;
        feedbackEl.textContent = 'Incorrect!';
        feedbackEl.style.color = 'red';
        feedbackEl.style.fontSize = '300%';
    } else {
        feedbackEl.textContent = 'Correct!';
        feedbackEl.style.color = 'green';
        feedbackEl.style.fontSize = '300%';
    }

    // This will give the answer feedback to the user.
    feedbackEl.setAttribute('class', 'feedback');
    setTimeout(function() {
        feedbackEl.setAttribute('class', 'feedback hide');
    }, 1000);

    // Goes to the next question.
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

function quizEnd() {
    // Stop the timer.
    clearInterval(timerId);

    // Show the end screen.
    let endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');

    // Show the final score.
    let finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;

    // Hide the questions screen.
    questionsEl.setAttribute('class', 'hide');

}

function ClockTimer() {
    // Update the timer.
    time--;
    timerEl.textContent = time;

    // Is the user out of time? This will check that.
    if (time <= 0) {
        quizEnd();
    }
}

function saveHighScore() {
    // Get the initials from the user.
    let initials = initialsEl.value.trim();

    // Get the high scores from local storage, if they don't exist, create an empty array.
    if (initials !== "") {
        let highScores = JSON.parse(window.localStorage.getItem('highscores')) || [];

        // If they do exist, add the user's initials to the high scores array.
        let newScore = {
            score: time,
            initials: initials
        };

        // Save the initials to local storage. Then redirect to the highscores.html page.

        highScores.push(newScore);
        window.localStorage.setItem('highscores', JSON.stringify(highScores));
        window.location.href = 'highscores.html';
    }
}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighScore();
    }
}

submitBtn.addEventListener('click', saveHighScore);

startBtn.addEventListener('click', startQuiz);

initialsEl.addEventListener('keydown', checkForEnter);