//Example fetch using Deck of Cards API

document.querySelector('.resetButton').addEventListener('click', newGame)
document.querySelector('.resetButton').addEventListener('click', scoreKeep)

function newGame(){

  const url = 'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data.deck_id)
        let deckID = data.deck_id
        document.querySelector('.remainingCards').innerHTML = 'Remaining Cards: 52'
        document.querySelector('.remainingCards').style.color = '#000000'
        document.querySelector(".playerOneImage").src = ''
        document.querySelector(".playerTwoImage").src = ''
        document.querySelector('.playerOneValue').innerHTML = ''
            document.querySelector('.playerTwoValue').innerHTML = ''

        document.querySelector('.runButton').addEventListener('click', runGame)
        
        function runGame(){
          fetch(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
          .then(res => res.json()) // parse response as JSON
          .then(data => {
            console.log(data);
            let playerOneImg = data.cards[0].image;
            let playerTwoImg = data.cards[1].image
            document.querySelector(".playerOneImage").src = playerOneImg
            document.querySelector(".playerTwoImage").src = playerTwoImg
  
            let playerOneVal = convertToNum(data.cards[0].value)
            console.log(playerOneVal)
            let playerTwoVal = convertToNum(data.cards[1].value)
            console.log(playerTwoVal)
            document.querySelector('.playerOneValue').innerHTML = `${playerOneVal} of ${data.cards[0].suit}`
            document.querySelector('.playerTwoValue').innerHTML = `${playerTwoVal} of ${data.cards[1].suit}`

            if (Number(playerOneVal) > Number(playerTwoVal)){
              console.log('Player 1 Wins!');
              document.querySelector('.result').innerHTML = 'Player 1 Wins!'
            }else if (Number(playerOneVal) < Number(playerTwoVal)){
              console.log('Player 2 Wins!')
              document.querySelector('.result').innerHTML = 'Player 2 Wins!'
            }else{
              console.log('WAR!')
              document.querySelector('.result').innerHTML = 'WAR!'
            }

            document.querySelector('.remainingCards').innerHTML = `Remaining Cards: ${data.remaining}`
            
            if(data.remaining > 10){
              return 
            }else{
              return document.querySelector('.remainingCards').style.color = '#FF0000'
            }
  
          })
          .catch(err => {
              console.log(`error ${err}`)
          });
        }

      })
      .catch(err => {
          console.log(`error ${err}`)
      });
  

}


function convertToNum (val){
  if(val === 'ACE'){
    return 14
  }else if(val === 'KING'){
    return 13
  }else if(val === 'QUEEN'){
    return 12
  }else if(val === 'JACK'){
    return 11
  }else{
    return val
  }
}

function scoreKeep(){
  let playerOneScore = localStorage.setItem('.playerOneScore', 0)
  let playerTwoScore = localStorage.setItem('.playerTwoScore', 0)

  document.querySelector('.playerOneScore').innerHTML = playerOneScore
  document.querySelector('.playerTwoScore').innerHTML = playerTwoScore


}