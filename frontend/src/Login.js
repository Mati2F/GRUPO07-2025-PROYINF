import React, { useState } from 'react';
import api from './Api.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
    const port = process.env.PORT || 8081;
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
                navigate('/admin/all-drafts');
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
                <nav>
                    <ul className="nav-menu">
                        <li><a href="/Boletines">Boletines</a></li>
                        <li><a href="#">Solutions</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
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

            <footer>
                <div className="footer-container">
                    <div className="footer-right">
                        <div className="footer-section">
                            <h4>Sitios de interés</h4>
                            <p>MINAGRI</p>
                            <p>FIA</p>
                            <p>BIBLIOTECA DIGITAL FIA</p>
                        </div>
                        <div className="footer-section">
                            <h4>Contacto</h4>
                            <p>Loreley 1582, La Reina, Santiago</p>
                            <p>Teléfono: +562 2431 3000</p>
                        </div>
                        <div className="footer-section">
                            <h4>Redes sociales</h4>
                            <p>
                                <a href="https://twitter.com/FIA_Chile">
                                    <img className="iconoX" src="/iconos/X.png" alt="Twitter" />
                                </a>
                                <a href="https://www.instagram.com/fia_chile/">
                                    <img className="iconoI" src="/iconos/instagram.png" alt="Instagram" />
                                </a>
                                <a href="https://www.youtube.com/c/Fundaci%C3%B3nparalaInnovaci%C3%B3nAgraria">
                                    <img className="iconoY" src="/iconos/youtube.png" alt="YouTube" />
                                </a>
                                <a href="https://www.linkedin.com/company/fiachile">
                                    <img className="iconoL" src="/iconos/linkedin.png" alt="LinkedIn" />
                                </a>
                                <a href="https://www.facebook.com/OpiaChile/">
                                    <img className="iconoF" src="/iconos/facebook.png" alt="Facebook" />
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Login;