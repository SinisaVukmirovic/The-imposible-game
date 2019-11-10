const startBtn = document.querySelector('#start-btn');
const screens = document.querySelectorAll('.screen');
const chooseFrameBtns = document.querySelectorAll('.choose-frame-btn');
const gameArea = document.querySelector('.game-area');
const timeEl = document.querySelector('#time');
const scoreEl = document.querySelector('#score');
const annoyingMsg = document.querySelector('#annoying-msg');
let seconds = 0;
let score = 0;
let selectedFrame = {};

startBtn.addEventListener('click', () => {
	screens[0].classList.add('up');
});

chooseFrameBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		const img = btn.querySelector('img');
		const src = img.getAttribute('src');
		const alt = img.getAttribute('alt');
		selectedFrame = {
			src,
			alt
		};
		screens[1].classList.add('up');
		setTimeout(createLogo, 1000);
		startGame();
	});
});

function createLogo() {
	const logo = document.createElement('div');
	const { x, y } = getRandomLocation();
	logo.classList.add('logo');
	logo.style.left = `${x}px`;
	logo.style.top = `${y}px`;
	logo.innerHTML = `<img src="${selectedFrame.src}" alt="${selectedFrame.alt}" />`;
	logo.addEventListener('click', catchLogo);

	gameArea.appendChild(logo);
}

function catchLogo() {
	increaseScore();
	this.classList.add('catched');
	setTimeout(() => {
		this.remove();
	}, 2000);
	addLogos();
}

function increaseTime() {
	let m = Math.floor(seconds / 60);
	let s = seconds % 60;
	m = m < 10 ? `0${m}` : m;
	s = s < 10 ? `0${s}` : s;
	timeEl.innerHTML = `Time: ${m}:${s}`;

	seconds++;
}

function addLogos() {
	setTimeout(createLogo, 1000);
	setTimeout(createLogo, 1500);
}

function increaseScore() {
	score++;
	if (score > 20) {
		annoyingMsg.classList.add('visible');
	}
	scoreEl.innerHTML = `Score: ${score}`;
}

function getRandomLocation() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	const x = Math.random() * (width - 200) + 100;
	const y = Math.random() * (height - 200) + 100;

	return {
		x,
		y
	};
}

function startGame() {
	setInterval(increaseTime, 1000);
}