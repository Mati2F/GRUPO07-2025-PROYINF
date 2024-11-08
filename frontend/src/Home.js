import React from 'react'
import './inicio.css'

function Home() {
    
    return (
        <body>
        <div>
            <header>
                <div class="header-container">
                    <img src= "./logo.png" alt="Logo FIA" class="logo"/>
                    <nav>
                        <ul class="nav-menu">
                            <li><a href="#">Boletines</a></li>
                            <li><a href="#">Solutions</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#" class="login-button">Inicia sesión</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <section class="main-section">
                <div class="main-content">
                    <h1>FUNDACIÓN PARA LA INNOVACIÓN AGRARIA</h1>
                    <h2>27 años</h2>
                    <p>Promoviendo procesos de innovación en la Agricultura de CHILE.</p>
                </div>
            </section>

            <footer>
                <div class="footer-logos">
                    <img src="./minagri.png" alt="Logo Ministerio de Agricultura"/>
                </div>
            </footer>

        </div>
        </body>
    )
}

export default Home