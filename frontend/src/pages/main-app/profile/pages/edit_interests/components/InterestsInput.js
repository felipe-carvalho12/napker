import React, { useEffect, useRef } from 'react'

export default function InterestsInput(props) {

    const type = props.type
    const myProfile = props.myProfile
    const setInterests = props.setInterests

    const tagContainer = useRef()
    const input = useRef()  //input where the interests are submitted
    const interestsInput = useRef() //hidden input that stores the interests titles

    useEffect(() => {
        let tags = myProfile ? myProfile.interests.filter(i => type === 'public' ? i.public : !i.public).map(i => i.title) : []
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
            props.setInterests && setInterests(tags)
        }

        input.current.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                let willAlert = false
                input.current.value.split(',').forEach(tag => {
                    console.log(tag)
                    if (tag.length < 3) {
                        willAlert = true
                    } else {
                        tags.push(tag)
                    }
                })
                willAlert && window.alert('Os interesses devem ter no mínimo 3 caracteres!')
                addTags()
                window.setTimeout(() => input.current.value = '', 1)
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

    }, [])

    return (
        <>
            <div className={`${props.className} tag-container`}>
                <div ref={tagContainer} className="w-100 d-flex flex-wrap"></div>
                <textarea
                    ref={input}
                    className="autoExpand m-0"
                    rows={props.rows || "3"}
                    data-min-rows={props.rows || "3"}
                    placeholder={props.placeholder || "Digite e pressione 'Enter'"}
                />
                <input ref={interestsInput} type="hidden" />
            </div>
        </>
    )
}