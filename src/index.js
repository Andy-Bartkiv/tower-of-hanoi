// import mobileAndTabletCheck from './modules/mobile-and-tablet-check'
import createComponent from './modules/handling-dom';
import calcTowerBuild from './modules/recursive';
import shuffleDisks from './modules/shuffle';
import './style.css';
import 'material-icons/iconfont/filled.css';

// service functions
const log = console.log;
const copyArray = (arr) => JSON.parse(JSON.stringify(arr));
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const aliasTranslate = (x,y) => `translate(calc(${x-1}*(50vw - (100vw/6))), calc(${y}*8vh))`;
const setElementTranslate = (el, [x,y]) => {
    el.style.transform = aliasTranslate(x,y);
}

// switch puzzle solving mode between manual (human player) and auto (AI-recursive)
function switchAutoManual() {
    GameState.manual = !GameState.manual;
    if (GameState.manual) ManDM();
    else autoDM();
}

// auto mode
function autoDM() {
    GameState.instructions = calcTowerBuild(GameState.towers, TargetTower);
    for (let w = maxDisk; w > maxDisk - GameState.numDisk; w--)
        document.getElementById(`d-${w}`).setAttribute('draggable', false);
    // stop Solving and reset Solving Progress Indicator if necessary;
    handleStopBtn();
}

// manual mode
function ManDM() {
    for (let w = maxDisk; w > maxDisk - GameState.numDisk; w--) {
        let drg = document.getElementById(`d-${w}`);
        const minW =  Math.min(...GameState.towers[getXY(w).x]);
        if (w === minW) drg.setAttribute('draggable', true) 
        else drg.setAttribute('draggable', false);
    }   
};

// adding 3 Drag&Drop API listeners (dragstart, dragend, drop)
function addDragListeners(element) {  
    // 1) check if drag is legal and show possible landings (hints)
    element.addEventListener('dragstart', (event) => {
        const w = 1 * event.target.id.slice(-1);
        GameState.activeDisk = getDiskByID(`d-${w}`);
        const x = GameState.activeDisk.pos.x;
        const tower = GameState.towers[x];
        // if dragging disk is currently at the top of its tower
        if (w == tower[tower.length - 1]) {
            sleep(0) // to let browser capture drag img of a disk, before it opacity becomes 0
                .then(() => event.target.classList.add('dragging'));
            GameState.towers.forEach((tower, i) => {
                // check for legal landing Zones - if each of two other towers has bigger disks at the top 
                const maxW = (tower.length > 0) ? tower[tower.length-1] : maxDisk+100;
                if (i !== x && w < maxW) {
                    // creating landing Towers, as targets for 'drop' eventListener
                    const landingTower = createComponent('div', field, ['tower-drop-hint'], `tdh-${i}`);
                    setElementTranslate(landingTower, [i, 0]);
                    // creating landing Disks projection
                    const landingZone = createComponent('div', field, ['hint-disk', `disk-${w}`], `h-${i}`);
                    setElementTranslate(landingZone, [i, maxDisk - tower.length]);
                } else if (i == x) { // hint disk at Source Tower
                    const landingTower = createComponent('div', field, ['tower-drop-hint'], `tdh-${i}`);
                    setElementTranslate(landingTower, [i, 0]);
                    const landingZone = createComponent('div', field, ['hint-disk', `disk-${w}`, 'src-disk', 'disk'], `h-${i}`);
                    setElementTranslate(landingZone, [i, maxDisk - tower.length + 1]);
                };
                // Event Listeners for Landing Towers
                const landingTowers = [...document.querySelectorAll('.tower-drop-hint')];
                landingTowers.forEach(twr => {
                    twr.addEventListener('dragenter', (event) => {
                        document.getElementById(`h-${event.target.id.slice(-1)}`).classList.add('highlight');
                    });
                    twr.addEventListener('dragleave', (event) => {
                        document.getElementById(`h-${event.target.id.slice(-1)}`).classList.remove('highlight');
                    });
                    twr.addEventListener('dragover', (event) => {
                        event.preventDefault();
                    });
                });
            });
        };
    });

    // 2) remove dragging class from active Disk and landing Towers & Zones (Disks)
    element.addEventListener('dragend', (event) => {
        event.target.classList.remove('dragging'); 
        [...document.querySelectorAll('.hint-disk')].forEach(el => field.removeChild(el));
        [...document.querySelectorAll('.tower-drop-hint')].forEach(el => field.removeChild(el));
    });

    // 3) drop disk to new Target tower, or return to Source Tower, clear landing zones 
    element.addEventListener('drop', (event) => {
        const tSrc = GameState.activeDisk.pos.x;
        const tTgt = 1 * event.target.id.slice(-1);
        const landingZone = document.getElementById(`h-${tTgt}`);
        if (!landingZone)
            landingZone = document.getElementById(`h-${tSrc}`);
        else if (tTgt !== tSrc) {
            handleDiskRepositionLogic(tSrc, tTgt);
        }
        // teleport active Disk to cursor position
        setElementTranslate(GameState.activeDisk.element, getDragPosition(event.pageX, event.pageY));
        // drop animation from cursor position to landing zone 
        sleep(0)
            .then(() => transformElementSlow(landingZone.style.transform, GameState.activeDisk.element));
    });
};

