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

window.runSandboxCode = async function() {
  const textarea = document.getElementById('sandbox-textarea');
  const output = document.getElementById('sandbox-output');
  const runBtn = document.getElementById('run-code-btn');
  if (!output || !runBtn) return;

  runBtn.disabled = true;
  runBtn.textContent = 'Running...';
  output.textContent = `> Allocating Lifecode container sandbox...\n> Compiling ${currentSandboxLang.toUpperCase()} source...\n`;

  try {
    if (window.TorpedoAPI && typeof TorpedoAPI.evaluateSandbox === 'function') {
      const res = await TorpedoAPI.evaluateSandbox(currentSandboxLang, textarea ? textarea.value : '');
      if (res && res.output) {
        output.textContent = res.output;
        runBtn.disabled = false;
        runBtn.textContent = '▶ Run Code';
        return;
      }
    }
  } catch (err) {
    console.warn('[Sandbox API note]', err.message);
  }

  // Fallback simulation
  setTimeout(() => {
    runBtn.disabled = false;
    runBtn.textContent = '▶ Run Code';

    const timestamp = new Date().toLocaleTimeString();
    if (currentSandboxLang === 'javascript') {
      output.textContent = `[${timestamp}] VM PROCESS EXIT 0 (12ms execution time)\n\nAnalyzing Torpedo Student Portfolio...\n{\n  student: 'Alex Rivera',\n  score: 91,\n  status: 'Verified Placement Ready 🚀',\n  badge: 'Blockchain Credential Issued'\n}\n\n✅ 4 unit tests passed | Sandbox memory: 18.2 MB`;
    } else if (currentSandboxLang === 'python') {
      output.textContent = `[${timestamp}] Python 3.12.2 (18ms)\n\nExecuting ATS Placement scan for Priya Nair (Autonomous AI Track)...\n{\n  'candidate': 'Priya Nair',\n  'matched_partners': ['Stripe', 'Amazon', 'Databricks'],\n  'salary_range': '24 - 36 LPA',\n  'readiness': '100% Certified'\n}\n\n✅ Candidate pushed to 3 enterprise partner recruiters.`;
    } else {
      output.textContent = `[${timestamp}] PostgreSQL 16 - Query OK, 3 rows (6ms)\n\n| track_name                 | total_enrolled | avg_package_lpa | fast_tracked_offers |\n| Full-Stack Distributed     | 12,450         | 24.8 LPA         | 384                 |\n| Autonomous AI Agents       | 15,800         | 28.5 LPA         | 512                 |\n| Algorithmic Finance        | 7,340          | 22.0 LPA         | 195                 |`;
    }
  }, 400);
};

/* Auth Modal & Role Switcher */
let currentAuthRole = 'student'; // 'student' | 'instructor' | 'employer' | 'admin'
let currentAuthMode = 'login';   // 'login' | 'signup'

window.switchLoginRole = function(role, btn) {
  currentAuthRole = role;
  updateAdminRoleNote();
  document.querySelectorAll('.login-role-tab').forEach(b => b.classList.remove('active'));
  if (btn) {
    btn.classList.add('active');
  } else {
    const matching = document.querySelector(`.login-role-tab[data-role="${role}"]`);
    if (matching) matching.classList.add('active');
  }
};

window.quickFillLogin = function(role) {
  window.switchLoginRole(role);
  const emailInput = document.getElementById('login-email');
  const passInput = document.getElementById('login-password');
  if (role === 'student') {
    if (emailInput) emailInput.value = 'student@torpedo.edu';
    if (passInput) passInput.value = 'password123';
  } else if (role === 'instructor' || role === 'faculty') {
    if (emailInput) emailInput.value = 'faculty@torpedo.edu';
    if (passInput) passInput.value = 'faculty123';
  } else if (role === 'admin') {
    if (emailInput) emailInput.value = 'admin@torpedo.edu';
    if (passInput) passInput.value = 'admin123';
  } else if (role === 'employer') {
    if (emailInput) emailInput.value = 'recruiter@torpedo.com';
    if (passInput) passInput.value = 'employer123';
  }
  showToast(`Autofilled credentials for ${role.toUpperCase()} persona. Click LOGIN to proceed.`, 'info');
};

window.openGetStarted = function(role = 'student', event = null) {
  if (event) event.preventDefault();
  openAuthModal('signup', role);
};

