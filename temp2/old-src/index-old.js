console.log('Tower of Hanoi is running.');

import './style.css';
import createComponent from '../../src/modules/handling-dom'

const log = console.log;
const body = document.body;
// log(body);

const cont = createComponent('div', body, ['container']);

createComponent('div', cont, ['label'], '', 'UNDER CONSTRUCTION');
createComponent('div', cont, ['link'], '', '<a href="test.html">TEST</a>');

const contBG = createComponent('div', body, ['cont-bg']);
contBG.addEventListener('click', () => contBG.classList.add('start'));
setTimeout(() => contBG.classList.add('start'), 5000);