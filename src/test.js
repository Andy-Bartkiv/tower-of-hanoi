import createComponent from './handling-dom.js'
import './style-test.css';

// provides Delay in "ms" before execution portion of code, which follows .THEN, when function called
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function MDP() {
    // for (let weight = maxDisk; weight > maxDisk - GameState.numDisk; weight--) {
    //     let disk = document.getElementById(`disk-${weight}`);
    //     disk.draggable = 'true';
        // log(disk);
    // }
    let disk = document.getElementById(`disk-${maxDisk - GameState.numDisk + 1}`);
    disk.draggable = 'true';
};

function dragstart_handler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("text/plain", ev.target.id);
};

// window.addEventListener('DOMContentLoaded', (weight) => {
//     // Get the element by id
//     const element = document.getElementById(`disk-4`);
//     // Add the ondragstart event listener
//     element.addEventListener("dragstart", dragstart_handler);
//   });


const log = console.log;
const body = document.body;
const container = createComponent('div', body, ['container']);
const root = document.querySelector(':root');

function positionElement(e) {
    // log(e.weight, e.pos.x-1, e.pos.y);
    e.element.style.transform = `translate(calc(${e.pos.x-1}*(50vw - (100vw/6))), calc(${e.pos.y}*8vh))`;
}

// Repositioning Element via CSS-animation
function animateElementMove(x0, y0, x6, y6) {
    const el = GameState.activeDisk.element;
    const elClass = 'moving-over-top';
    root.style.setProperty('--x0', `${x0 - 1}`);
    root.style.setProperty('--y0', `${y0}`);   
    root.style.setProperty('--x6', `${x6 - 1}`);
    root.style.setProperty('--y6', `${y6}`);
    el.classList.add(elClass);
    el.addEventListener('animationend', () => {
        el.classList.remove(elClass);
        el.style.transform = `translate(calc(${x6-1}*(50vw - (100vw/6))), calc(${y6}*8vh))`;
    })
}

function animateOneMove([tSrc, tTgt]) {
    // Select active Disc
    const topDiskAtTower = GameState.towers[tSrc].length;
    if (topDiskAtTower > 0)
        GameState.activeDisk = getDiskByID(`disk-${GameState.towers[tSrc][topDiskAtTower - 1]}`);
    let x0 = tSrc;
    let y0 = GameState.activeDisk.pos.y;
    let x6 = tTgt;
    let y6 = maxDisk - GameState.towers[tTgt].length;
    // updating TOWERS
    GameState.towers[tSrc].pop();
    GameState.towers[tTgt].push(GameState.activeDisk.weight);
    animateElementMove(x0, y0, x6, y6);
    GameState.activeDisk.pos = {x : x6, y : y6};
}

// move all disks simultaneously
function moveAllDisks(towersSrc, towersTgt) {
    for (let weight = maxDisk; weight > maxDisk - GameState.numDisk; weight--) {
        let { x : x0, y : y0 } = getXY(weight, towersSrc);
        let { x : x6, y : y6 } = getXY(weight, towersTgt);
        log(weight, ':', x0, y0, x6, y6);
        const el = document.getElementById(`disk-${weight}`);
        el.animate([ 
            { transform :`translate(calc(${x0-1}*(50vw - (100vw/6))), calc(${y0}*8vh)` },
            { transform :`translate(calc(${x6-1}*(50vw - (100vw/6))), calc(${y6}*8vh)` }
        ], GameState.animationDelay);
        el.style.transform = `translate(calc(${x6-1}*(50vw - (100vw/6))), calc(${y6}*8vh))`;
    }
}

// go forward one move
function goForward() {
	if (GameState.instructions.length > 0 && !GameState.animationInProgress) {
        const move = GameState.instructions.shift();
		animateOneMove(move);
        GameState.history.push(move);
        showMoveCnt();
    }
    if (GameState.instructions.length === 0)
        GameState.solvingAll = false;
};

// go back one move
function goBack() {
	if (GameState.history.length > 0 && !GameState.animationInProgress) {
        const move = GameState.history.pop();
		animateOneMove([move[1], move[0]]);
        GameState.instructions.unshift(move);
        showMoveCnt();
    }
};

function showMoveCnt() {
    displayCounter.innerHTML = GameState.history.length;
};

function showAnimationDelay() {
    let res = { 2000:'1/4x', 1000:'1/2x', 500:'1 x', 250:'2 x', 125:'4 x' };
    displayDelay.innerHTML = res[GameState.animationDelay];
};

