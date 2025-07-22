import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/user/Signup";
import Home from "./pages/user/Home";
import Otp from "./pages/user/Otp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Otp/:email" element={<Otp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
