import { gameStatus } from "./keyboard.js";
import { countDownTarget } from "./assets.js";
import { displayAnswer, displayMessage, updateLocalStorage } from "./utility-functions.js";
import { movieTitleAnswer } from "./data_extraction.js";

//use setInterval to countdown time left
//researched setInterval to ensure that timer stops when a condition is met

let intervalID = null;
let countDownValue = countDownTarget;
export let timerStatus;

export function setTimer() {
	const timerDisplay = document.getElementById("countdown");

	if (gameStatus === "Playing") {
		// Prevent multiple intervals from being set
		if (!intervalID) {
			intervalID = setInterval(() => {
				countDownValue--; //decrement the clock display by 1 second
				const minutesNumber = Math.floor((Number(countDownValue) / 60) % 60); //minute portion of countDownValue
				const secondsNumber = Math.floor(Number(countDownValue) % 60); //seconds portion of countDownValue
				
				//format seconds display
				if(secondsNumber >= 10){
					timerDisplay.innerHTML = `${minutesNumber}:${secondsNumber}`
				}else{
					timerDisplay.innerHTML = `${minutesNumber}:0${secondsNumber}`
				}

				//add animation when the timer is down to the last minute
				if (countDownValue === 59) {
					timerDisplay.classList.remove("timer");
					timerDisplay.classList.add("timer-change-color");
					timerDisplay.classList.add("animated");
				}

				if (countDownValue <= 0) {
					clearInterval(intervalID);
					intervalID = null; // Reset intervalID after clearing
                    timerStatus = 'inactive';
					// gameStatus = "Lost";
					displayMessage("You ran out of time.");
					displayAnswer(movieTitleAnswer.split(" ").join(""), document.getElementsByClassName("tiles"))
					updateLocalStorage(gameStatus);
				}
			}, 1000); //1 second interval
		}
	} else {
		// Clear interval if it's running
		if (intervalID) {
			clearInterval(intervalID);
			intervalID = null; // Reset intervalID
			timerDisplay.classList.remove("animated");
		}
	}

	return () => {
		if (intervalID) {
			clearInterval(intervalID);
			intervalID = null;
		}
	};
}