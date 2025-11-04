import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import { Home, Pages, About, Quotes } from "./components/Pages"




function App() {

  return (
    <>
      <div className='App'>

        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Pages' element={<Pages/>} />
          <Route path='/About' element={<About/>} />
          <Route path='/Quotes' element={<Quotes/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
