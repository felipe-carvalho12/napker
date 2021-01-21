import React from 'react'
import Modal from 'react-bootstrap/Modal'


export default function RecomendedProfilesInfo(props) {
    const profileSlug = props.profileSlug

    return (
        <div>
            <h3>Como decidimos quais perfis aparecem na barra lateral?</h3>
            <p>
                Os perfis que estão na barra lateral são considerados os perfis que mais "batem" com @{profileSlug}.
                Ou seja, são perfis que possuem bastante afinidade com o usuário.
            </p>

            <br />
            <br />

            <h3>Como é calculada a relevância de um perfil para @{profileSlug}?</h3>
            <p>
                Os critérios presentes nas configurações do algoritmo (Interesses em comum, Semelhança de idade...) são utilizados para calcularmos a
                relevância de um perfil em relação a outro. Sabendo disso, você pode escolher o peso de cada critério e assim, personalizar o
                algoritmo que calculará a relevância dos perfis.
            </p>
        </div>
    )
}