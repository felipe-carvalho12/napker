import React from 'react'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../../config/settings'
import { csrftoken } from '../../config/utils'
import Header from '../../components/fixed/header'
import Posts from './components/Posts'
import Interests from './components/interests/Interests'
import ProfileData from './components/ProfileData'
import BottomMenu from '../../components/fixed/bottom-menu/BottomMenu'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            myProfile: null,
            profile: null,
            alertMessage: null,
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
        fetch(`${SERVER_URL}/profile-api/myprofile`)
            .then(response => response.json())
            .then(data => this.setState({ myProfile: data }))
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

    blockUnblockUser = () => {
        if (this.state.myProfile.blocked_users.map(u => u.id).includes(this.state.profile.user.id)) {
            if (window.confirm(`Tem certeza que deseja desbloquear ${this.state.profile.first_name} ?`)) {
                fetch(`${SERVER_URL}/profile-api/unblock-user`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'X-CSRFToken': csrftoken,
                    },
                    body: JSON.stringify(this.state.profile)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        this.setState({ alertMessage: `Você desbloqueou @${this.state.profile.user.username}.` })
                        this.fetchProfile()
                    })
            }
        } else {
            if (window.confirm(`Tem certeza que deseja bloquear ${this.state.profile.first_name} ?`)) {
                fetch(`${SERVER_URL}/profile-api/block-user`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'X-CSRFToken': csrftoken,
                    },
                    body: JSON.stringify(this.state.profile)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        this.setState({
                            alertMessage: `Você bloqueou @${this.state.profile.user.username}.
                         ${this.state.profile.first_name} não conseguirá mais ver o seu perfil ou te enviar mensagens.`
                        })
                        this.fetchProfile()
                    })
            }
        }
        this.fetchProfile()
        document.querySelector('#view-more-select').style.display = 'none'
    }

    openCloseExtraOptions = () => {
        const el = document.querySelector('#view-more-select')
        const style = el.style
        if (!style.display) style.display = 'none'
        if (style.display === 'none') {
            document.querySelector('#view-more-icon').classList.add('view-more-icon-active')
            style.display = 'flex'
        } else {
            document.querySelector('#view-more-icon').classList.remove('view-more-icon-active')
            style.display = 'none'
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
                {this.state.myProfile !== null && this.state.profile !== null ?
                    <div className="content">
                        {this.state.profile.blocked_users.map(u => u.id).includes(this.state.myProfile.user.id) ?
                            <div className="user-blocked-me-container">
                                <h3>O usuário te bloqueou</h3>
                            </div>
                            :
                            <>
                                {this.state.alertMessage &&
                                    <div class="alert alert-success profile-page-alert-success" role="alert">
                                        {this.state.alertMessage}
                                    </div>
                                }
                                <ProfileData profile={this.state.profile}>
                                    <div className="profile-btn-wrapper">
                                        <i
                                            className="fas fa-ellipsis-h btn btn-secondary mr-2"
                                            id="view-more-icon"
                                            onClick={this.openCloseExtraOptions}
                                        />
                                        <div className="view-more-select profile-view-more-select" id="view-more-select">
                                            <Link to={`/mensagens/${this.state.profile.slug}`} style={{ color: '#000', textDecoration: 'none', borderBottom: '1px solid rgba(0,0,0,.1)' }}>
                                                {!this.state.myProfile.blocked_users.map(u => u.id).includes(this.state.profile.user.id) &&
                                                    <li>
                                                        <i class="fas fa-envelope text-secondary" />
                                                        Enviar mensagem
                                                    </li>
                                                }
                                            </Link>
                                            <li onClick={this.blockUnblockUser}>
                                                <i class="fas fa-user-lock text-secondary" />
                                                {this.state.myProfile.blocked_users.map(u => u.id).includes(this.state.profile.user.id) ?
                                                    'Desbloquear'
                                                    :
                                                    'Bloquear'
                                                }
                                            </li>
                                        </div>
                                        {!this.state.myProfile.blocked_users.map(u => u.id).includes(this.state.profile.user.id) &&
                                            <button className="btn d-none"
                                                id="profile-page-relationship-btn"
                                                data-pk={this.state.profile.id}
                                                onClick={this.handleRelationshipUpdate}
                                            >{this.state.relationshipButtonLabel}</button>
                                        }
                                    </div>
                                </ProfileData>
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
                            </>
                        }
                    </div>
                    :
                    <div className="profile-page-loader-container">
                        <div className="loader" />
                    </div>
                }
                <BottomMenu />
            </>
        )
    }
}

export default Profile