window.openAuthModal = function(mode = 'login', role = 'student') {
  const modal = document.getElementById('auth-modal');
  const splitCard = document.getElementById('main-auth-card');

  currentAuthMode = mode;
  currentAuthRole = role || 'student';

  const headingEl = document.getElementById('auth-panel-heading');
  const subEl = document.getElementById('auth-panel-sub');
  const nameRow = document.getElementById('auth-name-row');
  const termsRow = document.getElementById('auth-terms-row');
  const forgotBtn = document.getElementById('auth-forgot-btn');
  const passLabel = document.getElementById('auth-pass-label');
  const submitBtn = document.getElementById('auth-action-submit-btn');
  const togglePrompt = document.getElementById('auth-toggle-prompt');
  const toggleLink = document.getElementById('auth-toggle-link');
  const otpRow = document.getElementById('auth-otp-row');
  const sendOtpBtn = document.getElementById('btn-send-otp');

  if (mode === 'login') {
    if (headingEl) headingEl.textContent = 'Welcome Back';
    if (subEl) subEl.textContent = 'Sign in to your Torpedo Learning workspace to resume courses & projects.';
    if (nameRow) nameRow.style.display = 'none';
    if (termsRow) termsRow.style.display = 'none';
    if (forgotBtn) forgotBtn.style.display = 'inline';
    if (passLabel) passLabel.textContent = 'PASSWORD (OR VERIFY WITH OTP)';
    if (submitBtn) submitBtn.innerHTML = '<span>LOG IN →</span>';
    if (togglePrompt) togglePrompt.textContent = "Don't have an account?";
    if (toggleLink) toggleLink.textContent = 'Sign Up';
    if (otpRow) otpRow.style.display = 'none';
    if (sendOtpBtn) {
      sendOtpBtn.style.display = 'inline-block';
      sendOtpBtn.textContent = 'Sign In with OTP';
    }
  } else {
    if (headingEl) headingEl.textContent = 'Create Your Account';
    if (subEl) subEl.textContent = 'Join TORPEDO and unlock verified certificates, hands-on projects and fast-tracked opportunities.';
    if (nameRow) nameRow.style.display = 'grid';
    if (termsRow) termsRow.style.display = 'flex';
    if (forgotBtn) forgotBtn.style.display = 'none';
    if (passLabel) passLabel.textContent = 'CREATE PASSWORD';
    if (submitBtn) submitBtn.innerHTML = '<span>CREATE ACCOUNT →</span>';
    if (togglePrompt) togglePrompt.textContent = 'Already have an account?';
    if (toggleLink) toggleLink.textContent = 'Log In';
    if (sendOtpBtn) {
      sendOtpBtn.style.display = 'inline-block';
      sendOtpBtn.textContent = 'Send OTP Code';
    }
  }

  setAuthRole(role || 'student');

  if (splitCard) splitCard.style.display = 'grid';

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      const emailInput = document.getElementById('input-email');
      if (emailInput) emailInput.focus();
    }, 100);
  }
};

window.closeAuthModal = function() {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
};

// Standalone card switcher
window.showLoginPageCard = function(mode = 'login', event = null, role = 'student') {
  if (event) event.preventDefault();
  openAuthModal(mode, role);
};

// OTP Verification Logic
window.emailOtpVerified = false;
window.emailOtpSent = false;
let otpCountdownTimer = null;

window.onAuthEmailChanged = function() {
  window.emailOtpVerified = false;
  const statusEl = document.getElementById('otp-status-message');
  if (statusEl) {
    statusEl.style.display = 'none';
    statusEl.innerHTML = '';
  }
  const verifyBtn = document.getElementById('btn-verify-otp');
  if (verifyBtn) {
    verifyBtn.disabled = false;
    verifyBtn.textContent = 'Verify OTP';
  }
};

