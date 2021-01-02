import React, { useContext, useEffect, useState } from 'react'
import Slider from '@material-ui/core/Slider'

import { AlgorithmWeightsContext } from '../../../../../../../../context/app/AppContext'


export default function PostSettings(props) {
    const handleDetailClick = props.handleDetailClick
    const open = props.open
    const [, setCurrentWeights] = props.useCurrentWeights

    const [weights,] = useContext(AlgorithmWeightsContext)

    const [dateValue, setDateValue] = useState(null)
    const [authorValue, setAuthorValue] = useState(null)
    const [likesValue, setLikesValue] = useState(null)

    useEffect(() => {
        if (weights) {
            setDateValue(parseInt(weights.post.date_weight))
            setAuthorValue(parseInt(weights.post.author_weight))
            setLikesValue(parseInt(weights.post.likes_weight))
        }
    }, [weights])

    useEffect(() => {
        setCurrentWeights({
            'date_weight': parseInt(dateValue),
            'author_weight': parseInt(authorValue),
            'likes_weight': parseInt(likesValue),
        })
    }, [dateValue, authorValue, likesValue])

    return (
        <>
            {(dateValue !== null && authorValue !== null && likesValue !== null) &&
                <div className="w-100">
                    <div className="w-100 d-flex b-theme-base-color">
                        <i
                            className="material-icons-sharp align-self-start icon base-hover text-secondary algorithm-settings-details"
                            data-type='post'
                            style={{ width: '25px', height: '25px' }}
                            onClick={handleDetailClick}
                        >
                            keyboard_arrow_right</i>
                        <h6 style={{ margin: "0", lineHeight: "1.5" }}>Post</h6>
                    </div>
                    <div className={`mb-2 ${!open && 'd-none'}`}>
                        <div className="pt-1" style={{ width: '100%' }}>
                            <div className="d-flex justify-content-between">
                                <spam className="text-secondary">Post recente</spam>
                                <strong>{dateValue}</strong>
                            </div>
                            <div class="range">
                                <Slider
                                    defaultValue={dateValue}
                                    onChange={(e, value) => setDateValue(value)}
                                />
                            </div>
                        </div>
                        <div className="pt-1" style={{ width: '100%' }}>
                            <div className="d-flex justify-content-between">
                                <spam className="text-secondary">Autor do post</spam>
                                <strong>{authorValue}</strong>
                            </div>
                            <div class="range">
                                <Slider
                                    defaultValue={authorValue}
                                    onChange={(e, value) => setAuthorValue(value)}
                                />
                            </div>
                        </div>
                        <div className="pt-1" style={{ width: '100%' }}>
                            <div className="d-flex justify-content-between">
                                <spam className="text-secondary">Likes do post</spam>
                                <strong>{likesValue}</strong>
                            </div>
                            <div class="range">
                                <Slider
                                    defaultValue={likesValue}
                                    onChange={(e, value) => setLikesValue(value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}