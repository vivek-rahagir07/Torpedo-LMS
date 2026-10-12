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
let currentAuthMode = 'login';   // 'login' | 'signup'

window.switchLoginRole = function(role, btn) {
  currentAuthRole = role;
  document.querySelectorAll('.login-role-tab').forEach(b => b.classList.remove('active'));
  if (btn) {
    btn.classList.add('active');
  } else {
    const matching = document.querySelector(`.login-role-tab[data-role="${role}"]`);
    if (matching) matching.classList.add('active');
  }
};

window.openGetStarted = function(role = 'student', event = null) {
  if (event) event.preventDefault();
  const modal = document.getElementById('auth-modal');
  if (modal) {
    openAuthModal('signup', role);
  } else {
    showLoginPageCard('signup', null, role);
  }
};

window.openAuthModal = function(mode = 'login', role = 'student') {
  const modal = document.getElementById('auth-modal');
  const compactCard = document.getElementById('compact-login-card');
  const splitCard = document.getElementById('main-auth-card');

  currentAuthMode = mode;
  currentAuthRole = role || 'student';

  if (mode === 'login') {
    if (compactCard) compactCard.style.display = 'block';
    if (splitCard) splitCard.style.display = 'none';
    switchLoginRole(role || 'student');
  } else {
    if (compactCard) compactCard.style.display = 'none';
    if (splitCard) splitCard.style.display = 'grid';
    setAuthRole(role || 'student');
  }

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus input
    setTimeout(() => {
      const activeCard = mode === 'login' ? compactCard : splitCard;
      const firstInput = activeCard ? activeCard.querySelector('input:not([type="hidden"])') : null;
      if (firstInput) firstInput.focus();
    }, 100);
  }
};

window.closeAuthModal = function() {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
};

// Standalone login.html card switcher
window.showLoginPageCard = function(mode = 'login', event = null, role = 'student') {
  if (event) event.preventDefault();
  const compactCard = document.getElementById('compact-login-card');
  const splitCard = document.getElementById('main-auth-card');

  currentAuthMode = mode;
  currentAuthRole = role || 'student';

  if (mode === 'login') {
    if (compactCard) compactCard.style.display = 'block';
    if (splitCard) splitCard.style.display = 'none';
    switchLoginRole(role || 'student');
  } else {
    if (compactCard) compactCard.style.display = 'none';
    if (splitCard) splitCard.style.display = 'grid';
    setAuthRole(role || 'student');
  }
};

window.handleLoginFormSubmit = function(event) {
  if (event) event.preventDefault();
  const emailInput = document.getElementById('login-email');
  const email = emailInput && emailInput.value.trim() ? emailInput.value.trim() : 'student@torpedo.edu';
  const roleTitle = currentAuthRole === 'employer' ? 'EMPLOYER / STAFF' : 'STUDENT';

  showToast(`Logging in as ${roleTitle}...`, 'info');

  const cleanName = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Student';
  const userData = {
    name: cleanName,
    email: email,
    role: currentAuthRole || 'student'
  };
  localStorage.setItem('torpedo_user', JSON.stringify(userData));

  setTimeout(() => {
    showToast(`Welcome back, ${userData.name}! Successfully logged in.`, 'success');
    if (typeof closeAuthModal === 'function') closeAuthModal();
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 400);
  }, 600);
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

  // URL query check on standalone login.html
  if (window.location.pathname.includes('login.html') || document.querySelector('.login-page-body')) {
    if (window.location.search.includes('mode=signup') || window.location.search.includes('mode=register')) {
      showLoginPageCard('signup');
    } else {
      showLoginPageCard('login');
    }
  }
});

window.setAuthRole = function(role, btn) {
  currentAuthRole = role;
  document.querySelectorAll('.role-pill-btn').forEach(b => b.classList.remove('active'));
  if (btn) {
    btn.classList.add('active');
  } else {
    const matching = document.querySelector(`.role-pill-btn[data-role="${role}"]`);
    if (matching) matching.classList.add('active');
  }
};

window.switchAuthRole = function(role) {
  setAuthRole(role);
};

window.toggleAuthMode = function(e) {
  if (e) e.preventDefault();
  const modal = document.getElementById('auth-modal');
  if (modal) {
    openAuthModal('login');
  } else {
    showLoginPageCard('login');
  }
};

window.setAuthMode = function(mode = 'signup', role = 'student', event = null) {
  if (event) event.preventDefault();
  openAuthModal(mode, role);
};

window.togglePasswordVisibility = function(inputId, btn) {
  const input = typeof inputId === 'string' ? document.getElementById(inputId) : inputId;
  const trigger = typeof btn === 'string' ? document.getElementById(btn) : btn;
  if (!input) return;

  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';

  if (trigger) {
    trigger.innerHTML = isPassword
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  }
};

window.handleGoogleLogin = function() {
  const roleTitle = currentAuthRole ? currentAuthRole.toUpperCase() : 'STUDENT';
  showToast(`Authenticating via Google OAuth as ${roleTitle}...`, 'info');
  
  localStorage.setItem('torpedo_user', JSON.stringify({
    name: 'Harsh Vardhan',
    email: 'harsh.vardhan@torpedo.edu',
    role: currentAuthRole || 'student'
  }));

  setTimeout(() => {
    showToast(`Welcome back, Harsh Vardhan! Successfully authenticated.`, 'success');
    if (typeof closeAuthModal === 'function') closeAuthModal();
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 400);
  }, 700);
};

window.handleForgotPassword = function(e) {
  if (e) e.preventDefault();
  const emailInput = document.getElementById('input-email') || document.getElementById('auth-email-input');
  const email = emailInput ? emailInput.value.trim() : '';

  if (!email) {
    showToast('Please enter your email address to receive a reset link.', 'warning');
    if (emailInput) emailInput.focus();
    return;
  }

  showToast(`Password reset link sent to ${email}. Please check your inbox.`, 'success');
};

window.handleFormSubmit = function(e) {
  e.preventDefault();
  const fnameInput = document.getElementById('input-fname');
  const lnameInput = document.getElementById('input-lname');
  const emailInput = document.getElementById('input-email');
  const passInput = document.getElementById('input-password');

  const fname = fnameInput ? fnameInput.value.trim() : '';
  const lname = lnameInput ? lnameInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  const fullName = (fname || lname) ? `${fname} ${lname}`.trim() : 'John Doe';

  if (!email || (passInput && !passInput.value)) {
    showToast('Please provide your email address and password.', 'warning');
    return;
  }

  localStorage.setItem('torpedo_user', JSON.stringify({
    name: fullName,
    email: email,
    role: currentAuthRole || 'student'
  }));

  const submitBtn = document.getElementById('auth-action-submit-btn');
  if (submitBtn) {
    submitBtn.innerHTML = '<span>REDIRECTING...</span>';
  }

  const actionText = currentAuthMode === 'login' ? 'Signed in' : 'Account created';
  showToast(`${actionText} successfully as ${currentAuthRole.toUpperCase()}! Redirecting to dashboard...`, 'success');

  if (typeof closeAuthModal === 'function') closeAuthModal();

  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 600);
};

window.handleAuthSubmit = function(e) {
  window.handleFormSubmit(e);
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

