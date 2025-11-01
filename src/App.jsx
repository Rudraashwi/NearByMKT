import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 📄 Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Login from "./pages/Login";
import FAQ from "./pages/FAQ";
import ErrorPage from "./pages/ErrorPage";
import BusinessDetails from "./pages/BusinessDetails";
import Privacy from "./pages/Privacy"; 
import FoodDetails from "./pages/FoodDetails";

// 🧩 Sections


// 🧱 Layouts
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#f9fbff]">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
           
            <Route path="/business/:id" element={<BusinessDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<Login />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/fooditem/:id" element={<FoodDetails />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/dir" element={<Notification />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
