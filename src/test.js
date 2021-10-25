import createComponent from './modules/handling-dom';
import calcTowerBuild from './modules/recursive';
import shuffleDisks from './modules/shuffle';
import mobileAndTabletCheck from './modules/mobile-and-tablet-check'
import './style-test.css';
import 'material-icons/iconfont/filled.css';

// service functions
const log = console.log;
const copyArray = (arr) => JSON.parse(JSON.stringify(arr));
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const aliasTranslate = (x,y) => `translate(calc(${x-1}*(50vw - (100vw/6))), calc(${y}*8vh))`;

function switchAutoManual() {
    GameState.manual = !GameState.manual;
    log('changing Mode')
    if (GameState.manual) ManDM();
    else autoDM();
    // btnManual.innerHTML = (GameState.manual) ? 'Man' : 'Auto';
}

function autoDM() {
    log('auto');
    GameState.instructions = calcTowerBuild(GameState.towers, TargetTower);
    for (let w = maxDisk; w > maxDisk - GameState.numDisk; w--) {
        document.getElementById(`d-${w}`).setAttribute('draggable', false);
    }   
}

function ManDM() {
    log('manual')
    for (let w = maxDisk; w > maxDisk - GameState.numDisk; w--) {
        let drg = document.getElementById(`d-${w}`);
        const minW =  Math.min(...GameState.towers[getXY(w).x]);
        if (w === minW) drg.setAttribute('draggable', true) 
        else drg.setAttribute('draggable', false);
    }   
};

function addDragListeners(element) {
    // check if drag s legal and show possible landings (hints)
    element.addEventListener('dragstart', (event) => {
        const w = 1 * event.target.id.slice(-1);
        GameState.activeDisk = getDiskByID(`d-${w}`);
        const x = GameState.activeDisk.pos.x;
        const tower = GameState.towers[x];
        // if dragging disk is currently at the top of its tower
        if (w == tower[tower.length - 1]) {
            event.target.classList.add('dragging');
            GameState.towers.forEach((tower, i) => {
                // check if each of two other towers has bigger disks at the top 
                const maxW = (tower.length > 0) ? tower[tower.length-1] : maxDisk+100;
                if (i !== x && w < maxW) {
                    // creating landing zones, as targets at 'drop' eventListener
                    const landingZone = createComponent('div', field, ['hint-disk', `disk-${w}`], `h-${i}`);
                    landingZone.style.transform = aliasTranslate(i, maxDisk - tower.length);
                    landingZone.addEventListener('dragover', (ev) => {
                        ev.preventDefault();
                    });
                };
            });
        };
    });
    // remove dragging class from active Disk and landing Zones
    element.addEventListener('dragend', (event) => {
        event.target.classList.remove('dragging'); 
        [...document.querySelectorAll('.hint-disk')].forEach(el => field.removeChild(el));
    });
    // successful drop handling
    element.addEventListener('drop', (event) => {
        const tSrc = GameState.activeDisk.pos.x;
        const tTgt = 1 * event.target.id.slice(-1);
        GameState.towers[tSrc].pop();
        // disk at Target tower should become NOT draggable
        const notDrg = Math.min(...GameState.towers[tTgt]);
        if (notDrg < maxDisk + 1)document.getElementById(`d-${notDrg}`).setAttribute('draggable', false);
        GameState.towers[tTgt].push(GameState.activeDisk.weight);
        GameState.history.push([tSrc, tTgt]);
        // disk at Source tower should become YES draggable
        const yesDrg = Math.min(...GameState.towers[tSrc]);
        if (yesDrg < maxDisk + 1) document.getElementById(`d-${yesDrg}`).setAttribute('draggable', true);
        // actually reposition active Disk to the new tower
        GameState.activeDisk.element.style.transform = event.target.style.transform;
        showMoveCnt();
    }); 
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
        el.style.transform = aliasTranslate(x6, y6);
        el.classList.remove(elClass);
    })
}

// show one Disk reposition animation "over-top"
function animateOneMove([tSrc, tTgt]) {
    // Select active Disc
    const freePositionAtTower = (tower) => GameState.towers[tower].length;
    if (freePositionAtTower(tSrc) > 0)
        GameState.activeDisk = getDiskByID(`d-${GameState.towers[tSrc][freePositionAtTower(tSrc) - 1]}`);
    let x0 = tSrc;
    let y0 = GameState.activeDisk.pos.y;
    let x6 = tTgt;
    let y6 = maxDisk - freePositionAtTower(tTgt);
    // updating TOWERS - move disk W from tSrc to tTgt array
    GameState.towers[tSrc].pop();
    GameState.towers[tTgt].push(GameState.activeDisk.weight);
    animateElementMove(x0, y0, x6, y6);
    // log(GameState.activeDisk)
    // GameState.activeDisk.pos = {x : x6, y : y6}; ????? unnecessary
}

