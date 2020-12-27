import React, { createContext, useState } from 'react'

export const AlgorithmWeightsContext = createContext()

export const AlgorithmWeightsProvider = props => {
    const [weights, setWeights] = useState(null)

    return (
        <AlgorithmWeightsContext.Provider value={[weights, setWeights]}>
            {props.children}
        </AlgorithmWeightsContext.Provider>
    )
}