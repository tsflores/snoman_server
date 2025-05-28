import { selectURLPage, getTMDBData } from "./data_extraction.js";
import { createKeyBoard, addLetterToBoard } from "./keyboard.js";
import {
	openPopup,
	displayMessage,
	replayGame
} from "./utility-functions.js";
import { displayStats } from './stats.js'

("use strict");

document.addEventListener("DOMContentLoaded", () => {
	//get elements associated with the nav bar
	const hintMsg = document.getElementById("hint");
	const replay = document.getElementById("replay");
	const instructions = document.getElementById("instructions");
	const stats = document.getElementById("stats");

	//add event handlers to navigation icons
	hintMsg.addEventListener("click", () => {
		displayMessage("hint");
	});
	replay.addEventListener("click", replayGame);
	instructions.addEventListener("click", openPopup);
	stats.addEventListener("click", displayStats);

	createKeyBoard(); //create virtual keyboard below the game board; click event for on-screen and keyup for physical keyboard

	//event listener for a physical keyboard - alternate option to virtual on screen keyboard
	document.addEventListener("keyup", (keyBoardEvent) => {
		addLetterToBoard(keyBoardEvent);
	});

	//finally, load the game board from GET request to TMDB API
	const TMDB_URL = selectURLPage();
	getTMDBData(TMDB_URL);

}); //DOM is loaded





