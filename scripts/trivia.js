document.addEventListener("DOMContentLoaded", () => {
    const triviaContainer = document.getElementById("trivia-container");

    // Fetch trivia questions from the API
    fetch("https://opentdb.com/api.php?amount=10&category=28&difficulty=easy&encode=base64")
        .then(response => response.json())
        .then(data => {
            const questions = data.results.map(item => ({
                question: atob(item.question),
                correctAnswer: atob(item.correct_answer),
                incorrectAnswers: item.incorrect_answers.map(ans => atob(ans))
            }));

            // Display the questions
            triviaContainer.innerHTML = questions.map((q, index) => `
                <div class="trivia-question">
                    <p><strong>Q${index + 1}:</strong> ${q.question}</p>
                    <p><em>Answer:</em> ${q.correctAnswer}</p>
                </div>
            `).join("");
        })
        .catch(error => {
            console.error("Error fetching trivia questions:", error);
            triviaContainer.innerHTML = "<p>Failed to load trivia questions. Please try again later.</p>";
        });
});
