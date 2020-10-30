import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../settings'

export default function LikesModal(props) {
    return (
        <Modal show={props.isOpen}
            onHide={props.hideModal}
            size="lg">
            <Modal.Header closeButton>
                <Modal.Title><strong>Curtidas</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="list-group" style={{ height: '400px', overflow: 'hidden', overflowY: 'scroll' }}>
                    {props.likes &&
                        props.likes.map(like => like.profile).map(profile => {
                            return (
                                <Link to={`/user/${profile.slug}`}
                                    style={{ color: '#000', textDecoration: 'none' }}
                                    onClick={props.hideModal}
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