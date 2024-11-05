import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from './Home'
import Login from './Login'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'

function App() {
  return (
    <div className = "App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/create' element={<CreateUser/>}></Route>
          <Route path='/update/:id' element={<UpdateUser/>}></Route>          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
