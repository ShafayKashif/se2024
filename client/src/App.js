import './App.css';
import { Route, Routes } from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import Login from './components/login';
import MainSignup from './components/MainSignup';
import CustomerSignup from './components/CustomerSignup';
import CourierSignup from './components/CourierSignup';
import VendorSignup from './components/VendorSignup';
import StudentVendorSignup from './components/StudentVendorSignup';
import CustomerHome from './components/CustomerHome';
import VendorHome from './components/VendorHome';
import CourierHome from './components/CourierHome';
import StudentVendorHome from './components/StudentVendorHome';
import AdminHome from './components/AdminHome';
import AddItem from './components/AddItem';

<<<<<<< Updated upstream
=======
import Navbar from "./components/navbar";

// login signup imports
import Login from "./components/login_signup/login";
import MainSignup from "./components/login_signup/MainSignup";
import CustomerSignup from "./components/login_signup/CustomerSignup";
import CourierSignup from "./components/login_signup/CourierSignup";
import VendorSignup from "./components/login_signup/VendorSignup";
import StudentVendorSignup from "./components/login_signup/StudentVendorSignup";
import { AuthProvider } from "./components/login_signup/AuthContext";
import ProtectedRoute from "./components/login_signup/ProtectedRoute";

// customer imports
import CustomerHome from "./components/customer/CustomerHome";
import CustomerReview from "./components/customer/CustomerReview";
import SearchResultsPage from "./components/customer/SearchResultsPage";
import CustomerPlaceOrder from "./components/customer/CustomerPlaceOrder";

// vender imports
import StudentVendorHome from "./components/StudentVendorHome";
import VendorHome from "./components/vendor/VendorHome";
import AddItem from "./components/vendor/AddItem";
import CourierHome from "./components/courier/CourierHome";
import SeeOrders from "./components/SeeOrders";
import ViewCustomersReviews from "./components/vendor/ViewCustomerReviews";
import VendorProfile from "./components/vendor/vendorProfile";
import VendorOrders from "./components/vendor/VendorOrders";

//admin imports
import AdminHome from "./components/admin/AdminHome";
import SeeVendorReviews from "./components/admin/SeeVendorReviews";
import SeeVendorRequests from "./components/admin/SeeVendorRequests";
import BanVendors from "./components/admin/BanVendors";
import SeeCourierRequests from "./components/admin/SeeCourierRequests";

// NOTE : the protected element is a JWT tokken implementation so that only specific users with specific roles can access certain pages however certain of those elements are commented out due to issues in merging and will be fixed by the next phase
>>>>>>> Stashed changes
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
            <Route path="/CourierSignup" element={<CourierSignup/>}/>
            <Route path="/CustomerSignup" element={<CustomerSignup/>}/>
            <Route path="/VendorHome" element={<VendorHome/>}/>
            <Route path="/CustomerHome" element={<CustomerHome/>}/>
            <Route path="/CourierHome" element={<CourierHome/>}/>
            <Route path="/StudentVendorHome" element={<StudentVendorHome/>}/>
            <Route path="/AdminHome" element={<AdminHome/>}/>
            <Route path="/AddItem" element={<AddItem/>}/>
            


<<<<<<< Updated upstream

                             
=======
          {/* Layout with Navbar */}
          <Route element={<LayoutWithNavbar />}>
            {/* Protected Routes with Navbar */}
            <Route path="/VendorHome" element={<VendorHome />} />
            <Route path="/AddItem" element={<AddItem />} />
            <Route path="/VendorProfile" element={<VendorProfile />} />
            <Route path="/VendorOrders" element={<VendorOrders />} />
            <Route
              path="/ViewCustomersReviews"
              element={<ViewCustomersReviews />}
            />
            <Route
              path="/CustomerHome"
              element={
                // <ProtectedRoute allowedRoles={["customer"]}>
                <CustomerHome />
                // </ProtectedRoute>
              }
            />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/PlaceOrder" element={<CustomerPlaceOrder />} />
            <Route
              path="/CourierHome"
              element={
                <ProtectedRoute allowedRoles={["courier"]}>
                  <CourierHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/StudentVendorHome"
              element={
                <ProtectedRoute allowedRoles={["student_vendor"]}>
                  <StudentVendorHome />
                </ProtectedRoute>
              }
            />
            <Route path="/VendorHome" element={<VendorHome />} />
            <Route
              path="/AdminHome"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <AdminHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/SeeOrders"
              element={
                // <ProtectedRoute allowedRoles={["Admin"]}>
                <SeeOrders />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/CustomerReview"
              element={
                //<ProtectedRoute allowedRoles={["customer"]}>
                <CustomerReview />
                //</ProtectedRoute>
              }
            />
            <Route
              path="/AddItem"
              element={
                <ProtectedRoute allowedRoles={["Vendor", "Student_Vendor"]}>
                  <AddItem />
                </ProtectedRoute>
              }
            />
            <Route
              path="/SeeOrders"
              element={
                <ProtectedRoute allowedRoles={["Courier"]}>
                  <SeeOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/see-vendor-reviews"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <SeeVendorReviews />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/see-vendor-requests"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <SeeVendorRequests />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/ban-vendors"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <BanVendors />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/see-courier-requests"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <SeeCourierRequests />
                </ProtectedRoute>
              }
            />
          </Route>
>>>>>>> Stashed changes
        </Routes>
      </BrowserRouter>
    
  )
}

export default App;
