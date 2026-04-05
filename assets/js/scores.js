function printHighScores() {

    // Get the high scores from local storage or the array
    let highScores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    // Sort the scores in descending order
    highScores.sort(function (a, b) {
        return b.score - a.score;
    });

    // Cache the ol element once before looping
    const olEl = document.getElementById("highscores");

    highScores.forEach(function (score) {

        // Create a new li tag for each high score
        let liTag = document.createElement("li");
        liTag.textContent = score.initials + " - " + score.score;

        // Append the new li tag to the ol element and display on page
        olEl.appendChild(liTag);
    });
}

function clearHighScores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}

document.getElementById("clear").onclick = clearHighScores;

// Run the function when the page loads
printHighScores();
