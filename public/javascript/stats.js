import { storageObj, LOCAL_STORAGE_KEY } from "./assets.js";

export function displayStats() {

    //container for displaying stats may have different DOM structures depending on when user clicks stat icon
	let statContainer = document.getElementsByClassName("hint-msg")[0];
    let winPercentage = 0;

    if(!statContainer){
        statContainer = document.getElementsByClassName("game-status")[0];
    }

    statContainer.innerHTML = "";
    
    const divStats = document.createElement("div");
    const divPlayed = document.createElement("div");
    const divWins = document.createElement("div");
    const headerPlayed = document.createElement("h3");
    const headerWins = document.createElement("h3");
    const spanPlayedText = document.createElement("span");
    const spanWinsText = document.createElement("span");

    if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
        const localDataParsed = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        storageObj.games = Number.parseInt(localDataParsed.games);
        storageObj.wins = Number.parseInt(localDataParsed.wins);
    }

    if(Number.parseInt(storageObj.games) > 0){
        winPercentage = ((storageObj.wins / storageObj.games)*100).toFixed(1);
    }else{
        winPercentage = 0;
    }
    
    spanPlayedText.innerHTML = "Games";
    spanWinsText.innerHTML = "Wins";

    headerPlayed.innerHTML = `${storageObj.games}`;
    headerWins.innerHTML = `${winPercentage}%`;

    divStats.classList.add("stats-container");
    divPlayed.classList.add("stats-figures");
    divWins.classList.add("stats-figures");

    statContainer.appendChild(divStats); //statistics container

    //create a container for the games played
    divStats.appendChild(divPlayed);
    divPlayed.appendChild(headerPlayed);
    divPlayed.appendChild(spanPlayedText);

    //create a container for the wins
    divStats.appendChild(divWins);
    divWins.appendChild(headerWins);
    divWins.appendChild(spanWinsText);
	
}