import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "/";
    } catch (error) {
      alert("Neispravni podaci. Pokušajte ponovo.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Prijava</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        
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
            backgroundColor: "#0275d8",
            color: "white",
            padding: "12px",
            fontSize: "18px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Prijavi se
        </button>
      </form>
    </div>
  );
};

export default Login;
