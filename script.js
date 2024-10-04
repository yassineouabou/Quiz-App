const questions = [
    {
        question:"Which is the largest animal in the world?",
        answers:[
            {text:"Shark", correct:false},
            {text:"Blue whale", correct:true},
            {text:"Elephant", correct:false},
            {text:"Giraffe", correct:false},
        ]
    },
    {
        question:"What is the capital city of France?",
        answers:[
            {text:"Rome", correct:false},
            {text:"Berlin", correct:false},
            {text:"Madrid", correct:false},
            {text:"Paris", correct:true},
        ]
    },
    {
        question:"Which planet is known as the Red Planet?",
        answers:[
            {text:"Earth", correct:false},
            {text:"Mars", correct:true},
            {text:"Jupiter", correct:false},
            {text:"Venus", correct:false},
        ]
    },
    {
        question:"Who wrote 'Hamlet'?",
        answers:[
            {text:"Charles Dickens", correct:false},
            {text:"J.K. Rowling", correct:false},
            {text:"William Shakespeare", correct:true},
            {text:"Mark Twain", correct:false},
        ]
    },
    {
        question:"What is the chemical symbol for water?",
        answers:[
            {text:"H2O", correct:true},
            {text:"O2", correct:false},
            {text:"CO2", correct:false},
            {text:"N2", correct:false},
        ]
    },
    {
        question:"Which continent is the Sahara Desert located on?",
        answers:[
            {text:"Asia", correct:false},
            {text:"Africa", correct:true},
            {text:"Australia", correct:false},
            {text:"South America", correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex =0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML = questionNo+". "+currentQuestion.question;
    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct)
            button.dataset.correct=answer.correct;
        button.addEventListener("click",selectAnswer);
    })
}


function resetState() {
    nextButton.style.display = 'none';
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else
        selectedBtn.classList.add("incorrect");
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";

}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length)
        handleNextButton();
    else
        startQuiz();
});

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length)
        showQuestion();
    else
        showScore();
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML ="Play Again";
    nextButton.style.display="block";
}

startQuiz();