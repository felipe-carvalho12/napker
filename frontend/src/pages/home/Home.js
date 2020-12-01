import React, { useEffect, useState } from 'react'
import Posts from './components/posts_/Posts'
import Profiles from './components/Profiles'
import Header from '../../components/fixed/Header'
import { showBottomMenuPostIcon } from '../../config/utils'

export default function Home(props) {
    const [page, setPage] = useState('Posts')
    const pages = {
        'Perfis': <Profiles />,
        'Posts': <Posts />
    }

    document.title = 'Home / Napker'

    useEffect(() => {
        showBottomMenuPostIcon()
    }, [])

    return (
        <>
            <Header page="Home" />
            <div className="content">
                <div className="home-page-subheader">
                    {page === 'Perfis' ?
                        'Veja o que os seus amigos andam fazendo: ' :
                        'Veja usuários com os mesmos interesses que você: '
                    }
                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{ margin: '10px', borderRadius: '20px' }}
                        onClick={() => setPage(page === 'Perfis' ? 'Posts' : 'Perfis')}
                    >
                        {page === 'Perfis' ?
                            'Ver posts' :
                            'Ver perfis'
                        }
                    </button>
                </div>
                {pages[page]}
            </div>
        </>
    )
}