import React, { useEffect, useState } from 'react'
import api from './Api.js'
import { useNavigate, Link } from 'react-router-dom';
import './vista_boletines.css'
import Footer from './Footer.js'

function Boletines() {
    const [auth, setAuth] = useState(false);
    const [role, setRole] = useState(false);
    const [images, setImages] = useState([]);
    const [roleInt, setRoleInt] = useState(0);
    const [allImages, setAllImages] = useState([]);
    const [ordenRecientes, setOrdenRecientes] = useState(false);
    const [name, setName] = useState('');
    const [taimages, setTaimages] = useState([])
    const [category, setCategory] = useState([])
    const navigate = useNavigate();

    const peticionGet = async() => {
        try{
            const res = await api.get("/bol");
            console.log(res)
            setImages(res.data);
            setAllImages(res.data); 
            setTaimages(res.data);
            console.log(taimages)
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
                    console.log(auth)
                    setRoleInt(res.data.role)
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

            <Footer/>
        </div>
    )
}

export default Boletines