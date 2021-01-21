import React, { useState } from 'react'

import { SERVER_URL } from '../../../../../config/settings'
import { csrftoken } from '../../../../../config/utils'
import Logo from '../../../../../assets/icons/Logo'
import PageLoader from '../../../../PageLoader'
import InterestsInput from '../../../../main-app/profile/pages/edit_interests/components/InterestsInput'
import TermsOfUseModal from './components/TermsOfUseModal'
import PrivacyPoliciesModal from './components/PrivacyPoliciesModal'


export default function InterestsForm(props) {
    const [errMessage, setErrMessage] = useState(null)
    const [termsIsOpen, setTermsIsOpen] = useState(false)
    const [privacyPoliciesISOpen, setPrivacyPoliciesIsOPen] = useState(false)

    let [publicInterests, setPublicInterests] = [null, value => publicInterests = value]
    let [privateInterests, setPrivateInterests] = [null, value => privateInterests = value]

    const handleSubmit = e => {
        e.preventDefault()
        props.setSignupPage('page-loader')
        fetch(`${SERVER_URL}/post-signup/interests`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                'uid': props.myUserId,
                'public_interests': publicInterests.sort(),
                'private_interests': privateInterests.sort()
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
            <TermsOfUseModal isOpen={termsIsOpen} hideModal={() => setTermsIsOpen(false)} />
            <PrivacyPoliciesModal isOpen={privacyPoliciesISOpen} hideModal={() => setPrivacyPoliciesIsOPen(false)} />
            {props.myUserId ?
                <form
                    class="d-flex flex-column align-items-center primary-form"
                    style={{ width: '90vw', maxWidth: '600px', margin: '20px auto' }}
                    onSubmit={handleSubmit}
                >

                    {errMessage !== null &&
                        <div className="w-75 mt-1">
                            <span className="word-break" style={{ color: '#f00' }}>{errMessage}</span>
                        </div>
                    }

                    <Logo size="30pt" />
                    <h1 className="my-3" style={{ fontSize: '30px' }}>Quais os seus principais interesses?</h1>

                    <div className="p-2 m-1" style={{ border: '3px solid var(--border-color)', borderRadius: '20px' }}>
                        <h3>Interesses públicos</h3>
                        <p>
                            Os interesses públicos são visíveis para os outros usuários.
                            Coloque aqui interesses que sem eles seu perfil ficaria incompleto.
                        </p>
                        <InterestsInput type="public" setInterests={setPublicInterests} />
                    </div>

                    <div className="p-2 mt-10px" style={{ border: '3px solid var(--border-color)', borderRadius: '20px' }}>
                        <h3>Interesses privados</h3>
                        <p>
                            Os interesses privados não são visíveis para os outros usuários.
                            Eles servem para aumentar a precisão das recomendações de perfis que
                            possuem o máximo de afinidade possível com você.
                        </p>
                        <InterestsInput type="private" setInterests={setPrivateInterests} />
                    </div>

                    <span className="mt-10px">
                        <span>Ao criar conta você concorda com nossos </span>
                        <span className="c-primary-color hover-pointer hover-underline" onClick={() => setTermsIsOpen(true)}>Termos de uso</span>
                        <span> e </span>
                        <span className="c-primary-color hover-pointer hover-underline" onClick={() => setPrivacyPoliciesIsOPen(true)}>Politicas de privacidade</span>
                        <span>.</span>
                    </span>

                    <button class="btn btn-primary w-75 mt-10px py-2">Criar conta</button>
                </form>
                :
                <PageLoader />
            }
        </>
    )
}