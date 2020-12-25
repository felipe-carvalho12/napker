import React from 'react'

import InterestsInput from './InterestsInput'

export default function PublicInterests(props) {

    return (
        <div className="p-2">
            <h3>Interesses públicos</h3>
            <p>
                Os interesses públicos são visíveis para os outros usuários.
                Coloque aqui interesses que sem eles seu perfil ficaria incompleto.
            </p>
            <InterestsInput type="public" myProfile={props.myProfile} setInterests={props.setInterests} />
        </div>
    )
}