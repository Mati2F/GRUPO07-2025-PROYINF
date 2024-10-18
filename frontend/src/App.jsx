import Prueba from './prueba.jsx'

function App(){
  return(<Prueba/>)
}
export default App

/*
import React, { useEffect, useState } from 'react'
import prueba from './prueba.jsx'

export default function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('http://localhost:3000/w1')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err));
  })
  return (
    <div>
      
      <div>
        {data.map((d,i) => (        
          <p>url: {d.url}</p>
        ))}
      </div>
      <table>
        <thead>
          <th>URL</th>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
*/