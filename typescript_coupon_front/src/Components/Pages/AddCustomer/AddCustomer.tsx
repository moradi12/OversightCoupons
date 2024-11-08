import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../Layout/Context/AdminContext";
import { UserDetails } from "../../Models/UserDetails";
import AdminCommands from "../../Utils/AdminCommands";
import "./AddCustomer.css";

const AddCustomer = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();
  const adminCommands = new AdminCommands();

  const { UserDetails, setUserDetails } = useContext(AdminContext);

  const validateForm = (): string | null => {
    if (!email || !password || !confirmPassword) {
      return "All fields are required.";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const customerData: UserDetails = {
      id: Date.now(), // Unique ID using timestamp
      email,
      password,
    };

    try {
      await adminCommands.createCustomer(customerData);

      // Functional update with null check
      setUserDetails((preDetails) => [...(preDetails || []), customerData]);

      setSuccess("Customer added successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className="add-customer-container">
      <h2>Add Customer</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit} className="add-customer-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Add Customer
        </button>
      </form>
    </div>
  );
};

export default AddCustomer;
