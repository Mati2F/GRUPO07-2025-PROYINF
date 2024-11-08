import React from 'react'
import './vista_boletines.css';

function AllDrafts() {
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

                <section className="borradores">
                    <div className="search-bar">
                        <input type="text" placeholder="Search" />
                        <button>Recientes</button>
                        <button>Más Vistos</button>
                        <button>Rating</button>
                    </div>

                    <div className="borrador-container">
                        {[1, 2, 3, 4, 5, 6].map(num => (
                            <div className="borrador-item" key={num}>
                                <img src={boletinFoto} alt={`Borrador ${num}`} />
                                <p>Borrador {num}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </section>

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

export default AllDrafts