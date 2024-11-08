import React, { useEffect, useState } from 'react'
import axios from 'axios'


const port = process.env.PORT || 8081

function Boletines() {
  const [images, setImages] = useState([])
  const [Taimages, setTaImages] = useState([])
  const [resImages, setResImages] = useState("")

  const peticionGet = async() => {
    await axios.get(`http://localhost:${port}`)
      .then(res =>{
        setImages(res.data);
        setTaImages(res.data);
      }).catch(err => console.log(err));
  }

  const handleChange = e => {
    setResImages(e.target.value);
    filtrar(e.target.value);
  }

  useEffect(() => {
    peticionGet();
  }, [])

  const filtrar = (filtro) => {
    var resultado = Taimages.filter((elemento) =>{
      if(elemento.categorias.toString().toLowerCase().includes(filtro.toLowerCase())) {return elemento;}
    });
    setImages(resultado);
  }

  return (
    <div>
      <div className='containerInput'>
        <input className='form-control inputBuscar' value={resImages} placeholder="Busqueda por categoria" onChange={handleChange}/>
      </div><button className="btn btn-success">buscar</button>
      <div className='w-50 bg-white rounded p-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>url</th>
              <th>categorias</th>
            </tr>
          </thead>
          <tbody>
            {
              images.map((data, i) => (
                <tr key={i}>
                  <td>{data.url}</td>
                  <td>{data.categorias}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Boletines