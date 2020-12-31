import React, { useEffect, useState } from 'react'

import { SERVER_URL } from '../../../config/settings'
import Header from '../../../components/fixed/Header'
import ModalContactSearch from './components/ModalContactSearch'
import Chat from './components/chat_/Chat'
import ContactListItem from './components/ContactListItem'
import ContactFilterInput from './components/ContactFilterInput'
import BottomMenu from '../../../components/fixed/bottom-menu/BottomMenu'
import WebSocketInstance from './websocket'

export default function Messages(props) {
    const [username, setUsername] = useState(null)
    const [otherUsername, setOtherUsername] = useState(props.match.params.slug)
    const [chatId, setChatId] = useState(null)
    const [activeChats, setActiveChats] = useState(null)
    const [activeChatsProfiles, setActiveChatsProfiles] = useState(null)
    const [renderedActiveChatsProfiles, setRenderedActiveChatsProfiles] = useState(null)
    const [addingNewChat, setAddingNewChat] = useState(false)
    const [modalProfiles, setModalProfiles] = useState([])

    let rerenderingInterval = null
    let hasFilteredProfiles = false

    document.title = 'Mensagens / Napker'

    const handleReceiveProps = props => {
        if (props.match.params.slug) {
            if (props.match.params.slug !== otherUsername && WebSocketInstance.state() === 1) {
                WebSocketInstance.disconnect()
                setOtherUsername(props.match.params.slug)
            }
            fetch(`${SERVER_URL}/chat-api/chat-id/${props.match.params.slug}`)
                .then(response => response.json())
                .then(data => {
                    setChatId(data['chat_id'])
                })
        } else if (chatId) {
            setChatId(null)
        }
    }

    useEffect(() => {
        handleReceiveProps(props)
    }, [props])

    const handleComponentChange = () => {
        if (!username) {
            fetch(`${SERVER_URL}/profile-api/logged-user`)
                .then(response => response.json())
                .then(data => {
                    setUsername(data.username)
                })
        }
        if (!activeChatsProfiles && activeChatsProfiles !== []) {
            fetchActiveChatProfiles()
        }
    }

    useEffect(() => {
        handleComponentChange()
        rerenderingInterval = window.setInterval(fetchActiveChatProfiles, 4000)
        return window.clearInterval(rerenderingInterval)
    }, [])


    useEffect(() => {
        handleComponentChange()
    })

    const fetchActiveChatProfiles = () => {
        fetch(`${SERVER_URL}/chat-api/active-chats-profiles`)
            .then(response => response.json())
            .then(data => {
                if (!username) return
                if (!hasFilteredProfiles) {
                    setActiveChats(data.chats)
                    setActiveChatsProfiles(data.profiles)
                    setRenderedActiveChatsProfiles(data.profiles)
                }
            })
    }

    const openModal = () => {
        setAddingNewChat(true)
    }

    return (
        <>
            <Header page="Mensagens" />
            <div className="content d-flex messages-wrapper">
                <ModalContactSearch
                    addingNewChat={addingNewChat}
                    setModalProfiles={setModalProfiles}
                    setAddingNewChat={setAddingNewChat}
                    modalProfiles={modalProfiles}
                />
                <div className="chats-list h-100">
                    <ContactFilterInput
                        activeChatsProfiles={activeChatsProfiles}
                        setHasFilteredProfiles={bool => hasFilteredProfiles = bool}
                        fetchActiveChatProfiles={fetchActiveChatProfiles}
                        setRenderedActiveChatsProfiles={setRenderedActiveChatsProfiles}
                        openModal={openModal}
                    />
                    {renderedActiveChatsProfiles !== null ?
                        <div className="list-group chats-container" style={{ background: 'var(--background)' }}>
                            {renderedActiveChatsProfiles.map(profile => {
                                return (
                                    <ContactListItem
                                        profile={profile}
                                        activeChats={activeChats}
                                        activeChatsProfiles={activeChatsProfiles}
                                    />
                                )
                            })}
                        </div>
                        :
                        <div className="loader-container">
                            <div className="loader" />
                        </div>
                    }
                </div>
                <Chat
                    username={username}
                    otherUsername={props.match.params.slug}
                    chatId={chatId}
                    openModal={openModal}
                    updateUnreadMessagesNumber={props.updateUnreadMessagesNumber}
                    updateMessagesComponent={fetchActiveChatProfiles}
                />
            </div>
            {!props.match.params.slug &&
                <BottomMenu />
            }
        </>
    )
}