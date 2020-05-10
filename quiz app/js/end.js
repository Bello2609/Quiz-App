const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById('finalScore');
const highScore = JSON.parse(localStorage.getItem("highScore")) || [];

const MAX_HIGH_SCORE = 5;
console.log(highScore);

finalScore.innerText = mostRecentScore;
username.addEventListener("keyup", ()=>{
    
    saveScoreBtn.disabled = !username.value;
});
const saveHighScore = (event)=>{
    event.preventDefault();
    console.log("this is a button");
    const score = {
        score: Math.floor(Math.random() * 100),
        name: username.value
    }
    highScore.push(score);
    highScore.sort((a, b)=> b.score - a.score);
    highScore.splice(5);
    console.log(highScore);
    localStorage.setItem("highScore", JSON.stringify(highScore));
    window.location.assign("/");
}
