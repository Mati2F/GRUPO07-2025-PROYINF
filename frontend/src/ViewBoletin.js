import React, { useEffect, useState } from 'react'
import api from './Api.js'
import axios from 'axios'
import './vista_boletines.css'
import { useParams } from 'react-router-dom' 

function ViewBoletin() {
  //`http://localhost:${port}/admin/update/`+id
  //La url debe estar con el id correspondiente del boletin pa verlo :3
    const [auth, setAuth] = useState(false);
    const {id} = useParams();
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
    });


    const handleShare = () => {
        if ("share" in navigator) {
        navigator.share({
            title: "Ve esta información",
            url: window.location.href
        })
        .then(() => console.log("Contenido Compartido !"))
        .catch(console.error);
        } else {
        alert('Lo siento, este navegador no tiene soporte para recursos compartidos.');
        }
    };

    const handleVerPdf = () => {
        window.open(`http://localhost:8000/bol/pdf/${id}`, '_blank');
    };
   

    return (
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

        <section className="borrador-section">
            <h1 className="borrador-title">Título Boletín Seleccionado</h1>
            
            <div className="borrador-container">
                <div className="borrador-card">
                    <img src={"/BoletinFia.jpg"} alt="Portada del Boletín" className="borrador-image" />
                    <button className="access-button" onClick={handleVerPdf}>Ver PDF</button>
                    <button className="btn btn-secondary" onClick={handleShare}>Compartir</button>
                </div>
            </div>
        </section>

        <footer>
            <div className="footer-container">
                <div className="footer-left">
                    <img src = "/minagri.png" alt="MINAGRI logo" />
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
                            <a href="https://twitter.com/FIA_Chile">
                                <img className = "iconoX" src = "/iconos/X.png"></img>
                            </a>
                            <a href="https://www.instagram.com/fia_chile/">
                                <img className = "iconoI" src = "/iconos/instagram.png"></img>
                            </a>
                            <a href="https://www.youtube.com/c/Fundaci%C3%B3nparalaInnovaci%C3%B3nAgraria">
                                <img className = "iconoY" src = "/iconos/youtube.png"></img>
                            </a>
                            <a href="https://www.linkedin.com/company/fiachile">
                                <img className = "iconoL" src = "/iconos/linkedin.png"></img>
                            </a>
                            <a href="https://www.facebook.com/OpiaChile/">
                                <img className = "iconoF" src = "/iconos/facebook.png"></img>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
  )
}

export default ViewBoletin