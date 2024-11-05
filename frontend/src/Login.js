import React, {useState } from 'react'
import axios from 'axios'

export default function Login() {
    const port = process.env.PORT || 3000
    const puerto = 'http://localhost:?/login'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    function handleSubmit(event){
        event.preventDefault();
        axios.post(puerto, port, {email, password})
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
    
    return (
    <div>
            <div>
            <h2>Login lol</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input type='email' placeholder='Enter Email' required></input>
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type='password' placeholder='Enter Password' required></input>
                    </div>
                    <button>Login</button>
                </form>
            </div>
        </div>
    )
}
