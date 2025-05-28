import { movieHintText } from "./data_extraction.js";
import { LOCAL_STORAGE_KEY, storageObj } from "./assets.js";
import { addLetterToBoard } from "./keyboard.js";

//function that opens a pop up window with instructions on how to play the game
export function openPopup() {
	// Create the popup window
	const popupWindow = window.open("", "popup", "width=600,height=400");

	// Get the dimensions of the popup window
	const popupWidth = popupWindow.outerWidth;
	const popupHeight = popupWindow.outerHeight;

	// Get the dimensions of the screen
	const screenWidth = window.screen.width;
	const screenHeight = window.screen.height;

	// Calculate the position of the popup window to center it
	const left = (screenWidth - popupWidth) / 2;
	const top = (screenHeight - popupHeight) / 2;

	// Set the position of the popup window
	popupWindow.moveTo(left, top);

	popupWindow.document.title = "Hangman Instructions";

	popupWindow.document.write(`
		<h2>Instructions</h2>
		<h3>Objective: Guess the popular movie title.</h3>
		<h3>How to play:</h3>
		<ol>
            <li> Use the keyboard to guess a letter in the movie title. </li>
			<li> Movie Titles will only contain letters.
            <li> A correct guess will place that letter on the board. </li>
            <li> An incorrect guess will draw a body part and flip the keyboard letter to red. </li>
            <li> Fill in all of the letters before the timer runs out or the snowman is drawn. </li>
			<li> You have 6 attempts or 90 seconds to guess the movie title. </li>
        </ol>
		<h4> Use the restart button to play again and the stats button to track win/losses. </h4>
		<button onclick="window.close()">Close</button>
	  `);
}

export function getLetter() {
	const userEvent = { code: this.id, key: this.innerText }; //capture the id attribute from the tile selected on the virtual keyboard
	addLetterToBoard(userEvent);
}

//animation for confetti
//source: https://www.kirilv.com/canvas-confetti/

const count = 200;
const defaults = {
	origin: { y: 0.7 },
};

function fire(particleRatio, opts) {
	confetti({
		...defaults,
		...opts,
		particleCount: Math.floor(count * particleRatio),
	});
}

export function fireConfetti() {
	fire(0.25, {
		spread: 26,
		startVelocity: 55,
	});
	fire(0.2, {
		spread: 60,
	});
	fire(0.35, {
		spread: 100,
		decay: 0.91,
		scalar: 0.8,
	});
	fire(0.1, {
		spread: 120,
		startVelocity: 25,
		decay: 0.92,
		scalar: 1.2,
	});
	fire(0.1, {
		spread: 120,
		startVelocity: 45,
	});
}

//get the first element with class name 'hint-msg' and use the space to 
//display appropriate message - provided element exists
export function displayMessage(selection) {
	const msgContainer = document.getElementsByClassName("hint-msg")[0];
	
	if (selection === "hint" && msgContainer) {
		msgContainer.innerHTML = `Hint: ${movieHintText}`;
		msgContainer.classList.remove('game-status');
	} else if (msgContainer) {
		msgContainer.innerHTML = selection;
		msgContainer.classList.remove("hint-msg");
		msgContainer.classList.add("game-status");
	}
}

//function to fill in the answer following a loss
export function displayAnswer(answer, tiles) {

	for (const letter in answer.split("")) {
			tiles[letter].classList.remove("tile-color");
			tiles[letter].innerHTML = answer[letter];
		}
}

//add a className to the key to change the color based on correctness of entry
export function colorKeys(userEvent, className) {
	const key = document.getElementById(`Key${userEvent.key.toUpperCase()}`);

	key.classList.add(className);
}

export function replayGame() {
	window.location.reload();
}

//update local storage only for cases where game has reached a won or loss status
//i.e. ignore cases where game is abandoned or restarted

export function updateLocalStorage(status) {
	if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
        const localDataParsed = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

		storageObj.games = Number.parseInt(localDataParsed.games) + 1;

		//increment wins by 1 based on status
		if(status === "Won"){
			storageObj.wins = Number.parseInt(localDataParsed.wins) + 1;
		}else{
			storageObj.wins = Number.parseInt(localDataParsed.wins)
		}

		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storageObj));
    }else{
		//initialize local storage
		storageObj.games = 1;

		if(status === "Won"){
			storageObj.wins = 1;
		}
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storageObj));
	}
}