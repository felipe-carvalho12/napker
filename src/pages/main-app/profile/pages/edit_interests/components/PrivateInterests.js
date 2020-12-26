import React from 'react'

import InterestsInput from './InterestsInput'

export default function PrivateInterests(props) {

    return (
        <div className="p-2">
            <h3>Interesses privados</h3>
            <p>
                Os interesses privados não são visíveis para os outros usuários.
                Eles servem para aumentar a precisão das recomendações de perfis que
                possuem o máximo de afinidade possível com você.
            </p>
            <InterestsInput type="private" myProfile={props.myProfile} setInterests={props.setInterests} />
        </div>
    )
}