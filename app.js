document.addEventListener("DOMContentLoaded", () => {
    const questionEl = document.getElementById("riddle-question");
    const answerEl = document.getElementById("riddle-answer");
    const showAnswerBtn = document.getElementById("show-answer-btn");
    const getRiddleBtn = document.getElementById("get-riddle-btn");
    const nextRiddleBtn = document.getElementById("next-riddle-btn");
    const homeBtn = document.getElementById("home-btn");
    const homeScreen = document.getElementById("home-screen");

    const feedbackCorrectPage = document.getElementById("feedback-correct-page");
    const feedbackRatingsPage = document.getElementById("feedback-ratings-page");
    const nextFeedbackBtn = document.getElementById("next-feedback-btn");

    const congratsMsg = document.getElementById("congrats-message");
    const cheerupMsg = document.getElementById("cheerup-message");

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
                feedbackCorrectPage.classList.add("hidden");
                feedbackRatingsPage.classList.add("hidden");
                homeBtn.style.display = "inline-block";
            });
    });

    showAnswerBtn.addEventListener("click", () => {
        answerEl.style.display = "block";
        showAnswerBtn.style.display = "none";
        feedbackCorrectPage.classList.remove("hidden");
        homeBtn.classList.remove("hidden");
    });

    nextFeedbackBtn.addEventListener("click", () => {
        const correctVal = document.querySelector("input[name='feedback-correct']:checked").value;
        feedbackCorrectPage.classList.add("hidden");
        feedbackRatingsPage.classList.remove("hidden");
    });

    nextRiddleBtn.addEventListener("click", () => {
        const correct = parseInt(document.querySelector("input[name='feedback-correct']:checked").value);
        const challenge = parseInt(document.getElementById("feedback-challenge").value);
        const enjoyment = parseInt(document.getElementById("feedback-enjoyment").value);

        if (!currentRiddle) return;

        fetch("/feedback-dummy", {
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
            fetch("/riddle")
                .then(response => response.json())
                .then(data => {
                    currentRiddle = data;
                    questionEl.textContent = data.question;
                    answerEl.style.display = "none";
                    answerEl.textContent = data.answer;
                    showAnswerBtn.style.display = "inline-block";
                    feedbackCorrectPage.classList.add("hidden");
                    feedbackRatingsPage.classList.add("hidden");
                    homeBtn.style.display = "inline-block";
                });
        });
    });

    homeBtn.addEventListener("click", () => {
        questionEl.textContent = "Click 'Get Riddle' to start!";
        answerEl.textContent = "";
        answerEl.style.display = "none";
        showAnswerBtn.style.display = "none";
        getRiddleBtn.style.display = "inline-block";
        homeBtn.style.display = "none";
        homeScreen.classList.remove("hidden");
        feedbackCorrectPage.classList.add("hidden");
        feedbackRatingsPage.classList.add("hidden");
    });

    homeScreen.classList.remove("hidden");
});