// move all disks simultaneously at round start
function repositionAllDisks(towersSrc, towersTgt) {
    for (let weight = maxDisk; weight > maxDisk - GameState.numDisk; weight--) {
        let { x : x0, y : y0 } = getXY(weight, towersSrc);
        let { x : x6, y : y6 } = getXY(weight, towersTgt);
        const el = document.getElementById(`d-${weight}`);
        el.animate([ 
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
    displayCounter.classList.toggle('bright');
    displayCounter.innerHTML = GameState.history.length;
    sleep(500).then(() => displayCounter.classList.toggle('bright'));
};

function showAnimationDelay() {
    let res = { 2000:'1/4x', 1000:'1/2x', 500:'1 x', 250:'2 x', 125:'4 x' };
    displayDelay.innerHTML = res[GameState.animationDelay];
};

// changing animation speed (delay): double or half
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

// Start of Each new round with new Disks starting positions
function restart(rnd = 'rnd') {

    const isMobile = (mobileAndTabletCheck()) ? 'Mobile or Tablet' : 'Desktop';
    log(isMobile);

    GameState.solvingAll = false;
    // clear history array;
    GameState.history = [];
    // reset animation speed;
    GameState.animationDelay = animationNorm;
    root.style.setProperty('--anim-delay', `${GameState.animationDelay/1000}s`);
    showAnimationDelay();
    // read number of Disks from input field
    // GameState.numDisk = numberDisks.value;
    // update new disks amount
    for (let weight = maxDisk; weight > maxDisk - 8; weight--) {
        const el = document.getElementById(`d-${weight}`)
        // add disks if new numDisk is bigger than previous
        if (weight > maxDisk - GameState.numDisk && !el) {
            createComponent('div', field, ['disk', `disk-${weight}`], `d-${weight}`, `<p>${weight}</p>` );
            GameState.towers[0].push(weight);
        // else remove redundant disks from previous round
        } else if (weight <= maxDisk - GameState.numDisk && el) { 
            el.remove();    
        }
    }

    const oldTowers = copyArray(GameState.towers);
    // create new Disks position at the field
    GameState.towers = shuffleDisks(GameState.numDisk, rnd);
    // position Disks at the field according to new Towers array
    repositionAllDisks(oldTowers, GameState.towers);
    // Calculate Instructions to solve the puzzle with new Disks position
    GameState.instructions = calcTowerBuild(GameState.towers, TargetTower);
    showMoveCnt();

    if (GameState.manual) ManDM();
    else autoDM();

};

// - - - END OF FUNCTIONS BLOCK - - -

// Game constants
const maxDisk = 8;
const animationNorm = 500;
const SourceTower = 0;
const TargetTower = 2;

// DOM variables
const body = document.body;
const container = createComponent('div', body, ['container']);
const root = document.querySelector(':root');
// variable pointer to current Parent Element to append or remove new elements
let parentElement = container;

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

const topMenu = createComponent('div', parentElement, ['menu', 'top-menu'] );
const field = createComponent('div', parentElement, ['field']);
const bottomMenu = createComponent('div', parentElement, ['menu', 'bottom-menu']);
// add Event Listeners for Drag & Drop
addDragListeners(field);
// Event Listeners for Animation purpose
field.addEventListener('animationstart', () => {
    GameState.animationInProgress = true;
});
field.addEventListener('animationend', () => {
    GameState.animationInProgress = false;
    if (GameState.solvingAll) goForward();
});

// - - - - - TOP - MENU BUTTONS
parentElement = topMenu;

const btnGroupRestart = createComponent('div', parentElement, ['btn-group'],);
const btnGroupMoves = createComponent('div', parentElement, ['btn-group'],);

parentElement = btnGroupRestart;
// Btn - RESTART-NORM
const btnNorm = createComponent('div', parentElement, ['btn'], 'btn-norm', '<span class="material-icons md-vm">filter_list</span>');
btnNorm.addEventListener('click', () => { if (!GameState.animationInProgress) restart(SourceTower)});
// input for number of Disks for the next round
const inp2 = createComponent('div', parentElement, ['disk-car']);
const b0 = createComponent('div', inp2, ['btn-2'], '', '<span class="material-icons">arrow_back_ios_new</span>');
const b1 = createComponent('div', inp2, ['display-number', 'dsp-2'], '', GameState.numDisk);
const b2 = createComponent('div', inp2, ['btn-2'], '', '<span class="material-icons">arrow_forward_ios</span>');
b0.addEventListener('click', () => {
    if (GameState.numDisk > 2)  GameState.numDisk -= 1;
    b1.innerHTML = GameState.numDisk;
});
b2.addEventListener('click', () => {
    if (GameState.numDisk < 8)  GameState.numDisk += 1;
    b1.innerHTML = GameState.numDisk;
});
// Btn - RESTART-RND
const btnRND = createComponent('div', parentElement, ['btn'], 'btn-rnd', '<span class="material-icons">shuffle</span>');
btnRND.addEventListener('click', () => { if (!GameState.animationInProgress) restart('rnd')});




parentElement = btnGroupMoves;
// Btn - Go Back One Move
const btnGoBack = createComponent('div', parentElement, ['btn'], 'btn-go-back', '<span class="material-icons">undo</span>');
btnGoBack.addEventListener('click', goBack);
// Display number of Moves made
const displayCounter = createComponent('div', parentElement, ['display-number'], 'display-counter', '0');


//  - - - BOTTOM MENU slider with buttons 
const humanPanel = createComponent('div', bottomMenu, ['panel', 'main'], 'p-0');
const compPanel = createComponent('div', bottomMenu, ['panel'], 'p-1');

let contextHPText = 'The objective of the puzzle is to move the entire stack to the last tower, obeying the following rules:<br>';
contextHPText += '1. Take the upper disk from one of the stacks and place it on top of another stack or on an empty tower.<br>';
contextHPText += '2. No disk may be placed on top of a disk that is smaller than itself. Only one disk may be moved at a time.';
// contextHPText += 'Only one disk may be moved at a time.';
const bookmarkHP = createComponent('div', humanPanel, ['bookmark'], '', '<span class="material-icons md-2rem">person</span>');
const contextHP = createComponent('div', humanPanel, ['context'], '', contextHPText);
const contextCP = createComponent('div', compPanel, ['context']);
const bookmarkCP = createComponent('div', compPanel, ['bookmark'], '', '<span class="material-icons md-2rem">computer</span>');

// Event listeners for Manual / Auto mode switch and slider animation
[...document.querySelectorAll('.bookmark')].forEach(el => 
    el.addEventListener('click', () => {
        [...document.querySelectorAll('.panel')].forEach(panel => 
            panel.classList.toggle('main'));
        switchAutoManual();
    })
);

// - - - - - Bottom-MENU Buttons
parentElement = contextCP;
const btnGroupSpeed = createComponent('div', parentElement, ['btn-group'],);
const btnGroupControls = createComponent('div', parentElement, ['btn-group'],);

parentElement = btnGroupSpeed;
// INCREASE Animation delay btn
const btnIncDelay = createComponent('div', parentElement, ['btn'], 'inc-del', '<span class="material-icons">remove</span>');
btnIncDelay.addEventListener('click', () => changeDelay(+1));
// Display Animation Speed
const displayDelay = createComponent('div', parentElement, ['display-number'], 'display-delay', `1 x`);
// Decrease Animation delay btn
const btnDecDelay = createComponent('div', parentElement, ['btn'], 'dec-del', '<span class="material-icons">add</span>');
btnDecDelay.addEventListener('click', () => changeDelay(-1));

parentElement = btnGroupControls;
// FORWARD 1 step button
const btnOneStep = createComponent('div', parentElement, ['btn'], 'btn-one-step', '<span class="material-icons"> skip_next</span>');
btnOneStep.addEventListener('click', goForward);
// btn to STOP solving puzzle
const btnStop = createComponent('div', parentElement, ['btn'], 'btn-stop', '<span class="material-icons">stop</span>');
btnStop.addEventListener('click', () => GameState.solvingAll = false );
// SOLVE puzzle to the end
const btnForward = createComponent('div', parentElement, ['btn'], 'btn-forward', '<span class="material-icons">fast_forward</span>');
btnForward.addEventListener('click', () => {
    GameState.solvingAll = true;
    goForward();
});


// first round starts from tower 0
restart(SourceTower);


