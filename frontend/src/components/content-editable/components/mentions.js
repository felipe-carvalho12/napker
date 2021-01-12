import { appendEl, getCaretIndex } from "../utils";

export function mention(el, index, key, inputs, addEventListener) {
    const caretIndex = getCaretIndex(el);
    const textBeforeCaret = el.innerText.slice(0, caretIndex);
    if (
        textBeforeCaret.trim()[textBeforeCaret.trim().length - 1] !==
        textBeforeCaret[textBeforeCaret.length - 1] ||
        (!index && !getCaretIndex(el))
    ) {
        if (!el.classList.contains("c-primary-color")) {
            if (caretIndex !== el.innerText.length) {
                const textHolder = el.innerText.slice(caretIndex, el.innerText.length);
                el.innerHTML = textBeforeCaret.trim() + "&nbsp;"; //"&nbsp;" represents a white space
                appendEl(el, index, inputs, addEventListener, { text: textHolder });
                appendEl(el, index, inputs, addEventListener, {
                    blue: true,
                    focus: true
                });
            } else {
                appendEl(el, index, inputs, addEventListener, {
                    blue: true,
                    focus: true
                });
            }
        } else {
            inputs[index - 1].innerText += key;
            el.innerText = el.innerText.slice(0, el.innerText.length - 2);
        }
    }
}

export function space(el, index, inputs, addEventListener) {
    if (el.classList.contains("c-primary-color")) {
        appendEl(el, index, inputs, addEventListener, { focus: true });
    }
}
