import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function App() {
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/profile/profile-list')
    .then(response => response.json())
    .then(data => {
      setProfiles(data)
      console.log(data)
    })
  }, [])

  return (
    <div>
      {profiles.map(profile => {
        return <p key={profile.user}>{profile.last_name}</p>
      })}
    </div>
  )
}

ReactDOM.render(<App/>, document.querySelector('#root'))
