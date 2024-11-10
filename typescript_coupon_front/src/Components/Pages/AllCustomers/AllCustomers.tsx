import { useContext, useState } from "react";
import { AdminContext } from "../../Layout/Context/AdminContext";
import "./AllCustomers.css";

const AllCustomers = () => {
  const { UserDetails, deleteUser, editUserPassword } =
    useContext(AdminContext);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [newPassword, setNewPassword] = useState("");

  // Check if the string is empty or contains only whitespace!!!
  const isEmptyOrWhitespace = (str: string): boolean => {
    return str.replace(/\s/g, "").length === 0;
  };

  // Validate password input
  const validatePassword = (password: string): boolean => {
    if (isEmptyOrWhitespace(password)) {
      alert("Password cannot be empty ");
      return false;
    }
    if (password.length < 5) {
      alert("Password must be 5 characters or more");
      return false;
    }
    return true;
  };

  /**
   * Handles the deletion of a user.
   */

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        deleteUser(id);
        console.log(`User with ID ${id} deleted successfully`);
        alert("User deleted successfully!");
      } catch (error) {
        console.error(`Failed to delete user with ID ${id}`, error);
        alert("Failed to delete user. Please try again");
      }
    }
  };

  /**
   * Validates the password input.
   * Ensures the password is not empty and is at least 5 characters long.
   */

  const handleSave = () => {
    if (!validatePassword(newPassword)) return;

    if (editingUserId !== null) {
      try {
        editUserPassword(editingUserId, newPassword);
        console.log(
          `Password for user ID ${editingUserId} updated successfully`
        );
        alert("Password updated successfully!");
        setEditingUserId(null);
        setNewPassword("");
      } catch (error) {
        console.error(
          `Failed to update password for user ID ${editingUserId}`,
          error
        );
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
                className="input-field"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
              />
              <button className="action-button save" onClick={handleSave}>
                Save
              </button>
              <button
                className="action-button cancel"
                onClick={() => setEditingUserId(null)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <button
                className="action-button edit"
                onClick={() => setEditingUserId(id)}
              >
                Edit
              </button>
              <button
                className="action-button delete"
                onClick={() => handleDelete(id)}
              >
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
