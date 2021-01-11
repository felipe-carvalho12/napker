import React, { useEffect } from 'react'

import { mention, space } from './components/mentions'

export default function ContentEditable(props) {

    useEffect(() => {


        const inputsContainer = document.querySelector(".inputs-container");
        const placeholderEl = document.querySelector("#placeholder");

        const inputs = [document.querySelector("#input0")];

        function insertAfter(newNode, referenceNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }

        const appendEl = (el, index, kwargs) => {
            const newEl = document.createElement("span");
            newEl.setAttribute("contentEditable", true);
            newEl.classList.add("subinput", kwargs.blue && "c-primary-color");
            inputs.splice(index + 1, 0, newEl);
            insertAfter(newEl, el);
            kwargs.focus && newEl.focus();
            if (kwargs.text) newEl.innerText = kwargs.text;
            addEventListener(newEl);
            testRemoveElement(el);
        };

        const testRemoveElement = (el) => {
            if (el.innerText.length === 0 && inputs.indexOf(el) > 0) {
                const index = inputs.indexOf(el);
                if (document.activeElement === el) {
                    inputs[index - 1] && inputs[index - 1].focus();
                    setCaret(inputs[index - 1], inputs[index - 1].innerText.length);
                }
                inputs.splice(index, 1);
                el.remove();
                return true;
            }
            return false;
        };

        const testDisplayPlaceholder = () => {
            placeholderEl.style.display = "none";
            for (let el of inputs) {
                if (el.innerText.length) return;
            }
            placeholderEl.style.display = "unset";
        };

        const getCaretIndex = (element) => {
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

        const setCaret = (el, i) => {
            var range = document.createRange();
            var sel = window.getSelection();
            range.setStart(el.childNodes[0], i);
            range.collapse(true);

            sel.removeAllRanges();
            sel.addRange(range);
        };

        const addEventListener = (el) => {
            el.onkeydown = (e) => {
                const index = inputs.indexOf(el);
                if (!testRemoveElement(el)) {
                    if (
                        e.key === "ArrowLeft" &&
                        getCaretIndex(el) === 0 &&
                        inputs[index - 1]
                    ) {
                        inputs[index - 1].focus();
                        setCaret(inputs[index - 1], inputs[index - 1].innerText.length);
                    } else if (
                        e.key === "ArrowRight" &&
                        getCaretIndex(el) === el.innerText.length &&
                        inputs[index + 1]
                    ) {
                        inputs[index + 1].focus();
                    } else if (e.key === "Backspace") {
                        if (testRemoveElement(el)) {
                            inputs[index].focus();
                            setCaret(inputs[index], inputs[index].innerText.length);
                        } else if (el.innerText === "@") {
                            el.classList.remove("c-primary-color");
                        }
                    } else if (e.key === "@" || e.key === "#") {
                        mention(el, index, e.key, appendEl, getCaretIndex, inputs)
                    } else if (e.keyCode === 32) {
                        space(el, index, appendEl)
                    }
                }
            };
            el.onkeyup = () => {
                testDisplayPlaceholder();
            };
        };

        addEventListener(inputs[0]);

        //focus first subinput on placeholder click
        inputsContainer.onclick = (e) => {
            if (e.target === inputsContainer || e.target === placeholderEl) {
                inputsContainer.querySelector(".subinput").focus();
            }
        };
    }, []);

    return (
        <div 
        className={ `inputs-container ${props.className}` }
        style={props.style}
        >
            <div id="placeholder">{props.placeholder !== undefined ? props.placeholder : " "}</div>
            <span
                className="subinput"
                id="input0"
                contentEditable
                style={{ minWidth: "20px" }}
            ></span>
        </div>
    );
} 