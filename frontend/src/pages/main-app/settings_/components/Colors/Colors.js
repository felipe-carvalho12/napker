import React, { useContext, useEffect, useState } from 'react'
import RgbaEditor from './components/RgbaEditor'


export default function Colors() {

    return (
        <div className="settings-description-container b-t-r-r b-b-r-r b-theme-base-color p-10px">
            <h3 className="c-primary-color p-20px">Cores</h3>
            <RgbaEditor 
                cssVar="--theme-base-color" 
                title="Cor base"
            />
            <RgbaEditor 
                cssVar="--background" 
                title="Cor do fundo"
            />
            <RgbaEditor 
                cssVar="--primary-grey" 
                title="Cor da fonte primária"
            />
            <RgbaEditor 
                cssVar="--secondary-grey" 
                title="Cor da fonte secundária"
            />
        </div>
    )
}