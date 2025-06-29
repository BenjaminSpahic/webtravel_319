// src/App.js
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { PrivateRoute, AdminRoute } from "./utils/PrivateRoute";
import { useAuth } from "./context/AuthContext";

// Stranice
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import TravelPage from "./pages/TravelPage";
import MyBookings from "./pages/MyBookings";
import TravelList from "./components/TravelList";
import EditTravelPage from "./pages/EditTravelPage";
import CreateTravel from "./pages/CreateTravel";

// Komponente
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";

const App = () => {
  const { setUser } = useAuth();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, [setUser]);

  return (
    <div className="App">
      <Navbar />

      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <Routes>
          {/* Autentifikacija */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Stranice za administraciju */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/travel/create"
            element={
              <AdminRoute>
                <CreateTravel />
              </AdminRoute>
            }
          />
          {/* NOVA RUTA ZA UREĐIVANJE PUTOVANJA */}
          <Route
            path="/admin/travel/edit/:id"
            element={
              <AdminRoute>
                <EditTravelPage />
              </AdminRoute>
            }
          />

          {/* Stranice za korisnike */}
          <Route path="/user" element={<UserPage />} />
          <Route
            path="/user/dashboard"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          />

          {/* Opće stranice */}
          <Route path="/" element={<HomePage />} />
          <Route path="/travel/:id" element={<TravelPage />} />
          <Route path="/travels" element={<TravelList />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
