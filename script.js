let currentLevel = 5; // เริ่มต้นจากตัวเลข 1 ถึง 5
let maxLevel = 20; // สูงสุดถึงตัวเลข 1 ถึง 20
let currentNumbers = [];
let startTime, endTime, timerInterval; // ตัวแปรสำหรับจับเวลา
let levelTimes = []; // ตัวแปรเก็บเวลาที่ใช้ในแต่ละด่าน
let gameStarted = false; // ตัวแปรเช็คสถานะเกมเริ่มแล้วหรือไม่
let currentTime = 0; // เก็บเวลาปัจจุบันระหว่างเกม

const gameBoard = document.getElementById("game-board");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const scoreboard = document.getElementById("scoreboard");

// ฟังก์ชันเริ่มจับเวลา
function startTimer() {
    startTime = new Date();
    currentTime = 0;

    // เริ่มการนับเวลาเรียลไทม์ทุก 100 มิลลิวินาที
    timerInterval = setInterval(() => {
        const now = new Date();
        currentTime = (now - startTime) / 1000; // คำนวณเวลาปัจจุบันในหน่วยวินาที
        updateScoreboard(); // อัปเดตสกอร์บอร์ดเวลาปัจจุบันใน UI
    }, 100); // อัปเดตทุก 100 มิลลิวินาที
}

// ฟังก์ชันหยุดจับเวลาและคำนวณเวลาที่ใช้
function stopTimer() {
    clearInterval(timerInterval); // หยุดการนับเวลาแบบเรียลไทม์
    endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000; // คำนวณเวลาที่ใช้ในหน่วยวินาที
    levelTimes.push(timeTaken); // บันทึกเวลาในแต่ละด่าน
    updateScoreboard(); // แสดงเวลาทั้งหมดในสกอร์บอร์ด
}

// ฟังก์ชันอัปเดตสกอร์บอร์ด
function updateScoreboard() {
    scoreboard.innerHTML = `<h3>Level ${currentLevel}</h3>`;
    levelTimes.forEach((time, index) => {
        scoreboard.innerHTML += `<p>Level ${index + 1}: ${time.toFixed(2)} seconds</p>`;
    });
    if (gameStarted) {
        scoreboard.innerHTML += `<p>Current Level: ${currentTime.toFixed(2)} seconds</p>`;
    }
}

// ฟังก์ชันแสดงผลเกม
function renderGame() {
    gameBoard.innerHTML = '';
    currentNumbers.forEach((number, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        if (number === "") {
            card.classList.add('empty');
        } else {
            card.textContent = number;
            card.addEventListener('click', () => moveCard(index));
        }
        gameBoard.appendChild(card);
    });
}

// ฟังก์ชันการขยับตัวเลขกับช่องว่าง
function moveCard(index) {
    if (!gameStarted) return; // ถ้าเกมยังไม่เริ่ม จะไม่ให้ขยับ

    const emptyIndex = currentNumbers.indexOf(""); // หาตำแหน่งของช่องว่าง
    if (Math.abs(index - emptyIndex) <= 3) {
        [currentNumbers[emptyIndex], currentNumbers[index]] = [currentNumbers[index], currentNumbers[emptyIndex]];
        renderGame();
        checkWin();
    }
}

// ฟังก์ชันเช็คการชนะ
function checkWin() {
    const winCondition = Array.from({ length: currentLevel }, (_, i) => i + 1);
    const currentCondition = [...currentNumbers].filter(n => n !== "");

    if (winCondition.toString() === currentCondition.toString() && currentNumbers[currentLevel] === "") {
        stopTimer(); // หยุดจับเวลาเมื่อผ่านด่าน
        if (currentLevel === maxLevel) {
            setTimeout(() => alert("ยินดีด้วย! คุณชนะเกมแล้ว!"), 200);
        } else {
            setTimeout(() => {
                alert("คุณเรียงตัวเลขถูกต้อง! ไปยังระดับต่อไป");
                currentLevel += 1;
                currentNumbers = generateNumbers(currentLevel);
                renderGame();
                startTimer(); // เริ่มจับเวลาใหม่เมื่อผ่านด่าน
            }, 200);
        }
    }
}

// ฟังก์ชันสร้างตัวเลข
function generateNumbers(level) {
    const numbers = Array.from({ length: level }, (_, i) => i + 1);
    numbers.push(""); // เพิ่มช่องว่าง
    return shuffle(numbers); // สุ่มตำแหน่ง
}

// ฟังก์ชันเริ่มเกม
startButton.addEventListener('click', () => {
    if (!gameStarted) {
        currentLevel = 1; // เริ่มที่ระดับ 5
        levelTimes = [];
        currentNumbers = generateNumbers(currentLevel);
        gameStarted = true;
        renderGame();
        startTimer(); // เริ่มจับเวลา
    }
});

// ฟังก์ชันสุ่มตำแหน่งตัวเลข
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}