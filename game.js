const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});


resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    // Add class based on the current player
    cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');

    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            alert(`Player ${board[a]} wins!`);
            isGameActive = false;
            return;
        }
    }

    if (!board.includes('')) {
        alert("It's a draw!");
        isGameActive = false;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o'); // Remove classes on reset
    });
}
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dino.draw();
    // Logic for obstacles and score
    requestAnimationFrame(gameLoop);
}
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !isJumping) {
        isJumping = true;
        dino.y -= 100; // Adjust the jump height
        setTimeout(() => {
            dino.y += 100; // Return to original position
            isJumping = false;
        }, 500); // Duration of jump
    }
});
