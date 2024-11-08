import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


function Home() {
    const [user, setUser] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/')
        .then(res=> res.json('Home :3'))
        .catch(err=> console.log(err))
    })

    return (
        <div>Home</div>
    )
}

export default Home