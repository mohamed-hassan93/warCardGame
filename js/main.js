//Example fetch using Deck of Cards API

document.querySelector('.runButton').addEventListener('click', runGame)

function runGame(){

  const url = 'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data.deck_id)
        let deckID = data.deck_id

        fetch(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
          console.log(data);
          let playerOneImg = data.cards[0].image;
          let playerTwoImg = data.cards[1].image
          document.querySelector(".playerOneImage").src = playerOneImg
          document.querySelector(".playerTwoImage").src = playerTwoImg

          let playerOneVal = data.cards[0].value
          let playerTwoVal = data.cards[1].value
          document.querySelector('.playerOneValue').innerHTML = `${playerOneVal} of ${data.cards[0].suit}`
          document.querySelector('.playerTwoValue').innerHTML = `${playerTwoVal} of ${data.cards[1].suit}`

          if(data.cards.value === 'ACE'){
            return 14
          }else if(data.cards.value === 'KING'){
            return 13
          }else if(data.cards.value === 'QUEEN'){
            return 12
          }else if(data.cards.value === 'JACK'){
            return 11
          }else{
            return 
          }

          if (playerOneVal > playerTwoVal){
            console.log('Player 1 Wins!')
          }else if (playerOneVal < playerTwoVal){
            console.log('Player 2 Wins!')
          }else{
            console.log('WAR!')
          }

        })
        .catch(err => {
            console.log(`error ${err}`)
        });
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
  

}

document.querySelector('.resetButton').addEventListener('click', resetGame)

function resetGame(){

  const url = 'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
  

}

