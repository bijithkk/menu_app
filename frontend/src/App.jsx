import { Routes,Route} from 'react-router-dom';

import NavBar from "./components/Navbar"
import Home from './Pages/Home';
import CreateMenu from './Pages/CreateMenu';
import { ToastContainer } from "react-toastify";


const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/createMenu" element={<CreateMenu/>}/>
      </Routes>
    </div>

  )
}

export default App