// adding 3 Touch API listeners (touch: -start, -move, -end)
function addTouchListeners(element) {
    // 1) attach draggable disk to touch position, draw legal landing zones
    element.addEventListener('touchstart', (event) => {
        event.preventDefault();
        if (event.target.draggable) {
            const target = event.target.getBoundingClientRect();
            const [tx, ty] = [target.x + target.width/2, target.y + target.height/2]
            setElementTranslate(event.target, getDragPosition(tx, ty))           
            const w = 1 * event.target.id.slice(-1);
            GameState.activeDisk = getDiskByID(`d-${w}`);
            const x = GameState.activeDisk.pos.x;
            GameState.towers.forEach((tower, i) => {
                // check for legal landing Zones - if each of two other towers has bigger disks at the top 
                const maxW = (tower.length > 0) ? tower[tower.length-1] : maxDisk+100;
                if (i !== x && w < maxW) { // hint disk/disks at legal Target Towers
                    const landingZone = createComponent('div', field, ['hint-disk', `disk-${w}`], `h-${i}`);
                    setElementTranslate(landingZone, [i, maxDisk - tower.length]);
                } else if (i == x) { // hint disk at Source Tower
                    const landingZone = createComponent('div', field, ['hint-disk', `disk-${w}`, 'src-disk', 'disk'], `h-${i}`);
                    setElementTranslate(landingZone, [i, maxDisk - tower.length + 1]);
                };
            });
        };
    });
    // 2) disk following touch position, highlight landing zones on "drag-over"
    element.addEventListener('touchmove', (event) => {
        event.preventDefault();
        if (event.target.draggable === true) {
            const touch = event.targetTouches[0];
            const [posX, posY] = getDragPosition(touch.pageX, touch.pageY)
            setElementTranslate(event.target, [posX, posY]);
            // Drag-over event
            [...document.querySelectorAll('.hint-disk')].forEach(hd => {
                if (Math.round(posX) == hd.id.slice(-1)) {
                    hd.classList.add('highlight');
                } else {
                    hd.classList.remove('highlight');
                }
            });
        };
    });
    // 3) drop disk to new Target tower, or return to Source Tower, clear landing zones 
    element.addEventListener('touchend', (event) => {
        if (event.target.draggable) {
            event.preventDefault();
            const touch = event.changedTouches[0];
            const [posX, posY] = getDragPosition(touch.pageX, touch.pageY)
            const tSrc = GameState.activeDisk.pos.x;
            const tTgt = Math.round(posX);
            let landingZone = document.getElementById(`h-${tTgt}`);
            if (!landingZone)
                landingZone = document.getElementById(`h-${tSrc}`);
            else if (tTgt !== tSrc) {
                handleDiskRepositionLogic(tSrc, tTgt);
            }          
            // actually reposition active Disk to the Target tower
            transformElementSlow(landingZone.style.transform, event.target);
            // clear all hint disks from the field
            [...document.querySelectorAll('.hint-disk')].forEach(el => field.removeChild(el));
        };
    });
};

// - - - - - - - - - - - - - - - - - DISK ANIMATION functions - - -
// calculate cursor normalized (x: 0-2, y:0-8) position 
function getDragPosition(x, y) {
    const f = { w : field.getBoundingClientRect().width, h : field.getBoundingClientRect().height }
    const posX = Math.round(100000*( 6 * (x) / f.w - 1) / 2) / 100000;
    const posY = Math.round(100000*( 72 * (y) / f.h - 18) / 8) / 100000;
    return [posX, posY];
}
// drop animation to landing zone
function transformElementSlow(styleTransform, el) {
    el.classList.add('drop-slow');
    el.style.transform = styleTransform;
    sleep(animationNorm/2)
        .then(() => el.classList.remove('drop-slow'));
}

