
document.addEventListener('DOMContentLoaded', function() { 
    const gameContainer = document.getElementById('game-container'); 
    const questionElement = document.getElementById('question'); 
    const scoreElement = document.getElementById('score-value'); 
    const levelElement = document.getElementById('level-value'); 
    const startButton = document.getElementById('start'); 
    const stopButton = document.getElementById('stop');
    const additionButton = document.getElementById('addition'); 
    const subtractionButton = document.getElementById('subtraction'); 
    const multiplicationButton = document.getElementById('multiplication'); 
    const timerElement = document.getElementById('timer-value');

    let score = 0; 
    let level = 1; 
    let operation = '+'; 
    let correctAnswer = 0; 
    let balloons = []; 
    let gameInterval;
    let timerInterval;
    let timeLeft = 60;

    const clapSound = new Audio('clap.mp3');
    const wrongSound = new Audio('wrong.mp3');

    const colors = ['#ff5252', '#ff4081', '#e040fb', '#7c4dff', '#536dfe', '#448aff', '#40c4ff', '#18ffff', '#64ffda', '#69f0ae', '#b2ff59', '#eeff41', '#ffff00', '#ffd740', '#ffab40', '#ff6e40']; 

    additionButton.addEventListener('click', () => operation = '+'); 
    subtractionButton.addEventListener('click', () => operation = '-'); 
    multiplicationButton.addEventListener('click', () => operation = '×'); 
    startButton.addEventListener('click', startGame); 
    stopButton.addEventListener('click', stopGame);

    function startGame() { 
        clearInterval(gameInterval); 
        clearInterval(timerInterval);
        gameContainer.innerHTML = ''; 
        score = 0; 
        level = 1; 
        scoreElement.textContent = score; 
        levelElement.textContent = level; 
        balloons = []; 
        timeLeft = 60;
        timerElement.textContent = timeLeft;

        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                clearInterval(gameInterval);
                balloons.forEach(balloon => balloon.remove());
                balloons = [];
                alert("⏰ انتهى الوقت! لقد جمعت " + score + " نقطة.");
            }
        }, 1000);

        generateQuestion(); 
        gameInterval = setInterval(createBalloon, 2000 - (level * 500)); 
    } 

    function stopGame() {
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        balloons.forEach(balloon => balloon.remove());
        balloons = [];
    }

    function generateQuestion() { 
        let num1, num2; 
        switch(operation) { 
            case '+': 
                num1 = Math.floor(Math.random() * (5 + level * 2)) + 1; 
                num2 = Math.floor(Math.random() * (5 + level * 2)) + 1; 
                correctAnswer = num1 + num2; 
                break; 
            case '-': 
                num2 = Math.floor(Math.random() * (5 + level * 2)) + 1; 
                num1 = num2 + Math.floor(Math.random() * (5 + level * 2)) + 1; 
                correctAnswer = num1 - num2; 
                break; 
            case '×': 
                num1 = Math.floor(Math.random() * (3 + level)) + 1; 
                num2 = Math.floor(Math.random() * (3 + level)) + 1; 
                correctAnswer = num1 * num2; 
                break; 
        } 
        questionElement.textContent = `${num1} ${operation} ${num2} = ?`; 
    } 

    function createBalloon() { 
        const balloon = document.createElement('div'); 
        balloon.className = 'balloon'; 
        const xPos = Math.random() * (gameContainer.offsetWidth - 60); 
        balloon.style.left = `${xPos}px`; 
        balloon.style.bottom = '-80px'; 
        const colorIndex = Math.floor(Math.random() * colors.length); 
        balloon.style.backgroundColor = colors[colorIndex]; 

        let value; 
        if (Math.random() > 0.7) { 
            value = correctAnswer; 
            balloon.dataset.correct = 'true'; 
        } else { 
            const offset = Math.floor(Math.random() * 5) + 1; 
            value = Math.random() > 0.5 ? correctAnswer + offset : correctAnswer - offset; 
            if (value < 0) value = correctAnswer + offset; 
            balloon.dataset.correct = 'false'; 
        } 

        balloon.textContent = value; 
        gameContainer.appendChild(balloon); 
        balloons.push(balloon); 

        let yPos = -80; 
        const balloonInterval = setInterval(() => { 
            yPos += 2 + level * 0.2; 
            balloon.style.bottom = `${yPos}px`; 

            if (yPos > gameContainer.offsetHeight) { 
                clearInterval(balloonInterval); 
                balloon.remove(); 
                balloons = balloons.filter(b => b !== balloon); 
            } 
        }, 30); 

        balloon.addEventListener('click', function() { 
            if (balloon.dataset.correct === 'true') { 
                clapSound.currentTime = 0;
                clapSound.play();

                score += 2; 
                scoreElement.textContent = score; 
                balloon.style.transition = 'transform 0.2s, opacity 0.2s'; 
                balloon.style.transform = 'scale(1.5)'; 
                balloon.style.opacity = '0'; 
                setTimeout(() => { 
                    balloon.remove(); 
                    balloons = balloons.filter(b => b !== balloon); 
                }, 200); 
                if ((level === 1 && score >= 10) || (level === 2 && score >= 15)) { 
                    level++; 
                    levelElement.textContent = level; 
                    clearInterval(gameInterval); 
                    gameInterval = setInterval(createBalloon, 2000 - (level * 500)); 
                } 
                generateQuestion(); 
            } else { 
                wrongSound.currentTime = 0;
                wrongSound.play();

                score = Math.max(0, score - 1); 
                scoreElement.textContent = score; 
                balloon.style.backgroundColor = '#cccccc'; 
            } 
        }); 
    } 
});
