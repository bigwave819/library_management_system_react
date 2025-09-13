import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Supplier from "./pages/user/supplier/getSupplier";
import Publisher from "./pages/user/publisher/GetPublisher";
import Footer from "./components/Footer";
import CreateSupplier from "./pages/user/supplier/CreateSupplier";
import CreatePublisher from "./pages/user/publisher/CreatePublisher";

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={ <Login/>}/>
        <Route path="/register" element={ <Register/>}/>
        <Route path="/suppliers" element={<Supplier/>}/>
        <Route path="/supplier/create" element={<CreateSupplier/>}/>
        <Route path="/publishers" element={<Publisher/>}/>
        <Route path="/publisher/create" element={<CreatePublisher/>}/>
      </Routes>
      <Footer />
    </Router>
  )
}

export default App