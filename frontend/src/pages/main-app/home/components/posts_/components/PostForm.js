import React, { useState } from 'react'
import AdvancedPostModal from './components/AdvancedPostModal'

import Form from './components/Form'


export default function PostForm(props) {
    const [advancedModalIsOpen, setAdvancedModalIsOpen] = useState(false)

    return (
        <>
            <AdvancedPostModal isOpen={advancedModalIsOpen} closeModal={() => setAdvancedModalIsOpen(false)}>
                <Form  advanced={true} myProfile={props.myProfile} usePosts={props.usePosts} setAdvancedModalIsOpen={setAdvancedModalIsOpen} setMobilePostButton={props.setMobilePostButton} />
            </AdvancedPostModal>

            <Form advanced={false} myProfile={props.myProfile} usePosts={props.usePosts} setAdvancedModalIsOpen={setAdvancedModalIsOpen} setMobilePostButton={props.setMobilePostButton} />
        </>
    )
}