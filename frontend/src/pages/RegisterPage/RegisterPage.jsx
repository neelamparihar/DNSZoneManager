import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./RegisterPage.css"; // Import custom CSS file for styling

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful. Now you can log in");
    } catch (e) {
      alert("Registration failed. Please try again later");
    }
  }

  return (
    <div className="register-container">
      <div className="register-form">
        <h1 className="register-title">Register</h1>
        <form className="register-inputs" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="register-button">Register</button>
          <div className="login-link">
            Already a member?{" "}
            <Link to={"/login"}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
