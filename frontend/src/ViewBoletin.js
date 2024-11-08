import React from 'react'

function ViewBoletin() {
  //`http://localhost:${port}/admin/update/`+id
  //La url debe estar con el id correspondiente del boletin pa verlo :3
  return (
    <div>
    <header>
        <div className="header-container">
            <img src={"/logo.png"} alt="Logo" className="logo" />
        </div>
        <nav>
            <div className="logo"></div>
            <ul className="nav-links">
                <li>Boletines</li>
                <li>Solutions</li>
                <li>Contact</li>
                <li><button>Inicia sesión</button></li>
            </ul>
        </nav>
    </header>

    <section className="borrador-section">
        <h1 className="borrador-title">Título Boletín Seleccionado</h1>
        
        <div className="borrador-container">
            <div className="borrador-card">
                <img src={"/BoletinFia.jpg"} alt="Portada del Boletín" className="borrador-image" />
                <button className="access-button">Acceder</button>
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