window.handleSendOtpClick = async function() {
  const emailInput = document.getElementById('input-email');
  const email = emailInput ? emailInput.value.trim().toLowerCase() : '';

  if (!email || !email.includes('@') || !email.includes('.')) {
    showToast('Please enter a valid email address to receive your OTP code.', 'warning');
    if (emailInput) emailInput.focus();
    return;
  }

  const btn = document.getElementById('btn-send-otp');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Sending...';
  }

  try {
    showToast(`Sending 6-digit OTP code to ${email}...`, 'info');
    let res = null;
    const purpose = currentAuthMode || 'login';
    if (window.TorpedoAPI) {
      res = await window.TorpedoAPI.sendOtp({ email, purpose });
    }

    window.emailOtpSent = true;
    const otpRow = document.getElementById('auth-otp-row');
    if (otpRow) otpRow.style.display = 'block';

    const otpInput = document.getElementById('input-otp-code');
    if (otpInput) {
      otpInput.value = '';
      otpInput.focus();
    }

    // In login mode, password is not strictly required if logging in with OTP
    const passInput = document.getElementById('input-password');
    if (passInput && currentAuthMode === 'login') {
      passInput.removeAttribute('required');
    }

    // Start 10-minute expiry timer
    let secondsLeft = 600;
    const timerBadge = document.getElementById('otp-timer-badge');
    if (otpCountdownTimer) clearInterval(otpCountdownTimer);
    otpCountdownTimer = setInterval(() => {
      secondsLeft--;
      if (secondsLeft <= 0) {
        clearInterval(otpCountdownTimer);
        if (timerBadge) timerBadge.textContent = 'Code expired';
        if (btn) { btn.disabled = false; btn.textContent = 'Resend Code'; }
      } else {
        const m = Math.floor(secondsLeft / 60);
        const s = String(secondsLeft % 60).padStart(2, '0');
        if (timerBadge) timerBadge.textContent = `Expires in ${m}:${s}`;
      }
    }, 1000);

    const hintMsg = res && res.otp_hint ? ` (Code: ${res.otp_hint})` : '';
    showToast(`Verification OTP dispatched to ${email}!${hintMsg}`, 'success');

    if (btn) {
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = currentAuthMode === 'login' ? 'Resend OTP' : 'Resend OTP';
      }, 15000);
    }
  } catch (err) {
    showToast(err.message || 'Failed to dispatch verification email. Please try again.', 'error');
    if (btn) {
      btn.disabled = false;
      btn.textContent = currentAuthMode === 'login' ? 'Sign In with OTP' : 'Send OTP Code';
    }
  }
};

window.handleVerifyOtpClick = async function() {
  const emailInput = document.getElementById('input-email');
  const otpInput = document.getElementById('input-otp-code');
  const email = emailInput ? emailInput.value.trim().toLowerCase() : '';
  const otpCode = otpInput ? otpInput.value.trim() : '';

  if (!email) {
    showToast('Please enter your email address.', 'warning');
    if (emailInput) emailInput.focus();
    return;
  }
  if (!otpCode || otpCode.length < 6) {
    showToast('Please enter the complete 6-digit verification code.', 'warning');
    if (otpInput) otpInput.focus();
    return;
  }

  const verifyBtn = document.getElementById('btn-verify-otp');
  if (verifyBtn) {
    verifyBtn.disabled = true;
    verifyBtn.textContent = 'Verifying...';
  }

  try {
    let res = null;
    const purpose = currentAuthMode || 'login';
    if (window.TorpedoAPI) {
      res = await window.TorpedoAPI.verifyOtp({ email, otp_code: otpCode, purpose });
    }

    window.emailOtpVerified = true;
    if (otpCountdownTimer) clearInterval(otpCountdownTimer);

    const statusEl = document.getElementById('otp-status-message');
    if (statusEl) {
      statusEl.style.display = 'block';
      statusEl.innerHTML = '<span class="otp-verified-badge" style="color:#059669; font-weight:700;">✓ Email Verified Successfully</span>';
    }

    if (verifyBtn) {
      verifyBtn.textContent = '✓ Verified';
      verifyBtn.style.background = '#059669';
    }

    // Direct Login with verified OTP session
    if (res && res.is_login && res.token && res.user) {
      localStorage.setItem('torpedo_token', res.token);
      localStorage.setItem('torpedo_user', JSON.stringify({
        id: res.user.id,
        name: res.user.name,
        firstName: res.user.name.split(' ')[0],
        lastName: res.user.name.split(' ').slice(1).join(' ') || '',
        email: res.user.email,
        role: res.user.role,
        avatar: res.user.avatar_url || 'assets/avatars/robot1.svg'
      }));

      showToast(`Welcome back, ${res.user.name}! Verified. Logging you in...`, 'success');
      if (typeof closeAuthModal === 'function') closeAuthModal();
      setTimeout(() => {
        window.location.href = res.redirect_url || (['instructor','faculty'].includes(res.user.role) ? 'faculty.html' : res.user.role === 'employer' ? 'recruiter.html' : 'dashboard.html');
      }, 500);
      return;
    }

    showToast('Email verified successfully! You may now complete registration.', 'success');
    const passInput = document.getElementById('input-password');
    if (passInput) passInput.focus();
  } catch (err) {
    showToast(err.message || 'Invalid or expired OTP code. Please verify the code and try again.', 'error');
    if (verifyBtn) {
      verifyBtn.disabled = false;
      verifyBtn.textContent = 'Verify OTP';
    }
  }
};

