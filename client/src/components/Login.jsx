import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        const response = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.success) {
          navigate('/home');
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert("Error during login. Please try again.");
      }
    } else {
      alert('Please enter valid credentials');
    }
  };

  return (
    <>
      <div className="dev">
        <button
          className="developer"
          onClick={() => navigate("/dev-login")}
        >
          Developer
        </button>
      </div>
      <div>
        <h1 className="video-heading">Hey! Admin</h1>
      </div>
      <div className="signin-container">
        <div className="signin-form">
          <h2>Enter your Credentials</h2>
          <form onSubmit={handleSignIn}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="signin-button" type="submit">
              Sign In
            </button>
            <div className="forgot-password">
              <a
                href="/forgot-password"
                className="forgot-password-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/forgot-password");
                }}
              >
                Forgot Password?
              </a>
            </div>
            <div className="google-signin">
              <GoogleOAuthProvider clientId="859330422204-op5jrfg6b1aktt4ilul0crfsd2vd9u88.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                    navigate("/admin-panel");
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </GoogleOAuthProvider>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
