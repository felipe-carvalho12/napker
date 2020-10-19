import React, { useEffect, useState } from 'react'

export default function Posts() {
    return (
        <>
            <div className="form-row d-inline-block">
                <div className="col d-flex">
                    <input type="text" className="form-control" placeholder="O que está acontecendo?" style={{ marginRight: '5px', width: '400px' }} />
                    <button className="btn btn-primary" style={{ marginBottom: '20px', borderRadius: '5px' }}>Postar</button>
                </div>
            </div>
            <div className="list-group">

            </div>
        </>
    )
}