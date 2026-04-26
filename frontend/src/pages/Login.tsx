import { useState } from "react";
import { loginUser } from "../services/authApi";
import { setToken } from "../utils/jwt";
import { useNavigate } from "react-router-dom";
import { LoginRequest } from "../models/auth";

const Login = () => {
  const [form, setForm] = useState<LoginRequest>({
    Email: "",
    Password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await loginUser(form);
    console.log("Data - ", data.accessToken);
    setToken(data.accessToken);
    navigate("/task");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        onChange={(e) => setForm({ ...form, Email: e.target.value })}
      />
      <input
        type="password"
        onChange={(e) => setForm({ ...form, Password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;