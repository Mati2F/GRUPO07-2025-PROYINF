import React, { useEffect, useState } from 'react'
import api from './Api.js'
import axios from 'axios'
import './vista_boletines.css'
import { useParams } from 'react-router-dom' 
import Footer from './Footer.js'

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
                    console.log(auth)
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
            <div className="header-container">
                <a href="/">
                            <img src="/minagri.png" alt="Logo" className="logo" />
                </a>
                <nav>
                    <ul className="nav-menu">
                        <li><a href="/Boletines">Boletines</a></li>     
                    </ul>
                </nav>
            </div>
        </header>

        <section className="borrador-section">
            <h1 className="borrador-title">Boletin {id}</h1>
            
            <div className="borrador-container">
                <div className="borrador-card">
                    <img src={"/BoletinFia.jpg"} alt="Portada del Boletín" className="borrador-image" />
                    <button className="access-button" onClick={handleVerPdf}>Ver PDF</button>
                    <button className="btn btn-secondary" onClick={handleShare}>Compartir</button>
                </div>
            </div>
        </section>

        <Footer/>
    </div>
  )
}

export default ViewBoletin