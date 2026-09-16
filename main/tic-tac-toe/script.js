window.addEventListener("DOMContentLoaded", () => {
    const tiles = Array.from(document.querySelectorAll('.tile'))
    const playerDisplay = document.querySelector('.display-player')
    const resetButton = document.querySelector('#reset')
    const announcer = document.querySelector('.announcer')

    let board = ['', '', '', '', '', '', '', '', '']
    let currentPlayer = 'X'
    let isGameActive = true

    const PLAYERX_WON = 'PLAYERX_WON'
    const PLAYERO_WON = 'PLAYERO_WON'
    const TIE = 'TIE'

    /*
        Indexes the board

        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    function handleResultValidation() {
        let roundWon = false
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i]
            const a = board[winCondition[0]]
            const b = board[winCondition[1]]
            const c = board[winCondition[2]]
            if (a === '' || b === '' || c === '') {
                continue
            }
            if (a === b && b === c) {
                roundWon = true
                break
            }
        }

        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON)
            isGameActive = false
            return
        }

        if (!board.includes('')) {
            announce(TIE)
        }
    }

    function announce(type) {
        switch (type) {
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> won!'
                break
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> won!'
                break
            case TIE:
                announcer.innerHTML = "Nobody won! It's a tie!"
                break
        }
        announcer.classList.remove('hide')
    }

    function isValidAction(tile) {
        if (tile.innerHTML === 'O' || tile.innerHTML === 'X') {
            return false;
        }
        return true;
    }

    function updateBoard(index) {
        board[index] = currentPlayer;
    }

    function changePlayer() {
        playerDisplay.classList.remove(`player${currentPlayer}`)
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
        playerDisplay.innerHTML = currentPlayer
        playerDisplay.classList.add(`player${currentPlayer}`)
    }

    function userAction(tile, index) {
        if (isValidAction(tile) && isGameActive) {
            tile.innerHTML = currentPlayer
            tile.classList.add(`player${currentPlayer}`)
            updateBoard(index)
            handleResultValidation()
            changePlayer()
        }
    }

    function resetBoard() {
        board = ['', '', '', '', '', '', '', '', '']
        isGameActive = true
        announcer.classList.add('hide')

        if (currentPlayer === 'O') {
            changePlayer()
        }
        
        tiles.forEach(tile => {
            tile.innerHTML = ''
            tile.classList.remove('playerX')
            tile.classList.remove('playerO')
        })
    }

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index))
    })

    resetButton.addEventListener('click', resetBoard)
})