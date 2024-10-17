import React, { useEffect, useState } from 'react'

export default function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('http://localhost:8081/user')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err));
  })
  return (
    <div style={{padding: "50px"}}>
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
