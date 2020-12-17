import { Croppie } from 'croppie'
import React, { useContext, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { SERVER_URL } from '../../../config/settings'
import { csrftoken, openCloseEmojiList } from '../../../config/utils'
import { EditProfileContext } from '../../../context/editprofile/EditProfileContext'
export default function CroppieModal() {
    /*const croppieOptions = {
        showZoomer: true,
        enableOrientation: true,
        mouseWheelZoom: "ctrl",
        viewport: {
            width: 200,
            height: 200,
            type: "square"
        },
        boundary: {
            width: "50vw",
            height: "50vh"
        }
    };

    const croppie = document.getElementById("croppie");
    const c = new Croppie(croppie, croppieOptions);
*/
    return(
        <div>
            <p>ola</p>
        </div>
    )
}

