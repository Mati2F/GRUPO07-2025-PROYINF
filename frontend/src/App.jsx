import Prueba from './prueba.jsx'
import compShowImages from './compShowImages.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/index2.html' element={<compShowImages/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App