console.log('Tower of Hanoi is running.');

import './style.css';
import createComponent from './handling-dom.js'

const log = console.log;
const body = document.body;
// log(body);

const cont = createComponent('div', ['container'], '', '', body);
createComponent('div', ['label'], '', 'UNDER CONSTRUCTION', cont);
createComponent('div', ['link'], '', '<a href="test.html">TEST</a>', cont);