import { useRef, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthProvider.js";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();

  // Get signUp function from the auth context
  const { signUp } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // Get email and password input values
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Calls `signUp` function from the context
    const { error } = await signUp({ email, password });

    if (error) {
      alert("error signing in");
    } else {
      navigate("/");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button type="submit">Sign Up</button>
      </form>

      <br />

      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </>
  );
}
