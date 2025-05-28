import { urlPages, baseURL } from "./assets.js";
import { displayMessage } from "./utility-functions.js";

export const movieTitles = new Array();
export let movieTitleAnswer;
export const movieURL = new Array(); //for potential future use
export const movieOverview = new Array();
export let movieHintText;
export let ltrMovieTitleCount;

//fetching data from TMDB API
export function getTMDBData(TMDB_URL) {
	const options = {
		method: "GET",
		headers: {
			accept: "application/json"
		},
	};

	fetch(TMDB_URL, options)
		.then((res) => res.json())
		.then((res) => {
			console.log(res);
			for (let i = 0; i < res.results.length; i++) {
				const title = res.results[i].title;
				const language = res.results[i].original_language;
				//only include movies that are between 6 and 15 characters in length and no numbers or special characters in the title
				if (
					title.length > 6 &&
					title.length <= 15 &&
					/^[A-Za-z\s]+$/.test(title) &&
					language === 'en'
				) {
					movieTitles.push(title);
					movieURL.push(res.results[i].poster_path);
					movieOverview.push(res.results[i].overview);
				}
			}
			movieTitleAnswer = getMovieTitle();
			console.log(movieTitleAnswer);
			createGameBoard(); //wait for promise to resolve
		})
		.catch((err) => {
			displayMessage("Oops.  Something went wrong.  Please refresh and try again.")
			console.error(err)});
}

//API only retrieves 20 movies in a call so need to insert page as a filter for a longer list
//randomly select the page that will retrieve a list of 20 moives.
export function selectURLPage() {
	const page = Math.floor(Math.random() * urlPages) + 1;

	return `${baseURL}?page=${page}`;
}

//uses random number generator to get a movie title from the aviailable list as the answer
function getMovieTitle() {

	const randomNumber = Math.floor(Math.random() * movieTitles.length);

	movieHintText = movieOverview[randomNumber];

	console.log(movieHintText);

	return movieTitles[randomNumber].toUpperCase();
}

//	Create the game board which represents the letter guesses from the user.
//	Each character in the answer string is represented either with an _ or a space within a span tag

function createGameBoard() {
	for (const letter in movieTitleAnswer) {
		const gameBoard = document.getElementById("board");
		const span = document.createElement("span");

		movieTitleAnswer[letter] === " "
			? span.classList.add("space")
			: span.classList.add("tiles");
		span.classList.add("tile-color");
		span.innerHTML = movieTitleAnswer[letter] === " " ? " " : "_";
		gameBoard.appendChild(span);
	}

	ltrMovieTitleCount = movieTitleAnswer.split(" ").join("").length; //removing white space and get total letters in title
}
