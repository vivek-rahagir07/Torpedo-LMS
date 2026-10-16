/**
 * Torpedo LMS - Unified API Client
 * Seamlessly interfaces with the real PHP/SQLite backend APIs.
 * Supports auto-fallback for offline dev environments.
 */

const TorpedoAPI = (function() {
  const BASE_URL = '/api';

  // Helper for JSON requests
  async function request(endpoint, options = {}) {
    const defaultHeaders = {
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    };

    if (!(options.body instanceof FormData)) {
      defaultHeaders['Content-Type'] = 'application/json';
    }

    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers || {})
      }
    };

    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, config);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `HTTP error ${response.status}`);
      }
      return data;
    } catch (err) {
      console.warn(`[TorpedoAPI] ${endpoint} request failed:`, err.message);
      throw err;
    }
  }

  return {
    /**
     * Check if PHP backend API is reachable
     */
    async ping() {
      try {
        const res = await fetch(`${BASE_URL}/courses`, { method: 'GET' });
        return res.ok;
      } catch (e) {
        return false;
      }
    },

    /**
     * User Registration
     */
    async register({ name, email, password, role = 'student' }) {
      return await request('auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, role })
      });
    },

    /**
     * User Login
     */
    async login({ email, password, role = 'student' }) {
      return await request('auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, role })
      });
    },

    /**
     * Get Current Authenticated User
     */
    async getMe(email) {
      return await request(`auth/me?email=${encodeURIComponent(email)}`, {
        method: 'GET'
      });
    },

    /**
     * Submit Multi-Role Profile Setup (Multipart FormData with PDFs/Photos)
     */
    async setupProfile(formData) {
      return await request('profile/setup', {
        method: 'POST',
        body: formData
      });
    },

    /**
     * Get User Profile & Verified Records
     */
    async getProfile(email, role = 'student') {
      return await request(`profile?email=${encodeURIComponent(email)}&role=${encodeURIComponent(role)}`, {
        method: 'GET'
      });
    },

    /**
     * Get Course Catalog
     */
    async getCourses() {
      return await request('courses', { method: 'GET' });
    },

    /**
     * Enroll in Course Track
     */
    async enrollCourse(email, courseId) {
      return await request('courses/enroll', {
        method: 'POST',
        body: JSON.stringify({ email, course_id: courseId })
      });
    },

    /**
     * Get Real-time Dashboard Stats & Document Links
     */
    async getDashboardStats(role = 'student', email = '') {
      return await request(`dashboard/stats?role=${encodeURIComponent(role)}&email=${encodeURIComponent(email)}`, {
        method: 'GET'
      });
    },

    /**
     * Evaluate Lifecode Sandbox Code
     */
    async evaluateSandbox(language, code) {
      return await request('sandbox/evaluate', {
        method: 'POST',
        body: JSON.stringify({ language, code })
      });
    }
  };
})();

// Attach to window
window.TorpedoAPI = TorpedoAPI;
