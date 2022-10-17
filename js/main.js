//Example fetch using Deck of Cards API

document.querySelector('.runButton').addEventListener('click', runGame)

// Access-Control-Allow-Origin:*;

function runGame(){

  const url = 'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data.deck_id)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

