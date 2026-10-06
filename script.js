const questions = [

    {
        category: "JavaScript",
        difficulty: "easy",

        question:
        "Which method converts a JSON string into a JavaScript object?",

        options: [
            "JSON.parse()",
            "JSON.stringify()",
            "Object.parse()",
            "JSON.convert()"
        ],

        answer: 0,

        explanation:
        "JSON.parse() converts a JSON string into a JavaScript object."
    },


    {
        category: "CSS",
        difficulty: "easy",

        question:
        "Which CSS property creates rounded corners?",

        options: [
            "border-style",
            "corner-radius",
            "border-radius",
            "radius"
        ],

        answer: 2,

        explanation:
        "border-radius is used to create rounded corners."
    },


    {
        category: "HTML",
        difficulty: "easy",

        question:
        "Which semantic element is used for navigation links?",

        options: [
            "<section>",
            "<nav>",
            "<aside>",
            "<links>"
        ],

        answer: 1,

        explanation:
        "The <nav> element represents navigation links."
    },


    {
        category: "JavaScript",
        difficulty: "hard",

        question:
        "What does event.preventDefault() do?",

        options: [
            "Stops JavaScript",
            "Stops the default browser action",
            "Removes the event listener",
            "Reloads the page"
        ],

        answer: 1,

        explanation:
        "preventDefault() prevents the browser's default action."
    },


    {
        category: "CSS",
        difficulty: "hard",

        question:
        "What does display: grid mainly provide?",

        options: [
            "A 2D layout system",
            "Image compression",
            "API calls",
            "Text encryption"
        ],

        answer: 0,

        explanation:
        "CSS Grid provides a two-dimensional layout system."
    },


    {
        category: "JavaScript",
        difficulty: "hard",

        question:
        "Which keyword creates a block-scoped variable that can be reassigned?",

        options: [
            "const",
            "var",
            "let",
            "static"
        ],

        answer: 2,

        explanation:
        "let creates a block-scoped variable that can be reassigned."
    },


    {
        category: "HTML",
        difficulty: "easy",

        question:
        "Which attribute provides alternative text for an image?",

        options: [
            "title",
            "alt",
            "srcset",
            "label"
        ],

        answer: 1,

        explanation:
        "The alt attribute provides alternative text for an image."
    },


    {
        category: "JavaScript",
        difficulty: "hard",

        question:
        "Which function runs code after a specified delay?",

        options: [
            "delay()",
            "setTimeout()",
            "wait()",
            "after()"
        ],

        answer: 1,

        explanation:
        "setTimeout() executes a function after a specified delay."
    },


    {
        category: "CSS",
        difficulty: "hard",

        question:
        "Which unit is relative to the root element's font size?",

        options: [
            "em",
            "rem",
            "vh",
            "%"
        ],

        answer: 1,

        explanation:
        "rem is relative to the root element's font size."
    },


    {
        category: "JavaScript",
        difficulty: "hard",

        question:
        "What is a Promise mainly used to represent?",

        options: [
            "A CSS animation",
            "A future asynchronous result",
            "A DOM element",
            "A loop"
        ],

        answer: 1,

        explanation:
        "A Promise represents the future result of an asynchronous operation."
    },


    {
        category: "HTML",
        difficulty: "easy",

        question:
        "Which element creates a clickable button?",

        options: [
            "<click>",
            "<button>",
            "<action>",
            "<press>"
        ],

        answer: 1,

        explanation:
        "The semantic <button> element creates a clickable button."
    },


    {
        category: "CSS",
        difficulty: "easy",

        question:
        "Which property changes text color?",

        options: [
            "font-color",
            "text-color",
            "color",
            "foreground"
        ],

        answer: 2,

        explanation:
        "The CSS color property changes text color."
    }

];


let quiz = [];

let currentQuestion = 0;

let score = 0;

let streak = 0;

let bestStreak = 0;

let selectedLevel = "mixed";

let timer;

let timeLeft = 20;

let totalTime = 0;

let correctAnswers = 0;

let soundOn = true;

let answers = [];


const startScreen =
document.getElementById("startScreen");

const quizScreen =
document.getElementById("quizScreen");

const resultScreen =
document.getElementById("resultScreen");


const question =
document.getElementById("question");

const options =
document.getElementById("options");

const questionNo =
document.getElementById("questionNo");

const bigNumber =
document.getElementById("bigNumber");

const category =
document.getElementById("category");

const scoreElement =
document.getElementById("score");

const streakElement =
document.getElementById("streak");

const timerElement =
document.getElementById("timer");

const progressBar =
document.getElementById("progressBar");

const feedback =
document.getElementById("feedback");

