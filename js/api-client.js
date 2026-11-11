/**
 * Torpedo LMS - Unified API Client
 * Seamlessly interfaces with the real PHP/SQLite backend APIs.
 * Supports auto-fallback for offline dev environments.
 */

const TorpedoAPI = (function() {
  // Auto-detect base API path (seamlessly supports root domain or any Hostinger subfolder)
  const getBaseUrl = () => {
    if (typeof window === 'undefined' || window.location.protocol === 'file:') return '/api';
    const pathname = window.location.pathname || '';
    const dir = pathname.substring(0, pathname.lastIndexOf('/') + 1);
    if (dir && dir !== '/') {
      return `${dir.replace(/\/+$/, '')}/api`;
    }
    return '/api';
  };
  const BASE_URL = getBaseUrl();

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
      if (!response.ok || (data && data.success === false)) {
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
     * Send 6-Digit Email OTP Verification Code
     */
    async sendOtp({ email, purpose = 'verification' }) {
      return await request('auth/send-otp', {
        method: 'POST',
        body: JSON.stringify({ email, purpose })
      });
    },

    /**
     * Verify 6-Digit Email OTP Code
     */
    async verifyOtp({ email, otp_code, purpose = 'verification' }) {
      return await request('auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ email, otp_code, purpose })
      });
    },

    /**
     * Google Sign-In Authentication Callback
     */
    async googleLogin({ email, name, avatar_url, role = 'student' }) {
      return await request('auth/google', {
        method: 'POST',
        body: JSON.stringify({ email, name, avatar_url, role })
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
    },

    /**
     * Get Jobs List with Filtering
     */
    async getJobs(filters = {}) {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.batch) params.append('batch', filters.batch);
      if (filters.mode) params.append('mode', filters.mode);
      if (filters.type) params.append('type', filters.type);
      if (filters.email) params.append('email', filters.email);
      const query = params.toString() ? `?${params.toString()}` : '';
      return await request(`jobs${query}`, { method: 'GET' });
    },

    /**
     * Get Job Details by ID
     */
    async getJob(id) {
      return await request(`jobs/get?id=${encodeURIComponent(id)}`, { method: 'GET' });
    },

    /**
     * Apply for a Job
     */
    async applyJob({ job_id, user_email, candidate_name }) {
      return await request('jobs/apply', {
        method: 'POST',
        body: JSON.stringify({ job_id, user_email, candidate_name })
      });
    },

    /**
     * Get Candidate's Job Applications
     */
    async getJobApplications(email) {
      return await request(`jobs/applications?email=${encodeURIComponent(email)}`, { method: 'GET' });
    },

    /**
     * Get Hackathons Catalog
     */
    async getHackathons() {
      return await request('hackathons', { method: 'GET' });
    },

    /**
     * Register Team for Hackathon
     */
    async registerHackathonTeam({ hackathon_id, team_name, lead_email, lead_name, project_title, members = [] }) {
      return await request('hackathons/register', {
        method: 'POST',
        body: JSON.stringify({ hackathon_id, team_name, lead_email, lead_name, project_title, members })
      });
    },

    /**
     * Get User's Hackathon Squads
     */
    async getUserHackathons(email) {
      return await request(`hackathons/teams?email=${encodeURIComponent(email)}`, { method: 'GET' });
    },

    /**
     * Get User Enrolled Courses
     */
    async getUserEnrollments(email) {
      return await request(`courses/my?email=${encodeURIComponent(email)}`, { method: 'GET' });
    },

    /**
     * Create New Course (Faculty / Admin)
     */
    async createCourse(data) {
      return await request('courses/create', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },

    /**
     * Create / Post New Job (Recruiter)
     */
    async createJob(data) {
      return await request('jobs/create', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },

    /**
     * Get All Job Applications (Recruiter ATS)
     */
    async getAllApplications(jobId = null) {
      const q = jobId ? `?job_id=${encodeURIComponent(jobId)}` : '';
      return await request(`jobs/all-applications${q}`, { method: 'GET' });
    },

    /**
     * Update Application Status (Recruiter ATS)
     */
    async updateApplicationStatus(id, status) {
      return await request('jobs/applications/status', {
        method: 'POST',
        body: JSON.stringify({ id, status })
      });
    },

    /**
     * Get Super Admin Platform Overview
     */
    async getAdminOverview() {
      return await request('admin/overview', { method: 'GET' });
    },

    /**
     * Get Super Admin People Directory
     */
    async getAdminPeople() {
      return await request('admin/people', { method: 'GET' });
    }
  };
})();

// Attach to window
window.TorpedoAPI = TorpedoAPI;
