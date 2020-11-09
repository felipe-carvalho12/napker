import React from 'react'
import { Link } from 'react-router-dom'

import Header from '../../components/header'
import Posts from '../profile-components/posts'
import Interests from '../profile-components/interests'
import { SERVER_URL } from '../../settings'
import { csrftoken } from '../../utils'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: null,
            relationshipButtonLabel: '',
            currentPageIsPosts: true,
        }
        this.slug = this.props.match.params.slug
    }

    componentWillMount() {
        this.fetchProfile()
    }

    componentDidMount() {
        fetch(`${SERVER_URL}/profile-api/relationship/${this.slug}`)
            .then(response => response.json())
            .then(data => {
                let label
                switch (data.relationship) {
                    case 'friends':
                        label = 'Amigos'
                        break
                    case 'invite-sent':
                        label = 'Solicitado'
                        break
                    case 'invite-received':
                        label = 'Aceitar'
                        break
                    case 'none':
                        label = 'Solicitar'
                }
                this.setState({
                    relationshipButtonLabel: label
                })
            })
    }

    componentDidUpdate() {
        let btn = document.querySelector('#profile-page-relationship-btn')
        if (btn) {
            switch (btn.innerHTML) {
                case 'Amigos':
                    btn.classList.add('btn-primary')
                    btn.onmouseenter = () => {
                        if (btn.innerHTML === 'Amigos') btn.innerHTML = 'Remover'
                    }
                    btn.onmouseout = () => {
                        if (btn.innerHTML === 'Remover') btn.innerHTML = 'Amigos'
                    }
                    btn.classList.add('friend-btn')
                    btn.classList.remove('d-none')
                    break
                case 'Solicitado':
                    btn.classList.add('btn-primary')
                    btn.classList.remove('d-none')
                    break
                case 'Aceitar':
                    btn.classList.add('btn-primary')
                    btn.classList.remove('d-none')
                    break
                case 'Solicitar':
                    btn.classList.add('btn-secondary')
                    btn.classList.remove('d-none')
            }
        }
    }

    fetchProfile = () => {
        fetch(`${SERVER_URL}/profile-api/user/${this.slug}`)
            .then(response => response.json())
            .then(data => this.setState({
                profile: data
            }))
    }

    sendFriendRequest = pk => {
        fetch(`${SERVER_URL}/profile-api/send-friend-request`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(pk)
        })
            .then(response => response.json())
            .then(data => console.log(data))
    }

    cancelFriendRequest = pk => {
        fetch(`${SERVER_URL}/profile-api/cancel-friend-request`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(pk)
        })
            .then(response => response.json())
            .then(data => console.log(data))
    }

    removeFromFriends = pk => {
        fetch(`${SERVER_URL}/profile-api/remove-from-friends`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(pk)
        })
            .then(response => response.json())
            .then(data => console.log(data))
    }

    acceptFriendRequest = pk => {
        fetch(`${SERVER_URL}/profile-api/reply-friend-request`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                'senderid': pk,
                'reply': 'accept'
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.props.updateNotificationsNumber()
            })
    }

    handleRelationshipUpdate = e => {
        const btn = e.target
        if (btn.innerHTML === 'Solicitar') {
            this.sendFriendRequest(btn.dataset.pk)
            btn.innerHTML = 'Solicitado'
            btn.className = 'btn btn-primary'
        } else if (btn.innerHTML === 'Solicitado') {
            this.cancelFriendRequest(btn.dataset.pk)
            btn.innerHTML = 'Solicitar'
            btn.className = 'btn btn-secondary'
        } else if (btn.innerHTML === 'Amigos' || btn.innerHTML === 'Remover') {
            if (window.confirm(`Remover @${this.state.profile.user.username} dos amigos?`)) {
                this.removeFromFriends(btn.dataset.pk)
                btn.innerHTML = 'Solicitar'
                btn.className = 'btn btn-secondary'
            }
        } else if (btn.innerHTML === 'Aceitar') {
            this.acceptFriendRequest(btn.dataset.pk)
            btn.innerHTML = 'Amigos'
            btn.className = 'btn btn-primary'
        }
    }

    switchPage = e => {
        document.querySelectorAll('.profile-page-menu-item-active').forEach(el => {
            el.classList.remove('profile-page-menu-item-active')
        })
        e.target.classList.add('profile-page-menu-item-active')
        if (e.target.id === 'profile-posts-page-menu-item') {
            this.setState({ currentPageIsPosts: true })
        } else if (e.target.id === 'profile-interests-page-menu-item') {
            this.setState({ currentPageIsPosts: false })
        }
    }

    render() {
        return (
            <>
                <Header page={this.state.profile ? `${this.state.profile.first_name} ${this.state.profile.last_name}` : 'Perfil'}
                    backArrow={true}
                />
                {this.state.profile ?
                    <div className="content">
                        <div className="d-flex justify-content-between align-items-center profile-data-container">
                            <div className="d-flex flex-column align-items-start">
                                <p style={{ padding: '15px' }}>
                                    <img src={`${SERVER_URL}${this.state.profile.photo}`}
                                        className="profile-img-big"
                                        style={{ marginBottom: '25px' }}
                                    />
                                </p>
                                <p style={{ marginBottom: 0 }}><strong>{this.state.profile.first_name} {this.state.profile.last_name}</strong></p>
                                <p className="text-secondary" style={{ marginTop: 0 }}>@{this.state.profile.user.username}</p>
                                <p>{this.state.profile.bio}</p>
                                <p className="text-secondary">
                                    <i className="far fa-calendar-alt"></i> Entrou em {this.state.profile.created.split('-').reverse().join('/')}
                                </p>
                                <p>
                                    <Link to={`/user/${this.state.profile.slug}/amigos`} style={{ color: '#000' }}>
                                        <strong>{this.state.profile.friends.length}</strong> {this.state.profile.friends.length === 1 ? 'amigo' : 'amigos'}
                                    </Link>
                                </p>
                            </div>
                            <div>
                                <button className="btn d-none"
                                    id="profile-page-relationship-btn"
                                    data-pk={this.state.profile.id}
                                    onClick={this.handleRelationshipUpdate}
                                >{this.state.relationshipButtonLabel}</button>
                            </div>
                        </div>
                        <div className="profile-page-menu">
                            <div
                                className="profile-page-menu-item profile-page-menu-item-active"
                                id="profile-posts-page-menu-item"
                                onClick={this.switchPage}
                            >
                                Posts ({this.state.profile.posts.length})
                            </div>
                            <div
                                className="profile-page-menu-item"
                                id="profile-interests-page-menu-item"
                                onClick={this.switchPage}
                            >
                                Interesses ({this.state.profile.interests.filter(i => i.public).length})
                            </div>
                        </div>
                        {this.state.currentPageIsPosts ?
                            <Posts profile={this.state.profile} fetchProfile={this.fetchProfile} /> :
                            <Interests profile={this.state.profile} />
                        }
                    </div>
                    :
                    <div className="profile-page-loader-container">
                        <div className="loader" />
                    </div>
                }
            </>
        )
    }
}

export default Profile