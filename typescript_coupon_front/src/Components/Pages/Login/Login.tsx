import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../Layout/Context/AdminContext";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AdminContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (login(email, password)) {
      navigate("/all");
    } else {
      setError("Incorrect email or password. Please try again.");
    }
  };

  return (
    <div className="login-box">
      <h2>Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        {error && <p className="errorLabel">{error}</p>}
        <div className="user-box">
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="user-box">
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <input className="inputButton" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
