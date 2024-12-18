//Login Functionality is yet to be implemented
//Admin login functionality works for a hardcoded key

import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const baseURL = 'https://cp-backend-uqux.onrender.com'
// const baseURL = 'http://localhost:5000'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isAdmin) {
      if (!adminKey) {
        toast.error("Please enter the admin key");
        return;
      }
      try {
        // const response = await axios.post("http://localhost:5000/user/admin", { adminKey });
        const response = await axios.post(`${baseURL}/user/admin`, { adminKey });
    if (response.data.success) {
        toast.success(response.data.message);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Invalid admin key");
    }
      return;
    }

    if (!email || !password || (!isLogin && !name)) {
      toast.error("Please fill all the fields");
      return;
    }

    const endpoint = isLogin ? "/user/login" : "/user/newUser";
    const data = isLogin ? { email, password } : { name, email, password };

    try {
      // const response = await axios.post(`http://localhost:5000${endpoint}`, data);
      const response = await axios.post(`${baseURL}${endpoint}`, data);
      
      toast.success(response.data.message);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <>
      <div className="login container">
        <div className="displayInfo">
          <div className="item">
            <h2>
              {isAdmin ? "Admin Login" : isLogin ? "Login" : "Sign Up"}
            </h2>
            <form onSubmit={handleSubmit}>
              {!isAdmin && !isLogin && (
                <input type="text" placeholder="Name" value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
              {!isAdmin && (
                <>
                  <input type="email" placeholder="Email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input type="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              )}
              {isAdmin && (
                <input type="text" placeholder="Enter Admin Key" value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                />
              )}
              <button type="submit">
                {isAdmin ? "Login as Admin" : isLogin ? "Login" : "Sign Up"}
              </button>
            </form>
            <p onClick={() => setIsLogin(!isLogin)}>
              {!isAdmin && (isLogin ? "Create an Account! Sign Up" : "Already have an account? Login")}
            </p>
            <p onClick={() => setIsAdmin(!isAdmin)}>
              {isAdmin ? "Back to User Login" : "Admin Login"}
            </p>
            <Toaster />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
