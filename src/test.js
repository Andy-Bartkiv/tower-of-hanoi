import createComponent from './handling-dom';
import calcTowerBuild from './recursive';
import shuffleDisks from './shuffle';
import './style-test.css';

const aliasTranslate = (x,y) => `translate(calc(${x-1}*(50vw - (100vw/6))), calc(${y}*8vh))`

// service functions
const log = console.log;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const body = document.body;
const container = createComponent('div', body, ['container']);
const root = document.querySelector(':root');

function autoDM() {
    log('auto');
    GameState.instructions = calcTowerBuild(GameState.towers, TargetTower);
    for (let w = maxDisk; w > maxDisk - GameState.numDisk; w--) {
        let drg = document.getElementById(`d-${w}`);
        drg.setAttribute('draggable', false);
        // log(drg)
        // drg.removeEventListener('dragstart', () => handleDragStart(drg, w));
        // drg.removeEventListener('dragend', null);
    }
}

function ManDM() {
    log('manual')
    for (let w = maxDisk; w > maxDisk - GameState.numDisk; w--) {
        let drg = document.getElementById(`d-${w}`);
        drg.setAttribute('draggable', false);
        // log(drg.draggable, drg);

        const {x, y} = getXY(w);
        // log(x,y);
        const minW =  Math.min(...GameState.towers[x]);
        // if (w === minW) {
        if (true) {
            drg.draggable = 'true';
            drg.addEventListener('dragstart', () => {
                handleDragStart(drg, w);
            });   
            drg.addEventListener('dragend', () => {
                drg.classList.remove('dragging'); 
                const hintDisks = [...document.querySelectorAll('.hint-disk')];
                hintDisks.forEach(el => field.removeChild(el));
            });

        }
        
        

    }
    document.addEventListener('drop', (ev) => {
        const tSrc = GameState.activeDisk.pos.x;
        const tTgt = 1 * ev.target.id.slice(-1);
        GameState.towers[tSrc].pop();
        GameState.towers[tTgt].push(GameState.activeDisk.weight);
        GameState.history.push([tSrc, tTgt]);
        showMoveCnt();
        GameState.activeDisk.element.style.transform = ev.target.style.transform;
    }); 
        
};

function handleDragStart(drg, w) {
    let towers = GameState.towers;
    GameState.activeDisk = getDiskByID(`d-${w}`);
    log(GameState.activeDisk)
    drg.classList.add('dragging');
    const {x, y} = getXY(w);
    // log(x,y);
    towers.forEach((t, i) => {
        const maxW = (t.length > 0) ? t[t.length-1] : maxDisk+10;
        if (i !== x && w < maxW) {
            const el = createComponent('div', field, ['hint-disk', `disk-${w}`], `h-${i}`);
            // el.style.transform = `translate(calc(${i-1}*(50vw - (100vw/6))), calc(${maxDisk - t.length}*8vh))`;
            el.style.transform = aliasTranslate(i, maxDisk - t.length);
            el.addEventListener('dragover', (ev) => {
                ev.preventDefault();
            });
        }
    })
}

// Repositioning Element via CSS-animation
function animateElementMove(x0, y0, x6, y6) {
    const el = GameState.activeDisk.element;
    const elClass = 'moving-over-top';
    el.classList.add(elClass);
    // set animation variables for CSS animation
    root.style.setProperty('--x0', `${x0 - 1}`);
    root.style.setProperty('--y0', `${y0}`);   
    root.style.setProperty('--x6', `${x6 - 1}`);
    root.style.setProperty('--y6', `${y6}`);
    el.addEventListener('animationend', () => {
        // el.style.transform = `translate(calc(${x6-1}*(50vw - (100vw/6))), calc(${y6}*8vh))`;
        el.style.transform = aliasTranslate(x6, y6);
        el.classList.remove(elClass);
    })
}

