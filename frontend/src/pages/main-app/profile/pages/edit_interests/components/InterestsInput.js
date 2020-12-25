import React, { useEffect, useRef } from 'react'

export default function InterestsInput(props) {

    const type = props.type
    const myProfile = props.myProfile
    const setInterests = props.setInterests

    const tagContainer = useRef()
    const input = useRef()  //input where the interests are submitted
    const interestsInput = useRef() //hidden input that stores the interests titles

    useEffect(() => {
        let tags = myProfile.interests.filter(i => type === 'public' ? i.public : !i.public).map(i => i.title);
        addTags()

        function createTag(label) {
            const div = document.createElement('div');
            div.classList.add('tag');
            div.classList.add(`${type}-tag`);
            const span = document.createElement('span');
            span.innerHTML = label;
            const closeIcon = document.createElement('i');
            closeIcon.classList.add(`${type}-close-icon`)
            closeIcon.innerHTML = '×';
            closeIcon.classList.add('material-icons')
            closeIcon.setAttribute('data-item', label);
            div.appendChild(span);
            div.appendChild(closeIcon);
            if (!interestsInput.current.value.includes(label)) interestsInput.current.value += ` ${label}`;
            return div;
        }

        function clearTags() {
            document.querySelectorAll(`.${type}-tag`).forEach(tag => {
                tag.parentElement.removeChild(tag);
            });
        }

        function addTags() {
            clearTags();
            tags.sort()
            tags.slice().reverse().forEach(tag => {
                tagContainer.current.prepend(createTag(tag));
            });
            setInterests(tags)
        }

        input.current.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                input.current.value.split(',').forEach(tag => {
                    if (tag.length < 3) {
                        window.alert('Os interesses devem ter no mínimo 3 caracteres!')
                    } else {
                        tags.push(tag)
                    }
                })

                addTags()
                input.current.value = ''
            }
        })
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains(`${type}-close-icon`)) {
                const tagLabel = e.target.getAttribute('data-item')
                const index = tags.indexOf(tagLabel)
                tags = [...tags.slice(0, index), ...tags.slice(index + 1)]
                addTags()
            }
        })

        input.current.focus()
    })

    return (
        <>
            <div ref={tagContainer} className="tag-container">
                <textarea
                    ref={input}
                    className="autoExpand"
                    rows='3'
                    data-min-rows='3'
                    placeholder="Digite e pressione 'Enter'"
                />
                <input ref={interestsInput} type="hidden" />
            </div>
        </>
    )
}