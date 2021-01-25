import React, { useEffect, useState } from 'react'

import { SERVER_URL } from '../../../../../../config/settings'
import { csrftoken } from '../../../../../../config/utils'
import InterestSearchInput from './InterestSearchInput'


export default function ProfilesSearchInput(props) {
    const setFilteredProfiles = props.setFilteredProfiles

    const [interests, setInterests] = useState([])
    const [search, setSearch] = useState('')
    const [searchType, setSearchType] = useState('byName')


    const isMobile = visualViewport.width <= 980

    const handleMouseIn = (e, text) => {
        if (!isMobile) {
            e.target.innerHTML = text
        }
    }

    const handleMouseOut = (e, icon) => {
        if (!isMobile) {
            e.target.innerHTML = icon
        }
    }

    useEffect(() => {
        if (search.trim() === '') {
            setFilteredProfiles(null)
            return
        }
        fetch(`${SERVER_URL}/profile-api/profiles/${search}`)
            .then(response => response.json())
            .then(data => {
                setFilteredProfiles(data)
            })
    }, [search])

    useEffect(() => {
        if (!interests.length) {
            setFilteredProfiles(null)
            return
        }
        fetch(`${SERVER_URL}/profile-api/profiles-by-interest`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                'interests': interests
            })
        }
        )
            .then(response => response.json())
            .then(data => {
                setFilteredProfiles(data)
            })
    }, [interests])

    const handleSearchTypeSelection = (e, text) => {
        setSearchType(searchType === 'byName' ? 'byInterest' : 'byName')
        if (!isMobile) e.target.innerHTML = text
    }

    return (
        <>
            <div className="profiles-filter-container b-bottom-radius">
                <div style={{ width: '60%' }}>
                    {searchType === 'byInterest' ?
                        <InterestSearchInput interests={interests} setInterests={setInterests} />
                        :
                        <input
                            type="text"
                            className="profiles-filter-input m-0"
                            placeholder={'Pesquisar perfil'}
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    }
                </div>

                {searchType === 'byName' ?
                    <button
                        type="button"
                        className="btn btn-grey btn-home align-self-start"
                        style={{ borderRadius: '10px', height: "40px" }}
                        onClick={e => handleSearchTypeSelection(e, "Pesquisar por nome")}
                        onMouseEnter={e => handleMouseIn(e, "Pesquisar por interesse")}
                        onMouseOut={e => handleMouseOut(e, '<i class="fas fa-grin-hearts text-secondary" style="font-size: large;"/>')}
                    >
                        <i className="fas fa-grin-hearts text-secondary" style={{ fontSize: 'large' }} />
                    </button>
                    :
                    <button
                        type="button"
                        className="btn btn-grey btn-home align-self-start"
                        style={{ margin: '4px 0', borderRadius: '10px', height: "40px" }}
                        onClick={e => handleSearchTypeSelection(e, "Pesquisar por interesse")}
                        onMouseEnter={e => handleMouseIn(e, "Pesquisar por nome")}
                        onMouseOut={e => handleMouseOut(e, '<i class="fas fa-user text-secondary" style="font-size: large;"/>')}
                    >
                        <i className="fas fa-user text-secondary" style={{ fontSize: 'large' }} />
                    </button>
                }
            </div>
        </>
    )
}