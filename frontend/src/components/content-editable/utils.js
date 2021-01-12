const insertAfter = (newNode, referenceNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

export const appendEl = (el, index, inputs, addEventListener, kwargs) => {
    const newEl = document.createElement("span");
    newEl.setAttribute("contentEditable", true);
    newEl.classList.add("subinput", kwargs.blue && "c-primary-color");
    inputs.splice(index + 1, 0, newEl);
    insertAfter(newEl, el);
    kwargs.focus && newEl.focus();
    if (kwargs.text) newEl.innerText = kwargs.text;
    addEventListener(newEl);
    testRemoveElement(el, inputs);
};

export const testRemoveElement = (el, inputs) => {
    if (
        el.innerText.length === 0 &&
        (inputs.indexOf(el) > 0 || inputs.length > 1)
    ) {
        const index = inputs.indexOf(el);
        if (document.activeElement === el) {
            inputs[index - 1] && inputs[index - 1].focus();
            inputs[index - 1] &&
                setCaret(inputs[index - 1], inputs[index - 1].innerText.length);
        }
        inputs.splice(index, 1);
        el.remove();
        return true;
    }
    return false;
};

export const testDisplayPlaceholder = (placeholderEl, inputs) => {
    placeholderEl.style.display = "none";
    for (let el of inputs) {
        if (el.innerText.length) return;
    }
    placeholderEl.style.display = "unset";
};

export const testIsWhitespace = (str, kwargs) => {
    return (
        str.trim()[kwargs.end ? str.length - 1 : 0] !==
        str[kwargs.end ? str.length - 1 : 0]
    );
};

export const getCaretIndex = (element) => {
    let position = 0;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
        const selection = window.getSelection();
        if (selection.rangeCount !== 0) {
            const range = window.getSelection().getRangeAt(0);
            const preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            position = preCaretRange.toString().length;
        }
    }
    return position;
};

export const setCaret = (el, i) => {
    var range = document.createRange();
    var sel = window.getSelection();
    try {
        range.setStart(el.childNodes[0], i);
        range.collapse(true);
    } catch { }

    sel.removeAllRanges();
    sel.addRange(range);
};
