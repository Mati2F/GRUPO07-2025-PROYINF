import React, {useEffect, useState} from 'react'
import './vista_boletines.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import api from './Api.js'
import {Link} from 'react-router-dom'

function AllDrafts() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState(false);
    const navigate = useNavigate();

    const [images, setImages] = useState([])
    const [allImages, setAllImages] = useState([]);
    const [ordenRecientesCreacion, setOrdenRecientesCreacion] = useState(false);
    const [ordenRecientesMod, setOrdenRecientesMod] = useState(false);

    axios.defaults.withCredentials = true;
    
    const handleLogout = async () => {
        try{
            const res = await api.get('/logout');
            navigate('/');
        }catch (error){
            console.log(error);
        }
    }

    const manejarOrdenRecientesCreacion = (e) => {
        const checked = e.target.checked;
        setOrdenRecientesCreacion(checked);
    
        if (checked) {
            setOrdenRecientesMod(false);
            const ordenados = [...allImages].sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
            setImages(ordenados);
        } else {
            setImages(allImages); // volvemos al orden original
        }
    };

    const manejarOrdenRecientesMod = (e) => {
        const checked = e.target.checked;
        setOrdenRecientesMod(checked);
    
        if (checked) {
            setOrdenRecientesCreacion(false);
            const ordenados = [...allImages].sort((a, b) => new Date(b.fechaMod) - new Date(a.fechaMod));
            setImages(ordenados);
        } else {
            setImages(allImages); // volvemos al orden original
        }
    };  

    const peticionGet = async () => {
    try {
        const res = await api.get("/draft");
        console.log("Respuesta de /draft/:", res.data);
        setImages(res.data);
        setAllImages(res.data); 
        } catch (err) {
            console.log("Error al obtener borradores:", err);
        }
    };
    
    useEffect(()=>{
        const initUserData = async () => {
            try {
                const res = await api.get('/admin/all-drafts');
                if(res.data.Status === "Success"){
                    setAuth(true)
                    setName(res.data.name)
                    if(res.data.role === 1){
                        setRole(true) 
                    }
                    
                } else {
                    setAuth(false)
                    setMessage(res.data.error)
                }
            } catch (error) {
                console.log(error);
            }
        };
        initUserData();
        peticionGet();

    }, []) // Empty dependency array means this runs once on mount

    const Pagina404 = () => {
        return (
            <div>
                <h1>404 Not Found</h1>
                <p>Lo sentimos, la página que buscas no existe.</p>
            </div>
        );
    };
    
    if (!auth) {
        return <Pagina404 />; // Renderiza la página 404 si no está autenticado
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
                        <div className="logo"></div>
                        <ul className="nav-links">

                            {role ?
                                <li><a href="/admin" className="login-button">Ir a Modo Administrador</a></li>
                                :
                                <li>Hola {name}! </li>}
                            <li>VIGIFIA</li>
                            <li><a href="/admin/all-drafts">Borradores</a></li>
                            <li><a href="/admin/create-newsletters">Creación</a></li>
                            <li className="nav-item">
                                <button onClick={handleLogout}
                                    className="nav-link-outline-0 border-0 bg-red text-prima" class="login-button"
                                    href="/">Cerrar sesion</button></li>
                        </ul>
                    </nav>
                </header>
                    <section className="main-content">
                        <aside className="filters">
                            <h3>Borradores</h3>
                            <ul>
                                <li>Alimentos <input type="checkbox" /></li>
                                <li>Berries <input type="checkbox" /></li>
                                <li>Cambio climatico <input type="checkbox" /></li>
                                <li>Apicultura <input type="checkbox" /></li>
                                <li>Bionergia <input type="checkbox" /></li>
                                <li>Catastrofes <input type="checkbox" /></li>
                                <li>Clima calido <input type="checkbox" /></li>
                                <li>Clima templado <input type="checkbox" /></li>
                                <li>Clima helado <input type="checkbox" /></li>
                                <li>Ovinos <input type="checkbox" /></li>
                                <li>TIC's <input type="checkbox" /></li>
                            </ul>
                        </aside>

                        <section className="borradores">
                            <div className="search-bar">
                                <input type="text" placeholder="Search" />
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={ordenRecientesCreacion}
                                        onChange={manejarOrdenRecientesCreacion}
                                    />
                                    Recientes por Creación
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={ordenRecientesMod}
                                        onChange={manejarOrdenRecientesMod}
                                    />
                                    Recientes por Modificación
                                </label>
                            </div>
                            <div className="grid-boletines">
                                {images &&
                                    images.map((ima) => (
                                    <div key={ima.id} className="card">
                                        <img className="borradorIMG" src="/BoletinFia.jpg" alt={`Borrador ${ima.id}`} />
                                        <p>
                                        <Link to={`${ima.id}`} className="btn btn-primary">
                                            Borrador {ima.id}
                                        </Link>
                                        </p>
                                        <p>{ima.categoria}</p>
                                        <p>{ima.fechaCreacion}</p>
                                        <p>{ima.fechaMod}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
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

export default AllDrafts