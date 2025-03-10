import React, { useEffect, useRef } from 'react'


export default function InterestSearchInput(props) {

    const interests = props.interests
    const setInterests = props.setInterests

    const tagContainer = useRef()
    const input = useRef()  //input where the interests are submitted
    const interestsInput = useRef() //hidden input that stores the interests titles

    useEffect(() => {
        let tags = []
        addTags()

        function createTag(label) {
            const div = document.createElement('div');
            div.classList.add('tag');
            const span = document.createElement('span');
            span.innerHTML = label;
            const closeIcon = document.createElement('i');
            closeIcon.classList.add(`close-icon`)
            closeIcon.innerHTML = '×';
            closeIcon.classList.add('material-icons')
            closeIcon.setAttribute('data-item', label);
            div.appendChild(span);
            div.appendChild(closeIcon);
            if (!interestsInput.current.value.includes(label)) interestsInput.current.value += ` ${label}`;
            return div;
        }

        function clearTags() {
            document.querySelectorAll(`.tag`).forEach(tag => {
                tag.parentElement.removeChild(tag);
            });
        }

        function addTags() {
            clearTags();
            tags.sort()
            tags.slice().reverse().forEach(tag => {
                tagContainer.current.prepend(createTag(tag))
            })
        }

        input.current.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                window.alert('Esta funcionalidade estará pronta em alguns dias.')
                return
                let willAlert = false
                input.current.value.split(',').forEach(tag => {
                    if (tag.length < 3) {
                        willAlert = true
                    } else {
                        tags.push(tag)
                        setInterests([...interests, tag])
                    }
                })
                willAlert && window.alert('Os interesses devem ter no mínimo 3 caracteres!')
                addTags()
                window.setTimeout(() => input.current.value = '', 1)
            }
        })
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains(`close-icon`)) {
                const tagLabel = e.target.getAttribute('data-item')
                const index = tags.indexOf(tagLabel)
                tags = [...tags.slice(0, index), ...tags.slice(index + 1)]
                setInterests([...interests.slice(0, index), ...interests.slice(index + 1)])
                addTags()
                if (!tags.length) {
                    input.current.rows = '1'
                    input.current.dataset.minRows = '1'
                }
            }
        })

    }, [])

    return (
        <>
            <div className={`${props.className} tag-container`} style={props.style}>
                <div ref={tagContainer} className="w-100 d-flex flex-wrap"></div>
                <textarea
                    ref={input}
                    className="autoExpand m-0"
                    rows="1"
                    data-min-rows="1"
                    placeholder={"Digite um ou mais interesses"}
                />
                <input ref={interestsInput} type="hidden" />
            </div>
        </>
    )
}