import React, {useEffect, useState} from 'react'
import './inicio.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [auth, setAuth] = useState(false);
    axios.defaults.withCredentials = true;
    
    useEffect(()=>{
        axios.get('http://localhost:8081/admin/all-drafts')
        .then(res=> {
            if(res.data.Status === "Success"){
                setAuth(true)
            } else {
                setAuth(false)
            }
        })
    })
    
    return (
        <body>
        <div>
            <header>
                <div class="header-container">
                    <img src= "./logo.png" alt="Logo FIA" class="logo"/>
                    <nav>
                        <ul class="nav-menu">
                            <li><a href="/Boletines">Boletines</a></li>
                            <li><a href="#">Solutions</a></li>
                            <li><a href="#">Contact</a></li>
                            {auth ? 
                            <li><a href="/admin/all-drafts" className="login-button">Borradores</a></li> 
                            : 
                            <li><a href="/Login" class="login-button">Inicia sesión</a></li>
                            }
                            
                        </ul>
                    </nav>
                </div>
            </header>

            <section class="main-section">
                <div class="main-content">
                    <h1>FUNDACIÓN PARA LA INNOVACIÓN AGRARIA</h1>
                    <h2>27 años</h2>
                    <p>Promoviendo procesos de innovación en la Agricultura de CHILE.</p>
                </div>
            </section>

            <footer>
                <div class="footer-logos">
                    <img src="./minagri.png" alt="Logo Ministerio de Agricultura"/>
                </div>
            </footer>

        </div>
        </body>
    )
}

export default Home