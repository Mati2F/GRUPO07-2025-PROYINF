import React, {useState} from "react";

function Prueba(){
    const [checkedOne, setCheckedOne] = useState(false);
    const [checkedTwo, setCheckedTwo] = useState(false);
    
    function handleChangeOne(){
        setCheckedOne(!checkedOne);
    }

    function handleChangeTwo(){
        setCheckedTwo(!checkedTwo);
    }

    return (
        <div>
        <Checkbox
            label="Value 1"
            value={checkedOne}
            onChange={handleChangeOne}
        />
        <Checkbox
            label="Value 2"
            value={checkedTwo}
            onChange={handleChangeTwo}
        />
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
/*
function Prueba(){
    const [url, setUrl] = useState(["A", "B", "C", "A", "B", "C", "A", "B", "C", "A", "B", "C", "A", "B", "C", "A", "B", "C"]);
    const [url1, setUrl1] = useState(url);

    function search(){
        setUrl1(url)
    }
    function searchA(){
        let algo = [];
        let i = 0;
        for(let names of url){
            if(names === "A"){
                algo[i] = names;
                i++;
            }
        }
        setUrl1(algo)
    }
    function searchB(){
        let algo = [];
        let i = 0;
        for(let names of url){
            if(names === "B"){
                algo[i] = names;
                i++;
            }
        }
        setUrl1(algo)
    }
    function searchC(){
        let algo = [];
        let i = 0;
        for(let names of url){
            if(names === "C"){
                algo[i] = names;
                i++;
            }
        }
        setUrl1(algo)
    }
    return(
    <div>
        <button onClick={searchA}> A </button>
        <button onClick={searchB}> B </button>
        <button onClick={searchC}> C </button>
        <button onClick={search}> All </button>
        <h2> url </h2>
        <ul>
            {url1.map((url, index) => <li key={index}>{url}</li>)}
        </ul>
    </div>)
}*/
export default Prueba