const nextBtn =
document.getElementById("nextBtn");


/* Difficulty */

document.querySelectorAll(".level")
.forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".level")
        .forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        selectedLevel =
            button.dataset.level;

        beep(400, 0.05);
    });

});


/* Sound */

document
.getElementById("soundBtn")
.addEventListener("click", () => {

    soundOn = !soundOn;

    document.getElementById("soundBtn")
    .textContent =
        soundOn ? "🔊" : "🔇";

});


/* Theme */

document
.getElementById("themeBtn")
.addEventListener("click", () => {

    document.body.classList.toggle("light");

});


/* Start */

document
.getElementById("startBtn")
.addEventListener("click", startQuiz);


function startQuiz() {

    let pool;

    if (selectedLevel === "mixed") {

        pool = [...questions];

    } else {

        pool =
            questions.filter(
                q => q.difficulty === selectedLevel
            );

    }


    pool.sort(() => Math.random() - 0.5);


    quiz = pool.slice(0, 10);


    if (quiz.length < 10) {

        const extra =
            questions
            .filter(q => !quiz.includes(q))
            .sort(() => Math.random() - 0.5);

        quiz =
            [...quiz, ...extra]
            .slice(0, 10);
    }


    currentQuestion = 0;

    score = 0;

    streak = 0;

    bestStreak = 0;

    totalTime = 0;

    correctAnswers = 0;

    answers = [];


    startScreen.classList.add("hidden");

    resultScreen.classList.add("hidden");

    quizScreen.classList.remove("hidden");


    showQuestion();

    beep(700, .1);
}


/* Show question */

function showQuestion() {

    clearInterval(timer);

    timeLeft = 20;

    updateTimer();


    const data =
        quiz[currentQuestion];


    questionNo.textContent =
        currentQuestion + 1;


    bigNumber.textContent =
        String(currentQuestion + 1)
        .padStart(2, "0");


    question.textContent =
        data.question;


    category.textContent =
        data.category;


    scoreElement.textContent =
        score;


    streakElement.textContent =
        streak;


    progressBar.style.width =
        ((currentQuestion + 1) /
        quiz.length * 100) + "%";


    feedback.textContent = "";

    feedback.className = "";


    nextBtn.disabled = true;


    options.innerHTML = "";


    data.options.forEach(
        (optionText, index) => {

            const button =
                document.createElement("button");

            button.className =
                "option";


            button.innerHTML = `
                <span class="option-letter">
                    ${String.fromCharCode(65 + index)}
                </span>

                <span>
                    ${optionText}
                </span>
            `;


            button.addEventListener(
                "click",
                () => selectAnswer(index, button)
            );


            options.appendChild(button);

        }
    );


    timer =
        setInterval(() => {

            timeLeft--;

            totalTime++;

            updateTimer();


            if (timeLeft <= 0) {

                clearInterval(timer);

                selectAnswer(-1, null);

            }

        }, 1000);

}


/* Timer */

function updateTimer() {

    timerElement.textContent =
        `⏱ ${timeLeft}s`;

    if (timeLeft <= 5) {

        timerElement.style.animation =
            "pulse .5s infinite";

    } else {

        timerElement.style.animation =
            "none";
    }

}


/* Answer */

function selectAnswer(choice, clickedButton) {

    if (!nextBtn.disabled)
        return;


    clearInterval(timer);


    const data =
        quiz[currentQuestion];


    const correct =
        choice === data.answer;


    const allButtons =
        document.querySelectorAll(".option");


    allButtons.forEach(
        (button, index) => {

            button.disabled = true;

            if (index === data.answer) {

                button.classList.add("correct");

            }

        }
    );


    if (
        clickedButton &&
        !correct
    ) {

        clickedButton.classList.add("wrong");

    }


    let points = 0;


    if (correct) {

        correctAnswers++;

        streak++;

        bestStreak =
            Math.max(bestStreak, streak);


        points =
            100 +
            Math.min(timeLeft * 5, 100) +
            ((streak - 1) * 20);


        score += points;


        feedback.className =
            "feedback-good";


        feedback.textContent =
            `✓ Correct! +${points} points — ${data.explanation}`;


        beep(800, .12);

    } else {

        streak = 0;


        feedback.className =
            "feedback-bad";


        feedback.textContent =
            `✕ ${
                choice === -1
                ? "Time's up!"
                : "Not quite!"
            } ${data.explanation}`;


        beep(180, .15);

    }


    answers.push({

        question: data.question,

        chosen:
            choice === -1
            ? "Time up"
            : data.options[choice],

        correct:
            data.options[data.answer],

        isCorrect: correct

    });


    scoreElement.textContent =
        score;


    streakElement.textContent =
        streak;


    nextBtn.disabled = false;


    nextBtn.textContent =
        currentQuestion === quiz.length - 1
        ? "See Results →"
        : "Next Question →";

}


