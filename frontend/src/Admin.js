import React, {useEffect, useState} from 'react'
import api from './Api.js'
import axios from 'axios'
import {Link} from 'react-router-dom'

function Admin() {
    const port = process.env.PORT || 8081

    const [user, setUser] = useState([])
    const [auth, setAuth] = useState(false);
    axios.defaults.withCredentials = true;
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get('/admin');
                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserData();

    }, []); // Empty dependency array means this runs once on mount

    useEffect(()=>{
        const fetchPermission = async () => {
            try {
                const res = await api.get('/admin/all-drafts');
                if(res.data.Status === "Success"){
                    setAuth(true)
                }else {
                    setAuth(false)}
            } catch (error) {
                console.log(error);
            }
        };
        fetchPermission();
    }, []); // Empty dependency array means this runs once on mount

    const handleDelete= async (id) =>{
        try{
            await api.delete('/admin/'+id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }
    
    const Pagina404 = () => {
        return (
            <div>
                <h1>404 Not Found</h1>
                <p>Lo sentimos, la página que buscas no existe.</p>
            </div>
        );
    };
    
    if (!auth) {
        return <Pagina404 />; // Renderiza la página 404 si no está autenticado
    }
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <div>
                    <li><a href="/admin/all-drafts" class="login-button">Ir a Borradores</a></li>
                </div>
                <Link to='create' className='btn btn-success'>CREAR +</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th> UserID</th>
                            <th> Rol</th>
                            <th> Email</th>
                            <th> Nombre</th>
                            <th> Apellidos</th>
                            <th> Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.map((data, i)=>(
                                <tr key={i}>
                                    <td>{data.UserID}</td>
                                    <td>{data.Rol}</td>
                                    <td>{data.Correo}</td>                                    
                                    <td>{data.Nombre}</td>                                    
                                    <td>{data.Apellidos}</td>
                                    <td>
                                        <Link to={`update/${data.UserID}`} className='btn btn-primary'>Editar</Link>
                                        <button className='btn btn-danger' onClick={e =>handleDelete(data.UserID)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Admin