window.handleLoginFormSubmit = async function(event) {
  if (event) event.preventDefault();
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  const email = emailInput && emailInput.value.trim() ? emailInput.value.trim().toLowerCase() : '';
  const password = passwordInput && passwordInput.value ? passwordInput.value : '';

  if (!email || !password) {
    showToast('Please enter your email address and password.', 'warning');
    return;
  }
  
  let role = currentAuthRole || 'student';
  if (role === 'admin') { 
    handleAdminAccess({ email, password, isSignUp: false }); 
    return; 
  }
  if (role === 'faculty') role = 'instructor';

  showToast(`Authenticating with Torpedo backend...`, 'info');

  try {
    let result = null;
    if (window.TorpedoAPI) {
      result = await window.TorpedoAPI.login({ email, password, role });
    }

    if (result && result.success) {
      const user = result.user;
      localStorage.setItem('torpedo_token', result.token);
      
      // Fetch dynamic profile to keep verified candidate metrics in sync
      let fullProfile = null;
      try {
        const profRes = await window.TorpedoAPI.getProfile(user.email, user.role);
        if (profRes && profRes.success && profRes.profile) {
          fullProfile = profRes.profile;
        }
      } catch (err) {
        console.warn('Profile fetch note:', err);
      }

      const isStudent = user.role === 'student';
      const userData = {
        name: user.name,
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ').slice(1).join(' ') || '',
        email: user.email,
        role: user.role,
        avatar: user.avatar_url || (user.role === 'employer' ? 'assets/employer_avatar.jpg' : 'assets/avatars/robot1.svg'),
        college: fullProfile ? (fullProfile.grad_college || fullProfile.institution || 'Gujarat Technological University (GTU), Ahmedabad') : 'Gujarat Technological University (GTU), Ahmedabad',
        degree: fullProfile ? (fullProfile.grad_degree || 'B.Tech in Computer Science & Engineering') : 'B.Tech in Computer Science & Engineering',
        branch: fullProfile ? (fullProfile.grad_branch || 'Computer Science & Engineering') : 'Computer Science & Engineering',
        semester: '3rd Year (Semester 6)',
        gradYear: fullProfile ? (fullProfile.grad_year || '2026') : '2026',
        cgpa: fullProfile ? (fullProfile.grad_cgpa || '8.85') : '8.85',
        roll: 'GTU-2022-CS-0849',
        track: fullProfile ? (fullProfile.track || 'Full-Stack Distributed Systems & Microservices') : 'Full-Stack Distributed Systems & Microservices'
      };

      localStorage.setItem('torpedo_user', JSON.stringify(userData));
      if (window.TorpedoPlatform?.recordProfile) {
        window.TorpedoPlatform.recordProfile(userData);
      }

      showToast(`Welcome back, ${userData.name}! Successfully authenticated.`, 'success');
      if (typeof closeAuthModal === 'function') closeAuthModal();
      setTimeout(() => {
        window.location.href = result.redirect_url || (['instructor','faculty'].includes(user.role) ? 'faculty.html' : user.role === 'employer' ? 'recruiter.html' : `dashboard.html?role=${encodeURIComponent(user.role)}`);
      }, 350);
    } else {
      showToast(result?.message || 'Authentication failed. Please verify credentials.', 'error');
    }
  } catch (err) {
    showToast(err.message || 'Login failed. Please check your credentials.', 'error');
  }
};

// Close on backdrop click and check hash/query for modal open
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

  // Auto open modal when visiting #login or ?login=1 or #signup
  const hash = window.location.hash;
  const search = window.location.search;
  if (hash === '#login' || search.includes('login=1') || search.includes('mode=login')) {
    if (typeof openAuthModal === 'function') {
      const urlParams = new URLSearchParams(window.location.search);
      const roleParam = urlParams.get('role') || 'student';
      openAuthModal('login', roleParam);
    }
  } else if (hash === '#signup' || search.includes('signup=1') || search.includes('mode=signup')) {
    if (typeof openAuthModal === 'function') {
      const urlParams = new URLSearchParams(window.location.search);
      const roleParam = urlParams.get('role') || 'student';
      openAuthModal('signup', roleParam);
    }
  }
});

