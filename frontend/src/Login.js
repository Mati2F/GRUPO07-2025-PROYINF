import React, {useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import './login.css'
function Login() {
    const port = process.env.PORT || 8081

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post(`http://localhost:${port}/login`, {email, password})
        .then(res => {
            console.log(res)
            //LOGIN EXITOSO DEBE REDIRECCIONAR A MAIN PAGE!!
        })
        .catch(err => console.log(err))
    }
    
    return (
        <div>
            <header>
                <div className="header-container">
                    {/*<img src={logo} alt="Logo" className="logo" />*/}
                </div>
                <nav>
                    <div className="logo"></div>
                    <ul className="nav-links">
                        <li>Boletines</li>
                        <li>Solutions</li>
                        <li>Contact</li>
                        <li><button>Inicia sesión</button></li>
                    </ul>
                </nav>
            </header>

            {/* Sección de Login */}
            
            <section className="login-section">
                <div className="login-container">
                <h2>Login</h2>
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
            </section>
            {/* Footer compartido */}
            <footer>
                <div className="footer-container">
                    <div className="footer-left">
                        {/*<img src={minagriLogo} alt="MINAGRI logo" />*/}
                    </div>
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
                                {/* Aquí puedes agregar los íconos de redes sociales */}
                                <a href="#"><i className="fab fa-facebook"></i></a>
                                <a href="#"><i className="fab fa-twitter"></i></a>
                                <a href="#"><i className="fab fa-instagram"></i></a>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Login