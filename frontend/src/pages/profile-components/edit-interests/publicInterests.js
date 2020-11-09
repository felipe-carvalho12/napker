import React, { useEffect, useState } from 'react'

import { SERVER_URL } from '../../../settings'

export default function PublicInterests(props) {

    useEffect(() => {
        if (document.querySelector('.public-interests-container')) {
            const tagContainer = document.querySelector('.public-tag-container');
            const input = document.querySelector('.public-tag-container input');

            let tags = props.myProfile.interests.filter(i => i.public).map(i => i.title);
            const interestsInput = document.querySelector('#public-interests')
            addTags()

            function createTag(label) {
                const div = document.createElement('div');
                div.classList.add('tag');
                div.classList.add('public-tag');
                const span = document.createElement('span');
                span.innerHTML = label;
                const closeIcon = document.createElement('i');
                closeIcon.classList.add('public-close-icon')
                closeIcon.innerHTML = '×';
                closeIcon.classList.add('material-icons')
                closeIcon.setAttribute('data-item', label);
                div.appendChild(span);
                div.appendChild(closeIcon);
                if (!interestsInput.value.includes(label)) interestsInput.value += ` ${label}`;
                return div;
            }

            function clearTags() {
                document.querySelectorAll('.public-tag').forEach(tag => {
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
                if (e.target.classList.contains('public-close-icon')) {
                    const tagLabel = e.target.getAttribute('data-item');
                    const index = tags.indexOf(tagLabel);
                    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
                    addTags();
                }
            })

            input.focus();
        }
    })

    return (
        <div className="public-interests-container">
            <h3>Interesses públicos</h3>
            <p>
                Os interesses públicos são visíveis para os outros usuários.
                Coloque aqui interesses que sem eles seu perfil ficaria incompleto.
            </p>
            <div class="tag-container public-tag-container">
                <input placeholder="Digite e pressione 'Enter'" />
                <input type="hidden" name="public-interests" id="public-interests" />
            </div>
        </div>
    )
}