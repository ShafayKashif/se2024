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
import CustomerReview from "./components/customer/CustomerReview";
import SearchResultsPage from "./components/customer/SearchResultsPage";
import CustomerPlaceOrder from "./components/customer/CustomerPlaceOrder";
import CustomerViewCart from "./components/customer/CustomerViewCart";
import CustomerCurrentOrder from "./components/customer/CustomerCurrentOrder";
import CustomerViewMenu from "./components/customer/CustomerViewMenu";
import CustomerUpdateInfo from "./components/customer/CustomerUpdateInfo";

// vendor imports
import StudentVendorHome from "./components/StudentVendorHome";
import VendorHome from "./components/vendor/VendorHome";
import AddItem from "./components/vendor/AddItem";
import ViewCustomersReviews from "./components/vendor/ViewCustomerReviews";
import VendorProfile from "./components/vendor/vendorProfile";
import VendorOrders from "./components/vendor/VendorOrders";

// courier imports
import CourierHome from "./components/courier/CourierHome";
import SeeOrders from "./components/courier/SeeOrders";
import CourierAnalytics from "./components/courier/courierAnalytics";

// admin imports
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
              path="/CustomerHome"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <CustomerHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/CustomerReview"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <CustomerReview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/PlaceOrder"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <CustomerPlaceOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ViewCart"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <CustomerViewCart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/CurrentOrder"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <CustomerCurrentOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/CustomerViewMenu"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <CustomerViewMenu />
                </ProtectedRoute>
              }
            />
            <Route
              path="/CustomerUpdateInfo"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <CustomerUpdateInfo />
                </ProtectedRoute>
              }
            />
            <Route
              path="/VendorHome"
              element={
                <ProtectedRoute allowedRoles={["vendor"]}>
                  <VendorHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/AddItem"
              element={
                <ProtectedRoute allowedRoles={["vendor"]}>
                  <AddItem />
                </ProtectedRoute>
              }
            />
            <Route
              path="/VendorProfile"
              element={
                <ProtectedRoute allowedRoles={["vendor"]}>
                  <VendorProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/VendorOrders"
              element={
                <ProtectedRoute allowedRoles={["vendor"]}>
                  <VendorOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ViewCustomersReviews"
              element={
                <ProtectedRoute allowedRoles={["vendor"]}>
                  <ViewCustomersReviews />
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
              path="/SeeOrders"
              element={
                <ProtectedRoute allowedRoles={["courier"]}>
                  <SeeOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/CourierAnalytics"
              element={
                <ProtectedRoute allowedRoles={["courier"]}>
                  <CourierAnalytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/AdminHome"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/SeeVendorReviews"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <SeeVendorReviews />
                </ProtectedRoute>
              }
            />
            <Route
              path="/SeeVendorRequests"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <SeeVendorRequests />
                </ProtectedRoute>
              }
            />
            <Route
              path="/BanVendors"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <BanVendors />
                </ProtectedRoute>
              }
            />
            <Route
              path="/SeeCourierRequests"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <SeeCourierRequests />
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
