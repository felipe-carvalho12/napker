import React from 'react'

import { SERVER_URL } from '../../../config/settings'
import { csrftoken } from '../../../config/utils'
import Logo from '../../../assets/icons/Logo'
import PageLoader from '../../PageLoader'


export default function InterestsForm(props) {

    return (
        <>
            {props.myUserId ?
                <form
                    action={`${SERVER_URL}/signup/interesses`}
                    class="d-flex flex-column align-items-center primary-form"
                    method="POST"
                    style={{ width: '90vw', maxWidth: '600px', margin: '50px auto' }}
                >
                    <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
                    <input type="hidden" name="uid" value={props.myUserId}></input>

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

                    <div class="w-75 my-3 d-flex justify-content-center tag-container">
                        <textarea
                            className='autoExpand'
                            rows='3'
                            data-min-rows='3'
                            placeholder="Digite e pressione 'Enter'"
                        />
                        <input type="hidden" name="interests" id="interests" />
                    </div>

                    <button class="btn btn-primary w-75 mt-2 py-2" type="submit">Criar conta</button>
                </form>
                :
                <PageLoader />
            }
        </>
    )
}