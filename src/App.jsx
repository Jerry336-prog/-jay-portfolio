import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./constant/Header";
import Footer from "./constant/Footer";
import HomePage from "./UI/Home/Home_page";
import AboutPage from "./UI/About/About_page";
import ProjectPage from "./UI/Project/Project_page";
import ContactPage from "./UI/Contact/Contact_page";
import Login from "./UI/Admin/Login";
import Dashboard from "./UI/Admin/Dashboard";
import ProtectedRoute from "./UI/ProtectedRoute";

function App() {
 
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={
          <>
          <Header />
          <HomePage />
          <Footer />
          </>
        } />
        <Route path="/about" element={
          <>
          <Header />
          <AboutPage />
          <Footer />
          </>
        } />
        <Route path="/projects" element={
          <>
          <Header />
          <ProjectPage />
          <Footer />
          </>
        } />
        <Route path="/contact" element={
          <>
          <Header />
          <ContactPage />
          <Footer />
          </>
        } />
        <Route path="/login" element={
          <Login />
        } />

        <Route 
           path="/admin" 
              element={
                 <ProtectedRoute>
                    <Dashboard />
                 </ProtectedRoute>  
              } />
      </Routes>

      
    </BrowserRouter>
  );
}

export default App;