// show one Disk reposition animation "over-top"
function animateOneMove([tSrc, tTgt]) {
    // Select active Disc
    // const topDiskAtTower = GameState.towers[tSrc].length;
    const freePositionAtTower = (tower) => GameState.towers[tower].length;
    if (freePositionAtTower(tSrc) > 0)
        GameState.activeDisk = getDiskByID(`d-${GameState.towers[tSrc][freePositionAtTower(tSrc) - 1]}`);
    let x0 = tSrc;
    let y0 = GameState.activeDisk.pos.y;
    let x6 = tTgt;
    let y6 = maxDisk - freePositionAtTower(tTgt);
    // updating TOWERS
    GameState.towers[tSrc].pop();
    GameState.towers[tTgt].push(GameState.activeDisk.weight);
    animateElementMove(x0, y0, x6, y6);
    GameState.activeDisk.pos = {x : x6, y : y6};
}

// move all disks simultaneously at round start
function repositionAllDisks(towersSrc, towersTgt) {
    for (let weight = maxDisk; weight > maxDisk - GameState.numDisk; weight--) {
        let { x : x0, y : y0 } = getXY(weight, towersSrc);
        let { x : x6, y : y6 } = getXY(weight, towersTgt);
        // log(weight, ':', x0, y0, x6, y6);
        const el = document.getElementById(`d-${weight}`);
        el.animate([ 
            // { transform :`translate(calc(${x0-1}*(50vw - (100vw/6))), calc(${y0}*8vh)` },
            { transform : aliasTranslate(x0, y0) },
            { transform : aliasTranslate(x6, y6) }
        ], GameState.animationDelay/2);
        el.style.transform = aliasTranslate(x6, y6);
    }
};

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

// Start of Each new round
function restart(rnd = 'rnd') {
    GameState.solvingAll = false;
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
        const el = document.getElementById(`d-${weight}`)
        // add disks if new numDisk is bigger than previous
        if (weight > maxDisk - GameState.numDisk && !el) {
            createComponent('div', field, ['disk', `disk-${weight}`], `d-${weight}`);
            GameState.towers[0].push(weight);
        // else remove disks from previous round should
        } else if (weight <= maxDisk - GameState.numDisk && el) { 
            el.remove();    
        }
    }

    const oldTowers = JSON.parse(JSON.stringify(GameState.towers));
    // create new Disks position at the field
    GameState.towers = shuffleDisks(GameState.numDisk, rnd);
    // GameState.towers = (rnd === 'rnd') 
    //     ? randomizeDisks(GameState.numDisk)
    //     : normalizeDisks(GameState.numDisk);
    // position Disks at the field according to new Towers array
    repositionAllDisks(oldTowers, GameState.towers);
    // Calculate Instructions to solve the puzzle with new Disks position
    GameState.instructions = calcTowerBuild(GameState.towers, TargetTower);
    showMoveCnt();
};

// - - - END OF FUNCTIONS BLOCK - - -

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
    manual: true,
    activeDisk : {
        weight: maxDisk,
        pos : {'x': 0, 'y': 0},
        element : '',
    }
}
 
// indication of current Parent Element to append or remove new elements
let parentElement = container;
// Top Menu
const topMenu = createComponent('div', parentElement, ['menu', 'top-menu'] );
// Game Field
const field = createComponent('div', parentElement, ['field']);
// Bottom Menu
const bottomMenu = createComponent('div', parentElement, ['menu', 'bottom-menu']);

// TOP - MENU BUTTONS
parentElement = topMenu;

// switch between Auto and Manual solving
const btnManual = createComponent('button', parentElement, ['btn'], 'btn-manual', '');
btnManual.innerHTML = (GameState.manual) ? 'Man' : 'Auto';
btnManual.addEventListener('click', () => {
    GameState.manual = !GameState.manual;
    if (GameState.manual) ManDM();
    else autoDM();
    btnManual.innerHTML = (GameState.manual) ? 'Man' : 'Auto';
    
});

// input for number of Disks for the next round
const numberDisks = createComponent('input', parentElement, ['input'], 'number',);
numberDisks.type = 'number';
numberDisks.min = '2';
numberDisks.max = '8';
numberDisks.value = `${GameState.numDisk}`;

// Btn - RESTART-RND
const btnRND = createComponent('button', parentElement, ['btn'], 'btn-rnd', 'RND');
btnRND.addEventListener('click', () => { if (!GameState.animationInProgress) restart('rnd')});
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
// btn to STOP solving puzzle
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

// first round starting from tower 0
restart(0);