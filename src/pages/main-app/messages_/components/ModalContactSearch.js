import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../../../../config/settings'

export default function ModalContactSearch(props) {
    const modalProfiles = props.modalProfiles
    const setParentState = props.setParentState
    const addingNewChat = props.addingNewChat

    const setModalSearch = query => {
        if (query === '') {
            setParentState({
                modalProfiles: []
            })
            return
        }
        fetch(`${SERVER_URL}/profile-api/users/${query}`)
            .then(response => response.json())
            .then(data => {
                setParentState({
                    modalProfiles: data
                })
            })
    }

    return (
        <Modal
            show={addingNewChat}
            onHide={() => setParentState({ addingNewChat: false })}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title><strong>Nova conversa</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: '0' }}>
                <input
                    className="modal-search-input"
                    placeholder="Pesquisar pessoas"
                    onChange={e => setModalSearch(e.target.value)}
                />
                <div className="list-group" style={{ height: '400px', overflow: 'hidden', overflowY: 'scroll' }}>
                    {modalProfiles && modalProfiles.map(profile => {
                        return (
                            <Link to={`/mensagens/${profile.slug}`}
                                style={{ color: 'var(--primary-grey)', textDecoration: 'none' }}
                                onClick={() => setParentState({ addingNewChat: false })}
                            >
                                <li
                                    className="position-relative border-0 b-bottom base-hover"
                                    key={profile.id}
                                    style={{ ...props.style, padding: '.75rem 1.25rem', background: 'var(--theme-base-color)' }}
                                    onClick={props.onClick}
                                >
                                    <div className="d-flex">
                                        <div className="profile-img-container">
                                            <img src={`${SERVER_URL}${profile.photo}`}
                                                className="profile-img-med"
                                                style={{ marginRight: '10px' }}
                                            />
                                        </div>
                                        <div className="d-flex flex-column w-100">
                                            <div className="profile-row-top">
                                                <div className="main-profile-data">
                                                    <strong style={{ textAlign: 'start' }}>
                                                        {profile.first_name} {profile.last_name}
                                                    </strong>
                                                    <p className="text-secondary">@{profile.user.username}</p>
                                                </div>
                                                {props.children}
                                            </div>
                                            <div className="profile-row-bottom">
                                                {profile.bio}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        )
                    })}
                </div>
            </Modal.Body>
        </Modal>
    )
}