import "./App.css";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

// login signup imports
import Login from "./components/login_signup/login";
import MainSignup from "./components/login_signup/MainSignup";
import CustomerSignup from "./components/login_signup/CustomerSignup";
import CourierSignup from "./components/login_signup/CourierSignup";
import VendorSignup from "./components/login_signup/VendorSignup";
import StudentVendorSignup from "./components/login_signup/StudentVendorSignup";
import { AuthProvider } from "./components/login_signup/AuthContext"
import ProtectedRoute from "./components/login_signup/ProtectedRoute";


// customer imports
import CustomerHome from "./components/CustomerHome";
import CustomerReview from "./components/CustomerReview";

// vender imports
import StudentVendorHome from "./components/StudentVendorHome";
import VendorHome from "./components/VendorHome";
import AddItem from "./components/AddItem";
import CourierHome from "./components/CourierHome";
import SeeOrders from "./components/SeeOrders";

//admin imports
import AdminHome from "./components/AdminHome";
import SeeVendorReviews from "./components/admin/SeeVendorReviews";
import SeeVendorRequests from "./components/admin/SeeVendorRequests";
import BanVendors from "./components/admin/BanVendors";
import SeeCourierRequests from "./components/admin/SeeCourierRequests";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider> {/* Wrap your Routes with AuthProvider */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/MainSignup" element={<MainSignup />} />
          <Route path="/CustomerSignup" element={<CustomerSignup />} />
          <Route path="/CourierSignup" element={<CourierSignup />} />
          <Route path="/VendorSignup" element={<VendorSignup />} />
          <Route path="/StudentVendorSignup" element={<StudentVendorSignup />} />
          <Route path="/CourierSignup" element={<CourierSignup />} />
          <Route path="/CustomerSignup" element={<CustomerSignup />} />
          
          {/* Protected Routes with role-based access */}
          <Route path="/VendorHome" element={<ProtectedRoute allowedRoles={['Vendor']}><VendorHome /></ProtectedRoute>} />
          <Route path="/CustomerHome" element={<ProtectedRoute allowedRoles={['Customer']}><CustomerHome /></ProtectedRoute>} />
          <Route path="/CourierHome" element={<ProtectedRoute allowedRoles={['Courier']}><CourierHome /></ProtectedRoute>} />
          <Route path="/StudentVendorHome" element={<ProtectedRoute allowedRoles={['Student_Vendor']}><StudentVendorHome /></ProtectedRoute>} />
          <Route path="/AdminHome" element={<ProtectedRoute allowedRoles={['Admin']}><AdminHome /></ProtectedRoute>} />
          
          {/* Assuming roles for these routes for demonstration; adjust as necessary */}
          <Route path="/CustomerReview" element={<ProtectedRoute allowedRoles={['Customer']}><CustomerReview /></ProtectedRoute>} />
          <Route path="/AddItem" element={<ProtectedRoute allowedRoles={['Vendor', 'Student_Vendor']}><AddItem /></ProtectedRoute>} />
          <Route path="/SeeOrders" element={<ProtectedRoute allowedRoles={['Courier']}><SeeOrders /></ProtectedRoute>} />
          <Route path="/admin/see-vendor-reviews" element={<ProtectedRoute allowedRoles={['Admin']}><SeeVendorReviews /></ProtectedRoute>} />
          <Route path="/admin/see-vendor-requests" element={<ProtectedRoute allowedRoles={['Admin']}><SeeVendorRequests /></ProtectedRoute>} />
          <Route path="/admin/ban-vendors" element={<ProtectedRoute allowedRoles={['Admin']}><BanVendors /></ProtectedRoute>} />
          <Route path="/admin/see-courier-requests" element={<ProtectedRoute allowedRoles={['Admin']}><SeeCourierRequests /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
