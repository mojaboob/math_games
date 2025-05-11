document.addEventListener('DOMContentLoaded', function() {
    // العناصر الأساسية
    const startBtn = document.getElementById('startBtn');
    const playAgainBtn = document.getElementById('playAgainBtn');
    const gameControls = document.querySelector('.game-controls');
    const gameArea = document.querySelector('.game-area');
    const gameOver = document.querySelector('.game-over');
    const problemElement = document.getElementById('problem');
    const answerInput = document.getElementById('answer');
    const submitAnswerBtn = document.getElementById('submitAnswer');
    const feedbackElement = document.getElementById('feedback');
    const timeElement = document.getElementById('time');
    const scoreElement = document.getElementById('score');
    const finalScoreElement = document.getElementById('final-score');
    const achievementsElement = document.getElementById('achievements');
    const iconElements = document.querySelectorAll('.icons span');
    
    // متغيرات اللعبة
    let currentOperation = 'add';
    let currentDifficulty = 'easy';
    let currentIcon = '🍎';
    let score = 0;
    let timeLeft = 60;
    let timer;
    let correctAnswersInRow = 0;
    let achievements = [];
    
    // تعريفات العمليات
    const operations = {
        add: { symbol: '+', name: 'جمع' },
        subtract: { symbol: '-', name: 'طرح' },
        multiply: { symbol: '×', name: 'ضرب' }
    };
    
    // تعريفات الصعوبة
    const difficulties = {
        easy: { range: [1, 5], time: 60 },
        medium: { range: [5, 10], time: 45 },
        hard: { range: [10, 20], time: 30 }
    };
    
    // الأوسمة
    const badges = {
        fast: { emoji: '⚡', text: 'سريع!' },
        streak: { emoji: '🔥', text: '5 إجابات متتالية' },
        master: { emoji: '🏆', text: 'خبير رياضيات' }
    };
    
    // تهيئة الأحداث
    function initEvents() {
        // اختيار العملية
        document.querySelectorAll('.operation-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelector('.operation-btn.active').classList.remove('active');
                this.classList.add('active');
                currentOperation = this.dataset.operation;
            });
        });
        
        // اختيار الصعوبة
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelector('.difficulty-btn.active').classList.remove('active');
                this.classList.add('active');
                currentDifficulty = this.dataset.difficulty;
                timeLeft = difficulties[currentDifficulty].time;
                timeElement.textContent = timeLeft;
            });
        });
        
        // اختيار الأيقونة
        iconElements.forEach(icon => {
            icon.addEventListener('click', function() {
                currentIcon = this.dataset.icon;
                if (gameArea.classList.contains('hidden')) return;
                generateProblem();
            });
        });
        
        // بدء اللعبة
        startBtn.addEventListener('click', startGame);
        playAgainBtn.addEventListener('click', startGame);
        
        // إدخال الإجابة
        answerInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') checkAnswer();
        });
        
        submitAnswerBtn.addEventListener('click', checkAnswer);
    }
    
    // بدء اللعبة
    function startGame() {
        score = 0;
        correctAnswersInRow = 0;
        achievements = [];
        timeLeft = difficulties[currentDifficulty].time;
        scoreElement.textContent = score;
        timeElement.textContent = timeLeft;
        
        gameControls.classList.add('hidden');
        gameOver.classList.add('hidden');
        gameArea.classList.remove('hidden');
        
        generateProblem();
        startTimer();
        
        answerInput.value = '';
        answerInput.focus();
    }
    
    // بدء المؤقت
    function startTimer() {
        clearInterval(timer);
        timer = setInterval(() => {
            timeLeft--;
            timeElement.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }
    
    // إنشاء المسألة
    function generateProblem() {
        const range = difficulties[currentDifficulty].range;
        let num1, num2;
        
        // توليد الأعداد حسب الصعوبة
        num1 = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
        num2 = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
        
        // ضبط الأعداد للطرح لضمان نتيجة موجبة
        if (currentOperation === 'subtract' && num1 < num2) {
            [num1, num2] = [num2, num1];
        }
        
        // عرض المسألة بالطريقة المرئية
        displayVisualProblem(num1, num2);
        
        // حفظ الإجابة الصحيحة
        problemElement.dataset.num1 = num1;
        problemElement.dataset.num2 = num2;
        problemElement.dataset.correctAnswer = calculateAnswer(num1, num2, operations[currentOperation].symbol);
    }
    
    // عرض المسألة بالرسومات
    function displayVisualProblem(num1, num2) {
        problemElement.innerHTML = '';
        
        // عرض خاص لكل عملية
        switch (currentOperation) {
            case 'add':
                displayAdditionProblem(num1, num2);
                break;
            case 'subtract':
                displaySubtractionProblem(num1, num2);
                break;
            case 'multiply':
                displayMultiplicationProblem(num1, num2);
                break;
        }
    }
    
    // عرض مسألة جمع
    function displayAdditionProblem(num1, num2) {
        // المجموعة الأولى
        const group1 = document.createElement('div');
        group1.className = 'visual-group';
        group1.id = 'group1';
        
        // المجموعة الثانية
        const group2 = document.createElement('div');
        group2.className = 'visual-group';
        group2.id = 'group2';
        
        // إضافة الأيقونات
        for (let i = 0; i < num1; i++) {
            const icon = document.createElement('span');
            icon.textContent = currentIcon;
            group1.appendChild(icon);
        }
        
        for (let i = 0; i < num2; i++) {
            const icon = document.createElement('span');
            icon.textContent = currentIcon;
            group2.appendChild(icon);
        }
        
        // علامة الجمع
        const plus = document.createElement('span');
        plus.textContent = '+';
        plus.className = 'operator';
        plus.style.fontSize = '2.5rem';
        plus.style.margin = '0 10px';
        
        // علامة التساوي
        const equal = document.createElement('span');
        equal.textContent = '=';
        equal.className = 'equal';
        equal.style.fontSize = '2.5rem';
        equal.style.margin = '0 10px';
        
        // بناء المسألة
        problemElement.appendChild(group1);
        problemElement.appendChild(plus);
        problemElement.appendChild(group2);
        problemElement.appendChild(equal);
    }
    
    // عرض مسألة طرح
    function displaySubtractionProblem(num1, num2) {
        // المجموعة الكلية
        const totalGroup = document.createElement('div');
        totalGroup.className = 'visual-group';
        
        // إضافة الأيقونات (المجموع الكلي)
        for (let i = 0; i < num1; i++) {
            const icon = document.createElement('span');
            icon.textContent = currentIcon;
            totalGroup.appendChild(icon);
        }
        
        // علامة الطرح
        const minus = document.createElement('span');
        minus.textContent = '-';
        minus.className = 'operator';
        minus.style.fontSize = '2.5rem';
        minus.style.margin = '0 10px';
        
        // المجموعة المطروحة
        const subtractGroup = document.createElement('div');
        subtractGroup.className = 'visual-group';
        
        // إضافة الأيقونات (المجموعة المطروحة)
        for (let i = 0; i < num2; i++) {
            const icon = document.createElement('span');
            icon.textContent = currentIcon;
            icon.style.opacity = '0.5';
            subtractGroup.appendChild(icon);
        }
        
        // علامة التساوي
        const equal = document.createElement('span');
        equal.textContent = '=';
        equal.className = 'equal';
        equal.style.fontSize = '2.5rem';
        equal.style.margin = '0 10px';
        
        // بناء المسألة
        problemElement.appendChild(totalGroup);
        problemElement.appendChild(minus);
        problemElement.appendChild(subtractGroup);
        problemElement.appendChild(equal);
    }
    
    // عرض مسألة ضرب
    function displayMultiplicationProblem(num1, num2) {
        // شرح المسألة
        const explanation = document.createElement('p');
        explanation.textContent = `${num1} × ${num2} يعني ${num1} مجموعات من ${num2}`;
        explanation.style.marginBottom = '20px';
        explanation.style.fontSize = '1.2rem';
        problemElement.appendChild(explanation);
        
        // إنشاء مصفوفة الضرب
        const grid = document.createElement('div');
        grid.className = 'multiplication-grid';
        
        // تعبئة المصفوفة
        for (let i = 0; i < num1; i++) {
            for (let j = 0; j < num2; j++) {
                const cell = document.createElement('div');
                cell.className = 'multiplication-cell';
                cell.textContent = currentIcon;
                grid.appendChild(cell);
            }
        }
        
        problemElement.appendChild(grid);
    }
    
    // حساب الإجابة الصحيحة
    function calculateAnswer(num1, num2, operator) {
        switch (operator) {
            case '+': return num1 + num2;
            case '-': return num1 - num2;
            case '×': return num1 * num2;
            default: return 0;
        }
    }
    
    // التحقق من الإجابة
    function checkAnswer() {
        const userAnswer = parseInt(answerInput.value);
        const correctAnswer = parseInt(problemElement.dataset.correctAnswer);
        
        if (isNaN(userAnswer)) {
            feedbackElement.textContent = 'الرجاء إدخال رقم صحيح!';
            feedbackElement.className = 'feedback incorrect';
            return;
        }
        
        if (userAnswer === correctAnswer) {
            handleCorrectAnswer();
        } else {
            handleIncorrectAnswer(correctAnswer);
        }
    }
    
    // معالجة الإجابة الصحيحة
    function handleCorrectAnswer() {
        score++;
        correctAnswersInRow++;
        scoreElement.textContent = score;
        feedbackElement.textContent = 'إجابة صحيحة! 👏';
        feedbackElement.className = 'feedback correct';
        
        // تأثيرات بصرية
        problemElement.classList.add('celebrate');
        setTimeout(() => {
            problemElement.classList.remove('celebrate');
        }, 500);
        
        // التحقق من الأوسمة
        checkAchievements();
        
        // توليد مسألة جديدة
        setTimeout(() => {
            answerInput.value = '';
            generateProblem();
            answerInput.focus();
        }, 1000);
    }
    
    // معالجة الإجابة الخاطئة
    function handleIncorrectAnswer(correctAnswer) {
        correctAnswersInRow = 0;
        feedbackElement.textContent = `إجابة خاطئة! الإجابة الصحيحة هي ${correctAnswer}`;
        feedbackElement.className = 'feedback incorrect';
        
        // توليد مسألة جديدة
        setTimeout(() => {
            answerInput.value = '';
            generateProblem();
            answerInput.focus();
        }, 1500);
    }
    
    // التحقق من الإنجازات
    function checkAchievements() {
        // إجابة سريعة
        if (timeLeft >= difficulties[currentDifficulty].time - 10 && !achievements.includes('fast')) {
            achievements.push('fast');
            addAchievementBadge(badges.fast);
        }
        
        // 5 إجابات متتالية
        if (correctAnswersInRow >= 5 && !achievements.includes('streak')) {
            achievements.push('streak');
            addAchievementBadge(badges.streak);
        }
        
        // إكمال مستوى صعب
        if (currentDifficulty === 'hard' && score >= 10 && !achievements.includes('master')) {
            achievements.push('master');
            addAchievementBadge(badges.master);
        }
    }
    
    // إضافة وسام إنجاز
    function addAchievementBadge(badge) {
        const badgeElement = document.createElement('div');
        badgeElement.className = 'achievement-badge';
        badgeElement.innerHTML = `${badge.emoji} ${badge.text}`;
        achievementsElement.appendChild(badgeElement);
    }
    
    // إنهاء اللعبة
    function endGame() {
        clearInterval(timer);
        gameArea.classList.add('hidden');
        gameOver.classList.remove('hidden');
        finalScoreElement.textContent = score;
    }
    
    // بدء التطبيق
    initEvents();
});