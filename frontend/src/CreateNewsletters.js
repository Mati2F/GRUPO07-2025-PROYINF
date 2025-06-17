import React, {useEffect, useState} from 'react'
import './creacion_boletines.css';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import api from './Api.js'
import Footer from './Footer.js'

const Pagina404 = () => {
        return (
            <div>
                <h1>404 Not Found</h1>
                <p>Lo sentimos, la página que buscas no existe.</p>
            </div>
        );
};
function CreateNewsletters() {
    const navigate = useNavigate();
    const handleLogout = async() => {
        try{
            await api.get('/logout');
            navigate('/')
        }catch(err){
            console.log(err)
        }
    }
    
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
        };
        fetchPermission();
    })

    
    
    if (!auth) {
        return <Pagina404 />; // Renderiza la página 404 si no está autenticado
    }
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
                            href="/">Cerrar sesion</button></li>
                    </ul>
                </nav>
            </header>

            <div className="main-content">
                <div className="form-container">
                    <form id="formulario">
                        <input 
                            type="text" 
                            id="texto" 
                            name="texto" 
                            placeholder="Escribir palabras claves separadas por comas" 
                            required 
                        />
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </div>
            
            <Footer/>
        </div>
  )
}

export default CreateNewsletters