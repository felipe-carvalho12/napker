import React, { useEffect } from "react";

import {
    testRemoveElement,
    testDisplayPlaceholder,
    getCaretIndex,
    setCaret
} from "./utils";
import { mention, space } from "./components/mentions";

export default function ContentEditable(props) {
    useEffect(() => {
        const inputsContainer = document.querySelector(".inputs-container");
        const placeholderEl = document.querySelector("#placeholder");

        const inputs = [document.querySelector("#input0")];

        const addEventListener = (el) => {
            el.onkeydown = (e) => {
                const index = inputs.indexOf(el);
                if (!testRemoveElement(el, inputs)) {
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
                        if (testRemoveElement(el, inputs)) {
                            inputs[index].focus();
                            setCaret(inputs[index], inputs[index].innerText.length);
                        } else if (el.innerText === "@") {
                            el.classList.remove("c-primary-color");
                        }
                    }

                    //mentions
                    else if (e.key === "@" || e.key === "#") {
                        mention(el, index, e.key, inputs, addEventListener);
                    } else if (e.keyCode === 32) {
                        space(el, index, inputs, addEventListener);
                    }
                }
            };
            el.onkeyup = () => {
                testDisplayPlaceholder(placeholderEl, inputs);
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
            className={`inputs-container ${props.className}`}
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