import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import FloatingWhatsApp from "./components/common/FloatingWhatsApp";
import { Toaster } from "react-hot-toast";
import Loader from "./utils/Loader";

// Lazy loading pages
const Home = lazy(() => import("./pages/Home"));
const Booking = lazy(() => import("./pages/Booking"));
const Success = lazy(() => import("./pages/Success"));
const Tracking = lazy(() => import("./pages/Tracking"));
const Emergency = lazy(() => import("./pages/Emergency"));
const EmergencySuccess = lazy(() => import("./pages/EmergencySuccess"));

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<Loader fullScreen={true} />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/book" element={<Booking />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/emergency/success" element={<EmergencySuccess />} />
              <Route path="/book/success" element={<Success />} />
              <Route path="/track" element={<Tracking />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>

      <FloatingWhatsApp />
      <Toaster position="top-right" reverseOrder={false} gutter={8} />
    </BrowserRouter>
  );
};

export default App;
