import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/user/Signup";
import Home from "./pages/user/Home";
import Otp from "./pages/user/Otp";
import Login from "./pages/user/Login";
import ProtectedRoute from "./route/ProtectedRoute";
import Profile from "./pages/owner/OwnerProfile";
import PublicRoute from "./route/PublicRoute";
import Venue from "./pages/user/Venue";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminHome from "./pages/admin/AdminHome";
import AddEditVenue from "./pages/owner/AddEditVenue";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/venue" element={<Venue />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route element={<PublicRoute />}>
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Otp/:email" element={<Otp />} />
          <Route path="/login" element={<Login />}></Route>
        </Route>
        <Route path="/owner/add-edit-venue" element={<AddEditVenue />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
