import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./constant/Header";
import Footer from "./constant/Footer";
import HomePage from "./UI/Home/Home_page";
import AboutPage from "./UI/About/About_page";
import ProjectPage from "./UI/Project/Project_page";
import ContactPage from "./UI/Contact/Contact_page";

function App() {
 
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/projects" element={<ProjectPage/>} />
        <Route path="/contact" element={<ContactPage/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
