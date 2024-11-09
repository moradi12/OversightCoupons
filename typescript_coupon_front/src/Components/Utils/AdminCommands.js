import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/admin";
export const api = axios.create({
  baseURL: API_BASE_URL,
});

class AdminCommands {
  // ===============
  // Utility Methods
  // ================

  /**
   * Handles API requests with success and error message handling
   */
  async handleRequest(apiFunction, successMessage, errorMessage) {
    try {
      const response = await apiFunction();
      console.log("Success:", successMessage, response.data);
      return response.data;
    } catch (error) {
      const errorMessageToShow = error.response?.data || errorMessage;
      console.error(`Error: ${errorMessageToShow}`);
      throw new Error(errorMessageToShow);
    }
  }

  /**
   * Validates customer data
   */
  validateCustomerData(customerData) {
    if (!customerData || !customerData.email || !customerData.password) {
      throw new Error(
        "Invalid customer data: Email and password are required!"
      );
    }
  }

  // ================================
  // CRUD Operations for Customers
  // ================================

  /**
   * Fetches customer details by ID
   */
  getCustomerById(customerId) {
    if (!customerId) {
      throw new Error("Customer ID is required.");
    }

    console.log("Fetching customer details for ID:", customerId);
    return this.handleRequest(
      () => api.get(`/admin/all/customers/${customerId}`),
      `Customer details fetched successfully for ID: ${customerId}`,
      `Failed to fetch customer details for ID: ${customerId}.`
    );
  }

  /**
   * Creates a new customer
   */
  createCustomer(customerData) {
    try {
      this.validateCustomerData(customerData);
      console.log("Creating customer:", customerData);

      return this.handleRequest(
        () => api.post("/admin/add/customers", customerData),
        "Customer created successfully:",
        "Failed to create customer. Please try again."
      );
    } catch (error) {
      console.error("Validation Error:", error.message);
      throw new Error(error.message);
    }
  }

  /**
   * Updates an existing customer by ID
   */
  updateCustomer(customerId, updatedData) {
    this.validateCustomerData(updatedData);
    console.log("Updating customer with ID:", customerId);

    return this.handleRequest(
      () => api.put(`/admin/update/customers/${customerId}`, updatedData),
      "Customer updated successfully:",
      `Failed to update customer with ID ${customerId}.`
    );
  }

  /**
   * Deletes a customer by ID
   */
  deleteCustomer(customerId) {
    console.log("Deleting customer with ID:", customerId);

    return this.handleRequest(
      () => api.delete(`/admin/delete/customers/${customerId}`),
      `Customer with ID ${customerId} successfully deleted.`,
      `Failed to delete customer with ID ${customerId}.`
    );
  }
}

export default AdminCommands;
