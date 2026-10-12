/**
 * Torpedo LMS - Light UI & Clean Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollEffects();
  initLifecodeSandbox();
});

/* Scroll Progress & Header Shadow */
function initScrollEffects() {
  const progressBar = document.getElementById('scroll-progress');
  const header = document.getElementById('site-header');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (header) {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }, { passive: true });
}

/* In-Browser Lifecode Sandbox */
let currentSandboxLang = 'javascript';

function initLifecodeSandbox() {
  const textarea = document.getElementById('sandbox-textarea');
  if (textarea && TORPEDO_DATA && TORPEDO_DATA.codeSnippets) {
    textarea.value = TORPEDO_DATA.codeSnippets[currentSandboxLang];
  }
}

window.switchSandboxLang = function(lang) {
  currentSandboxLang = lang;
  const textarea = document.getElementById('sandbox-textarea');
  const output = document.getElementById('sandbox-output');
  const buttons = document.querySelectorAll('.sandbox-tab-btn');

  buttons.forEach(btn => {
    if (btn.textContent.toLowerCase().includes(lang === 'javascript' ? 'javascript' : lang === 'python' ? 'python' : 'sql')) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (textarea && TORPEDO_DATA && TORPEDO_DATA.codeSnippets) {
    textarea.value = TORPEDO_DATA.codeSnippets[lang];
  }

  if (output) {
    output.textContent = `[Lifecode VM initialized: ${lang.toUpperCase()} environment ready. Click '▶ Run Code' to execute container.]`;
  }
};

window.runSandboxCode = function() {
  const textarea = document.getElementById('sandbox-textarea');
  const output = document.getElementById('sandbox-output');
  const runBtn = document.getElementById('run-code-btn');
  if (!output || !runBtn) return;

  runBtn.disabled = true;
  runBtn.textContent = 'Running...';
  output.textContent = `> Allocating Lifecode container sandbox...\n> Compiling ${currentSandboxLang.toUpperCase()} source...\n`;

  setTimeout(() => {
    runBtn.disabled = false;
    runBtn.textContent = '▶ Run Code';

    const timestamp = new Date().toLocaleTimeString();
    if (currentSandboxLang === 'javascript') {
      output.textContent = `[${timestamp}] VM PROCESS EXIT 0 (12ms execution time)\n\nAnalyzing Torpedo Student Portfolio...\n{\n  student: 'Harsh Vardhan',\n  score: 91,\n  status: 'Verified Placement Ready 🚀',\n  badge: 'Blockchain Credential Issued'\n}\n\n✅ 4 unit tests passed | Sandbox memory: 18.2 MB`;
    } else if (currentSandboxLang === 'python') {
      output.textContent = `[${timestamp}] Python 3.12.2 (18ms)\n\nExecuting ATS Placement scan for Priya Nair (Autonomous AI Track)...\n{\n  'candidate': 'Priya Nair',\n  'matched_partners': ['Stripe', 'Amazon', 'Databricks'],\n  'salary_range': '24 - 36 LPA',\n  'readiness': '100% Certified'\n}\n\n✅ Candidate pushed to 3 enterprise partner recruiters.`;
    } else {
      output.textContent = `[${timestamp}] PostgreSQL 16 - Query OK, 3 rows (6ms)\n\n| track_name                 | total_enrolled | avg_package_lpa | fast_tracked_offers |\n| Full-Stack Distributed     | 12,450         | 24.8 LPA         | 384                 |\n| Autonomous AI Agents       | 15,800         | 28.5 LPA         | 512                 |\n| Algorithmic Finance        | 7,340          | 22.0 LPA         | 195                 |`;
    }
  }, 600);
};

/* Auth Modal & Role Switcher */
let currentAuthRole = 'student'; // 'student' | 'employer'
let currentAuthMode = 'login';   // 'login' | 'register'

window.openAuthModal = function(mode = 'login', role = 'student') {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;

  setAuthMode(mode, role);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Focus first visible input
  setTimeout(() => {
    const firstInput = modal.querySelector('input:not([type="hidden"])');
    if (firstInput) firstInput.focus();
  }, 100);
};

window.closeAuthModal = function() {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
};

// Close on backdrop click
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('auth-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeAuthModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAuthModal();
    }
  });
});

window.switchAuthRole = function(role) {
  currentAuthRole = role;
  const studentBtn = document.getElementById('tab-student-btn');
  const employerBtn = document.getElementById('tab-employer-btn');
  const emailInput = document.getElementById('auth-email-input');
  const emailLabel = document.querySelector('label[for="auth-email-input"]');
  const orgLabel = document.getElementById('auth-org-label');
  const orgInput = document.getElementById('auth-org-input');

  if (studentBtn && employerBtn) {
    if (role === 'student') {
      studentBtn.classList.add('active');
      employerBtn.classList.remove('active');
      if (emailLabel) emailLabel.innerHTML = 'Email Address <span class="required-star">*</span>';
      if (emailInput) emailInput.placeholder = 'john@example.com';
      if (orgLabel) orgLabel.innerHTML = 'University / Institution <span class="required-star">*</span>';
      if (orgInput) orgInput.placeholder = 'Delhi Technological University';
    } else {
      employerBtn.classList.add('active');
      studentBtn.classList.remove('active');
      if (emailLabel) emailLabel.innerHTML = 'Work Email Address <span class="required-star">*</span>';
      if (emailInput) emailInput.placeholder = 'recruiter@company.com';
      if (orgLabel) orgLabel.innerHTML = 'Company / Enterprise Name <span class="required-star">*</span>';
      if (orgInput) orgInput.placeholder = 'Stripe / Google / Databricks';
    }
  }
};

