import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../../../../config/settings'


export default function ProfilesSearchInput(props) {
    const setFilteredProfiles = props.setFilteredProfiles
    const [search, setSearch] = useState('')
    const [searchType, setSearchType] = useState('byName')

    useEffect(() => {
        if (search.trim() === '') {
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
            fetch(`${SERVER_URL}/profile-api/users-by-interest/${search}`)
                .then(response => response.json())
                .then(data => {
                    setFilteredProfiles(data)
                })
        }
    }, [search])

    const openCloseSearchTypeSelector = () => {
        const el = document.querySelector('#profiles-search-type-selector')
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
            <div
                className="view-more-select"
                id="profiles-search-type-selector"
                style={{ right: '5%', top: '130px' }}
                onClick={handleSearchTypeSelection}
            >
                {searchType === 'byName' ?
                    <div className="position-relative">
                        <div className="popover-arrow white-hover" style={{ top: '-9px', left: '75%' }} />
                        <li className="d-flex align-items-center">
                            <i class="fas fa-grin-hearts text-secondary" style={{ fontSize: 'large', marginRight: '5px' }} />
                            Pesquisar por interesse
                        </li>
                    </div>
                    :
                    <div className="position-relative">
                        <div className="popover-arrow white-hover" style={{ top: '-9px', left: '75%' }} />
                        <li className="d-flex align-items-center">
                            <i class="fas fa-user text-secondary" style={{ fontSize: 'large', marginRight: '5px' }} />
                            Pesquisar por nome
                        </li>
                    </div>
                }
            </div>
        </>
    )
}