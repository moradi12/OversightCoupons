import axios from "axios";

const API_BASE_URL = "http://localhost:8080";
export const api = axios.create({
  baseURL: API_BASE_URL,
});


/**
 * Creates a new coupon.
 */

export async function createCoupon(couponData) {
  try {
    const response = await api.post("/add/coupons", couponData);
    return response.data;
  } catch (error) {
    console.error(`Error creating coupon: ${error.response?.data || error.message}`);
    throw new Error(error.response?.data || `Failed to create coupon. Please try again`);
  }
}


/**
 * Update coupon
 */


export async function updateCoupon(couponId, couponData) {
  try {
    const response = await api.put(`/update/coupons/${couponId}`, couponData);
    return response.data;
  } catch (error) {
    console.error(`Error updating coupon with ID ${couponId}: ${error}`);
    throw new Error(error.response?.data || `Failed to update coupon with ID ${couponId}`);
  }
}

/**
 * Delete coupon
 */


export async function deleteCoupon(couponId) {
  try {
    const response = await api.delete(`/coupons/delete/${couponId}`);
    return response.data || `Coupon with ID ${couponId} successfully deleted.`;
  } catch (error) {
    console.error(`Error deleting coupon with ID ${couponId}: ${error}`);
    throw new Error(error.response?.data || `Failed to delete coupon with ID ${couponId}`);
  }
}


export async function getCouponsTypes() {
  try {
    const response = await api.get("/coupons/types");
    return response.data;
  } catch (error) {
    console.error(`Error fetching coupon types: ${error}`);
    throw new Error(error.response?.data || `Error fetching coupon types`);
  }
}

/**
 * Get all coupons
 */

export async function getAllCoupons() {
  try {
    const response = await api.get("/coupons/all");
    console.log(`Raw API response: ${response.data}`);
    if (!Array.isArray(response.data)) {
      throw new Error(`API response is not an array of coupons`);
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching all coupons: ${error.response?.data || error.message}`);
    throw new Error(`Failed to fetch coupons. Please try`);
  }
}

export async function getCouponsByUser(userId) {
  try {
    const response = await api.get(`/coupons/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching coupons for user ID ${userId}: ${error}`);
    throw new Error(error.response?.data || `Failed to fetch coupons for user ID ${userId}`);
  }
}

/**
 * Get coupons by date range
 */
export async function getCouponsByDateRange(startDate, endDate) {
  try {
    const response = await api.get("/coupons/date-range", {
      params: {  startDate,endDate,},
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching coupons by date range (startDate: ${startDate}, endDate: ${endDate}): ${error}`
    );
    throw new Error(error.response?.data || `Failed to fetch coupons by date range`);
  }
}
