document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const width = 14;
    let score = 0;
    let pacManCurrentIndex = 112;

    const layout = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1,
        1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1,
        1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ];

    function createBoard() {
        for (let i = 0; i < layout.length; i++) {
            const square = document.createElement('div');
            square.classList.add('cell');
            if (layout[i] === 1) {
                square.classList.add('wall');
            } else if (layout[i] === 0) {
                square.classList.add('pac-dot');
            }
            grid.appendChild(square);
        }
    }

    function movePacMan(direction) {
        const squares = document.querySelectorAll('.cell');
        squares[pacManCurrentIndex].classList.remove('pac-man');
        switch (direction) {
            case 'left':
                if (pacManCurrentIndex % width !== 0 && !squares[pacManCurrentIndex - 1].classList.contains('wall')) {
                    pacManCurrentIndex--;
                }
                break;
            case 'right':
                if (pacManCurrentIndex % width < width - 1 && !squares[pacManCurrentIndex + 1].classList.contains('wall')) {
                    pacManCurrentIndex++;
                }
                break;
            case 'up':
                if (pacManCurrentIndex - width >= 0 && !squares[pacManCurrentIndex - width].classList.contains('wall')) {
                    pacManCurrentIndex -= width;
                }
                break;
            case 'down':
                if (pacManCurrentIndex + width < layout.length && !squares[pacManCurrentIndex + width].classList.contains('wall')) {
                    pacManCurrentIndex += width;
                }
                break;
        }
        squares[pacManCurrentIndex].classList.add('pac-man');
        pacDotEaten();
    }

    function pacDotEaten() {
        const squares = document.querySelectorAll('.cell');
        if (squares[pacManCurrentIndex].classList.contains('pac-dot')) {
            squares[pacManCurrentIndex].classList.remove('pac-dot');
            score++;
            scoreDisplay.textContent = 'Score: ' + score;
        }
    }

    function handleKeyDown(e) {
        switch (e.key) {
            case 'ArrowLeft':
                movePacMan('left');
                break;
            case 'ArrowRight':
                movePacMan('right');
                break;
            case 'ArrowUp':
                movePacMan('up');
                break;
            case 'ArrowDown':
                movePacMan('down');
                break;
        }
    }

    createBoard();
    movePacMan('right'); // Start Pac-Man moving right
    window.addEventListener('keydown', handleKeyDown);
});
