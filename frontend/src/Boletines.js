import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './vista_boletines.css'


const port = process.env.PORT || 8081

function Boletines() {
  const [images, setImages] = useState([])
  const [Taimages, setTaImages] = useState([])
  const [resImages, setResImages] = useState("")

  const peticionGet = async() => {
    await axios.get(`http://localhost:${port}`)
      .then(res =>{
        setImages(res.data);
        setTaImages(res.data);
      }).catch(err => console.log(err));
  }

  const handleChange = e => {
    setResImages(e.target.value);
    filtrar(e.target.value);
  }

  useEffect(() => {
    peticionGet();
  }, [])

  const filtrar = (filtro) => {
    var resultado = Taimages.filter((elemento) =>{
      if(elemento.categorias.toString().toLowerCase().includes(filtro.toLowerCase())) {return elemento;}
    });
    setImages(resultado);
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
                        <li><a href="#">Solutions</a></li>
                        <li><a href="#">Contact</a></li>
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
                </aside>

                <section className="boletines">
            <div className="search-bar">
                <input type="text" placeholder="Search"/>
                <button>Recientes</button>
                <button>Más Vistos</button>
                <button>Rating</button>
            </div>

			<div className="boletin-container">
				<div className="boletin-item">
					<img src="/BoletinFia.jpg" alt="foto boletin"/>
					<p>Boletín 1</p>
				</div>
				<div className="boletin-item">
					<img src="/BoletinFia.jpg" alt="foto boletin"/>
					<p>Boletín 2</p>
				</div>
				<div className="boletin-item">
					<img src="/BoletinFia.jpg" alt="foto boletin"/>
					<p>Boletín 3</p>
				</div>
				<div className="boletin-item">
					<img src="/BoletinFia.jpg" alt="foto boletin"/>
					<p>Boletín 4</p>
				</div>
				<div className="boletin-item">
					<img src="/BoletinFia.jpg" alt="foto boletin"/>
					<p>Boletín 5</p>
				</div>
				<div className="boletin-item">
					<img src="/BoletinFia.jpg" alt="foto boletin"/>
					<p>Boletín 6</p>
				</div>
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

export default Boletines