// Reposition Element via CSS-animation
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
        setElementTranslate(el, [x6, y6]);
        el.classList.remove(elClass);
        updateSolvingIndicator();
    });
};

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
};

// move all disks simultaneously to their positions at round start
function repositionAllDisks(towersSrc, towersTgt) {
    for (let weight = maxDisk; weight > maxDisk - GameState.numDisk; weight--) {
        let { x : x0, y : y0 } = getXY(weight, towersSrc);
        let { x : x6, y : y6 } = getXY(weight, towersTgt);
        const el = document.getElementById(`d-${weight}`);
        el.animate([ 
            { transform : aliasTranslate(x0, y0) },
            { transform : aliasTranslate(x6, y6) }
        ], GameState.animationDelay/2);
        setElementTranslate(el, [x6, y6]);
    }
};

// Solve one move Forward
function goForward() {
	if (GameState.instructions.length > 0 && !GameState.animationInProgress) {
        const move = GameState.instructions.shift();
		animateOneMove(move);
        GameState.history.push(move);
        showMoveCnt();
        if (GameState.solvingAll) {
            GameState.solvingIndication.grad += GameState.solvingIndication.step;
        }
    }
    if (GameState.instructions.length === 0) {
        GameState.solvingAll = false;
    }
};

// go back one move
function goBack() {
	if (GameState.history.length > 0 && !GameState.animationInProgress) {
        const move = GameState.history.pop();
		animateOneMove([move[1], move[0]]);
        GameState.instructions.unshift(move);
        showMoveCnt();
        GameState.solvingIndication.grad = 0;
        updateSolvingIndicator();
    }
};

function handleDiskRepositionLogic(tSrc, tTgt) {
    GameState.towers[tSrc].pop();
    // disk at Target tower should become NOT draggable
    const notDrg = Math.min(...GameState.towers[tTgt]);
    if (notDrg < maxDisk + 1)document.getElementById(`d-${notDrg}`).setAttribute('draggable', false);
    GameState.towers[tTgt].push(GameState.activeDisk.weight);
    GameState.history.push([tSrc, tTgt]);
    // disk at Source tower should become YES draggable
    const yesDrg = Math.min(...GameState.towers[tSrc]);
    if (yesDrg < maxDisk + 1) document.getElementById(`d-${yesDrg}`).setAttribute('draggable', true);
    showMoveCnt();
}

function updateSolvingIndicator() {
    btnCircle.style.setProperty('--deg-deg', `${GameState.solvingIndication.grad}deg`)
};
// stop Solving All Animation
function handleStopBtn() {
    GameState.solvingAll = false;
    if (GameState.instructions.length > 0) GameState.solvingIndication.grad = 0;
    updateSolvingIndicator();
}
// Display Completed Moves Counter
function showMoveCnt() {
    displayCounter.classList.add('highlight');
    displayCounter.innerHTML = GameState.history.length;
    sleep(GameState.animationDelay).then(() => displayCounter.classList.remove('highlight'));
};
// Convert current Animation delay into Animation Speed
function showAnimationDelay() {
    let res = { 2000:'&#188; x', 1000:'&#189; x', 500:'1 x', 250:'2 x', 125:'4 x' };
    return res[GameState.animationDelay];
};
// changing animation speed (delay): double or half
function changeDelay(sign) {
    GameState.animationDelay = (sign >= 0)
        ? (GameState.animationDelay < 2000) ? GameState.animationDelay * 2 : GameState.animationDelay
        : (GameState.animationDelay > 125) ? GameState.animationDelay / 2 : GameState.animationDelay;
    root.style.setProperty('--anim-delay', `${GameState.animationDelay/1000}s`);
    document.getElementById('dsp-anim-speed').innerHTML = showAnimationDelay();
};

// getting position of the disc in a "towers" array
function getXY(weight, towers = GameState.towers) {
    let x = towers.findIndex(twr => twr.includes(weight));
    let y = maxDisk - towers[x].indexOf(weight);
    return { 'x': x, 'y': y };
};
// get Disk Object by ID
function getDiskByID(id) {
    const element = document.getElementById(id);
    const weight = element.id.slice(-1) * 1;
    return { 'weight' : weight, 'pos': getXY(weight), 'element' : element};
};


