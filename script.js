score = 0;
cross = true;
let gameOverFlag = false; // منع تكرار صوت الاصطدام

let audio = new Audio('music.mp3');
let audiogo = new Audio('gameover.mp3');

setTimeout(() => {
    audio.play();
}, 1000);

document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode);
    let dino = document.querySelector('.dino');
    
    if (e.keyCode == 38) { // قفز
        if (!dino.classList.contains('animateDino')) {
            dino.classList.add('animateDino');
            setTimeout(() => {
                dino.classList.remove('animateDino');
            }, 1200); // زيادة مدة القفز
        }
    }
    if (e.keyCode == 39) { // تحرك يمينًا
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.keyCode == 37) { // تحرك يسارًا
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
};

setInterval(() => {
    let dino = document.querySelector('.dino');
    let gameOver = document.querySelector('.gameOver');
    let obstacle = document.querySelector('.obstacle');
    
    let dinoRect = dino.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();
    
    if (
        dinoRect.left < obstacleRect.right &&
        dinoRect.right > obstacleRect.left &&
        dinoRect.top < obstacleRect.bottom &&
        dinoRect.bottom > obstacleRect.top &&
        !gameOverFlag
    ) {
        gameOver.innerHTML = "Game Over - Click to Restart";
        obstacle.style.animation = 'none';
        audiogo.play();
        audio.pause(); // إيقاف الموسيقى عند الاصطدام
        gameOverFlag = true;
        clearInterval(scoreInterval); // إيقاف تسجيل النقاط بعد الاصطدام
        document.addEventListener('click', restartGame);
    }
}, 10);

// تحديث النقاط كل 100 مللي ثانية طالما لم يحدث اصطدام
let scoreInterval = setInterval(() => {
    if (!gameOverFlag) {
        score += 1;
        updateScore(score);
    }
}, 100);

function updateScore(score) {
    let scoreCont = document.querySelector('#scoreCont');
    scoreCont.innerHTML = "Your Score: " + score;
}

function restartGame() {
    location.reload(); // إعادة تحميل اللعبة عند النقر على الشاشة
}
