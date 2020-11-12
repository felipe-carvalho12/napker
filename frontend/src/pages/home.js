import React, { useState } from 'react'
import Posts from './home-components/posts'
import Profiles from './home-components/profiles'
import Header from '../components/header'

export default function Home() {
    const [page, setPage] = useState('Posts')
    const pages = {
        'Perfis': <Profiles />,
        'Posts': <Posts />
    }

    document.title = 'Home / Napker'

    return (
        <>
            <Header page="Home" />
            <div className="content">
                <div className="home-page-subheader">
                    {page === 'Perfis' ?
                        'Veja o que os seus amigos estão fazendo ultimamente: ' :
                        'Encontre usuários que possuem os mesmos interesses que você e faça novas amizades: '
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