const timer = document.getElementById('timer');
const main = document.getElementById('main');
const startBtn = document.getElementById('start-btn');
const endBtn = document.getElementById('end-btn');
const computerImg = document.querySelector('.computer-img');
const userImg = document.querySelector('.user-img');
const firstTitle = document.querySelector('.first-signal');
const secondTitle = document.querySelector('.second-signal');
const thirdTitle = document.querySelector('.third-signal');
const result = document.querySelector('.result-title');
const won = document.querySelector('.won');
const rockBtn = document.querySelector('.user-rock');
const scissorsBtn = document.querySelector('.user-scissors');
const paperBtn = document.querySelector('.user-paper');

const startTime = 3;
let time = startTime;
let win = null; // 이긴사람
let whosAttack = null;
let userStatus = null;
let computerStatus = null;
let currentGame = 'gaBaBo';
let index = 0;

const title = [firstTitle, secondTitle, thirdTitle];

const rockScissorsPaperKoran = {
    rock: '묵',
    scissors: '찌',
    paper: '빠',
},
    rockScissorsPaperIndex = {
        0: "rock",
        1: "scissors",
        2: "paper",
    },
    computerImages = {
        rock: "url('images/computer_rock.png')",
        scissors: "url('images/computer_scissors.png')",
        paper: "url('images/computer_paper.png')",
    },
    userImages = {
        rock: "url('./images/user_rock.png')",
        scissors: "url('./images/user_scissors.png')",
        paper: "url('./images/user_paper.png')",
    };

// 시작 전 3초 타이머
const setTimer = () => {
    timer.style.display = 'block';
    const interval = setInterval(() => {
        time = time - 1;
        timer.innerText = time;
    }, 1000);
    setTimeout(async () => { // 3초 뒤 실행
        clearInterval(interval);
        timer.style.display = 'none';
        await setComputerStatus(3); // 컴퓨터가 낼거 결정하기(가위-바위-보)
        await titleAnimation();
        main.style.display = 'block';
    }, 3000);
}

// 스타트 버튼 누르면 글자와 버튼이 없어짐
const hiddentTextBtn = () => {
    if (startBtn.style.display !== 'none') {
        startBtn.style.display = 'none';
        setTimer();
    }
    else {
        startBtn.style.display = 'block';
    }
}

// 어게인 버튼 누름
const showEndBtn = () => {
    location.reload();
}

const titleAnimation = async () => {
    const interval = setInterval(() => { // 1초마다 반복 수행
        if(index >= 0 && index < 3) {
            title[index].style.display = 'inline-block';
            index += 1;
        }
    }, 1000);
    setTimeout(() => {
        clearInterval(interval);
    }, 4000);
}

// 랜덤하게 컴퓨터가 냄
const setComputerStatus = async (sec) => {
    computerStatus = rockScissorsPaperIndex[Math.floor(Math.random() * 3)];
    setTimeout(() => {
        computerImg.style.backgroundImage = computerImages[computerStatus];
    }, sec * 1000 -10)
}

// 사용자가 결정
const onClickStatus = async (status) => {
    userStatus = status;
    userImg.style.backgroundImage = userImages[userStatus];
    await compareStatus();
}

const endMuk = () => { // 게임 종료!
    endBtn.style.display = 'block';
    if(win === 'user') result.innerHTML = "승리!!!😻"
    else result.innerHTML = "패배...😮‍💨"
    rockBtn.style.display = 'none';
    scissorsBtn.style.display = 'none';
    paperBtn.style.display = 'none';
}
// 가위바위보
const compareStatus = async () => {
    if (userStatus === computerStatus) { // 비긴 경우
        // gaBabo 다시 정하기 // 
        if (currentGame === 'gaBaBo') {
            userStatus = null;
            await setComputerStatus(3);
            index = 0;
            firstTitle.style.display = 'none';
            secondTitle.style.display = 'none';
            thirdTitle.style.display = 'none';
            await titleAnimation();
        } else { // 묵찌빠 비김
            firstTitle.style.display = 'none';
            secondTitle.style.display = 'none';
            thirdTitle.style.display = 'none';
            endMuk();
        }

    } else { // 승부가 결정된 경우
        currentGame = 'mukChiBa';
        if (userStatus === 'scissors' && computerStatus === 'rock'
            || userStatus === 'rock' && computerStatus === 'paper'
            || userStatus === 'paper' && computerStatus === 'scissors') {
            win = 'computer'; // 컴퓨터가 이김
            await mukChiBaRule();
        } else {
            win = 'user'; // 유저가 이김
            await mukChiBaRule();
        }
    }
}
//묵찌빠
const mukChiBaRule = async () => {
    if (currentGame = 'mukChiBa') {
        firstTitle.style.display = 'none';
        secondTitle.style.display = 'none';
        thirdTitle.style.display = 'none'; 
        let prevResult = win === 'user' ? userStatus : computerStatus;

        if (win === null) endMuk();
        else if (win === 'user') {
            index = 0;
            await setComputerStatus(3);
            firstTitle.innerHTML = rockScissorsPaperKoran[prevResult];
            secondTitle.innerHTML = rockScissorsPaperKoran[prevResult];
            thirdTitle.innerHTML = rockScissorsPaperKoran[userStatus];
            await titleAnimation();

            setTimeout(() => { // 3초 후
                compareStatus(); //승패 판별
            }, 3000);
        } else {
            index = 0;
            await setComputerStatus(3);
            firstTitle.innerHTML = rockScissorsPaperKoran[prevResult];
            secondTitle.innerHTML = rockScissorsPaperKoran[prevResult];
            thirdTitle.innerHTML = rockScissorsPaperKoran[computerStatus];
            await titleAnimation();
            
            setTimeout(() => { // 3초 후
                compareStatus(); //승패 판별
            }, 3000);
        }
    }
}

