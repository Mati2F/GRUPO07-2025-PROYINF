import React, { useState } from 'react';
import api from './Api.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './login.css';
import Footer from './Footer.js'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    

    async function handleSubmit(event) {
        event.preventDefault(); // Prevent the default form submission
        try {
            const res = await api.post('/login', { email, password });
            console.log(res);
    
            // Check for a successful response
            if (res.data.message === "Login successfully") {
                navigate('/boletines');
            }
        } catch (err) {
            if (err.response) {
                // Log detailed information about the error response
                //console.error('Response data:', err.response.data);
                //console.error('Response status:', err.response.status);
                //console.error('Response headers:', err.response.headers);
                alert(err.response.data.detail);

            } else {
                // Handle errors that are not response-related
                console.error('Error message:', err.message);
                alert("An error occurred: " + err.message);
            }
        }
    }

    return (
        <div>
            <header>
                <div className="header-container">
                    <a href="/">
                        <img src="/minagri.png" alt="Logo" className="logo" />
                    </a>
                </div>
            </header>

            <section className="login-section">
                <div className="login-container">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='email'>Email</label>
                            <input
                                type='email'
                                placeholder='Enter Email'
                                className='form-control'
                                required
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                placeholder='Enter Password'
                                className='form-control'
                                required
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className='btn btn-success'>Ingresar</button>
                    </form>
                </div>
            </section>

            <Footer/>
        </div>
    );
}

export default Login;