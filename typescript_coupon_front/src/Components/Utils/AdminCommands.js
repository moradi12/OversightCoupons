import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";
export const api = axios.create({
  baseURL: API_BASE_URL,
});

class AdminCommands {
  async handleRequest(apiFunction, successMessage, errorMessage) {
    try {
      const response = await apiFunction();
      console.log('Success:', successMessage, response.data); 
      return response.data;
    } catch (error) {
      const errorMessageToShow = error.response?.data || errorMessage; 
      console.error(`Error: ${errorMessageToShow}`);
      throw new Error(errorMessageToShow);
    }
  }
/**
 * validate
 */

  validateCustomerData(customerData) {
    if (!customerData || !customerData.name || !customerData.email) {
      throw new Error('Invalid customer data: Name and email are required!');
    }
  }

/**
 * add customer
 */

  createCustomer(customerData) {
    this.validateCustomerData(customerData);
    console.log('Creating customer:', customerData);
    return this.handleRequest(
      () => api.post('/admin/add/customers', customerData), 
      'Customer created successfully:','Failed to create customer.Please try again'
    );
  }

  /**
 * update customer
 */

  updateCustomer(customerId, updatedData) {
    this.validateCustomerData(updatedData);
    console.log('Updating customer with ID:', customerId);
    return this.handleRequest(
      () => api.put(`/admin//all/customers/${customerId}`, updatedData),
      'Customer updated successfully:',`Failed to update customer with ID ${customerId}.`
    );
  }

  /**
 * delete customer
 */

  deleteCustomer(customerId) {
    console.log('Deleting customer with ID:', customerId);
    return this.handleRequest(
      () => api.delete(`/admin/delete/customers/${customerId}`)`Customer with ID ${customerId} successfully deleted.`
      ,`Failed to delete customer with ID ${customerId}.`
    );
  }
}

export default AdminCommands;

