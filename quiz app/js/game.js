 const question = document.getElementById('question');
 const choices = Array.from(document.getElementsByClassName("choice-text"));
 const progressText = document.getElementById('progressText');
 const scoreText = document.getElementById('score');
 const progressBarFull = document.getElementById('progressBarFull');
 const loader = document.getElementById('loader');
 const game = document.getElementById('game');
 //set of variables
 let currentQuestion = {};
 let acceptingAnswer = false;
 let score = 0;
 let questionCounter = 0;
 let availableQuestion = [];
 
 let questions = [];
 fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
 .then( res =>{
     return res.json();
 }).then( loadedQuestions =>{
     console.log(loadedQuestions.results);
     questions = loadedQuestions.results.map(loadedQuestion=>{

         const formattedQuestion = {
             question: loadedQuestion.question
         };
         
         const answerChoices = [...loadedQuestion.incorrect_answers];

         formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;

         answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer);

         answerChoices.map((choice, index)=>{
             formattedQuestion["choice" + (index+1)] = choice;
         });

         return formattedQuestion;
     }); 
     
     startGame();
 }).catch(err=>{
     console.log(err);
 })
const CORRECT_SCORE = 10;
const MAX_QUESTION = 5;

//START GAME FUNCTION
const startGame = ()=>{
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    getNewQuestion();
    game.classList.remove("hidden");
     loader.classList.add("hidden");
}
const getNewQuestion = ()=>{
    if(availableQuestion.length === 0 || questionCounter >= MAX_QUESTION){
        //save score to localstorage
        localStorage.setItem("mostRecentScore", score)
        //go to the end page
        return window.location.assign("/end.html");
    }
    questionCounter++;
    //update progress bar 
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTION) * 100}%`;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTION}`
    const questonIndex = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questonIndex];
    question.innerText = currentQuestion.question;

    //to insert the option 
    choices.forEach(choice=>{
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    //this will remove the question that has been asked
    availableQuestion.splice(questonIndex, 1);
    acceptingAnswer = true;
}
choices.forEach(choice=>{
    choice.addEventListener("click", e =>{
        if(!acceptingAnswer)return;

        acceptingAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

    //this will check for the coreect and incorect answer
        //ternary operator
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        if(classToApply === "correct"){
            incrementScore(CORRECT_SCORE)
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
        }, 1000)
        
    });
});
const incrementScore = (num)=>{
    score += num;
    scoreText.innerText = score;
}
