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


/**
 * Purchase coupon
 */
export async function purchaseCoupon(couponId) {
  try {
    const response = await api.post(`/coupons/purchase/${couponId}`);
    return response.data;
  } catch (error) {
    console.error(`Error purchasing coupon with ID ${couponId}: ${error.response?.data || error.message}`);
    throw new Error(error.response?.data || `Failed to purchase coupon with ID ${couponId}`);
  }
}
/**
 * Get a single coupon by ID
 */
export async function getCouponById(couponId) {
  try {
    const response = await api.get(`/coupons/${couponId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching coupon with ID ${couponId}: ${error.response?.data || error.message}`);
    throw new Error(error.response?.data || `Failed to fetch coupon with ID ${couponId}`);
  }
}

/**
 * Apply a coupon to an order
 */
export async function applyCoupon(couponCode, orderTotal) {
  try {
    const response = await api.post("/coupons/apply", { couponCode, orderTotal });
    return response.data;
  } catch (error) {
    console.error(`Error applying coupon code ${couponCode}: ${error.response?.data || error.message}`);
    throw new Error(error.response?.data || `Failed to apply coupon code ${couponCode}`);
  }
}

/**
 * Bulk delete coupons
 */
export async function bulkDeleteCoupons(couponIds) {
  try {
    const response = await api.post("/coupons/bulk-delete", { couponIds });
    return response.data.message || `Coupons successfully deleted.`;
  } catch (error) {
    console.error(`Error bulk deleting coupons: ${error.response?.data || error.message}`);
    throw new Error(error.response?.data || `Failed to bulk delete coupons.`);
  }
}

/**
 * Get paginated coupons
 */
export async function getCouponsPaginated(page, limit, filters = {}) {
  try {
    const response = await api.get("/coupons", {
      params: { page, limit, ...filters },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching paginated coupons: ${error.response?.data || error.message}`);
    throw new Error(error.response?.data || `Failed to fetch coupons.`);
  }
}

/**
 * Get coupon usage statistics
 */
export async function getCouponUsageStats() {
  try {
    const response = await api.get("/coupons/stats");
    return response.data;
  } catch (error) {
    console.error(`Error fetching coupon usage statistics: ${error.response?.data || error.message}`);
    throw new Error(error.response?.data || `Failed to fetch coupon usage statistics.`);
  }
}

/**
 * Generate a new master coupon
 */
export async function generateMasterCoupon(discountType, discountValue) {
  try {
    const response = await api.post("/master-coupons/generate", { discountType, discountValue });
    return response.data;
  } catch (error) {
    console.error(`Error generating master coupon: ${error.response?.data || error.message}`);
    throw new Error(error.response?.data || `Failed to generate master coupon.`);
  }
}

/**
 * Get all master coupons
 */
export async function getMasterCoupons() {
  try {
    const response = await api.get("/master-coupons");
    return response.data;
  } catch (error) {
    console.error(`Error fetching master coupons: ${error.response?.data || error.message}`);
    throw new Error(error.response?.data || `Failed to fetch master coupons.`);
  }
}
