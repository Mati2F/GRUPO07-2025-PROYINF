import React from 'react'
import './individual_boletines.css';

function SingleDraft() {
  return (
    <div>
    <header>
        <div className="header-container">
            <img src={"/logo"} alt="Logo" className="logo" />
        </div>
        <nav>
            <div className="logo"></div>
            <ul className="nav-as">
                <li>VIGIFIA</li>
                <li><a href="/admin/all-drafts">Borradores</a></li>
                <li><a href="/admin/create-newsletters">Creación</a></li>
                <li><a href="/login">Iniciar sesión</a></li>
            </ul>
        </nav>
    </header>

    <section className="borrador-section">
        <h1 className="borrador-title">Título Boletín Seleccionado</h1>
        
        <div className="borrador-container">
            <div className="borrador-card">
                <img src={"./BoletinFia"} alt="Portada del Boletín" className="borrador-image" />
                <button className="access-button">Acceder</button>
            </div>
        </div>
    </section>

    <footer>
        <div className="footer-container">
            <div className="footer-left">
                <img src={"./minagri"} alt="MINAGRI logo" />
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
                        <a href="#"><i className="fab fa-facebook"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </p>
                </div>
            </div>
        </div>
    </footer>
</div>
  )
}

export default SingleDraft