// changing animation speed (delay): double orr half
function changeDelay(sign) {
    GameState.animationDelay = (sign >= 0)
        ? (GameState.animationDelay < 2000) ? GameState.animationDelay * 2 : GameState.animationDelay
        : (GameState.animationDelay > 125) ? GameState.animationDelay / 2 : GameState.animationDelay;
    root.style.setProperty('--anim-delay', `${GameState.animationDelay/1000}s`);
    showAnimationDelay();
};

// getting position of the disc in a "towers" array
function getXY(weight, towers = GameState.towers) {
    let x = towers.findIndex(twr => twr.includes(weight));
    let y = maxDisk - towers[x].indexOf(weight);
    return { 'x': x, 'y': y };
};

function getDiskByID(id) {
    const element = document.getElementById(id);
    const weight = element.id.slice(-1) * 1;
    return { 'weight' : weight, 'pos': getXY(weight), 'element' : element};
};

function randomizeDisks(numD, maxD = 8, twrs = 3) {
    let res = [[],[],[]];
    for (let w = maxD ; w > maxD - numD; w--) {
        res[Math.floor(Math.random() * twrs)].push(w);
    }
    return res;
};

function normalizeDisks(numD, tSrc = 0, maxD = 8) {
    let res = [[],[],[]];
    for (let w = maxD; w > maxD - numD; w--) {
        res[tSrc].push(w);
    }  
    return res;
};

function initField() {
    // creating initial Disks disposition = normal-tower at Source Tower
    GameState.towers = normalizeDisks(GameState.numDisk, SourceTower);
    // add and position Disk elements at the field
    for (let weight = maxDisk; weight > maxDisk - GameState.numDisk; weight--) {
        createComponent('div', field, ['disk'], `disk-${weight}`);
        positionElement(getDiskByID(`disk-${weight}`));
    }
    // Calculate Instructions to solve the puzzle
    GameState.instructions = calcTowerMove(GameState.numDisk, SourceTower, TargetTower);
    // synchronize delay values between js and css
    root.style.setProperty('--anim-delay', `${GameState.animationDelay/1000}s`);
};

function restart(rnd = 'rnd') {
    console.log('restart Game'); 
    // clearing history array;
    GameState.history = [];
    // reset animation speed;
    GameState.animationDelay = animationNorm;
    root.style.setProperty('--anim-delay', `${GameState.animationDelay/1000}s`);
    showAnimationDelay();
    // read number of Disks from input field
    GameState.numDisk = numberDisks.value;
    // update new disks amount
    for (let weight = maxDisk; weight > maxDisk - 8; weight--) {
        const el = document.getElementById(`disk-${weight}`)
        // add disks if new numDisk is bigger than previous
        if (weight > maxDisk - GameState.numDisk && !el) {
            createComponent('div', field, ['disk'], `disk-${weight}`);
            GameState.towers[0].push(weight);
        // else remove disks from previous round should
        } else if (weight <= maxDisk - GameState.numDisk && el) { 
            el.remove();    
        }
    }
    for (let weight = maxDisk; weight > maxDisk - GameState.numDisk; weight--) {
        // positionElement(getDiskByID(`disk-${weight}`));
    }
    const oldTowers = JSON.parse(JSON.stringify(GameState.towers));

    // creating initial Disks disposition
    GameState.towers = (rnd === 'rnd') 
        ? randomizeDisks(GameState.numDisk)
        : normalizeDisks(GameState.numDisk, rnd);

    moveAllDisks(oldTowers, GameState.towers);

    // position Disks at the field according to Towers array
    for (let weight = maxDisk; weight > maxDisk - GameState.numDisk; weight--) {
        // positionElement(getDiskByID(`disk-${weight}`));
    }
    // Calculate Instructions to solve the puzzle
    GameState.instructions = calcTowerBuild(GameState.towers, TargetTower);
    showMoveCnt();
};

// Returns set of instructions to move whole Tower (normalized, i.e. 4-3-2-1)
// with max Disk "weight", from Source Tower to Target Tower
function calcTowerMove(weight, tSrc, tTgt) {
    let res = []; 
    if (weight > 0) {
      const tAux = 3 - tSrc - tTgt;
      res.push(...calcTowerMove(weight-1, tSrc, tAux));
      res.push([tSrc, tTgt]);
      res.push(...calcTowerMove(weight-1, tAux, tTgt));
    }
    return res;
};

