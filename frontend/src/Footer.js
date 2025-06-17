// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-left">
                    <img src="/minagri.png" alt="MINAGRI logo" />
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
                                <img className="iconoX" src="/iconos/X.png" alt="X" />
                            </a>
                            <a href="https://www.instagram.com/fia_chile/">
                                <img className="iconoI" src="/iconos/instagram.png" alt="Instagram" />
                            </a>
                            <a href="https://www.youtube.com/c/Fundaci%C3%B3nparalaInnovaci%C3%B3nAgraria">
                                <img className="iconoY" src="/iconos/youtube.png" alt="Youtube" />
                            </a>
                            <a href="https://www.linkedin.com/company/fiachile">
                                <img className="iconoL" src="/iconos/linkedin.png" alt="Linkedin" />
                            </a>
                            <a href="https://www.facebook.com/OpiaChile/">
                                <img className="iconoF" src="/iconos/facebook.png" alt="Facebook" />
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
