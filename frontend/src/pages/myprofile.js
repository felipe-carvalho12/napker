import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Header from '../components/header'
import { SERVER_URL } from '../settings'
import { csrftoken } from '../utils'

export default function MyProfile() {
    const [profile, setProfile] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const profilePhotoStyle = {
        borderRadius: '50%',
        display: 'inline-block',
        transform: 'scale(1.5)',
        marginBottom: '25px'
    }

    document.title = 'Perfil / Napker'

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/myprofile`)
            .then(response => response.json())
            .then(data => setProfile(data))
    }, [])

    return (
        <>
            <Header page="Perfil" />
            {profile ? <div className="content">
                <Modal show={isEditing}
                    onHide={() => setIsEditing(false)}
                    size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Editar perfil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form action={`${SERVER_URL}/update-profile`} id="update-profile-form" method="POST">
                            <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
                            <div className="d-flex flex-column justify-content-center align-items-center" style={{ padding: '25px' }}>
                                <img src={`${SERVER_URL}${profile.photo}`} style={profilePhotoStyle} />
                                <input type="file" accept="image/png, image/jpg" name="profile-photo" onChange={e => console.log(e.target.files)}/>
                            </div>
                            <div>
                                <label htmlFor="first-name" className="profile-label">Nome:</label>
                                <input className="form-control" type="text" name="first-name" id="first-name" placeholder={profile.first_name} />
                            </div>
                            <div>
                                <label htmlFor="last-name" className="profile-label">Sobrenome:</label>
                                <input className="form-control" type="text" name="last-name" id="last-name" placeholder={profile.last_name} />
                            </div>
                            <div>
                                <label htmlFor="username" className="profile-label">Nome de usuário:</label>
                                <input className="form-control" type="text" name="username" id="username" placeholder={profile.user.username} />
                                <span id="username-taken">Nome de usuário já existe</span>
                            </div>
                            <div>
                                <label htmlFor="email" className="profile-label">Email:</label>
                                <input className="form-control" type="email" name="email" id="email" placeholder={profile.email} />
                            </div>
                            <div>
                                <label htmlFor="gender" className="profile-label">Gênero:</label>
                                <select className="form-control" name="gender" id="gender" placeholder={profile.gender}>
                                    <option value="male">Masculino</option>
                                    <option value="female">Feminino</option>
                                    <option value="other">Outro</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="birth-date" className="profile-label">Data de nascimento:</label>
                                <input className="form-control" type="date" name="birth-date" id="birth-date" defaultValue={profile.birth_date} />
                            </div>
                            <div>
                                <label htmlFor="bio" className="profile-label">Bio:</label>
                                <input className="form-control" type="email" name="bio" id="bio" placeholder={profile.bio} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-grey" onClick={() => setIsEditing(false)}>Fechar</button>
                        <button className="btn btn-primary" onClick={() => document.querySelector('form#update-profile-form').submit()}>Salvar</button>
                    </Modal.Footer>
                </Modal>
                <div className="d-flex justify-content-between align-items-center profile-data-container">
                    <div className="d-flex flex-column align-items-start">
                        <p style={{ padding: '15px' }}><img src={`${SERVER_URL}${profile.photo}`} style={profilePhotoStyle} /></p>
                        <p style={{ marginBottom: 0 }}><strong>{profile.first_name} {profile.last_name}</strong></p>
                        <p className="text-secondary" style={{ marginTop: 0 }}>@{profile.user.username}</p>
                        <p>{profile.bio}</p>
                        <p className="text-secondary">
                            <i className="far fa-calendar-alt"></i> Entrou em {profile.created.split('-').reverse().join('/')}
                        </p>
                        <p><strong>{profile.friends.length}</strong> {profile.friends.length === 1 ? 'amigo' : 'amigos'}</p>
                    </div>
                    <div>
                        <button className="btn btn-secondary" type="button" onClick={() => setIsEditing(true)}>Editar perfil</button>
                    </div>
                </div>
            </div > : ''}
        </>
    )
}