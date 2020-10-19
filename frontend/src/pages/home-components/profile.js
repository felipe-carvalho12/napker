import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { serverURL } from '../../utils'

export default function Profile(props) {
    const [profile, setProfile] = useState(null)
    const [modalIsOpen, setModalIsOpen] = useState(props.open)

    useEffect(() => {
        if (props.profileUsername) {
            fetch(`${serverURL}/profile-api/user/${props.profileUsername}`)
                .then(response => response.json())
                .then(data => setProfile(data))
            setModalIsOpen(props.open)
        }
    }, [props])

    const profilePhotoStyle = {
        borderRadius: '50%',
        display: 'inline-block',
        transform: 'scale(1.5)',
        marginBottom: '25px'
    }

    return (
        <>
            {!profile ? <></> : <>
                <Modal show={modalIsOpen}
                    onHide={props.onHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>{profile.first_name} {profile.last_name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex justify-content-between align-items-center profile-data-container">
                            <div className="d-flex flex-column align-items-start">
                                <p style={{ padding: '15px' }}><img src={`${serverURL}${profile.photo}`} style={profilePhotoStyle} /></p>
                                <p style={{ marginBottom: 0 }}><strong>{profile.first_name} {profile.last_name}</strong></p>
                                <p className="text-secondary" style={{ marginTop: 0 }}>@{profile.user.username}</p>
                                <p>{profile.bio}</p>
                                <p className="text-secondary">
                                    <i className="far fa-calendar-alt"></i> Entrou em {profile.created.split('-').reverse().join('/')}
                                </p>
                                <p><strong>{profile.friends.length}</strong> {profile.friends.length === 1 ? 'amigo' : 'amigos'}</p>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-grey" onClick={() => setModalIsOpen(false)}>Fechar</button>
                    </Modal.Footer>
                </Modal>
            </>}
        </>
    )
}