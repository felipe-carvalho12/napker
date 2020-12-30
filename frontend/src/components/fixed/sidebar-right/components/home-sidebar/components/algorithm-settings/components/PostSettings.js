import React, { useState } from 'react'


export default function ProfileSettings(props) {
    const handleDetailClick = props.handleDetailClick
    const open = props.open

    const [dateValue, setDateValue] = useState(50)
    const [authorValue, setAuthorValue] = useState(50)
    const [likesValue, setLikesValue] = useState(50)

    return (
        <div className="w-100">
            <div className="w-100 d-flex b-theme-base-color">
                <i
                    className="material-icons-sharp align-self-start icon base-hover text-secondary algorithm-settings-details"
                    data-type='post'
                    style={{ width: '25px', height: '25px' }}
                    onClick={handleDetailClick}
                >
                    keyboard_arrow_right</i>
                <h6 style={{margin: "0", lineHeight: "1.5"}}>Post</h6>
            </div>
            <div className={`mb-2 ${!open && 'd-none'}`}>
                <div className="pt-1" style={{ width: '100%' }}>
                    <div className="d-flex justify-content-between">
                        <spam className="text-secondary">Post recente</spam>
                        <strong>{dateValue}</strong>
                    </div>
                    <div class="range">
                        <input type="range" min="0" max="100" value={dateValue} onInput={e => setDateValue(e.target.value)} />
                    </div>
                </div>
                <div className="pt-1" style={{ width: '100%' }}>
                    <div className="d-flex justify-content-between">
                        <spam className="text-secondary">Autor do post</spam>
                        <strong>{authorValue}</strong>
                    </div>
                    <div class="range">
                        <input type="range" min="0" max="100" value={authorValue} onInput={e => setAuthorValue(e.target.value)} />
                    </div>
                </div>
                <div className="pt-1" style={{ width: '100%' }}>
                    <div className="d-flex justify-content-between">
                        <spam className="text-secondary">Likes do post</spam>
                        <strong>{likesValue}</strong>
                    </div>
                    <div class="range">
                        <input type="range" min="0" max="100" value={likesValue} onInput={e => setLikesValue(e.target.value)} />
                    </div>
                </div>
            </div>
        </div>
    )
}