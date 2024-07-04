import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../src/components/Navbar'
import './App.css'
import Wallet from './components/Wallet';
import Footer from './components/Footer';
import Register from './components/Register';
import Inicio from './components/Inicio';
import Exchange from './components/Exchange';

function App() {

  return (
        <>
        <HashRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={<Inicio/>} />
          <Route path='/wallet' element={<Wallet />} />
          <Route path='/register' element={<Register/>} />
          <Route path='/exchange' element={<Exchange/>} />
        </Routes>
        <Footer />
      </HashRouter>
       
    </>
  )
}
export default App
