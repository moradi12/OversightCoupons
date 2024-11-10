import { useContext, useState } from "react";
import { AdminContext } from "../../Layout/Context/AdminContext";
import "./AllCustomers.css";

const AllCustomers = () => {
  const { UserDetails, deleteUser, editUserPassword } = useContext(AdminContext);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [newPassword, setNewPassword] = useState("");

  // Helper function to check if the string is empty or contains only whitespace
  const isEmptyOrWhitespace = (str: string): boolean => {
    return str.trim().length === 0;
  };

  // Helper function to validate password input
  const validatePassword = (password: string): boolean => {
    if (isEmptyOrWhitespace(password)) {
      alert("Password cannot be empty or contain only whitespace");
      return false;
    }
    if (password.length < 5) {
      alert("Password must be at least 5 characters long");
      return false;
    }
    return true;
  };

  // Handles the deletion of a user
  const handleDeleteUser = (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        deleteUser(userId);
        console.log(`User with ID ${userId} deleted successfully`);
        alert("User deleted successfully!");
      } catch (error) {
        console.error(`Failed to delete user with ID ${userId}`, error);
        alert("Failed to delete user. Please try again");
      }
    }
  };

  // Handles the saving of the new password for a user
  const handleSavePassword = () => {
    if (!validatePassword(newPassword)) return;

    if (editingUserId !== null) {
      try {
        editUserPassword(editingUserId, newPassword);
        console.log(`Password for user ID ${editingUserId} updated successfully`);
        alert("Password updated successfully!");
        setEditingUserId(null);
        setNewPassword("");
      } catch (error) {
        console.error(`Failed to update password for user ID ${editingUserId}`, error);
        alert("Failed to update password. Please try again");
      }
    }
  };

  return (
    <ul className="customer-list">
      {UserDetails?.map(({ id, email }) => (
        <li key={id} className="customer-item">
          <span>{email}</span>
          {editingUserId === id ? (
            <div>
              <input
                className="password-input"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter New Password"
              />
              <button className="action-button save-button" onClick={handleSavePassword}>
                Save
              </button>
              <button className="action-button cancel-button" onClick={() => setEditingUserId(null)}>
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <button className="action-button edit-button" onClick={() => setEditingUserId(id)}>
                Edit
              </button>
              <button className="action-button delete-button" onClick={() => handleDeleteUser(id)}>
                Delete
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default AllCustomers;