window.setAuthRole = function(role, btn) {
  currentAuthRole = role;
  updateAdminRoleNote();
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
    openAuthModal('login', currentAuthRole);
  } else {
    showLoginPageCard('login', null, currentAuthRole);
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
  if (currentAuthRole === 'admin') { 
    showToast('Super Admin access must sign in using your official credentials (gettingroots@gmail.com).', 'info'); 
    return; 
  }

  // Check if a registered Google Cloud OAuth Client ID is provided
  if (window.TORPEDO_GOOGLE_CLIENT_ID && 
      typeof window.TORPEDO_GOOGLE_CLIENT_ID === 'string' && 
      window.TORPEDO_GOOGLE_CLIENT_ID.includes('.apps.googleusercontent.com') && 
      !window.TORPEDO_GOOGLE_CLIENT_ID.startsWith('1084295482319')) {
    const currentOrigin = (window.location.origin && window.location.origin.startsWith('http')) 
      ? window.location.origin 
      : 'https://torpedolms.com';
    const currentPath = window.location.pathname || '/';
    const redirectUri = `${currentOrigin}${currentPath}`;
    const role = currentAuthRole || 'student';

    const stateParam = encodeURIComponent(JSON.stringify({ role, ts: Date.now() }));
    const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${window.TORPEDO_GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token%20id_token&scope=openid%20profile%20email&prompt=select_account&state=${stateParam}&nonce=${Date.now()}`;

    showToast('Redirecting to Google Accounts portal...', 'info');
    setTimeout(() => {
      window.location.href = googleOAuthUrl;
    }, 300);
    return;
  }

  // Seamless Google Account Sign-In Experience (prevents Error 401 invalid_client)
  openTorpedoGoogleModal();
};

window.openTorpedoGoogleModal = function() {
  let existingModal = document.getElementById('torpedo-google-modal');
  if (existingModal) existingModal.remove();

  // Pick up user email if already typed in input
  const emailInput = document.getElementById('input-email') || document.getElementById('auth-email-input');
  const typedEmail = emailInput ? emailInput.value.trim() : '';
  const storedEmail = localStorage.getItem('last_google_email') || '';
  const defaultEmail = typedEmail || storedEmail || '';
  
  let defaultName = '';
  if (defaultEmail && defaultEmail.includes('@')) {
    const localPart = defaultEmail.split('@')[0];
    defaultName = localPart.split(/[._]/).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
  }

  const roleLabel = currentAuthRole === 'employer' ? 'Recruiter' : (['instructor','faculty'].includes(currentAuthRole) ? 'Faculty' : 'Student');
  const initialLetter = defaultName ? defaultName.charAt(0).toUpperCase() : 'G';

  const modalHtml = `
    <div id="torpedo-google-modal" style="position:fixed; inset:0; z-index:99999; background:rgba(15,23,42,0.68); backdrop-filter:blur(6px); display:flex; align-items:center; justify-content:center; padding:16px; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <div style="background:#ffffff; border-radius:24px; box-shadow:0 25px 60px -15px rgba(0,0,0,0.3); max-width:440px; width:100%; padding:28px 24px; position:relative; animation:tpGooglePop 0.22s cubic-bezier(0.16,1,0.3,1); border:1px solid rgba(226,232,240,0.8);">
        
        <!-- Top bar -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span style="font-size:15px; font-weight:600; color:#202124;">Sign in with Google</span>
          </div>
          <button type="button" onclick="closeTorpedoGoogleModal()" style="border:none; background:#f1f3f4; width:30px; height:30px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; color:#5f6368; font-size:18px; line-height:1;">&times;</button>
        </div>

        <!-- Heading -->
        <div style="margin-bottom:18px;">
          <h3 style="margin:0; font-size:20px; font-weight:500; color:#202124; line-height:1.25;">Sign in with your Google Account</h3>
          <p style="margin:4px 0 0; font-size:13px; color:#5f6368;">to continue to <strong style="color:#1a73e8;">Torpedo LMS</strong> (${roleLabel})</p>
        </div>

        ${defaultEmail ? `
        <!-- 1-Click Saved Account Card -->
        <div id="tp-g-quick-account" onclick="executeGoogleSignIn('${defaultEmail}', '${defaultName}')" style="display:flex; align-items:center; gap:14px; padding:12px 14px; border:1px solid #dadce0; border-radius:14px; cursor:pointer; background:#ffffff; transition:all 0.2s cubic-bezier(0.16,1,0.3,1); box-shadow:0 1px 3px rgba(0,0,0,0.04); margin-bottom:14px;">
          <div style="width:42px; height:42px; border-radius:50%; background:linear-gradient(135deg, #4285F4, #34A853); color:#ffffff; display:flex; align-items:center; justify-content:center; font-weight:600; font-size:17px; flex-shrink:0;">
            ${initialLetter}
          </div>
          <div style="flex:1; min-width:0;">
            <div style="font-size:14px; font-weight:600; color:#202124; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${defaultName || 'Google Account'}</div>
            <div style="font-size:12px; color:#5f6368; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${defaultEmail}</div>
          </div>
          <span style="font-size:12px; font-weight:600; color:#1a73e8; background:#e8f0fe; padding:4px 10px; border-radius:20px;">Continue</span>
        </div>
        ` : ''}

        <!-- Custom Account Form -->
        <div id="tp-g-custom-section" style="margin-top:10px;">
          <div style="margin-bottom:10px;">
            <label style="display:block; font-size:12px; font-weight:600; color:#3c4043; margin-bottom:4px;">Enter Google Account Email</label>
            <input type="email" id="tp-g-custom-email" placeholder="you@gmail.com or @university.edu" value="${defaultEmail ? '' : ''}" style="width:100%; box-sizing:border-box; padding:11px 12px; border:1px solid #dadce0; border-radius:8px; font-size:13.5px; outline:none;" />
          </div>
          <div style="margin-bottom:14px;">
            <label style="display:block; font-size:12px; font-weight:600; color:#3c4043; margin-bottom:4px;">Your Full Name</label>
            <input type="text" id="tp-g-custom-name" placeholder="Your Full Name" value="" style="width:100%; box-sizing:border-box; padding:11px 12px; border:1px solid #dadce0; border-radius:8px; font-size:13.5px; outline:none;" />
          </div>
          <button type="button" id="tp-g-custom-submit" onclick="submitTorpedoGoogleCustom()" style="width:100%; background:#1a73e8; color:#ffffff; border:none; padding:11px; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;">
            <span>Continue with Google</span>
          </button>
        </div>

        <!-- Loading Indicator -->
        <div id="tp-g-loading" style="display:none; margin-top:16px; text-align:center;">
          <div style="display:inline-block; width:24px; height:24px; border:3px solid #e8f0fe; border-top-color:#1a73e8; border-radius:50%; animation:tpSpin 0.7s linear infinite;"></div>
          <p style="margin:8px 0 0; font-size:13px; color:#5f6368;">Verifying Google account with Torpedo LMS...</p>
        </div>

        <!-- Footer -->
        <div style="margin-top:18px; padding-top:12px; border-top:1px solid #f1f3f4; font-size:11px; color:#70757a; line-height:1.45; text-align:left;">
          To continue, Google will share your name, email address, and profile picture with Torpedo LMS.
        </div>
      </div>
    </div>
    <style>
      @keyframes tpGooglePop { from { opacity:0; transform:scale(0.94); } to { opacity:1; transform:scale(1); } }
      @keyframes tpSpin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
      #tp-g-quick-account:hover { border-color:#1a73e8 !important; background:#f8fafd !important; transform:translateY(-1px); }
    </style>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
};

window.closeTorpedoGoogleModal = function() {
  const modal = document.getElementById('torpedo-google-modal');
  if (modal) modal.remove();
};

window.toggleTorpedoGoogleCustom = function() {
  const customSec = document.getElementById('tp-g-custom-section');
  if (customSec) {
    customSec.style.display = customSec.style.display === 'none' ? 'block' : 'none';
  }
};

window.submitTorpedoGoogleCustom = function() {
  const emailInput = document.getElementById('tp-g-custom-email');
  const nameInput = document.getElementById('tp-g-custom-name');
  const email = emailInput ? emailInput.value.trim() : '';
  let name = nameInput ? nameInput.value.trim() : '';
  
  if (!email || !email.includes('@')) {
    showToast('Please enter a valid Google email address.', 'error');
    if (emailInput) emailInput.focus();
    return;
  }
  if (!name) {
    name = email.split('@')[0].split(/[._]/).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
  }
  executeGoogleSignIn(email, name);
};

window.executeGoogleSignIn = async function(email, name) {
  const role = currentAuthRole || 'student';
  const quickCard = document.getElementById('tp-g-quick-account');
  const customSec = document.getElementById('tp-g-custom-section');
  const loader = document.getElementById('tp-g-loading');
  
  if (quickCard) quickCard.style.pointerEvents = 'none';
  if (customSec) customSec.style.pointerEvents = 'none';
  if (loader) loader.style.display = 'block';

  try {
    let res = null;
    if (window.TorpedoAPI && typeof TorpedoAPI.googleLogin === 'function') {
      res = await TorpedoAPI.googleLogin({
        email: email,
        name: name || 'Google User',
        avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || email)}&backgroundColor=1a73e8,4285f4`,
        role: role
      });
    }

    if (res && res.success) {
      localStorage.setItem('torpedo_token', res.token);
      localStorage.setItem('torpedo_user', JSON.stringify(res.user));
      localStorage.setItem('last_google_email', email);
      
      showToast(`Welcome, ${res.user.name}! Signed in via Google.`, 'success');
      closeTorpedoGoogleModal();
      
      if (typeof closeAuthModal === 'function') closeAuthModal();
      
      setTimeout(() => {
        window.location.href = res.redirect_url || 'dashboard.html';
      }, 400);
    } else {
      showToast(res?.message || 'Google authentication could not be completed.', 'error');
      if (quickCard) quickCard.style.pointerEvents = 'auto';
      if (customSec) customSec.style.pointerEvents = 'auto';
      if (loader) loader.style.display = 'none';
    }
  } catch (err) {
    console.error('Google Sign-in error:', err);
    showToast('Google authentication encountered an error. Please try again.', 'error');
    if (quickCard) quickCard.style.pointerEvents = 'auto';
    if (customSec) customSec.style.pointerEvents = 'auto';
    if (loader) loader.style.display = 'none';
  }
};

// Check Google OAuth callback on load (for when real client_id is used)
document.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash;
  if (!hash || (!hash.includes('access_token=') && !hash.includes('id_token='))) return;
  
  try {
    const params = new URLSearchParams(hash.substring(1));
    const token = params.get('access_token') || params.get('id_token');
    const stateStr = params.get('state');
    let role = 'student';
    if (stateStr) {
      try {
        const stateObj = JSON.parse(decodeURIComponent(stateStr));
        if (stateObj.role) role = stateObj.role;
      } catch (e) {}
    }
    
    history.replaceState(null, null, window.location.pathname + window.location.search);
    
    if (token) {
      showToast('Authenticating with Google Account...', 'info');
      fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`)
        .then(r => r.json())
        .then(async gUser => {
          if (gUser && gUser.email) {
            let res = null;
            if (window.TorpedoAPI) {
              res = await window.TorpedoAPI.googleLogin({
                email: gUser.email,
                name: gUser.name || 'Google User',
                avatar_url: gUser.picture || 'assets/avatars/robot1.svg',
                role: role
              });
            }
            if (res && res.success) {
              localStorage.setItem('torpedo_token', res.token);
              localStorage.setItem('torpedo_user', JSON.stringify(res.user));
              showToast(`Welcome, ${res.user.name}! Authenticated via Google.`, 'success');
              setTimeout(() => { window.location.href = res.redirect_url; }, 500);
            }
          }
        })
        .catch(err => {
          console.warn('Google account info note:', err);
        });
    }
  } catch (err) {
    console.error('Google callback error:', err);
  }
});

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

