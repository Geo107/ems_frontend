import './App.css'
import HelloWorld from './HelloWorld.jsx'
import 'bootstrap/dist/css/bootstrap.min.css' 
import ListEmployeeComponents from './components/ListEmployeeComponents.jsx'
import HeaderComponent from './components/HeaderComponent.jsx'
import FooterComponent from './components/FooterComponent.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent.jsx'

function App() {

  return (
    <>
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route path='/' element={<ListEmployeeComponents />}></Route>
        <Route path='/employees' element={<ListEmployeeComponents />}></Route>
        <Route path='/add-employee' element= {<EmployeeComponent />}></Route>
        <Route path='/edit-employee/:id' element={<EmployeeComponent />}></Route>
      </Routes>
      <FooterComponent />
    </BrowserRouter>
    </>
  )
}

export default App
