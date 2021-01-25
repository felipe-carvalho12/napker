import React, { useContext } from 'react'
import Modal from 'react-bootstrap/Modal'

import { MyProfileContext } from '../context/app/AppContext'
import ProfileListItem from './ProfileListItem'

export default function LikesModal(props) {
    const [myProfile,] = useContext(MyProfileContext)

    return (
        <Modal show={props.isOpen}
            onHide={props.hideModal}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title><strong>Curtidas</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="list-group" style={{ height: '400px', overflow: 'hidden', overflowY: 'scroll' }}>
                    {props.likes &&
                        props.likes.map(like => like.profile).map(profile => {
                            return (
                                <ProfileListItem
                                    profile={profile}
                                    myProfile={myProfile}
                                    style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
                                    onClick={props.hideModal}
                                />
                            )
                        })}
                </div>
            </Modal.Body>
        </Modal>
    )
}