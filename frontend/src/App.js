import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Admin from './Admin'
import Login from './Login'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
import Home from './Home.js'
import Images from './images.js';

function App() {
/*   return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        
      </Routes>
      </BrowserRouter>
    </div>
  ); */
  
  return (
    <div className = "App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element= {<Home/>} />
          <Route path='/boletines' element= {<Images/>} />
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
