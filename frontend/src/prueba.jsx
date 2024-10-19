import React, {useState} from "react";

function Prueba(){
    
    const [url, setUrl] = useState(["A", "B", "C", "A", "B", "C", "A", "B", "C", "A", "B", "C", "A", "B", "C", "A", "B", "C"]);
    const [url1, setUrl1] = useState([]);
    const [checkedOne, setCheckedOne] = useState(false);
    const [checkedTwo, setCheckedTwo] = useState(false);

    function handleChangeOne(){
        if(!checkedOne){
            let i = url1.length;
            for(let names of url){
                if(names === "A"){
                    url1[i] = names;
                    i++;
                }
            }
            setUrl1(url1);
        } else{
            const a = url1.filter(d => d !== "A");
            setUrl1(a);
        }
        setCheckedOne(!checkedOne)
    }

    function handleChangeTwo(){
        if(!checkedTwo){
            let i = url1.length;
            for(let names of url){
                if(names === "B"){
                    url1[i] = names;
                    i++;
                }
            }
            setUrl1(url1);
        } else{
            const a = url1.filter(d => d !== "B");
            setUrl1(a);
        }
        setCheckedTwo(!checkedTwo);
    }

    return (
        <div>
        <Checkbox
            label="Value 1"
            value={checkedOne}
            onChange={handleChangeOne}
        />
        <br></br>
        <Checkbox
            label="Value 2"
            value={checkedTwo}
            onChange={handleChangeTwo}
        />
        <ul>
            {url1.map((url, index) => <li key={index}>{url}</li>)}
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

export default Prueba