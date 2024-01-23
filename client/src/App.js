import './App.css';
import { Route, Routes } from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import Login from './components/login';
import MainSignup from './components/MainSignup';
import CustomerSignup from './components/CustomerSignup';
import CourierSignup from './components/CourierSignup';
import VendorSignup from './components/VendorSignup';
import StudentVendorSignup from './components/StudentVendorSignup';

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/MainSignup" element={<MainSignup/>}/>
            <Route path="/CustomerSignup" element={<CustomerSignup/>}/>
            <Route path="/CourierSignup" element={<CourierSignup/>}/>
            <Route path="/VendorSignup" element={<VendorSignup/>}/>
            <Route path="/StudentVendorSignup" element={<StudentVendorSignup/>}/>


                             
        </Routes>
      </BrowserRouter>
    
  )
}

export default App;
