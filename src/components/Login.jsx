// Login functionality yet to be implemented.
// Registed user functionality works 

import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (!email || !password || (!isLogin && !name)) {
      toast.error("Please fill all the fields");
      return;
    }

    const endpoint = isLogin ? "/user/login" : "/user/newUser";
    const data = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await axios.post(`http://localhost:5000${endpoint}`, data);
    // const response = await axios.post(`http://localhost:5000/user/newUser`, data);
      toast.success(response.data.message);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <div className="login container">
        <div className="banner">
          <div className="item">
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <input type="text" placeholder="Name" value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
              <input type="email" placeholder="Email" value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input type="password" placeholder="Password" value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
            </form>
            <p onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Create an Account! Sign Up" : "Already have an account? Login"}
            </p>
            <Toaster />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
