import React, { useState, useEffect } from "react";

function Controler() {
    const [checkedOne, setCheckedOne] = useState(false);
    const [data, setData] = useState([])
    const [data1, setData1] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/w1')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    })

    function handleChangeOne1() {
        if (!checkedOne) {
            let i = data1.length;
            for (let index of data) {
                if (index.url == "a") {
                    data1[i] = index;
                    i++;
                }
            }
            setData1(data1);
        } else {
            const a = data1.filter(d => d.url != "a");
            setData1(a);
        }
        setCheckedOne(!checkedOne)
    }

    return (
        <div>
            <h1>Controler</h1>
            <Checkbox
                label="Value 1"
                value={checkedOne}
                onChange={handleChangeOne1}
            />
            <ul>
                {data1.map((d, index) => <li key={index}>{d.url}</li>)}
            </ul>
        </div>
    )
}

const Checkbox = ({ label, value, onChange }) => {
    return (
        <label>
            <input type="checkbox" checked={value} onChange={onChange} />
            {label}
        </label>
    )
}

export default Controler
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