import React, { useEffect, useState } from 'react'
import api from './Api.js'
import { useNavigate, Link } from 'react-router-dom';
import './vista_boletines.css'


function Boletines() {
    const [auth, setAuth] = useState(false);
    const [role, setRole] = useState(false);
    const [images, setImages] = useState([]);
    const [roleInt, setInt] = useState(0);
    const [allImages, setAllImages] = useState([]);
    const [ordenRecientes, setOrdenRecientes] = useState(false);
    const [name, setName] = useState('');
    const [Taimages, setTaImages] = useState([])
    const [category, setCategory] = useState([])
    const navigate = useNavigate();

    const peticionGet = async() => {
        try{
            const res = await api.get("/bol");
            console.log(res)
            setImages(res.data);
            setAllImages(res.data); 
            setTaImages(res.data);
            console.log(Taimages)
            console.log(category)
        }catch(err){
            console.log(err)
        }
    }

    const manejarOrdenRecientes = (e) => {
        const checked = e.target.checked;
        setOrdenRecientes(checked);
    
        if (checked) {
            const ordenados = [...allImages].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
            setImages(ordenados);
        } else {
            setImages(allImages); // volvemos al orden original
        }
    };  

    const handleLogout = async () => {
        try{
            await api.get('/logout');
            navigate('/');
        }catch (error){
            console.log(error);
        }
    }

    const categoryGet = async() => {
        try{
            const res = await api.get('/categorias');
            setCategory(res.data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        const initUserData = async () => {
            try {
                const res = await api.get('/admin/all-drafts');
                if(res.data.Status === "Success"){
                    setAuth(true)
                    setName(res.data.name)
                    if(res.data.role === 1){
                        setRole(true) 
                    }
                    setInt(res.data.role)
                } else {
                    setAuth(false)
                    console.log(res.data.error)
                }
            } catch (error) {
                console.log(error);
            }
        };
        initUserData();
        peticionGet();
        categoryGet();
        
    }, [])

    if (!auth) {
        return <Pagina404 />; // Renderiza la página 404 si no está autenticado
    }
    return (
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
                        {role && <li><a href="/admin" className="login-button">Ir a Modo Administrador</a></li>}
                        {!role && name !== '' && <li>Hola {name}!</li>}
                        {!role && name === '' && <li></li>}
                        <li><a href="/Boletines">Boletines</a></li>
                        
                        {(roleInt != 0) && <li><a href="admin/all-drafts">Borradores</a></li>}
                        {(name!='')? <li className="nav-item">
                                <button onClick={handleLogout}
                                    className="nav-link-outline-0 border-0 bg-red text-prima"
                                    href="/">Cerrar sesion</button></li>
                                    :
                                    <li><a href="/Login" className="login-button">Inicia sesión</a></li>}
                    </ul>
                </nav>
            </header>

            <section className="main-content">
                <aside className="filters">
                    <h3>Boletines</h3>
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
                <section className="boletines">
                    <div className="search-bar">
                        <input type="text" placeholder="Search" />
                        <label>
                            <input
                                type="checkbox"
                                checked={ordenRecientes}
                                onChange={manejarOrdenRecientes}/>Recientes</label>
                    </div>

                    <div className="grid-boletines">
                        {images?.map((ima) => (
                            <div key={ima.id} className="card">
                                <img className="boletinesIMG" src="/BoletinFia.jpg" alt={`Boletín ${ima.id}`} />
                                <p>
                                <Link to={`${ima.id}`} className="btn btn-primary">
                                    Boletín {ima.id}
                                </Link>
                                </p>
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
                                    <img className = "iconoX" src = "/iconos/X.png" alt="X"></img>
                                </a>
                                <a href="https://www.instagram.com/fia_chile/">
                                    <img className = "iconoI" src = "/iconos/instagram.png" alt="Instagram"></img>
                                </a>
                                <a href="https://www.youtube.com/c/Fundaci%C3%B3nparalaInnovaci%C3%B3nAgraria">
                                    <img className = "iconoY" src = "/iconos/youtube.png" alt="Youtube"></img>
                                </a>
                                <a href="https://www.linkedin.com/company/fiachile">
                                    <img className = "iconoL" src = "/iconos/linkedin.png" alt="Linkedin"></img>
                                </a>
                                <a href="https://www.facebook.com/OpiaChile/">
                                    <img className = "iconoF" src = "/iconos/facebook.png" alt="Facebook"></img>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Boletines