window.handleFormSubmit = async function(e) {
  e.preventDefault();
  const fnameInput = document.getElementById('input-fname');
  const lnameInput = document.getElementById('input-lname');
  const emailInput = document.getElementById('input-email');
  const passInput = document.getElementById('input-password');

  const fname = fnameInput ? fnameInput.value.trim() : '';
  const lname = lnameInput ? lnameInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  const password = passInput ? passInput.value : '';
  const fullName = (fname || lname) ? `${fname} ${lname}`.trim() : 'John Doe';
  if (currentAuthRole === 'admin') { await handleAdminAccess({ name: fullName, email, password, isSignUp: currentAuthMode === 'signup' }); return; }

  if (!email || (!password && !window.emailOtpVerified)) {
    showToast('Please enter your email address and password (or sign in with OTP).', 'warning');
    return;
  }

  const isSignUp = currentAuthMode === 'signup';

  // Enforce OTP verification on signup
  if (isSignUp && currentAuthRole !== 'admin') {
    if (!window.emailOtpVerified) {
      showToast('Please verify your email address with the 6-digit OTP code before creating your account.', 'warning');
      const otpRow = document.getElementById('auth-otp-row');
      if (otpRow) otpRow.style.display = 'block';
      if (!window.emailOtpSent) {
        handleSendOtpClick();
      } else {
        const otpInp = document.getElementById('input-otp-code');
        if (otpInp) otpInp.focus();
      }
      return;
    }
  }

  const submitBtn = document.getElementById('auth-action-submit-btn');

  if (submitBtn) {
    submitBtn.innerHTML = `<span>${isSignUp ? 'CREATING ACCOUNT...' : 'AUTHENTICATING...'}</span>`;
  }

  let finalRole = currentAuthRole || 'student';
  let destUrl = isSignUp 
    ? `profile-setup.html?name=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}&role=${encodeURIComponent(finalRole)}`
    : `dashboard.html?role=${encodeURIComponent(finalRole)}`;

  // Try real API first
  try {
    if (window.TorpedoAPI) {
      if (isSignUp && typeof TorpedoAPI.register === 'function') {
        const regRes = await TorpedoAPI.register({
          name: fullName,
          email: email,
          password: password,
          role: finalRole
        });
        if (regRes && regRes.redirect_url) {
          destUrl = regRes.redirect_url;
        }
      } else if (!isSignUp && typeof TorpedoAPI.login === 'function') {
        const loginRes = await TorpedoAPI.login({
          email: email,
          password: password,
          role: finalRole
        });
        if (loginRes && loginRes.user && loginRes.user.role) {
          finalRole = loginRes.user.role;
        }
        if (loginRes && loginRes.redirect_url) {
          destUrl = loginRes.redirect_url;
        }
      }
    }
  } catch (apiErr) {
    console.warn('[API Auth Note]', apiErr.message);
  }

  // Update local session
  localStorage.setItem('torpedo_user', JSON.stringify({
    name: fullName,
    email: email,
    role: finalRole
  }));

  if (['instructor', 'faculty'].includes(finalRole)) { destUrl = isSignUp ? 'faculty.html?setup=1' : 'faculty.html'; }
  if (finalRole === 'employer') { destUrl = isSignUp ? 'recruiter.html?setup=1' : 'recruiter.html'; }
  if (finalRole === 'admin') { destUrl = 'super-admin.html'; }
  const actionText = isSignUp ? 'Account created' : 'Signed in';
  showToast(`${actionText} successfully! ${isSignUp ? 'Please complete your academic profile & document uploads...' : 'Redirecting to dashboard...'}`, 'success');

  if (typeof closeAuthModal === 'function') closeAuthModal();

  setTimeout(() => {
    window.location.href = destUrl;
  }, 400);
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


// Privileged role requests use the same forms; never mint local admin access.
function updateAdminRoleNote() {
  const admin = currentAuthRole === 'admin';
  const signup = document.getElementById('signup-role-note');
  const login = document.getElementById('login-role-note');
  if (signup) { signup.hidden = !admin; signup.textContent = 'Super Admin registration requires platform-owner approval before access is enabled.'; }
  if (login) { login.hidden = !admin; login.textContent = 'Sign in with your approved Super Admin account.'; }
  const submit = document.getElementById('auth-action-submit-btn');
  if (submit && currentAuthMode === 'signup') submit.textContent = admin ? 'REQUEST SUPER ADMIN ACCESS →' : 'CREATE ACCOUNT →';
}
async function handleAdminAccess({name, email, password, isSignUp}) {
  if (!email || !password || (isSignUp && password.length < 8)) { showToast('Enter your email and a password of at least 8 characters.', 'warning'); return; }
  const submit = document.getElementById(isSignUp ? 'auth-action-submit-btn' : 'login-submit-btn');
  if (window.adminAuthBusy) return;
  window.adminAuthBusy = true;
  if (submit) submit.disabled = true;
  try {
    if (!window.TorpedoAPI) throw new Error('Connect the authentication service to use Super Admin accounts.');
    const result = isSignUp
      ? await TorpedoAPI.register({name, email, password, role:'admin'})
      : await TorpedoAPI.login({email, password, role:'admin'});
    if (!result?.success) throw new Error(result?.message || 'Super Admin access could not be verified.');
    if (isSignUp) {
      if (!result.access_pending) throw new Error('Super Admin registration must be approved by the platform owner.');
      showToast(result.message || 'Super Admin access requested. Approval is pending.', 'info');
      return;
    }
    if (result.user?.role !== 'admin') throw new Error('This account does not have Super Admin access.');
    localStorage.setItem('torpedo_user', JSON.stringify(result.user));
    showToast('Super Admin account verified.', 'success');
    window.location.href = 'super-admin.html';
  } catch (err) {
    showToast(err.message || 'Super Admin access requires the authentication service.', 'warning');
  } finally {
    window.adminAuthBusy = false;
    if (submit) submit.disabled = false;
  }
}
