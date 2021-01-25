import React, { createContext, useEffect, useState } from 'react'

import { SERVER_URL } from '../../../config/settings'

export const MyProfileContext = createContext()

export const MyProfileProvider = props => {
    const [myProfile, setMyProfile] = useState(null)

    useEffect(() => {
        fetchMyProfile()
    }, [])

    const fetchMyProfile = () => {
        fetch(`${SERVER_URL}/profile-api/myprofile`)
            .then(response => response.json())
            .then(data => setMyProfile(data))
    }

    return (
        <MyProfileContext.Provider value={[myProfile, fetchMyProfile]}>
            {props.children}
        </MyProfileContext.Provider>
    )
}