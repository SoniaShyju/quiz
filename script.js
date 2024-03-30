//array of objects
const quiz = [
    {

        q: 'How many side a pentagon have?',
        options: ['3', '2', '7', '5'],
        answer: 3
    },
    {

        q: 'What is the product of 5*5?',
        options: ['10', '25', '30', '15'],
        answer: 1
    },
    {

        q: 'What is the square root of 4?',
        options: ['2', '8', '16', '1'],
        answer: 0
    },
    {

        q: 'how many seconds are in 1 minute?',
        options: ['20', '30', '50', '60'],
        answer: 3
    },
    {

        q: 'What is 2*2*2?',
        options: ['8', '4', '16', '6'],
        answer: 0
    },

]

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0

//pushing question to availableQuestions
function setAvailableQuestions() {
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        availableQuestions.push(quiz[i])
    }

}
//seting question numbers, questions and options
function getNewQuestions() {
    //setting qustion number
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;

    //setting question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    const index1 = availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1, 1);

    //setting options
    const optionLen = currentQuestion.options.length
    for (let i = 0; i < optionLen; i++) {
        availableOptions.push(i)
    }
    let animationDelay = 0.2;
    //create options
    for (let i = 0; i < optionLen; i++) {
        //random options
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        const index2 = availableOptions.indexOf(optionIndex);
        availableOptions.splice(index2, 1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick", "getResult(this)");
    }

    questionCounter++;
}
//get correct and incorret answers
function getResult(element) {
    const id = parseInt(element.id);
    if (id === currentQuestion.answer) {
        //set green color to right answers
        element.classList.add("correct");
        correctAnswers++;
        console.log("correct:" + correctAnswers);
    }
    else {
        //set red color for incorrect answers
        element.classList.add("wrong");
        //if wrong show the correct answer by green
        const optionLen = optionContainer.children.length;
        for (let i = 0; i < optionLen; i++) {
            if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    unclickableOptions();
}


function unclickableOptions() {
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
        optionContainer.children[i].classList.add("already-answered");
    }
}
function next() {
    if (questionCounter === quiz.length) {
        quizOver();
    }
    else {
        getNewQuestions();

    }
}

function quizOver() {
    //to hide quizBox
    quizBox.classList.add("hide");
    //to show resultBox
    resultBox.classList.remove("hide");
    quizResult();
}

//to get quizResult
function quizResult() {
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + "/" + quiz.length;
}

//Try again button
function tryAgainQuiz() {
    //hide resultBox
    resultBox.classList.add("hide");
    //show quizBox
    quizBox.classList.remove("hide");
    //call resetQuiz
    resetQuiz();
    //call startQuiz
    startQuiz();
}
//reset the quiz
function resetQuiz() {
    questionCounter = 0;
    correctAnswers = 0;
}

//startQuiz
function startQuiz() {
    //hide homeBox
    homeBox.classList.add("hide");
    //shoow quizBox
    quizBox.classList.remove("hide");
    //call availableQuestions
    setAvailableQuestions();
    //call getNewQuestions

}

//
function goBackHome() {
    //hide resultBox
    resultBox.classList.add("hide");
    //show homeBox
    homeBox.classList.remove("hide");
    //call resetQuiz
    resetQuiz();
}
window.onload = function () {
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
    //setting questions in availableQuestions
    setAvailableQuestions()
    getNewQuestions()
}
