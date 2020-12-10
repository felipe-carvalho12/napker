import React, { useEffect, useState } from 'react'

import { SERVER_URL } from '../../../../config/settings'

export default function News() {
    const [news, setNews] = useState(null)

    useEffect(() => {
        fetch(`https://newsapi.org/v2/everything?q=ethereum&language=pt&apiKey=ff76727063ed40308672d1f49127bd43`)
            .then(response => response.json())
            .then(data => setNews(data.article))
    }, [])

    return (
        <>
            {news !== null &&
                <>
                {news.map(article => {
                    return (
                        <div>
                            {article}
                        </div>
                    )
                })}
                </>
            }
        </>
    )
}