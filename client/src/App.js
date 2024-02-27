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
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/MainSignup" element={<MainSignup />} />
        <Route path="/CustomerSignup" element={<CustomerSignup />} />
        <Route path="/CourierSignup" element={<CourierSignup />} />
        <Route path="/VendorSignup" element={<VendorSignup />} />
        <Route path="/StudentVendorSignup" element={<StudentVendorSignup />} />
        <Route path="/CourierSignup" element={<CourierSignup />} />
        <Route path="/CustomerSignup" element={<CustomerSignup />} />
        <Route path="/VendorHome" element={<VendorHome />} />
        <Route path="/CustomerHome" element={<CustomerHome />} />
        <Route path="/CourierHome" element={<CourierHome />} />
        <Route path="/StudentVendorHome" element={<StudentVendorHome />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/CustomerReview" element={<CustomerReview />} />
        <Route path="/AddItem" element={<AddItem />} />
        <Route path="/SeeOrders" element={<SeeOrders />} />
        <Route
          path="/admin/see-vendor-reviews"
          element={<SeeVendorReviews />}
        />
        <Route
          path="/admin/see-vendor-requests"
          element={<SeeVendorRequests />}
        />
        <Route path="/admin/ban-vendors" element={<BanVendors />} />
        <Route
          path="/admin/see-courier-requests"
          element={<SeeCourierRequests />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
