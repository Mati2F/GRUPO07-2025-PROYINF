import React, {useState,useEffect} from 'react'
import api from './Api.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './register.css'
import Footer from './Footer.js'


const Pagina404 = () => {
        return (
            <div>
                <h1>404 Not Found</h1>
                <p>Lo sentimos, la página que buscas no existe.</p>
            </div>
        );
    };
    
export default function CreateUser() {
    const [rol, setRol] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [apellidos, setApellidos] = useState('')

    const navigate = useNavigate();

    function generarContrasena(longitud = 12) {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
        let contrasena = '';
        for (let i = 0; i < longitud; i++) {
            const indice = Math.floor(Math.random() * caracteres.length);
            contrasena += caracteres.charAt(indice);
        }
        return contrasena;
    }
    const pass = generarContrasena(16);


    function handleSubmit(event){
        event.preventDefault();
        const createUser = async() => {
            try{
                const res = await api.post('/admin/create', {rol, email, pass, name, apellidos});
                if(res.data.Status === "Success"){
                    alert(`The password is: ${pass}`)
                    navigate('/admin')
                } else {
                    alert("Error creando usuario")
                }
            }catch(err){
                console.log(err)
            }
        
        createUser();
    }}

    const [auth, setAuth] = useState(false);
    axios.defaults.withCredentials = true;
    
    useEffect(()=>{
        const fetchPermission = async() => {
            try{
                const res = await api.get('/admin/all-drafts');
                if(res.data.Status === "Success"){
                    setAuth(true)
                } else {
                    setAuth(false)
                }
            }catch(err){
                console.log(err)
                setAuth(false)
            }
        }
        fetchPermission();
    }, []);

    if (!auth) {
        return <Pagina404 />; // Renderiza la página 404 si no está autenticado
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
                        <label htmlFor="rol">Rol</label>
                        <input type='text' id="rol" placeholder='Ingresar rol' className='form-control' required
                        onChange={e => setRol(e.target.value)}></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="correo">Email</label>
                        <input type='email' id="correo" placeholder='Ingresar correo' className='form-control' required
                        onChange={e => setEmail(e.target.value)}></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="nombre">Nombre</label>
                        <input type='text' id="nombre" placeholder='Ingresar nombre' className='form-control' required
                        onChange={e => setName(e.target.value)}></input>

                    </div>
                    <div className='mb-2'>
                        <label htmlFor="apellidos">Apellidos</label>
                        <input type='text' id="apellidos" placeholder='Ingresar apellidos' className='form-control' required
                        onChange={e => setApellidos(e.target.value)}></input>

                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
