import React, { useEffect, useState } from 'react'
import api from './Api.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './vista_boletines.css'
import {Link} from 'react-router-dom'


const port = process.env.PORT || 8081

function Boletines() {
    const [images, setImages] = useState([])
    const [allImages, setAllImages] = useState([]);
    const [ordenRecientes, setOrdenRecientes] = useState(false);
    
    const [Taimages, setTaImages] = useState([])
    const [resImages, setResImages] = useState("")
    const [filter, setFilter] = useState([])
    const [category, setCategory] = useState([])
    const navigate = useNavigate();

    const peticionGet = async() => {
        try{
            const res = await api.get("/bol");
            console.log(res)
            setImages(res.data);
            setAllImages(res.data); 
            setTaImages(res.data);
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
            const res = await api.get('/logout');
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
        peticionGet();
        categoryGet();
        
    }, [])

    const handleChange = e => {
        setResImages(e.target.value);
        filtrar(e.target.value);
    }

    const filtrar = (filtro) => {
        var resultado = Taimages.filter((elemento) =>{
        if(elemento.categorias.toString().toLowerCase().includes(filtro.toLowerCase())) {return elemento;}
        return null;
        });
        setImages(resultado);
    }

    const handleChangeCheckBox = e => {
        var update = Taimages.filter((fp) => {
            if(fp.categorias.toString().toLowerCase().includes(e.target.value.toLowerCase())) {return fp;}
            return null;
        });
        if(e.target.checked){
            let filtro = filter.concat(update)
            filtro.sort(function (a, b) {
                if(a.id > b.id) return 1
                if(a.id < b.id) return -1
                return 0
            })
            console.log(filtro);
            setFilter(filtro);
            setImages(filtro);
        }
        else{
            const duplicado = []
            filter.forEach((element) => {
                if(element.categorias !== e.target.value) duplicado.push(element);
            })
            setFilter(duplicado);
            setImages(duplicado);
            if(duplicado.length === 0) setImages(Taimages)
        }
        /*
        if(e.target.checked){
            setResImages(resImages + update)
        } else {
            setImages([...resImages.filter(fp => fp.categorias === e.target.value)])
        }*/
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
                        <li><a href="/Boletines">Boletines</a></li>
                        <li><a href="/">Solutions</a></li>
                        <li><a href="/">Contact</a></li>
                        <li><a href="/Login" class="login-button">Inicia sesión</a></li>
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
                        {/* {category.map((item) => <li>
                            <label>{item}</label>
                            <input type="checkbox" value={item} onChange={handleChangeCheckBox}/>
                        </li>)} */}
                </aside>
                <section className="boletines">
                    <div className="search-bar">
                        <input type="text" placeholder="Search" />
                        <label>
                            <input
                                type="checkbox"
                                checked={ordenRecientes}
                                onChange={manejarOrdenRecientes}
                            />
                            Recientes
                        </label>
                        {/* <input 
                            className="form-control inputBuscar"
                            value={resImages}
                            placeholder="Busqueda de categorias"
                            onChange={handleChange}
                        /> */}
                    </div>

                    <div className="grid-boletines">
                        {images &&
                            images.map((ima) => (
                            <div key={ima.id} className="card">
                                <img className="boletinesIMG" src="/BoletinFia.jpg" alt={`Boletín ${ima.id}`} />
                                <p>
                                <Link to={`${ima.id}`} className="btn btn-primary">
                                    Boletín {ima.id}
                                </Link>
                                </p>
                                {/*<p>{ima.categoria}</p>
                                <p>{ima.fecha}</p>*/}
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