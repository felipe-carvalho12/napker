import React, { useContext, useEffect, useRef, useState } from 'react'

import { AlgorithmWeightsContext } from '../../../../../../../context/app/AppContext'
import { SERVER_URL } from '../../../../../../../config/settings'
import { csrftoken } from '../../../../../../../config/utils'
import Info from './components/Info'
import InfoIcon from '../../../InfoIcon'
import ProfileSettings from './components/ProfileSettings'
import PostSettings from './components/PostSettings'

export default function X(props) {

<div
                className={`d-flex flex-column justify-content-start align-items-center algorithm-settings ${props.className ? props.className : ''}`}
                style={{ height: '85%', ...props.style }}
            ></div>

}