// Returns set of instructions to build Tower of Disks (from random Disks position) at Target Tower
function calcTowerBuild(initTowers, tTgt) {
		let res = [];
		// deep copy of Towers array
		const newTowers = JSON.parse(JSON.stringify(initTowers));
		// Values for Max and Min weight of Disks in new Towers array
		const maxW = Math.max(...newTowers.map(t => Math.max(...t)));
		const minW = Math.min(...newTowers.map(t => Math.min(...t)));
		// determine Source (where maxW Disk is located) and Auxillary Towers
		const tSrc = newTowers.findIndex(t => t.includes(maxW)); 
		const tAux = 3 - tSrc - tTgt;
		// Combine Recursive Tower building and Tower moving algorithms
		if (tSrc >= 0) {
			newTowers[tSrc].shift();
			if (tSrc === tTgt) { // if heaviest Disk in new Array is at Target Tower already
				res.push(...calcTowerBuild(newTowers, tTgt))
			} else { // if it is not 
				res.push(...calcTowerBuild(newTowers, tAux));
				res.push([tSrc, tTgt]);
				res.push(...calcTowerMove(maxW - minW, tAux, tTgt));	
			}
		}
  return res;
};

const maxDisk = 8;
const animationNorm = 500;
const SourceTower = 0;
const TargetTower = 2;

const GameState = {
    towers : [[], [], []], // three arrays representing 3 Towers of Hanoi
    history : [], // storing moves, that are already made
    numDisk : 5, // Number of disks for current game-round
    instructions : [], // set of instructions to solve puzzle from current positions
    animationDelay : animationNorm,
    animationInProgress : false,
    solvingAll : false,
    manual: false,
    activeDisk : {
        weight: maxDisk,
        pos : {'x': 0, 'y': 0},
        element : '',
    }
}
 
// const container = document.querySelector('.container');
// indication of current Parent Element to append or remove new elements
let parentElement = container;
// Top Menu
const topMenu = createComponent('div', parentElement, ['menu', 'top-menu'] );
// Game Field
const field = createComponent('div', parentElement, ['field']);
initField();
// Bottom Menu
const bottomMenu = createComponent('div', parentElement, ['menu', 'bottom-menu']);

// TOP - MENU BUTTONS
parentElement = topMenu;

const btnManual = createComponent('button', parentElement, ['btn'], 'btn-manual', 'Auto');
// const updateBtnManual = () => btnManual.innerHTML = (GameState.manual) ? 'Man' : 'Auto';
btnManual.addEventListener('click', () => {
    GameState.manual = !GameState.manual;
    btnManual.innerHTML = (GameState.manual) ? 'Man' : 'Auto';
    MDP();
});

const numberDisks = createComponent('input', parentElement, ['input'], 'number',);
numberDisks.type = 'number';
numberDisks.min = '2';
numberDisks.max = '8';
numberDisks.value = `${GameState.numDisk}`;
// Btn - RESTART-RND
const btnRND = createComponent('button', parentElement, ['btn'], 'btn-rnd', 'RND');
btnRND.addEventListener('click', () => restart('rnd'));
// Btn - RESTART-NORM
const btnNorm = createComponent('button', parentElement, ['btn'], 'btn-norm', 'Norm');
btnNorm.addEventListener('click', () => { if (!GameState.animationInProgress) restart(0)});
// Btn - Go Back One Move
const btnGoBack = createComponent('button', parentElement, ['btn'], 'btn-go-back', '{--');
btnGoBack.addEventListener('click', goBack);
// Display number of Moves made
const displayCounter = createComponent('div', parentElement, ['btn'], 'display-counter', '0');

// Bottom-MENU Buttons
parentElement = bottomMenu;
// INCREASE Animation delay btn
const btnIncDelay = createComponent('button', parentElement, ['btn'], 'inc-del', '---');
btnIncDelay.addEventListener('click', () => changeDelay(+1));
// Display Animation Speed
const displayDelay = createComponent('div', parentElement, ['btn'], 'display-delay', `1 x`);
// Decrease Animation delay btn
const btnDecDelay = createComponent('button', parentElement, ['btn'], 'inc-del', '+++');
btnDecDelay.addEventListener('click', () => changeDelay(-1));

// FORWARD 1 step button
const btnOneStep = createComponent('button', parentElement, ['btn'], 'btn-one-step', 'A >');
btnOneStep.addEventListener('click', goForward);
// SOLVE puzzle to the end
const btnForward = createComponent('button', parentElement, ['btn'], 'btn-forward', '>>>');
// btnForward.addEventListener('click', startSolving);
btnForward.addEventListener('click', () => {
    GameState.solvingAll = true;
    goForward();
});
// puzzle to the end
const btnStop = createComponent('button', parentElement, ['btn'], 'btn-stop', '[_]');
btnStop.addEventListener('click', () => GameState.solvingAll = false );

// Event Listeners for Animation purpose
field.addEventListener('animationstart', () => {
    GameState.animationInProgress = true;
});
field.addEventListener('animationend', () => {
    GameState.animationInProgress = false;
    if (GameState.solvingAll) goForward();
});