import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
            console.log(res);
            navigate('/admin')
        }).catch(err=> console.log(err))
    }
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Agregar usuario</h2>
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
    )
}
