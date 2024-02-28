import "./App.css";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/login";
import MainSignup from "./components/MainSignup";
import CustomerSignup from "./components/CustomerSignup";
import CourierSignup from "./components/CourierSignup";
import VendorSignup from "./components/VendorSignup";
import StudentVendorSignup from "./components/StudentVendorSignup";
import CustomerHome from "./components/CustomerHome";
import VendorHome from "./components/VendorHome";
import CourierHome from "./components/CourierHome";
import StudentVendorHome from "./components/StudentVendorHome";
import AdminHome from "./components/AdminHome";
import CustomerReview from "./components/CustomerReview";
import SeeOrders from "./components/SeeOrders";
import AddItem from "./components/AddItem";
import SeeVendorReviews from "./components/admin/SeeVendorReviews";
import SeeVendorRequests from "./components/admin/SeeVendorRequests";
import BanVendors from "./components/admin/BanVendors";
import SeeCourierRequests from "./components/admin/SeeCourierRequests";
import CustomerViewCart from "./components/CustomerViewCart";
import CustomerPlaceOrder from "./components/CustomerPlaceOrder";

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
        <Route path="/CustomerViewCart" element={<CustomerViewCart />} />
        <Route path="/CustomerPlaceOrder" element={<CustomerPlaceOrder />} />
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
