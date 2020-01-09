/*
Rules: 
-	The game has 2 players, playing in rounds
- 	Each turn, a player rolls a dice as often as needed and each result get added to his ROUND score
- 	But if the player rolls a 1, all his ROUND score gets deleted
- 	The player can choose to HOLD to add to his overall score 
-	The first player to reach 20 wins 
*/

var scores, roundScore, activePlayer, gamePlaying; 

// using DOM with html

var diceDOM = document.querySelector('.dice'); 

initGame()

// we need the id of the box where the score is in html 
// we can add html code like bold or em to better visualize by
// document.querySelector("#current-" + activePlayer).innerHTML = <b> + dice + </b>

// event listener for button rolldice
document.querySelector('.btn-roll').addEventListener('click', function(){
	if(gamePlaying){
		// a random number between 1-6 using floor to get int 
		var dice = Math.floor(Math.random() * 6) + 1; 

		// display the correct dice pic by changing the src element
		// we have to redisplay the dice pic first 
		diceDOM.style.display = 'block'; 
		diceDOM.src = 'dice-' + dice + '.png';

		// update the score if it is not 1 
		if (dice !== 1){
			// add to the current score
			roundScore += dice; 
			document.querySelector("#current-" + activePlayer).textContent = roundScore; 
		}else{
			nextPlayer()
		}
	}	
})

document.querySelector('.btn-hold').addEventListener('click', function(){
	if(gamePlaying){
		scores[activePlayer] += roundScore; 
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		// check if player won or not 
		if(scores[activePlayer] >= 20){
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!!'; 
			diceDOM.style.display = 'none'
			document.querySelector(".player-"+activePlayer+"-panel").classList.add('winner'); 
			document.querySelector(".player-"+activePlayer+"-panel").classList.remove('active');
			gamePlaying = false;
		}else{
			nextPlayer()
		}
	}
})

function nextPlayer(){
	// next player
	diceDOM.style.display = 'none'
	roundScore = 0;
	document.querySelector("#current-" + activePlayer).textContent = '0';
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

	// we have to change the color and the red dot onto the active player 
	// document.querySelector('.player-0-panel').classList.remove('active'); 
	// document.querySelector('.player-1-panel').classList.add('active'); 
	// we can dynamically change the activeplayer number but we do another way
	document.querySelector('.player-0-panel').classList.toggle('active'); 
	document.querySelector('.player-1-panel').classList.toggle('active'); 	
}


// starting the new game
document.querySelector('.btn-new').addEventListener('click', initGame); 

function initGame(){
	scores = [0,0]; 
	// each round with different scores based on user's choice
	roundScore = 0; 
	activePlayer = 0; // 0 for first and 1 for second 

	// hiding the dice at the beginning 
	// style is a method and access the display property in CSS 
	diceDOM.style.display = 'none'

	// Setting everything to 0
	document.getElementById('score-0').textContent = '0'; 
	document.getElementById('score-1').textContent = '0'; 
	document.getElementById('current-0').textContent = '0'; 
	document.getElementById('current-1').textContent = '0'; 
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector(".player-0-panel").classList.remove('winner'); 
	document.querySelector(".player-1-panel").classList.remove('winner');
	document.querySelector(".player-0-panel").classList.remove('active');
	document.querySelector(".player-1-panel").classList.remove('active');
	document.querySelector(".player-0-panel").classList.add('active');

	gamePlaying = true;
}





