export default function createComponent(elType, elParent = 'document.body', elClass = [], elID = '', elContent = '') {
    const el = document.createElement(elType);
    elClass.forEach(cls => el.classList.add(cls));
    if (elID !== '') el.id = elID;
    el.innerHTML = elContent;
    if (elParent) elParent.appendChild(el);
    return el;
}