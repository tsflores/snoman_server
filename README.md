# SnoMan - Movie Guessing Game

A Hangman-style movie guessing game using The Movie Database (TMDB) API.

This version utlilizes a simple server that makes the API call to TMDB as a way of masking token on the client-side.

## Live Demo
[Play SnoMan](https://trinidads-portfolio.com/SnoMan/index.html)

## Features
- Guess popular movie titles from TMDB
- 90-second time limit
- 6 wrong guesses allowed
- On-screen and physical keyboard support
- Canvas-drawn snowman
- Confetti celebration for wins
- Local storage for game statistics

## Setup Instructions

1. Clone this repository
2. Get a TMDB API access token:
   - Create account at [themoviedb.org](https://www.themoviedb.org/)
   - Go to Settings → API
   - Generate an access token
3. Copy `assets.template.js` to `assets.js`
4. Replace `YOUR_TMDB_ACCESS_TOKEN_HERE` with your actual token
5. Open `index.html` in your browser

## Technologies Used
- HTML5 Canvas
- Vanilla JavaScript (ES6 modules)
- TMDB API
- CSS3 with responsive design
- Local Storage API