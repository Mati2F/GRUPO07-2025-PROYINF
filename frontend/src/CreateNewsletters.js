import React from 'react'
import './creacion_boletines.css';
import {Link} from 'react-router-dom'
import AllDrafts from './AllDrafts';

function CreateNewsletters() {
  return (
    <div>
            <header>
                <div className="header-container">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <nav>
                    <div className="logo"></div>
                    <ul className="nav-links">
                        <li>VIGIFIA</li>
                        <li><Link to="/admin/all-drafts">Borradores</Link></li>
                        <li><Link to="/admin/create-newsletters">Creación</Link></li>
                        <li><Link to="/login">Iniciar sesión</Link></li>
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
            
            <footer>
                <div className="footer-container">
                    <div className="footer-left">
                        <img src={minagriLogo} alt="MINAGRI logo" />
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

export default CreateNewsletters