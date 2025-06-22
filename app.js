document.addEventListener("DOMContentLoaded", () => {
    const questionEl = document.getElementById("riddle-question");
    const answerEl = document.getElementById("riddle-answer");
    const showAnswerBtn = document.getElementById("show-answer-btn");
    const getRiddleBtn = document.getElementById("get-riddle-btn");
    const feedbackForm = document.getElementById("feedback-form");
    const nextRiddleBtn = document.getElementById("next-riddle-btn");
    const homeBtn = document.getElementById("home-btn");
    const homeScreen = document.getElementById("home-screen");

    let currentRiddle = null;

    homeBtn.style.display = "none";

    getRiddleBtn.addEventListener("click", () => {
        homeScreen.classList.add("hidden");
        fetch("/riddle")
            .then(response => response.json())
            .then(data => {
                currentRiddle = data;
                questionEl.textContent = data.question;
                answerEl.style.display = "none";
                answerEl.textContent = data.answer;
                showAnswerBtn.style.display = "inline-block";
                feedbackForm.style.display = "none";
                homeBtn.style.display = "inline-block";
            });
    });

    showAnswerBtn.addEventListener("click", () => {
        answerEl.style.display = "block";
        feedbackForm.style.display = "block";
        showAnswerBtn.style.display = "none";
        homeBtn.classList.remove("hidden");
    });

    nextRiddleBtn.addEventListener("click", () => {
        const correct = parseInt(document.getElementById("feedback-correct").value);
        const challenge = parseInt(document.getElementById("feedback-challenge").value);
        const enjoyment = parseInt(document.getElementById("feedback-enjoyment").value);

        if (!currentRiddle) return;

        fetch("/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type: currentRiddle.type,
                correct: correct,
                challenge: challenge,
                enjoyment: enjoyment
            })
        }).then(() => {
            // Immediately fetch and display the next riddle
            fetch("/riddle")
                .then(response => response.json())
                .then(data => {
                    currentRiddle = data;
                    questionEl.textContent = data.question;
                    answerEl.style.display = "none";
                    answerEl.textContent = data.answer;
                    feedbackForm.style.display = "none";
                    showAnswerBtn.style.display = "inline-block";
                    homeBtn.style.display = "inline-block";
                });
        });
    });

    homeBtn.addEventListener("click", () => {
        questionEl.textContent = "Click 'Get Riddle' to start!";
        answerEl.textContent = "";
        answerEl.style.display = "none";
        feedbackForm.style.display = "none";
        showAnswerBtn.style.display = "none";
        getRiddleBtn.style.display = "inline-block";
        homeBtn.style.display = "none";
        homeScreen.classList.remove("hidden");
    });

    homeScreen.classList.remove("hidden");
});