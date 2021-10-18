console.log('Tower of Hanoi is running.');
console.log('Update attempt #1')

import './style.css';
import createComponent from './handling-dom.js'

const log = console.log;
const body = document.body;
// log(body);

createComponent('div', ['container'], '', 'UNDER DEVELOPMENT', body);