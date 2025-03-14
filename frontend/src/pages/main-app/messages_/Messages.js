import React, { useEffect, useState } from 'react'

import { SERVER_URL } from '../../../config/settings'
import AddNewChatSearch from './components/AddNewChatSearch'
import { Link } from 'react-router-dom'
import Chat from './components/chat_/Chat'
import ContactListItem from './components/ContactListItem'
import ContactFilterInput from './components/ContactFilterInput'
import BottomMenu from '../../../components/fixed/bottom-menu/BottomMenu'
import WebSocketInstance from './websocket'
import Header from '../../../components/fixed/Header'

export default function Messages(props) {
    const [username, setUsername] = useState(null)
    const [otherUsername, setOtherUsername] = useState(props.match.params.username)
    const [chatId, setChatId] = useState(null)
    const [activeChats, setActiveChats] = useState(null)
    const [activeChatsProfiles, setActiveChatsProfiles] = useState(null)
    const [renderedActiveChatsProfiles, setRenderedActiveChatsProfiles] = useState(null)
    const [addingNewChat, setAddingNewChat] = useState(false)
    const [addingNewChatProfiles, setAddingNewChatProfiles] = useState([])
    const [chatsMessages, setChatsMessages] = useState({})

    const isMobile = visualViewport.width <= 980

    let rerenderingInterval = null
    let hasFilteredProfiles = false

    document.title = 'Mensagens / Napker'

    const handleReceiveProps = props => {
        if (props.match.params.username) {
            if (props.match.params.username !== otherUsername && WebSocketInstance.state() === 1) {
                WebSocketInstance.disconnect()
                setOtherUsername(props.match.params.username)
            }
            fetch(`${SERVER_URL}/chat-api/chat-id/${props.match.params.username}`)
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
            fetch(`${SERVER_URL}/profile-api/myusername`)
                .then(response => response.json())
                .then(data => {
                    setUsername(data)
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

    const addNewChat = () => {
        addingNewChat ? setAddingNewChat(false) : setAddingNewChat(true)
    }

    return (
        <div className="content-container">
            {isMobile &&
                <div className="fixed w-100 b-theme-base-color blur-20px b-b" style={{ zIndex: "1000" }}>
                    <Header page="Mensagens" />
                </div>
            }
            <div className="b-theme-base-color box-med" style={{ marginTop: "1vw", padding: "0", zIndex: "1000" }}>
                <div className="content d-flex messages-wrapper" style={{ margin: 0 }}>
                    <div className="chats-list h-100 b-r">
                        <>
                            <div className="search-input-container">
                                {addingNewChat ?
                                    <AddNewChatSearch
                                        setAddingNewChatProfiles={setAddingNewChatProfiles}
                                    />
                                    :
                                    <ContactFilterInput
                                        activeChatsProfiles={activeChatsProfiles}
                                        setHasFilteredProfiles={bool => hasFilteredProfiles = bool}
                                        fetchActiveChatProfiles={fetchActiveChatProfiles}
                                        setRenderedActiveChatsProfiles={setRenderedActiveChatsProfiles}
                                        addNewChat={addNewChat}
                                    />
                                }
                                <i
                                    className="material-icons-sharp c-primary-color add-icon p-10px fs-27"
                                    onClick={addNewChat}
                                    style={{ transform: addingNewChat ? "rotate(0deg)" : "rotate(45deg)" }}
                                >
                                    close
                                </i>
                            </div>
                            {addingNewChat ?
                                <>
                                    {addingNewChatProfiles && addingNewChatProfiles.map(profile => {
                                        return (
                                            <Link to={`/mensagens/${profile.user.username}`}
                                                style={{ color: 'var(--primary-grey)', textDecoration: 'none' }}
                                                onClick={() => setAddingNewChat(false)}
                                            >
                                                <li className="list-item d-flex justify-content-start p-2 b-theme-base-color c-primary-grey base-hover box-med" style={{ whiteSpace: 'nowrap' }}>
                                                    <img src={profile.photo}
                                                        className="profile-img-sm align-self-center"
                                                        style={{ marginRight: '10px' }}
                                                    />
                                                    <div className="d-flex flex-column align-items-start">
                                                        <div className="d-flex align-items-between" style={{ maxHeight: '30px' }}>
                                                            <strong className="mr-10px" style={{ height: 'fit-content' }}>{profile.first_name} {profile.last_name}</strong>
                                                            <p className="text-secondary m-0" style={{ marginLeft: '5px' }}>@{profile.user.username}</p>
                                                        </div>
                                                        <div className="w-100 word-break">
                                                            {profile.bio.split('').slice(0, 160)}
                                                            {profile.bio.split('').slice(0, 160).length < profile.bio.length && '...'}
                                                        </div>
                                                    </div>
                                                </li>
                                            </Link>
                                        )
                                    })}
                                </>
                                :
                                <>
                                    {renderedActiveChatsProfiles !== null ?
                                        <div className="list-group chats-container">
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
                                </>
                            }
                        </>
                    </div>
                    <Chat
                        username={username}
                        otherUsername={props.match.params.username}
                        chatId={chatId}
                        addNewChat={addNewChat}
                        updateUnreadMessagesNumber={props.updateUnreadMessagesNumber}
                        updateMessagesComponent={fetchActiveChatProfiles}
                        chatsMessages={chatsMessages}
                        setChatsMessages={setChatsMessages}
                    />
                </div>
            </div>
            {!props.match.params.username &&
                <BottomMenu />
            }
        </div>
    )
}