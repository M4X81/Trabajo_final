import { HashRouter, Routes, Route, BrowserRouter } from 'react-router-dom'
import Navbar from '../src/components/Navbar'
import './App.css';
import Register from './components/Register';
import Wallet from './components/Wallet';
import Footer from './components/Footer';
import Inicio from './components/Inicio';
import Exchange from './components/Exchange';
import Tyc from './components/Tyc';
import Pdp from './components/Pdp';
import { AuthProvider } from './context/authContext';
import Users from './components/Users';
import Login from './components/Login';
import UpdateUsr from './components/UpdateUsr';
import { ToastContainer } from 'react-toastify';


function App() {

  return (
    <>
      <AuthProvider>
      <ToastContainer
                position="top-right"
                autoClose={500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path='/updateuser' element={<UpdateUsr />} />
            <Route path='/' element={<Inicio />} />
            <Route path='/wallet' element={<Wallet />} />
            <Route path='/register' element={<Register />} />
            <Route path='/exchange' element={<Exchange />} />
            <Route path='/tyc' element={<Tyc />} />
            <Route path='/pdp' element={<Pdp />} />
            <Route path='/users' element={<Users />} />
            <Route path='/login' element={<Login />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>

    </>
  )
}
export default App
