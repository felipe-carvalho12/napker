import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../../../config/settings'

export default function ModalContactSearch(props) {
    return (
        <Modal show={props.addingNewChat}
            onHide={() => this.setState({ addingNewChat: false })}
            size="lg">
            <Modal.Header closeButton>
                <Modal.Title><strong>Nova conversa</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: '0' }}>
                <input className="modal-search-input"
                    placeholder="Pesquisar pessoas"
                    onChange={e => this.setModalSearch(e.target.value)}
                />
                <div className="list-group" style={{ height: '400px', overflow: 'hidden', overflowY: 'scroll' }}>
                    {props.modalProfiles && props.modalProfiles.map(profile => {
                        return (
                            <Link to={`/mensagens/${profile.slug}`}
                                style={{ color: '#000', textDecoration: 'none' }}
                                onClick={() => this.setState({
                                    addingNewChat: false
                                })}
                            >
                                <li className="list-group-item profile-row modal-profile-li" key={profile.id}>
                                    <div className="d-flex justify-content-between">
                                        <div className="profile-col">
                                            <img src={`${SERVER_URL}${profile.photo}`}
                                                className="profile-img-med"
                                                style={{ marginRight: '10px' }}
                                            />
                                            <div className="main-profile-data">
                                                <strong>{profile.first_name} {profile.last_name}</strong>
                                                <p className="text-secondary">@{profile.user.username}</p>
                                            </div>
                                        </div>
                                        <div className="profile-col">
                                            {profile.bio}
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