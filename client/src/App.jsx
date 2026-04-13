import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import FloatingWhatsApp from './components/common/FloatingWhatsApp';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />

      <FloatingWhatsApp/>
    </BrowserRouter>
  );
};

export default App;