/* Next */

nextBtn.addEventListener(
    "click",
    () => {

        if (
            currentQuestion <
            quiz.length - 1
        ) {

            currentQuestion++;

            showQuestion();

        } else {

            showResults();

        }

    }
);


/* Results */

function showResults() {

    clearInterval(timer);


    quizScreen.classList.add("hidden");

    resultScreen.classList.remove("hidden");


    const accuracy =
        Math.round(
            correctAnswers /
            quiz.length *
            100
        );


    const finalScore =
        Math.min(
            1000,
            Math.round(score)
        );


    document.getElementById("finalScore")
    .textContent =
        finalScore;


    document.getElementById("correct")
    .textContent =
        correctAnswers;


    document.getElementById("accuracy")
    .textContent =
        accuracy + "%";


    document.getElementById("bestStreak")
    .textContent =
        bestStreak;


    document.getElementById("timeUsed")
    .textContent =
        totalTime + "s";


    const name =
        document.getElementById("playerName")
        .value.trim() || "Coder";


    let title;

    let message;

    let emoji;


    if (accuracy >= 90) {

        title =
            `Outstanding, ${name}!`;

        message =
            "You crushed the challenge with elite front-end accuracy.";

        emoji = "🏆";

    }

    else if (accuracy >= 70) {

        title =
            `Excellent work, ${name}!`;

        message =
            "Strong fundamentals with a great balance of speed and accuracy.";

        emoji = "🚀";

    }

    else if (accuracy >= 50) {

        title =
            `Nice run, ${name}!`;

        message =
            "You have a solid base. One more round can push your score higher.";

        emoji = "⚡";

    }

    else {

        title =
            `Keep building, ${name}!`;

        message =
            "Every attempt is progress. Review the answers and try again.";

        emoji = "🧠";

    }


    document.getElementById("resultEmoji")
    .textContent = emoji;


    document.getElementById("resultTitle")
    .textContent = title;


    document.getElementById("resultText")
    .textContent = message;


    document.getElementById("performanceText")
    .textContent =
        accuracy >= 90
        ? "Elite"
        : accuracy >= 70
        ? "Excellent"
        : accuracy >= 50
        ? "Good"
        : "Keep Practicing";


    setTimeout(() => {

        document.getElementById(
            "performanceFill"
        ).style.width =
            accuracy + "%";

    }, 100);


    createReview();


    if (accuracy >= 70) {

        createConfetti();

    }

}


/* Review */

function createReview() {

    const review =
        document.getElementById("review");


    review.innerHTML = "";


    answers.forEach(
        (item, index) => {

            const div =
                document.createElement("div");

            div.className =
                "review-item";


            div.innerHTML = `
                <b>
                    ${String(index + 1).padStart(2, "0")}.
                </b>

                ${item.question}

                <br>

                ${
                    item.isCorrect
                    ? "✓ Correct"
                    : `✕ Your answer: ${item.chosen}
                       • Correct: ${item.correct}`
                }
            `;


            review.appendChild(div);

        }
    );

}


/* Restart */

document
.getElementById("restartBtn")
.addEventListener("click", () => {

    startQuiz();

});


/* Sound effect */

function beep(
    frequency = 500,
    duration = .08
) {

    if (!soundOn)
        return;


    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;


        const context =
            new AudioContext();


        const oscillator =
            context.createOscillator();


        const gain =
            context.createGain();


        oscillator.frequency.value =
            frequency;


        oscillator.type =
            "sine";


        gain.gain.setValueAtTime(
            .05,
            context.currentTime
        );


        gain.gain.exponentialRampToValueAtTime(
            .001,
            context.currentTime + duration
        );


        oscillator.connect(gain);

        gain.connect(context.destination);


        oscillator.start();

        oscillator.stop(
            context.currentTime + duration
        );

    }

    catch(error) {

        console.log(error);

    }

}


/* Confetti */

function createConfetti() {

    for (
        let i = 0;
        i < 80;
        i++
    ) {

        const piece =
            document.createElement("div");


        piece.className =
            "confetti";


        piece.style.left =
            Math.random() * 100 + "%";


        piece.style.background =
            `hsl(${Math.random() * 360}, 90%, 60%)`;


        piece.style.animationDelay =
            Math.random() * 1.5 + "s";


        document.body.appendChild(piece);


        setTimeout(
            () => piece.remove(),
            3500
        );

    }

}