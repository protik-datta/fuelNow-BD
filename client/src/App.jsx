import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import FloatingWhatsApp from "./components/common/FloatingWhatsApp";
import { Toaster } from "react-hot-toast";
import Booking from './pages/Booking';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Booking />} />
      </Routes>
      <Footer />

      <FloatingWhatsApp />
      <Toaster position="top-right" reverseOrder={false} gutter={8} />
    </BrowserRouter>
  );
};

export default App;
