import React, {useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:3000/login', {email, password})
        .then(res => {
            console.log(res)
            //LOGIN EXITOSO DEBE REDIRECCIONAR A MAIN PAGE!!
        })
        .catch(err => console.log(err))
    }
    
    return (
        <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
            <div className='p-3 bg-white w-25'>
            <h2>Login lol</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' placeholder='Enter Email' className ='form-control' required
                        onChange={e=> setEmail(e.target.value)}></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' placeholder='Enter Password' className ='form-control' required
                        onChange={e=> setPassword(e.target.value)}></input>
                    </div>
                    <button className='btn btn-success'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login