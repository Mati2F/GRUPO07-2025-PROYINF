import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Admin from './Admin'
import Login from './Login'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
import Home from './Home.js'
import Boletines from './Boletines.js';
import ViewBoletin from './ViewBoletin.js'

function App() {

  return (
    <div className = "App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element= {<Home/>} />
          <Route path='/boletines' element= {<Boletines/>} />
          <Route path='/boletines/:id' element= {<ViewBoletin/>} />
          <Route path='/admin' element={<Admin/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/admin/create' element={<CreateUser/>}></Route>
          <Route path='/admin/update/:id' element={<UpdateUser/>}></Route>          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