window.setAuthMode = function(mode = 'login', role = 'student', event = null) {
  if (event) event.preventDefault();
  currentAuthMode = mode;
  switchAuthRole(role);

  const extraFields = document.getElementById('auth-extra-fields');
  const forgotLink = document.getElementById('auth-forgot-link');
  const rememberRow = document.getElementById('auth-remember-row');
  const submitBtn = document.getElementById('auth-submit-btn');
  const footerContainer = document.getElementById('auth-footer-container');

  if (mode === 'register') {
    if (extraFields) extraFields.style.display = 'block';
    if (forgotLink) forgotLink.style.display = 'none';
    if (rememberRow) rememberRow.style.display = 'none';
    if (submitBtn) submitBtn.textContent = 'CREATE ACCOUNT';
    if (footerContainer) {
      footerContainer.innerHTML = `
        <span>Already have an account? </span>
        <a href="#login" onclick="setAuthMode('login', '${role}', event)">Login Here</a>
      `;
    }
  } else {
    if (extraFields) extraFields.style.display = 'none';
    if (forgotLink) forgotLink.style.display = 'inline';
    if (rememberRow) rememberRow.style.display = 'flex';
    if (submitBtn) submitBtn.textContent = 'LOGIN';
    if (footerContainer) {
      footerContainer.innerHTML = `
        <span>New to Torpedo? Register ( </span>
        <a href="#register-student" onclick="setAuthMode('register', 'student', event)">Student</a>
        <span> / </span>
        <a href="#register-company" onclick="setAuthMode('register', 'employer', event)">Company</a>
        <span> )</span>
      `;
    }
  }
};

window.togglePasswordVisibility = function(inputId, btnId) {
  const input = document.getElementById(inputId);
  const btn = document.getElementById(btnId);
  if (!input || !btn) return;

  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';

  btn.innerHTML = isPassword
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
};

window.handleGoogleLogin = function() {
  const roleTitle = currentAuthRole === 'student' ? 'Student' : 'Employer / Recruiter';
  showToast(`Authenticating with Google OAuth 2.0 as ${roleTitle}...`, 'info');
  setTimeout(() => {
    showToast(`Welcome back, Harsh Vardhan! Successfully logged in.`, 'success');
    closeAuthModal();
  }, 900);
};

window.handleForgotPassword = function(e) {
  if (e) e.preventDefault();
  const emailInput = document.getElementById('auth-email-input');
  const email = emailInput ? emailInput.value.trim() : '';

  if (!email) {
    showToast('Please enter your email address to receive a reset link.', 'warning');
    if (emailInput) emailInput.focus();
    return;
  }

  showToast(`Password reset link sent to ${email}. Please check your inbox.`, 'success');
};

window.handleAuthSubmit = function(e) {
  e.preventDefault();
  const emailInput = document.getElementById('auth-email-input');
  const passwordInput = document.getElementById('auth-password-input');
  const email = emailInput ? emailInput.value.trim() : '';
  const password = passwordInput ? passwordInput.value : '';

  if (!email || !password) {
    showToast('Please fill out all required fields.', 'warning');
    return;
  }

  const roleText = currentAuthRole === 'student' ? 'Student' : 'Employer & Staff';
  const actionText = currentAuthMode === 'login' ? 'Logged in' : 'Registered';

  showToast(`${actionText} successfully as ${roleText}! Welcome to Torpedo.`, 'success');
  closeAuthModal();
};

/* Toast Notification Utility */
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 380px;
      pointer-events: none;
    `;
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bg = type === 'success' ? '#059669' : type === 'warning' ? '#d97706' : '#1d4ed8';
  const icon = type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️';

  toast.style.cssText = `
    background: #ffffff;
    border-left: 4px solid ${bg};
    box-shadow: 0 10px 25px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.06);
    border-radius: 8px;
    padding: 12px 18px;
    color: #0f172a;
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 1.4;
    display: flex;
    align-items: center;
    gap: 10px;
    pointer-events: auto;
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  `;
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });

  setTimeout(() => {
    toast.style.transform = 'translateY(10px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

/* Search Trigger */
window.searchCourses = function() {
  const input = document.getElementById('header-search-input');
  if (input && input.value.trim()) {
    window.location.href = `courses.html?q=${encodeURIComponent(input.value.trim())}`;
  }
};

window.filterAndScroll = function(category) {
  window.location.href = `courses.html?category=${encodeURIComponent(category)}`;
};

/* Unified Ecosystem Category Filter with Smooth Animation */
window.filterEcosystemCategories = function(category, btn) {
  const buttons = document.querySelectorAll('.cat-pill-btn');
  buttons.forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const cards = document.querySelectorAll('.cat-card-item');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-cat');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
      card.style.opacity = '0';
      card.style.transform = 'translateY(10px)';
      requestAnimationFrame(() => {
        card.style.transition = 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    } else {
      card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
      card.style.opacity = '0';
      card.style.transform = 'translateY(6px)';
      setTimeout(() => {
        if (card.style.opacity === '0') {
          card.style.display = 'none';
        }
      }, 200);
    }
  });
};

/* Interactive Testimonials Filter */
window.filterTestimonials = function(role, btn) {
  const buttons = document.querySelectorAll('.testimonial-filter-btn');
  buttons.forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const items = document.querySelectorAll('.testimonial-item');
  items.forEach(item => {
    const itemRole = item.getAttribute('data-role');
    if (role === 'all' || itemRole === role) {
      item.style.display = 'block';
      item.style.opacity = '0';
      item.style.transform = 'translateY(12px)';
      requestAnimationFrame(() => {
        item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      });
    } else {
      item.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
      item.style.opacity = '0';
      item.style.transform = 'translateY(6px)';
      setTimeout(() => {
        if (item.style.opacity === '0') {
          item.style.display = 'none';
        }
      }, 200);
    }
  });
};

