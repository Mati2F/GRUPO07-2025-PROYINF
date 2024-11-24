import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './register.css'

export default function CreateUser() {
    const [rol, setRol] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [apellidos, setApellidos] = useState('')
    const port = process.env.PORT || 8081

    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post(`http://localhost:${port}/admin/create`, {rol, email, name, apellidos})
        .then(res => {
            if(res.data.Status === "Success"){
                //console.log(res);
                navigate('/admin')
            } else{
                alert("Error creando usuario")
            }
            
        }).catch(err=> console.log(err))
    }
    return (
        <div>
            <div>
            <header>
                <div className="header-container">
                    <img src={"/logo.png"} alt="Logo" className="logo" />
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
                <div className="d-flex">
                <form className="form-container" onSubmit={handleSubmit}>
                    <h2 className = "form-container h2">Agregar usuario</h2>
                    <div className='mb-2'>
                        <label htmlFor="">Rol</label>
                        <input type='text' placeholder='Ingresar rol' className='form-control' required
                        onChange={e => setRol(e.target.value)}></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Email</label>
                        <input type='email' placeholder='Ingresar correo' className='form-control' required
                        onChange={e => setEmail(e.target.value)}></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Nombre</label>
                        <input type='text' placeholder='Ingresar nombre' className='form-control' required
                        onChange={e => setName(e.target.value)}></input>

                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Apellidos</label>
                        <input type='text' placeholder='Ingresar apellidos' className='form-control' required
                        onChange={e => setApellidos(e.target.value)}></input>

                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
                </div>
            </div>
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
                                {/* Aquí puedes agregar los íconos de redes sociales */}
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
