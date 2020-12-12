import React, { useEffect, useState } from 'react'

import { SERVER_URL } from '../../../config/settings'
import { csrftoken } from '../../../config/utils'


export default function Feedback() {
    const [name, setName] = useState(null)
    
    let selectedRating = 0
    
    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/myprofile`)
            .then(response => response.json())
            .then(data => setName(data.first_name))
    }, [])

    const handleFaceMouseEnter = e => {
        const img = e.target
        img.src = `/static/media/feedback-faces/${img.id}.png`
    }

    const handleFaceMouseLeave = e => {
        const img = e.target
        if (img.dataset.selected === 'false') {
            img.src = `/static/media/feedback-faces/${img.id}bw.png`
        }
    }

    const selectFace = e => {
        const img = e.target
        document.querySelectorAll('.option-container > img').forEach(image => {
            image.src = `/static/media/feedback-faces/${image.id}bw.png`
            image.dataset.selected = 'false'
            image.classList.remove('animated')
        })
        img.src = `/static/media/feedback-faces/${img.id}.png`
        img.dataset.selected = img.dataset.selected === 'true' ? 'false' : 'true'
        img.classList.add('animated')
        img.onanimationend = () => img.classList.remove('animated')
        let selectedRating = img.id
    }

    const thankYouPage = () => {
        document.querySelector('.feedback-form > h3').innerHTML = `Muito obrigado${name !== null ? (`, ${name}`) : ''}!`
        document.querySelector('.feedback-faces-container').innerHTML = 'A sua mensagem nos ajudará a tornar o Napker cada vez mais inclusivo e transparente.\nCaso pense em mais alguma coisa, sinta-se à vontade para entrar em contato novamente.'
        document.querySelector('.textarea-container').innerHTML = "<img src='/static/media/feedback-faces/thankyou.png'/>"
    }


    const handleFormSubmit = e => {
        const message = document.querySelector('.feedback-form > .textarea-container > textarea').value
        e.preventDefault()
        fetch(`${SERVER_URL}/settings-api/feedback`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                'rating': selectedRating,
                'message': message
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
        thankYouPage()
    }

    return (
        <div className="settings-description-container">
            <div className="feedback-form">
                <h3>Nos ajude a melhorar</h3>
                <hr />
                <div className="feedback-faces-container">
                    <h6>Como está sendo a sua experiência no Napker até agora?</h6>
                    <div className="d-flex justify-content-center">
                        <div className="option-container">
                            <img
                                src="/static/media/feedback-faces/5bw.png"
                                id="5"
                                data-selected={false}
                                onClick={selectFace}
                                onMouseEnter={handleFaceMouseEnter}
                                onMouseLeave={handleFaceMouseLeave}
                            />
                        </div>
                        <div className="option-container">
                            <img
                                src="/static/media/feedback-faces/4bw.png"
                                id="4"
                                data-selected={false}
                                onClick={selectFace}
                                onMouseEnter={handleFaceMouseEnter}
                                onMouseLeave={handleFaceMouseLeave}
                            />
                        </div>
                        <div className="option-container">
                            <img
                                src="/static/media/feedback-faces/3bw.png"
                                id="3"
                                data-selected={false}
                                onClick={selectFace}
                                onMouseEnter={handleFaceMouseEnter}
                                onMouseLeave={handleFaceMouseLeave}
                            />
                        </div>
                        <div className="option-container">
                            <img
                                src="/static/media/feedback-faces/2bw.png"
                                id="2"
                                data-selected={false}
                                onClick={selectFace}
                                onMouseEnter={handleFaceMouseEnter}
                                onMouseLeave={handleFaceMouseLeave}
                            />
                        </div>
                        <div className="option-container">
                            <img
                                src="/static/media/feedback-faces/1bw.png"
                                id="1"
                                data-selected={false}
                                onClick={selectFace}
                                onMouseEnter={handleFaceMouseEnter}
                                onMouseLeave={handleFaceMouseLeave}
                            />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="textarea-container">
                    <textarea placeholder="Digite a sua mensagem aqui..." />
                    <button className="btn btn-primary w-100" onClick={handleFormSubmit}>Enviar</button>
                </div>
            </div>
        </div>
    )
}