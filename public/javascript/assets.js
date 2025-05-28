
export const urlPages = 500;

export const baseURL = '/api/movies';

export const countDownTarget = 90; //seconds to complete the game
export const numGuessesAllowed = 6;

//on screen keyboard - use QWERTY style
export const arrKeys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["", "A", "S", "D", "F", "G", "H", "J", "K", "L", ""],
  ["", "", "Z", "X", "C", "V", "B", "N", "M", "", ""],
];

export const LOCAL_STORAGE_KEY = "STATS";  //local storage key for saving and retrieving

export const storageObj = {
	games: 0,
	wins: 0
};