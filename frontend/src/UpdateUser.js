import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from './Api.js'
import axios from 'axios'

const Pagina404 = () => {
        return (
            <div>
                <h1>404 Not Found</h1>
                <p>Lo sentimos, la página que buscas no existe.</p>
            </div>
        );
    };
    
export default function UpdateUser() {
    const [rol, setRol] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [pwd, setPwd] = useState('')
    const {id} = useParams()
    const navigate = useNavigate();
    

    function handleSubmit(event){
        event.preventDefault();
        const updateUser = async() => {
            try{
                const res = await api.put('/admin/update'+id, {rol, email, pwd, name, apellidos});
                console.log(res);
                navigate('/admin')
            }catch(err){
                console.log(err)
            }
        updateUser();
        }
    }
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
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Editar usuario</h2>
                    <div className='mb-2'>
                        <label htmlFor="rol">Rol</label>
                        <input type='text' id="rol" placeholder='Editar rol' className='form-control'
                        onChange={e => setRol(e.target.value)}></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="correo">Email</label>
                        <input type='email' id="correo" placeholder='Editar correo' className='form-control'
                        onChange={e => setEmail(e.target.value)}></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="contraseña">Contraseña</label>
                        <input type='text' id="contraseña" placeholder='Editar contraseña' className='form-control'
                        onChange={e => setPwd(e.target.value)}></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="nombre">Nombre</label>
                        <input type='text' id="nombre" placeholder='Editar nombre' className='form-control'
                        onChange={e => setName(e.target.value)}></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="apellidos">Apellidos</label>
                        <input type='text' id="apellidos" placeholder='Editar apellidos' className='form-control'
                        onChange={e => setApellidos(e.target.value)}></input>
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    )
}
