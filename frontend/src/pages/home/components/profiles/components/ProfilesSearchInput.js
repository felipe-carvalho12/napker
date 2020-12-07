import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../../../../config/settings'


export default function ProfilesSearchInput(props) {
    const setFilteredProfiles = props.setFilteredProfiles
    const [search, setSearch] = useState('')
    const [searchType, setSearchType] = useState('byName')

    useEffect(() => {
        if (search === '') {
            setFilteredProfiles(null)
            return
        }
        if (searchType === 'byName') {
            fetch(`${SERVER_URL}/profile-api/users/${search}`)
                .then(response => response.json())
                .then(data => {
                    setFilteredProfiles(data)
                })
        } else if (searchType === 'byInterest') {
            fetch(`${SERVER_URL}/profile-api/users/${search}`)
                .then(response => response.json())
                .then(data => {
                    setFilteredProfiles(data)
                })
        }
    }, [search])

    const openCloseSearchTypeSelector = () => {
        const el = document.querySelector('#search-type-selector')
        const style = el.style
        if (!style.display) style.display = 'none'
        if (style.display === 'none') {
            document.querySelector('#profiles-search-extra-options-icon').classList.add('profiles-search-extra-options-icon-active')
            style.display = 'flex'
        } else {
            document.querySelector('#profiles-search-extra-options-icon').classList.remove('profiles-search-extra-options-icon-active')
            style.display = 'none'
        }
    }

    const handleSearchTypeSelection = () => {
        setSearchType(searchType === 'byName' ? 'byInterest' : 'byName')
        openCloseSearchTypeSelector()
    }

    return (
        <>
            <div className="profiles-filter-container">
                <div style={{ width: '89%' }}>
                    <input
                        type="text"
                        className="profiles-filter-input"
                        placeholder={searchType === 'byName' ? 'Pesquisar perfil' : 'Digite um ou mais interesses'}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <i
                    className="fas fa-ellipsis-h btn profiles-search-extra-options-icon"
                    id="profiles-search-extra-options-icon"
                    onClick={openCloseSearchTypeSelector}
                />
            </div>
            <div className="profiles-search-type-selector" id="search-type-selector" onClick={handleSearchTypeSelection}>
                {searchType === 'byName' ?
                    <li className="d-flex align-items-center">
                        <i class="fas fa-grin-hearts text-secondary" style={{ fontSize: 'large', marginRight: '5px' }} />
                        Pesquisar por interesse
                    </li>
                    :
                    <li className="d-flex align-items-center">
                        <i class="fas fa-user text-secondary" style={{ fontSize: 'large', marginRight: '5px' }} />
                        Pesquisar por nome
                    </li>
                }
            </div>
        </>
    )
}