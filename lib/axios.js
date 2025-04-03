// apiClient.js
import axios from "axios";

const baseURL = "http://localhost:8000/api";

class ApiClient {
  constructor() {
    this.api = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Enable if using cookies
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token && config.headers) {
          config.headers.Authorization = `Token ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          // window.location.href = "/login";
        }
        return Promise.reject(error);
      },
    );
  }

  // Static method to enforce Singleton pattern
  static getInstance() {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  async get(url, config = {}) {
    const response = await this.api.get(url, config);
    return response.data;
  }

  async post(url, data = {}, config = {}) {
    const response = await this.api.post(url, data, config);
    return response.data;
  }

  async put(url, data = {}, config = {}) {
    const response = await this.api.put(url, data, config);
    return response.data;
  }

  async patch(url, data = {}, config = {}) {
    const response = await this.api.patch(url, data, config);
    return response.data;
  }

  async delete(url, config = {}) {
    const response = await this.api.delete(url, config);
    return response.data;
  }
}

// Export the Singleton instance
export const api = ApiClient.getInstance();

export const authService = {
  getCurrentUser: async () => {
    try {
      const response = await api.get("/users/me");
      console.log("RESPONSE", response);
      return response; // Assuming the API returns UserResponse
    } catch (error) {
      throw error;
    }
  },
};
