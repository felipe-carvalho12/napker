import React, { useState } from 'react'
import AdvancedPostModal from './components/AdvancedPostModal'

import Form from './components/Form'


export default function PostForm(props) {
    const [advancedModalIsOpen, setAdvancedModalIsOpen] = useState(false)

    return (
        <>
            <AdvancedPostModal
                isOpen={advancedModalIsOpen}
                closeModal={() => setAdvancedModalIsOpen(false)}
            >
                <Form
                    {...props}
                    advanced={true}
                    setAdvancedModalIsOpen={setAdvancedModalIsOpen}
                    className={props.className ? props.className : ''}
                />
            </AdvancedPostModal>

            <Form
                {...props}
                advanced={false}
                setAdvancedModalIsOpen={setAdvancedModalIsOpen}
                className={props.className ? props.className : ''}
            />
        </>
    )
}