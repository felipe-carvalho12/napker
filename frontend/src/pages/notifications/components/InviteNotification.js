import React from 'react'

import { SERVER_URL } from '../../../config/settings'

export default function InviteListItem(props) {
    const invite = props.invite
    const replyRequest = props.replyRequest
    
    return (
        <li
            className="d-flex justify-content-between w-100"
            style={{
                padding: '30px',
                borderBottom: '1px solid var(--border-color)',
                backgroundColor: 'white',
            }}
            id={`fr-${invite.sender.id}`}
            key={invite.sender.id}
            onClick={() => window.location.href = `/user/${invite.sender.slug}`}
        >
            <div className="d-flex">
                <div className="profile-img-container">
                    <img src={`${SERVER_URL}${invite.sender.photo}`}
                        className="profile-img-med"
                        style={{ marginRight: '10px' }}
                    />
                </div>
                <div className="d-flex flex-column w-100">
                    <div className="profile-row-top">
                        <div className="main-profile-data">
                            <strong style={{ textAlign: 'start' }}>
                                {invite.sender.first_name} {invite.sender.last_name}
                            </strong>
                            <p className="text-secondary text-left">@{invite.sender.user.username}</p>
                        </div>
                    </div>
                    <div className="profile-row-bottom">
                        {invite.sender.bio}
                    </div>
                </div>
            </div>
            <div className="d-flex align-items-center">
                <button className="btn btn-primary btn-reply-fr mr-1" data-senderid={invite.sender.id} data-reply='accept' onClick={replyRequest}>
                    Aceitar
                </button>
                <button className="btn btn-grey btn-reply-fr" data-senderid={invite.sender.id} data-reply='decline' onClick={replyRequest}>
                    Excluir
                </button>
            </div>
        </li>
    )
}