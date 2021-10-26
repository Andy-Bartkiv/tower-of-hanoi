function createElement(elType, elClass, elContent, elParent) {
    const el = document.createElement(elType);
    elClass.forEach(cls => el.classList.add(cls));
    el.innerHTML = elContent;
    if (elParent) elParent.appendChild(el);
    return el;
}

function moveElement(el, x, y) {
    el.style.transform = `translate(calc(${x}*(50vw - (100vw/6))), calc(${y}*8vh))`;
}

export { createElement, moveElement }