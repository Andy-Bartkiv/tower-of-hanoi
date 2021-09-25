console.log('Salut - 2! Tower of Hanoi is running.');
console.log('Update attempt #1')

import './styles.css';

function component() {
    const element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = 'Hello Webpack';
    element.classList.add('hello');

    return element;
 }

 document.body.appendChild(component());