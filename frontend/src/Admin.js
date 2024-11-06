import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

function Admin() {
    
    const [user, setUser] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/admin')
        .then(res=> setUser(res.data))
        .catch(err=> console.log(err))
    })
    

    const handleDelete= async (id) =>{
        try{
            await axios.delete('http://localhost:3000/admin/'+id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
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