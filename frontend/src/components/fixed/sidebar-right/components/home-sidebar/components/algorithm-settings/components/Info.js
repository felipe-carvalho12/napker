import React from 'react'
import Modal from 'react-bootstrap/Modal'


export default function Info(props) {
    const setInfoIsOpen = props.setInfoIsOpen

    return (
        <div className="d-flex flex-column h-100">
            <div className="d-flex align-items-start">
                <strong className="mr-10px">Como o seu algoritmo deve funcionar?</strong>
                <i
                    className="material-icons-sharp c-primary-grey add-icon p-5px m-0 fs-15"
                    onClick={() => setInfoIsOpen(false)}
                >
                    close
                </i>
            </div>
            <div className="d-flex flex-column" style={{ marginRadius: "10px", overflowY: "auto" }}>
                <span className="mb-5px c-secondary-grey">
                    <p><strong>Perfil: </strong>Os critérios presentes na barra lateral (Interesses em comum, Semelhança de idade...) são utilizados para calcularmos a
                    relevância de um perfil em relação a outro. Sabendo disso, você pode escolher o peso de cada critério e assim, personalizar o
                    algoritmo, que calculará a relevância dos perfia.</p>
                    <p><strong>Post: </strong>A relevância de um post é calculada baseada na relevância do autor do mesmo e dos perfis que curtiram a publicação. Ou seja,
                    ao decidir como a relevância de um perfil será calculada, você está personalizando o algoritmo que decidirá quais posts devem aparecer para você
                    e em que ordem.</p>
                </span>
                <span className="mb-5px c-secondary-grey">
                    <strong>Exemplo:</strong> Caso você mude o peso do critério "Interesses em comum" para 100 e todos os outros para 0, os perfis da página "Encontrar perfis" 
                    serão ordenados levando em consideração apenas a quantidade de interesses em comum que o usuário tem com você.
                </span>
            </div>
        </div>
    )
}