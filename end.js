const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const max_high_scores = 10

finalScore.innerText = mostRecentScore

if(mostRecentScore <=0 ) {
  window.location.assign('/home.html')
}

username.addEventListener('keyup', function() {
  saveScoreBtn.disabled = !username.value
})

saveHighScore = function(e) {
  e.preventDefault()


  const score = {
    score: mostRecentScore,
    name: username.value
  }


  highScores.push(score)

  highScores.sort((a,b) => {
    return b.score - a.score
  })

  highScores.splice(10)



  localStorage.setItem('highScores', JSON.stringify(highScores))


  window.location.assign('/highscores.html')
}



