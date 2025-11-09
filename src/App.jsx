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
import Careers from "./pages/Careers";
import Directory from "./sections/Directory";
import Market from "./sections/Market";
import Food from "./sections/Food";
import Grocery from "./sections/Grocery";
import Notification from "./components/Notification";
import Reels from "./sections/Reels";

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
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/food/:id" element={<FoodDetails />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/notifications" element={<Notification />} /> 
            <Route path="/careers" element={<Careers />} /> 
            <Route path="/directory" element={<Directory />} />
            <Route path="/market" element={<Market />} />
            <Route path="/food" element={<Food />} />
            <Route path="/groceries" element={<Grocery />} />
            <Route path="/reels" element={<Reels />} />
            
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
