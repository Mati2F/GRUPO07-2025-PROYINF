import React, {useEffect, useState} from 'react'
import './individual_boletines.css';
import api from './Api.js'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom';
import Footer from './Footer.js'

const Pagina404 = () => {
        return (
            <div>
                <h1>404 Not Found</h1>
                <p>Lo sentimos, la página borrador que buscas no existe.</p>
            </div>
        );
    };
    
function SingleDraft() {

    const [auth, setAuth] = useState(false);
    const {id} = useParams();
    
    const navigate = useNavigate();
    const handleLogout = async() => {
        try{
            await api.get('/logout');
            navigate('/')
        }catch(err){
            console.log(err)
        }
    }

    axios.defaults.withCredentials = true;
    
    useEffect(()=>{
        const fetchPermission = async() => {
            try{
                const res = await api.get('/admin/all-drafts');
                console.log("ESta es la respuesta del servidor" ,res.data)
                if(res.data.Status === "Success"){
                    setAuth(true)
                } else {
                    setAuth(false)
                }
            }catch(err){
                console.log(err)
            }
        
    }
    fetchPermission();
    });

    if (!auth) {
        return <Pagina404 />; // Renderiza la página 404 si no está autenticado
    }

    const handleVerPdf = () => {
        window.open(`http://localhost:8000/draft/${id}`, '_blank');
    };
    return (
    <div>
                <header>
                    <a href = "/">
                        <img src="/minagri.png" alt="Logo" className="logo" />
                        <Link to='/admin/all-drafts'>Volver</Link>
                    </a>
                    <nav>
                        <div className="logo"></div>
                        <ul className="nav-links">
                            <li>VIGIFIA</li>
                            <li><a href="/admin/all-drafts">Borradores</a></li>
                            <li><a href="/admin/create-newsletters">Creación</a></li>
                            <li className="nav-item">
                                <button onClick={handleLogout}
                                className="nav-link-outline-0 border-0 bg-red text-prima"  
                                href="/">Cerrar sesion</button></li>{/*class="login-button" */}
                        </ul>
                    </nav>
                </header>

    <section className="borrador-section">
        <h1 className="borrador-title">Borrador {id}</h1>
        
        <div className="borrador-container">
            <div className="borrador-card">
                <img src={"/BoletinFia.jpg"} alt="Portada del Boletín" className="borrador-image" />
                
                <button className="access-button" onClick={handleVerPdf}>Ver PDF</button>
                <button className="update-button" >Actualizar PDF</button>
            </div>
        </div>
    </section>

    <Footer />
</div>
  )
}

export default SingleDraft