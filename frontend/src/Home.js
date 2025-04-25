import React, {useEffect, useState} from 'react'
import './inicio.css'
import axios from 'axios'
import api from './Api.js'
import { useNavigate } from 'react-router-dom';

function Home() {
    const [auth, setAuth] = useState(false);
    axios.defaults.withCredentials = true;
    
    useEffect(()=>{
        const fetchPermission = async() => {
            try{
                const res = await api.get('/admin/all-drafts');
                if(res.data.Status === "Success"){
                    setAuth(true)
                } else {
                    setAuth(false)
                }
            }catch(err){
                console.log(err)
            }
        
        fetchPermission();
    }
    })
    
    return (
        <body>
        <div>
        <header>
                <div className="header-container">
                    <a href = "/">
                        <img src="/minagri.png" alt="Logo" className="logo" />
                    </a>
                </div>
                <nav>
                    <div className="logo"></div>
                    <ul className="nav-menu">
                        <li><a href="/Boletines">Boletines</a></li>
                        <li><a href="/">Solutions</a></li>
                        <li><a href="/">Contact</a></li>
                        <li><a href="/Login" class="login-button">Inicia sesión</a></li>
                    </ul>
                </nav>
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