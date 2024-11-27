import "./App.css";
import { Button } from "@/components/ui/button";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Bookdetails from "./pages/Bookdetails";
import Primary from "./pages/Primary";
import Mywishlist from "./pages/Mywishlist";

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Primary />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/book-details/:id" element={<Bookdetails />} />
            <Route path="/wish-list" element={<Mywishlist />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