// - - - - - - - - - - - - - - - RESTART function - - -
// Start of Each new round with new Disks starting positions
function restart(rnd = 'rnd') {
    // const isMobile = (mobileAndTabletCheck()) ? 'Mobile or Tablet' : 'Desktop';
    // log(isMobile);
    GameState.solvingAll = false;
    // clear history array;
    GameState.history = [];
    // reset solving indicator
    GameState.solvingIndication.grad = 0;
    updateSolvingIndicator();
    // reset animation speed;
    GameState.animationDelay = animationNorm;
    root.style.setProperty('--anim-delay', `${GameState.animationDelay/1000}s`);
    document.getElementById('dsp-anim-speed').innerHTML = showAnimationDelay();
    // update new disks amount
    GameState.numDisk = 1 * document.getElementById('dsp-disk-num').textContent;
    for (let weight = maxDisk; weight > maxDisk - 8; weight--) {
        let el = document.getElementById(`d-${weight}`)
        // add disks if new numDisk is bigger than previous
        if (weight > maxDisk - GameState.numDisk && !el) {
            el = createComponent('div', field, ['disk', `disk-${weight}`], `d-${weight}`, `${weight}` );
            addTouchListeners(el);
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
const root = document.querySelector(':root');
const body = document.body;
const container = createComponent('div', body, ['container']);

// container for Start Screen Cover Img
const contBG = createComponent('div', body, ['cont-bg']);
contBG.addEventListener('click', () => 
    contBG.classList.add('start'));
sleep(1000) // hide Start Screen Cover Img after 1s delay
    .then(() => contBG.classList.add('start'))

const GameState = {
    towers : [[], [], []], // three arrays representing 3 Towers of Hanoi
    history : [], // storing moves, that are already made
    numDisk : 5, // Number of disks for current game-round
    instructions : [], // set of instructions to solve puzzle from current positions
    animationDelay : animationNorm,
    animationInProgress : false,
    solvingAll : false,
    solvingIndication :  { grad : 0, step : 0 },
    manual: true,
    activeDisk : {
        weight: maxDisk,
        pos : {'x': 0, 'y': 0},
        element : '',
    }
}

// variable pointer to current Parent Element to append or remove new elements
let parentElement = container;

const topMenu = createComponent('div', parentElement, ['menu', 'top-menu'] );
const field = createComponent('div', parentElement, ['field']);
const bottomMenu = createComponent('div', parentElement, ['menu', 'bottom-menu']);
// Touch Listeners are added to the Disks at creation in restart()
// add Drag & Drop Event Listeners
addDragListeners(field);
// Event Listeners for Animation purpose
field.addEventListener('animationstart', () => {
    GameState.animationInProgress = true;
});
field.addEventListener('animationend', () => {
    GameState.animationInProgress = false;
    if (GameState.solvingAll) goForward();
});

// - - - - - TOP - MENU Btn-Group
parentElement = topMenu;
const btnGroupRestart = createComponent('div', parentElement, ['btn-group']);
const btnGroupDisks = createComponent('div', parentElement, ['btn-group']);
const btnGroupMoves = createComponent('div', parentElement, ['btn-group']);

parentElement = btnGroupRestart;
// Btn - RESTART-NORM
const btnNorm = createComponent('div', parentElement, ['btn']);
btnNorm.innerHTML = '<span class="material-icons md-vm">filter_list</span>';
btnNorm.addEventListener('click', () => { 
    if (!GameState.animationInProgress) restart(SourceTower) });
// Btn - RESTART-RND
const btnRND = createComponent('div', parentElement, ['btn']);
btnRND.innerHTML = '<span class="material-icons">shuffle</span>';
btnRND.addEventListener('click', () => { 
    if (!GameState.animationInProgress) restart('rnd')});

parentElement = btnGroupDisks;
// input & display number of Disks for the next round
const inp2 = createComponent('div', parentElement, ['disk-car']);
const b0 = createComponent('div', inp2, ['btn-2', 'left'], 'b-0', '<span class="material-icons">arrow_back_ios_new</span>');
const b1 = createComponent('div', inp2, ['display-number', 'dsp-2'], 'dsp-disk-num', GameState.numDisk);
const b2 = createComponent('div', inp2, ['btn-2', 'right'], 'b-2', '<span class="material-icons">arrow_forward_ios</span>');
b0.addEventListener('click', () => {
    if (1*b1.textContent > 2) b1.textContent = 1*b1.textContent - 1;
});
b2.addEventListener('click', () => {
    if (1*b1.textContent < 8) b1.textContent = 1*b1.textContent + 1;
});

parentElement = btnGroupMoves;
// Btn - Go Back One Move
const btnGoBack = createComponent('div', parentElement, ['btn'], 'btn-go-back', '<span class="material-icons">undo</span>');
btnGoBack.addEventListener('click', goBack);
// Display number of Moves made
const displayCounter = createComponent('div', parentElement, ['display-number'], 'display-counter', '0');

//  - - - BOTTOM MENU slider with buttons 
const humanPanel = createComponent('div', bottomMenu, ['panel', 'main'], 'p-0');
const compPanel = createComponent('div', bottomMenu, ['panel'], 'p-1');

const bookmarkHP = createComponent('div', humanPanel, ['bookmark']);
bookmarkHP.innerHTML = '<span class="material-icons md-2rem">person</span>';
let contextHPText = 'The objective of the puzzle is to move the entire stack to the last tower, obeying the following rules:<br>';
contextHPText += '1. Take the upper disk from one of the stacks and place it on top of another stack or on an empty tower.<br>';
contextHPText += '2. No disk may be placed on top of a disk that is smaller than itself. Only one disk may be moved at a time.';
const contextHP = createComponent('div', humanPanel, ['context'], '', contextHPText);
const contextCP = createComponent('div', compPanel, ['context']);
const bookmarkCP = createComponent('div', compPanel, ['bookmark']);
bookmarkCP.innerHTML = '<span class="material-icons md-2rem">computer</span>';

// Event listeners for Manual / Auto mode switch and slider animation
[...document.querySelectorAll('.bookmark')].forEach(el => {
    el.addEventListener('click', () => {
        [...document.querySelectorAll('.panel')].forEach(panel => 
            panel.classList.toggle('main'));
        handleStopBtn();
        switchAutoManual();
    })
});

// - - - - - Bottom-MENU Btn-Groups
parentElement = contextCP;
const btnGroupEmpty = createComponent('div', parentElement, ['btn-group', 'btn-group-0'],);
const btnGroupControls = createComponent('div', parentElement, ['btn-group', 'btn-group-1'],);
const btnGroupSpeed = createComponent('div', parentElement, ['btn-group', 'btn-group-1'],);

parentElement = btnGroupSpeed;
const inputSpeed = createComponent('div', parentElement, ['disk-car']);
const btnSpeedDown = createComponent('div', inputSpeed, ['btn-2', 'left']);
btnSpeedDown.innerHTML = '<span class="material-icons">remove</span>';
btnSpeedDown.addEventListener('click', () => changeDelay(+1));
const displaySpeed = createComponent('div', inputSpeed, ['display-number', 'dsp-2', 'dsp-3'], 'dsp-anim-speed');
displaySpeed.innerHTML = showAnimationDelay()
const btnSpeedUp = createComponent('div', inputSpeed, ['btn-2', 'right']);
btnSpeedUp.innerHTML = '<span class="material-icons">add</span>';
btnSpeedUp.addEventListener('click', () => changeDelay(-1));

parentElement = btnGroupControls;
// Btn - FORWARD 1 step
const btnOneStep = createComponent('div', parentElement, ['btn']);
btnOneStep.innerHTML = '<span class="material-icons">skip_next</span>';
btnOneStep.addEventListener('click', goForward);
// Btn - STOP solving The puzzle
const btnCont = createComponent('div', parentElement, ['btn-cont']);
// Solving puzzle indication
// const btnCircle = createComponent('div', btnCont, ['donut', 'grad-1']);
const btnRainbow = createComponent('div', btnCont, ['donut', 'grad-rainbow']); 
const btnCircle = createComponent('div', btnCont, ['donut', 'grad-2']);
const btnStop = createComponent('div', btnCont, ['btn'], 'btn-stop');
btnStop.innerHTML = '<span class="material-icons">stop</span>';
btnStop.addEventListener('click', handleStopBtn);
// Btn - SOLVE puzzle to the end
const btnForward = createComponent('div', parentElement, ['btn'], 'btn-forward');
btnForward.innerHTML = '<span class="material-icons">fast_forward</span>';
btnForward.addEventListener('click', () => {
    GameState.solvingAll = true;
    GameState.solvingIndication.grad = 0;
    GameState.solvingIndication.step = 360 / (GameState.instructions.length);
    goForward();
});

// first round starts from tower 0
restart(SourceTower);
