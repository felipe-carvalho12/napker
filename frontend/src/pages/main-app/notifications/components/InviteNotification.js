import React from 'react'


export default function InviteListItem(props) {
    const invite = props.invite
    const replyRequest = props.replyRequest

    return (
        <li
            className="d-flex justify-content-between w-100 p-10px box-sm"
            style={{ backgroundColor: 'var(--theme-base-color)', ...props.style }}
            id={`fr-${invite.sender.id}`}
            key={invite.sender.id}
            onClick={() => window.location.href = `/user/${invite.sender.user.username}`}
        >
            <div className="d-flex">
                <div className="profile-img-container">
                    <img src={invite.sender.photo}
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
                            <span className="text-secondary text-left"> @{invite.sender.user.username}</span>
                        </div>
                    </div>
                    <div className="profile-row-bottom text-left">
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