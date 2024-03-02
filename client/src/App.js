import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

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
import CustomerReview from "./components/CustomerReview";

// vender imports
import StudentVendorHome from "./components/StudentVendorHome";
import VendorHome from "./components/vender/VendorHome";
import AddItem from "./components/AddItem";
import CourierHome from "./components/courier/CourierHome";
import SeeOrders from "./components/SeeOrders";

//admin imports
import AdminHome from "./components/admin/AdminHome";
import SeeVendorReviews from "./components/admin/SeeVendorReviews";
import SeeVendorRequests from "./components/admin/SeeVendorRequests";
import BanVendors from "./components/admin/BanVendors";
import SeeCourierRequests from "./components/admin/SeeCourierRequests";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/MainSignup" element={<MainSignup />} />
          <Route path="/CustomerSignup" element={<CustomerSignup />} />
          <Route path="/CourierSignup" element={<CourierSignup />} />
          <Route path="/VendorSignup" element={<VendorSignup />} />
          <Route
            path="/StudentVendorSignup"
            element={<StudentVendorSignup />}
          />

          {/* Layout with Navbar */}
          <Route element={<LayoutWithNavbar />}>
            {/* Protected Routes with Navbar */}
            <Route
              path="/VendorHome"
              element={
                <ProtectedRoute allowedRoles={["vendor"]}>
                  <VendorHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/CustomerHome"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <CustomerHome />
                </ProtectedRoute>
              }
            />
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
            <Route
              path="/AdminHome"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <AdminHome />
                </ProtectedRoute>
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
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

function LayoutWithNavbar() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
