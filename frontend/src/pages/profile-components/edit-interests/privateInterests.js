import React, { useEffect, useState } from 'react'

import { SERVER_URL } from '../../../settings'

export default function PrivateInterests(props) {

    useEffect(() => {
        if (document.querySelector('.private-interests-container')) {
            const tagContainer = document.querySelector('.private-tag-container');
            const input = document.querySelector('.private-tag-container input');

            let tags = props.myProfile.interests.filter(i => !i.public).map(i => i.title);
            const interestsInput = document.querySelector('#private-interests')
            addTags()

            function createTag(label) {
                const div = document.createElement('div');
                div.classList.add('tag');
                div.classList.add('private-tag');
                const span = document.createElement('span');
                span.innerHTML = label;
                const closeIcon = document.createElement('i');
                closeIcon.classList.add('private-close-icon')
                closeIcon.classList.add('material-icons')
                closeIcon.innerHTML = '×';
                closeIcon.setAttribute('data-item', label);
                div.appendChild(span);
                div.appendChild(closeIcon);
                if (!interestsInput.value.includes(label)) interestsInput.value += ` ${label}`;
                return div;
            }

            function clearTags() {
                document.querySelectorAll('.private-tag').forEach(tag => {
                    tag.parentElement.removeChild(tag);
                });
            }

            function addTags() {
                clearTags();
                tags.sort()
                tags.slice().reverse().forEach(tag => {
                    tagContainer.prepend(createTag(tag));
                });
                props.setInterests(tags)
            }

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.target.value.split(',').forEach(tag => {
                        tags.push(tag);
                    });

                    e.preventDefault()

                    addTags();
                    input.value = '';
                    return false; //prevent the form to submit
                }
            });
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('private-close-icon')) {
                    const tagLabel = e.target.getAttribute('data-item');
                    const index = tags.indexOf(tagLabel);
                    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
                    addTags();
                }
            })
        }
    })

    return (
        <div className="private-interests-container">
            <h3>Interesses privados</h3>
            <p>
                Os interesses privados não são visíveis para os outros usuários.
                Eles servem para aumentar a precisão das recomendações de perfis que
                possuem o máximo de afinidade possível com você.
            </p>
            <div class="tag-container private-tag-container">
                <input placeholder="Digite e pressione 'Enter'" maxLength="50" />
                <input type="hidden" name="private-interests" id="private-interests" />
            </div>

        </div>
    )
}