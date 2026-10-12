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

/* Auth Modal */
window.openAuthModal = function(mode = 'login') {
  const modal = document.getElementById('auth-modal');
  const title = document.getElementById('auth-modal-title');
  if (modal) {
    if (title) title.textContent = mode === 'login' ? 'Sign In to Torpedo' : 'Get Started with Torpedo';
    modal.style.display = 'flex';
  }
};

window.closeAuthModal = function() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.style.display = 'none';
};

/* Search Trigger */
window.searchCourses = function() {
  const input = document.getElementById('header-search-input');
  if (input && input.value.trim()) {
    alert(`Searching catalog for: "${input.value.trim()}"`);
  }
};

window.filterAndScroll = function(category) {
  const target = document.getElementById('curriculum-section');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};
