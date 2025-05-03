/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // loop over each item in the data
    for (let i = 0; i < games.length; i++ ){
        const game = games[i];

        // create a new div element, which will become the game card
        const gameCard = document.createElement('div')
            //div element is created and becomes game card so that we can add
            // the game card to the games-container

        // add the class game-card to the list
        gameCard.classList.add("game-card")

        // set the inner HTML using a template literal to display some info 
        gameCard.innerHTML = 
        `<img class="game-img" src="${game.img}" alt="${game.name}"/>
            <h2 class="game-name">${game.name}</h2>
            <p class="game-description">${game.description}</p>`; 
        
             ////<img> tag has two required attributes:
        // src   - Specifies the path to the image
        // alt   - Specifies an alternate text for the image, 
        //              if the image for some reason cannot be displayed
        
                
                // let x = 10;
                // let y = 4
                // console.log("the answer to ${x} + ${y} is ${x+y}")
                    //will only display the actual line and 
                    // not the values of x and y 
    
           
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")

        // append the game to the games-container
        gamesContainer.appendChild(gameCard);
            // add the game card to the games-container by using appendChild which
            // adds a node to the end of the list 
            // of children of a specified parent node
    }
}

// call the function we just defined using the correct variable

addGamesToPage(GAMES_JSON);

//WHY...

// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
    //sum of contributions:
const totalCont = 
    GAMES_JSON.reduce( ( total, game ) => {
        return total + game.backers;
    }, 0);


// set the inner HTML using a template literal and toLocaleString to get a number with commas
    contributionsCard.innerHTML = 
    `<p>${totalCont.toLocaleString()}</p>`


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
    const totalRaised = GAMES_JSON.reduce((total, game) => {
        return total + game.pledged;
}, 0);

raisedCard.innerHTML = `<p>${totalRaised.toLocaleString()}</p>`
// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

    const totalCard = GAMES_JSON.reduce((total) => {
        return total + 1; 
} , 0);

gamesCard.innerHTML = `<p>${totalCard.toLocaleString()}</p>` 


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {  
    deleteChildElements(gamesContainer);
    let unfunded = GAMES_JSON.filter((game) => game.pledged < game.goal);
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfunded);
    return unfunded;
}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    let funded = GAMES_JSON.filter((game) => game.pledged >= game.goal);

    // use the function we previously created to add funded games to the DOM
    addGamesToPage(funded);
    return funded;
//pledged: the amot of money that has been donated so far for the game
// if pleged >= to goal: means the game has been considered funded
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


      

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfunded = GAMES_JSON.filter((game) => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const unfundedString = `There ${unfunded === 1 ? 'is' : 'are'} ${unfunded} unfunded game${unfunded !== 1 ? 's' : ''}.`;


// create a new DOM element containing the template string and append it to the description container
const unfundedElement = document.createElement("div");
unfundedElement.innerHTML = unfundedString; 
descriptionContainer.appendChild(unfundedElement); 
//r
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [firstGame, secondGame, ...rest] = sortedGames;  


// create a new element to hold the name of the top pledge game, then append it to the correct element
let topPledgeElement = document.createElement("p");
topPledgeElement.innerHTML = `Top pledge game: ${firstGame.name}`;
firstGameContainer.appendChild(topPledgeElement);


// do the same for the runner up item
let runnerupElement = document.createElement("p");
runnerupElement.innerHTML = `Runner up game: ${secondGame.name}`;
secondGameContainer.appendChild(runnerupElement);









