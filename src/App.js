import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.js";
import AddProduct from "./pages/AddProduct.js";
import EditProduct from "./pages/EditProduct.js";
import ErrorPage from "./pages/ErrorPage.js";
import Menu from "./components/Menu.js";

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
