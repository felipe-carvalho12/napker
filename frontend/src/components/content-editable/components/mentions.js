export function mention(el, index, key, appendEl, getCaretIndex, inputs) {
    
    if (el.innerText.trim()[el.innerText.trim().length - 1] !== el.innerText[el.innerText.length - 1] || (!index && !getCaretIndex(el))) {

        if (!el.classList.contains("c-primary-color")) {
            const caretIndex = getCaretIndex(el);
            if (caretIndex !== el.innerText.length - 1) {
                const textHolder = el.innerText.slice(
                    caretIndex,
                    el.innerText.length - 1
                );
                el.innerText = el.innerText.slice(0, caretIndex);
                appendEl(el, index, { text: textHolder });
                appendEl(el, index, { blue: true, focus: true });
            } else {
                appendEl(el, index, { blue: true, focus: true });
            }
        } else {
            inputs[index - 1].innerText += key;
            el.innerText = el.innerText.slice(0, el.innerText.length - 2);
        }
    }
}

export function space(el, index, appendEl) {
    if (el.classList.contains("c-primary-color")) {
        appendEl(el, index, { focus: true });
    }
}