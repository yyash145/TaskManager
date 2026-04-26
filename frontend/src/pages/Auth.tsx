import { useState } from "react";
import { loginUser, registerUser } from "../services/authApi";
import { setToken } from "../utils/jwt";
import { useNavigate } from "react-router-dom";
import "../index";

type Mode = "login" | "register";

const Auth = () => {
  const [mode, setMode] = useState<Mode>("login");

  const [form, setForm] = useState({
    Email: "",
    Password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data =
        mode === "login"
          ? await loginUser(form)
          : await registerUser(form);

      setToken(data.accessToken);
      navigate("/task");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{mode === "login" ? "Login" : "Register"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, Email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, Password: e.target.value })
            }
          />

          <button type="submit">
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>

        <p onClick={toggleMode} className="switch-text">
          {mode === "login"
            ? "Create User?"
            : "Already a user? Login?"}
        </p>
      </div>
    </div>
  );
};

export default Auth;