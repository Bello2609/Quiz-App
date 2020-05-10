const highScoreList = document.getElementById('highScoreList');
const highScore = JSON.parse(localStorage.getItem("highScore")) || [];
 
const scoreList = highScore.map(score => {
    console.log(score);
    return `<li class='high-score'>${score.name} - ${score.score}</li>`;
}).join("");
console.log(scoreList);

highScoreList.innerHTML = scoreList;