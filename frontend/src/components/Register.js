import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      navigate("/login");
    } catch (error) {
      alert("Greška pri registraciji.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Registracija</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        
        <label style={{ fontSize: "18px", marginBottom: "5px" }}>Ime:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          style={{ padding: "10px", fontSize: "16px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <label style={{ fontSize: "18px", marginBottom: "5px" }}>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: "10px", fontSize: "16px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <label style={{ fontSize: "18px", marginBottom: "5px" }}>Lozinka:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: "10px", fontSize: "16px", marginBottom: "20px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <button 
          type="submit" 
          style={{
            backgroundColor: "#28a745",
            color: "white",
            padding: "12px",
            fontSize: "18px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Registruj se
        </button>
      </form>
    </div>
  );
};

export default Register;
