import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser, register } from "../service/authApi";

const LoginForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    console.log(" I Runn....... handleRegister");
    e.preventDefault();
    try {
      const { data } = await register(username, password);
      setIsRegister(false);
      setMessage(data.message);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  const handleLogin = async (e) => {
    console.log(" I Runn.............");
    
    e.preventDefault();
    try {
      const { data } = await loginUser(username, password);
      setMessage(data.message);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error.message);
      setError("Invalid login credentials");
      setUsername("");
      setPassword("");
    }
  };

  const handleRegisterToggle = () => {
    setIsRegister(!isRegister);
    setError("");
    setMessage("");
  };

  return (
    <form
      onSubmit={isRegister ? handleRegister : handleLogin}
      className="bg-white rounded-lg shadow-md w-full max-w-sm mx-auto "
    >
      <div className=" pt-6 ">
        <h2 className=" text-3xl text-center font-extralight">
          {isRegister ? "Create Account" : "Login"}
        </h2>
      </div>
      <hr className=" text-gray-200 mt-6 mb-6" />
      <p className=" text-center text-gray-600 text-lg font-light">
        {isRegister
          ? "Looks like you are new here!"
          : "We are glad to see you again!"}
      </p>
      <div className=" p-6">
        <div className=" mb-4"></div>
        <label className=" text-gray-600 text-sm">Username</label>
        <input
          label="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className=" w-full p-2 border rounded-md mt-2"
          placeholder="Enter Your Name"
        />
      </div>
      <div className=" p-6">
        <div className=" mb-4"></div>
        <label className=" text-gray-600 text-sm">Password</label>
        <input
          label="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=" w-full p-2 border rounded-md mt-2"
          placeholder="Enter Your Password"
        />
      </div>
      {isRegister ? (
        <div className=" p-6">
          <div className=" mb-4"></div>
          <label className=" text-gray-600 text-sm">Confirm Password</label>
          <input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className=" w-full p-2 border rounded-md mt-2"
            placeholder="Enter Password Again"
          />
        </div>
      ) : (
        ""
      )}

      <div className=" p-6">
        {error && <p className=" text-red-500 text-sm mb-3">{error}</p>}
        {message && <p className=" text-green-500 text-sm mb-3">{message}</p>}
        <button
          type="submit"
          className=" w-full bg-blue-500 text-white py-2 rounded-md"
        >
          {isRegister ? "Register" : " Login"}
        </button>

        <p className=" pt-4 text-center to-gray-600 text-sm ">
          {isRegister ? "Already have am account?" : " Don't have an account ?"}{" "}
          <Link to="" onClick={() => handleRegisterToggle()}>
            {isRegister ? " Login" : " Create Account"}
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
