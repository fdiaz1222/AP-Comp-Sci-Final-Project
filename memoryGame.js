const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('button'),
    win: document.querySelector('.win')
}
// These They're storing references to the game board's container, the game board itself, the move counter, the timer, the start button, and a win/game-over element.

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
}

 const homeBtn = document.getElementById("homeBtn");
homeBtn.addEventListener("click",function(){
      window.location.href = "index.html";
});

//This will help us reuse selectors multiple times and assures certain aslects wifhin the gamd


const shuffle = array => {
    const clonedArray = [...array]

    for (let i = clonedArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        const original = clonedArray[i]

        clonedArray[i] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }

    return clonedArray
}//shuffles an array. It creates a copy of the input array, then iterates backward through it, swapping each element with a randomly chosen element from the remaining unshuffled portion.

const pickRandom = (array, items) => {
    const clonedArray = [...array]
    const randomPicks = []

    for (let i = 0; i < items; i++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)
       
        randomPicks.push(clonedArray[randomIndex])
        clonedArray.splice(randomIndex, 1)
    }

    return randomPicks
}//The function works by first creating a copy of the input array to avoid modifying the original. Then, it iteratively selects random elements from this copy.  Each time it selects an element, it adds that element to a new array (randomPicks) and removes it from the copied array. This ensures that no element is selected more than once.  Finally, the function returns the randomPicks array containing the randomly selected elements.

const generateGame = () => {
    const dimensions = selectors.board.getAttribute('data-dimension')  

    if (dimensions % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.")
    }

    const emojis = ['🥔', '🍒', '🥑', '🌽', '🥕', '🍇', '🍉', '🍌', '🥭', '🍍']
    const picks = pickRandom(emojis, (dimensions * dimensions) / 2)
    const items = shuffle([...picks, ...picks])
    const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items.map(item => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">${item}</div>
                </div>
            `).join('')}
       </div>
    `//The code generates a playable memory matching game board.  It dynamically creates an HTML grid based on a user-specified dimension, ensuring that dimension is even.  The game uses randomly selected emojis, with each emoji shwoing twice on the board in a shuffle display.  Error handling is included to prevent the creation of a board with odd dimensions.
   
    const parser = new DOMParser().parseFromString(cards, 'text/html')

    selectors.board.replaceWith(parser.querySelector('.board'))
}

const startGame = () => {
    state.gameStarted = true
    selectors.start.classList.add('disabled')

    state.loop = setInterval(() => {
        state.totalTime++

        selectors.moves.innerText = `${state.totalFlips} moves`
        selectors.timer.innerText = `Time: ${state.totalTime} sec`
    }, 1000)
}// This sets a gameStarted flag to true, disables a "start" button, and starts a timer that updates the displayed time and number of moves every 1000 milliseconds. The  functionality relies on a state to track game variables and selectors to update the user

const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })

    state.flippedCards = 0
}

const flipCard = card => {
    state.flippedCards++
    state.totalFlips++

    if (!state.gameStarted) {
        startGame()
    }

    if (state.flippedCards <= 2) {
        card.classList.add('flipped')
    }

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)')

        if (flippedCards[0].innerText === flippedCards[1].innerText) {
            flippedCards[0].classList.add('matched')
            flippedCards[1].classList.add('matched')
        }

        setTimeout(() => {
            flipBackCards()
        }, 1000)
    }//This implements the core logic for a memory matching game.  It handles flipping cards, tracking flips, starting the game, checking for matches, and automatically flipping unmatched cards back over after a one-second delay.  The flipCard function is the central piece, managing card state and interactions
  
    if (!document.querySelectorAll('.card:not(.flipped)').length) {
        setTimeout(() => {
            selectors.boardContainer.classList.add('flipped')
            selectors.win.innerHTML = `
                <span class="win-text">
                    You won!<br />
                    with <span class="highlight">${state.totalFlips}</span> moves<br />
                    under <span class="highlight">${state.totalTime}</span> seconds
                </span>
            `

            clearInterval(state.loop)
        }, 1000)
    }
}
//checks if all elements with the class "card" are also marked with the class "flipped".  If they are , it waits one second  then displays a "You won!" message showing the number of moves and time taken.  It also stops a timer.


const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement

        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent)
        } else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
            startGame()
        }
    })
}
//Every time a click happens anywhere on the page, the code within the curly braces will execute, it will be able to tell when a card has already been flipped or not
generateGame()
attachEventListeners()
