import React, { useState } from 'react'

import { SERVER_URL } from '../../../config/settings'
import { csrftoken } from '../../../config/utils'
import Logo from '../../../assets/icons/Logo'
import PageLoader from '../../PageLoader'
import InterestsInput from '../../main-app/profile/pages/edit_interests/components/InterestsInput'


export default function InterestsForm(props) {
    const [errMessage, setErrMessage] = useState(null)

    let [interests, setInterests] = [[], value => interests = value]

    const handleSubmit = e => {
        e.preventDefault()
        fetch(`${SERVER_URL}/post-signup/interests`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                'interests': interests,
                'uid': props.myUserId
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data === 'activation link sent') {
                    props.setSignupPage('activation-link-sent')
                } else {
                    setErrMessage('Ocorreu um erro')
                }
            })
    }

    return (
        <>
            {props.myUserId ?
                <form
                    class="d-flex flex-column align-items-center primary-form"
                    style={{ width: '90vw', maxWidth: '600px', margin: '50px auto' }}
                    onSubmit={handleSubmit}
                >

                    {errMessage !== null &&
                        <div className="w-75 mt-1">
                            <span className="word-break" style={{ color: '#f00' }}>{errMessage}</span>
                        </div>
                    }

                    <Logo />
                    <h1 className="my-3" style={{ fontSize: '30px' }}>Quais os seus principais interesses?</h1>

                    <div class="w-75 mt-3 d-flex justify-content-center">
                        <div class="interests-description">
                            É aqui que a mágica acontece. Quanto mais interesses você colocar mais precisamente
                            vamos te
                            conectar com outras pessoas que compartilhem das mesmas paixões.
                            <br />
                            <br />
                            <strong>Obs:</strong> Os interesses enviados aqui não serão visíveis para os outros
                        usuários
                    </div>
                    </div>

                    <div class="w-75 my-3 d-flex justify-content-center">
                        <InterestsInput className="w-100" type="private" setInterests={setInterests} />
                    </div>

                    <button class="btn btn-primary w-75 mt-2 py-2">Criar conta</button>
                </form>
                :
                <PageLoader />
            }
        </>
    )
}