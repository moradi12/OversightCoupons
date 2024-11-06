import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const validateInputs = (): boolean => {
    const newErrors = { email: "", password: "", general: "" };
    let isValid = true;

    if (!email) {
      newErrors.email = "Please enter your email";
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    if (!password) {
      newErrors.password = "Please enter a password";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = () => {
    if (validateInputs()) {
      if (email === "admin@admin.com" && password === "admin12345") {
        setSuccessMessage("Welcome back! Login successful.");
        console.log("Login successful for:", email);
        setTimeout(() => navigate("/"), 2000);
      } else {
        setErrors({
          ...errors,
          general: "Incorrect email or password please try again",
        });
      }
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
        {" "}
        {}
        {successMessage && <p className="successLabel">{successMessage}</p>}
        {}
        {errors.general && (
          <p className="errorLabel general">{errors.general}</p>
        )}
        <div className="user-box">
          <input
            type="email"
            value={email}
            placeholder="Enter email address here"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="errorLabel">{errors.email}</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            value={password}
            placeholder="Enter password here"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="errorLabel">{errors.password}</label>
        </div>
        <input className="inputButton" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
