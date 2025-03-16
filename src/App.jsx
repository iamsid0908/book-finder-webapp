import "./App.css";
import { Button } from "@/components/ui/button";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Bookdetails from "./pages/Bookdetails";
import Primary from "./pages/Primary";
import Mywishlist from "./pages/Mywishlist";
import NotFound from "./pages/NotFound";
import PrimaryNew from "./pages/PrimaryNew";
import { AuthProvider } from "./Context/authContext";
import ProtectedRoute from "./Context/authContext/ProtectedRoute";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/primary" element={<Primary />} />
                <Route path="/book-details/:id" element={<Bookdetails />} />
                <Route path="/wish-list" element={<Mywishlist />} />

                {/* New components */}
                <Route path="/primary-new" element={<PrimaryNew />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
