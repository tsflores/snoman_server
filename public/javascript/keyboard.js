import { arrKeys } from "./assets.js";
import {
	getLetter,
	colorKeys,
	displayAnswer,
	displayMessage,
    fireConfetti,
    updateLocalStorage
} from "./utility-functions.js";
import { setTimer } from "./countdown_timer.js";
import { movieTitleAnswer, ltrMovieTitleCount } from "./data_extraction.js";
import { drawSnowman } from "./draw-snowman.js";
import { timerStatus } from "./countdown_timer.js";

const keySelected = [];
export let gameStatus = "Playing";
let ltrUserAnswerCount = 0;
let wrongGuesses = 0;


export function createKeyBoard() {
	const keyBoard = document.getElementById("keyBoard"); //find the element and insert keyboard within it

	for (let i = 0; i < arrKeys.length; i++) {
		const rowKeys = arrKeys[i];
		const row = document.createElement("div"); //keyboard row
		row.classList.add("keyBoardRow");
		row.setAttribute("id", `keyBoardRow${i}`);
		keyBoard.appendChild(row);
		const keyBoardRow = document.getElementById(`keyBoardRow${i}`);

		for (let j = 0; j < rowKeys.length; j++) {
			const tileLetter = rowKeys[j]; //accesses the individual value within arrKeys for a given row column combination

			const key = document.createElement("div"); //individual div for each letter on the virtual keyboard
			key.classList.add("key");

			key.setAttribute("id", `Key${tileLetter}`);

			key.innerHTML = tileLetter; //only letters required for game
			keyBoardRow.appendChild(key);

			key.addEventListener("click", getLetter); //add click event listener to the keys of the virtual keyboard
		}
	}
}

/*
	addLetterToBoard logic
	- The user could make a selection either with the keyboard or the virtual keyboard on screen
	- To ensure matches, use the toUpperCase() method so that all comparisons look at capitalized letters
	- A selection is either correct, incorrect, or already been used 
	- if game play is won or lost, prevent adding more letters to the board
	- alert user that game is won or lost
	- stop timer if game is over
*/

export function addLetterToBoard(userEvent) {
	if (gameStatus !== "Playing" || timerStatus === 'inactive') return; //break out of the game

	const usrMsg = document.getElementById("msg-to-user");
	const tiles = document.getElementsByClassName("tiles"); //get collection of tiles

	usrMsg.innerHTML = "";
	//need to remove spaces to ensure that the correct letters entered match up with the position in the tiles collection
	const ltrMovieTitle = movieTitleAnswer.split(" ").join("");

	//only accept letters and not other characters
	if ("KeyA" <= userEvent.code && userEvent.code <= "KeyZ") {
		if (keySelected.length === 0) {
			setTimer(); //start the clock after first key is selected and let timer run
		}

		if (keySelected.includes(userEvent.key.toUpperCase())) {
			usrMsg.innerHTML = "You have already selected that letter.  Try again.";
		} else if (ltrMovieTitle.includes(userEvent.key.toUpperCase())) {
			for (const letter in ltrMovieTitle.split("")) {
				if (userEvent.key.toUpperCase() === ltrMovieTitle[letter]) {
					tiles[letter].classList.remove("tile-color");
					tiles[letter].innerHTML = userEvent.key.toUpperCase();
					colorKeys(userEvent, "correct-key");
					ltrUserAnswerCount++;
				}
			}
		} else {
			colorKeys(userEvent, "incorrect-key");
			wrongGuesses++;
			drawSnowman(wrongGuesses);
			if (wrongGuesses === 6) {
                gameStatus = "Lost";
				displayMessage("Maybe next time");
				setTimer(); //stop the clock
				displayAnswer(ltrMovieTitle, tiles);
				updateLocalStorage(gameStatus);
			}
		}

		//store the keys that have been pressed thus far
		if (!keySelected.includes(userEvent.key.toUpperCase())) {
			keySelected.push(userEvent.key.toUpperCase());
		}

		if (ltrUserAnswerCount === ltrMovieTitleCount) {
			displayMessage("You WON");
			gameStatus = "Won"; //change status of game
			setTimer(); //to stop clock
			fireConfetti(); //animation for confetti
			updateLocalStorage(gameStatus);
		}
	}
}
