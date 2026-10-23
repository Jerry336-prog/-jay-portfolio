import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteTransition from "./RouteTransition";
import Header from "./constant/Header";
import Footer from "./constant/Footer";
import HomePage from "./UI/Home/Home_page";
import AboutPage from "./UI/About/About_page";
import ProjectPage from "./UI/Project/Project_page";
import ContactPage from "./UI/Contact/Contact_page";
import CertificatePage from "./UI/Certificate/Certificate_page";
import Login from "./UI/Admin/Login";
import Dashboard from "./UI/Admin/Dashboard";
import ProtectedRoute from "./UI/ProtectedRoute";

function App() {
 
  return (
    <BrowserRouter>
      
      <RouteTransition>{(displayLocation) => (
      <Routes location={displayLocation}>
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
        <Route path="/certificates" element={
          <>
          <Header />
          <CertificatePage />
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
      )}</RouteTransition>

      
    </BrowserRouter>
  );
}

export default App;
