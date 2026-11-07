/**
 * Torpedo Learning — Community Portal Module
 * Covers Mentorships, Referrals Hub, Torpedo Awards, Blog Insights, and Help & Support
 */
(() => {
  'use strict';

  // Helper selectors & utilities
  const $ = selector => document.querySelector(selector);
  const $$ = selector => document.querySelectorAll(selector);
  const escapeHtml = value => String(value).replace(/[&<>"']/g, char =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

  document.addEventListener('click', event => {
    const link = event.target.closest('[data-community-tab]');
    if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const tab = link.dataset.communityTab;
    switchPortalTab(tab);
    const heading = $(`#tab-view-${tab} .community-hero-title`);
    heading.tabIndex = -1;
    heading.focus();
  });

  // Read / write local helpers
  const readStorage = (key, fallback) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  };

  const writeStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  };

  /* ==========================================================================
     1. 1-ON-1 EXPERT MENTORSHIP
     ========================================================================== */
  const mentorsData = [
    {
      id: 'mentor-1',
      name: 'Dr. Evelyn Martinez',
      initials: 'DM',
      role: 'Web Engineering at Torpedo Faculty',
      company: 'Torpedo Faculty (ex-Google)',
      rating: 4.9,
      reviewsCount: '1,420+',
      rate: '₹1.8k',
      rateNum: 1800,
      callsCount: '12+',
      category: 'web',
      tags: ['#WebEngineering', '#SystemDesign'],
      featured: true,
      bio: 'Staff frontend architect with 10+ years designing enterprise distributed web apps and modern micro-frontends.',
      nextSlot: 'Today, 6:00 PM'
    },
    {
      id: 'mentor-2',
      name: 'Manas Sharma',
      initials: 'MS',
      role: 'Web Engineering at Torpedo Faculty',
      company: 'Torpedo Faculty (ex-Stripe)',
      rating: 4.9,
      reviewsCount: '980+',
      rate: '₹1.8k',
      rateNum: 1800,
      callsCount: '12+',
      category: 'web',
      tags: ['#WebEngineering', '#SystemDesign'],
      featured: true,
      bio: 'Full stack distributed systems engineer specializing in high-throughput APIs, node runtimes, and payment pipelines.',
      nextSlot: 'Today, 7:30 PM'
    },
    {
      id: 'mentor-3',
      name: 'Priya Nair',
      initials: 'PN',
      role: 'Senior ML Engineer at DeepMind / Torpedo Faculty',
      company: 'DeepMind',
      rating: 5.0,
      reviewsCount: '840+',
      rate: '₹2.2k',
      rateNum: 2200,
      callsCount: '28+',
      category: 'ai',
      tags: ['#MachineLearning', '#PyTorch'],
      featured: true,
      bio: 'AI researcher focused on LLM reasoning architectures, model evaluation, and scalable inference optimization.',
      nextSlot: 'Tomorrow, 5:00 PM'
    },
    {
      id: 'mentor-4',
      name: 'Rohan Deshmukh',
      initials: 'RD',
      role: 'Staff Cloud Architect at Stripe / Torpedo Faculty',
      company: 'Stripe',
      rating: 4.95,
      reviewsCount: '650+',
      rate: '₹2.0k',
      rateNum: 2000,
      callsCount: '19+',
      category: 'cloud',
      tags: ['#CloudDevOps', '#Kubernetes'],
      featured: true,
      bio: 'Infrastructure and cloud engineer with deep expertise in multi-region Kubernetes clusters, Terraform, and zero-trust security.',
      nextSlot: 'Today, 9:00 PM'
    },
    {
      id: 'mentor-5',
      name: 'Ananya Sen',
      initials: 'AS',
      role: 'Principal Product Designer at Airbnb / Torpedo Faculty',
      company: 'Airbnb',
      rating: 4.9,
      reviewsCount: '720+',
      rate: '₹1.9k',
      rateNum: 1900,
      callsCount: '15+',
      category: 'design',
      tags: ['#UIUX', '#DesignSystems'],
      featured: true,
      bio: 'Design systems lead bridging UX research, component token architectures, and accessibility guidelines.',
      nextSlot: 'Friday, 4:00 PM'
    }
  ];

  let activeCategoryFilter = 'all';
  let activeSearchQuery = '';

  function renderMentors() {
    const grid = $('#mentors-list-grid');
    if (!grid) return;

    let filtered = mentorsData.filter(m => {
      const matchCat = activeCategoryFilter === 'all' || m.category === activeCategoryFilter;
      const q = activeSearchQuery.trim().toLowerCase();
      const matchSearch = !q || m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.tags.some(t => t.toLowerCase().includes(q)) ||
        m.company.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

    const categoryNames = {
      all: 'All Specialists',
      web: 'Web Engineering',
      design: 'UI/UX Design',
      ai: 'AI & Data Science',
      cloud: 'Cloud & DevOps'
    };

    const countLabel = $('#mentors-count-label');
    if (countLabel) {
      countLabel.innerHTML = `Showing <b>${filtered.length}</b> available mentors in <b>${categoryNames[activeCategoryFilter] || 'All Specialists'}</b>`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 40px; text-align: center; color: #64748b;">
          <div style="font-size: 32px; margin-bottom: 10px;">🔍</div>
          <h3 style="color: #0f172a; margin-bottom: 6px;">No mentors found</h3>
          <p style="font-size: 13px; margin: 0 0 16px 0;">Try adjusting your search terms or selecting another specialization category.</p>
          <button class="st-btn" onclick="resetMentorFilters()">View All Mentors</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(m => `
      <article class="mentor-profile-card">
        <div class="mentor-banner-top">
          ${m.featured ? '<span class="mentor-badge-featured">★ Featured</span>' : ''}
          <button type="button" class="mentor-fav-btn" onclick="toggleMentorBookmark('${m.id}', this)" title="Save Mentor">+</button>
          <div class="mentor-avatar-badge">${m.initials}</div>
        </div>
        <div style="padding-top: 4px;">
          <h3 class="mentor-name">${m.name}</h3>
          <p class="mentor-role">${m.role}</p>
          <div class="mentor-stats-bar">
            <div>
              <strong>${m.rating} ★</strong>
              <small>Rating</small>
            </div>
            <div>
              <strong>${m.rate}</strong>
              <small>/ Hour</small>
            </div>
            <div>
              <strong>${m.callsCount}</strong>
              <small>Calls</small>
            </div>
          </div>
          <div class="mentor-tags-row">
            ${m.tags.map(t => `<span class="mentor-tag">${t}</span>`).join('')}
          </div>
          <button type="button" class="mentor-book-btn" onclick="openMentorshipBookingModal('${m.id}')">
            <span>Book 1-on-1 Call</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </article>
    `).join('');
  }

  window.setMentorCategoryFilter = (cat, btn) => {
    activeCategoryFilter = cat;
    $$('.category-pill-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderMentors();
  };

  window.handleMentorSearch = query => {
    activeSearchQuery = query || '';
    renderMentors();
  };

  window.resetMentorFilters = () => {
    activeCategoryFilter = 'all';
    activeSearchQuery = '';
    const input = $('#mentor-hero-search-input');
    if (input) input.value = '';
    $$('.category-pill-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
    renderMentors();
  };

  window.toggleMentorBookmark = (mentorId, btn) => {
    const isBookmarked = btn.classList.toggle('bookmarked');
    btn.textContent = isBookmarked ? '✓' : '+';
    if (window.showToast) {
      window.showToast(isBookmarked ? 'Mentor saved to your favorites!' : 'Mentor removed from favorites.', 'info');
    }
  };

  // Scheduled Calls Management
  const CALLS_STORAGE_KEY = 'torpedo_mentorship_bookings';

  function getBookedCalls() {
    return readStorage(CALLS_STORAGE_KEY, []);
  }

  function renderUpcomingCalls() {
    const container = $('#upcoming-calls-render-area');
    const badge = $('#upcoming-calls-count-badge');
    const heroBooked = $('#stat-booked-calls-count');
    if (!container) return;

    const calls = getBookedCalls();
    const count = calls.length;

    if (badge) badge.textContent = count;
    if (heroBooked) heroBooked.textContent = count;

    if (count === 0) {
      container.innerHTML = `
        <div class="upcoming-empty-state">
          <div class="empty-calendar-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <strong>No Calls Booked</strong>
          <p>Book a 1-on-1 session with any mentor to get started.</p>
          <button type="button" class="st-btn" onclick="scrollToMentors()" style="width: 100%;">
            Book a Session
          </button>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 14px;">
          ${calls.map(c => `
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; position: relative;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                <span style="font-size: 11px; font-weight: 700; color: #1d4ed8; background: #dbeafe; padding: 2px 7px; border-radius: 6px;">VERIFIED 1-ON-1</span>
                <span style="font-size: 11px; color: #64748b;">${c.date}</span>
              </div>
              <h4 style="margin: 0 0 2px 0; font-size: 14px; color: #0f172a;">${c.mentorName}</h4>
              <p style="margin: 0 0 10px 0; font-size: 11.5px; color: #64748b;">${c.agenda} • ${c.timeSlot}</p>
              <div style="display: flex; gap: 8px;">
                <a href="${c.meetLink}" target="_blank" rel="noopener noreferrer" class="st-btn" style="flex: 1; padding: 7px 10px; font-size: 11px; text-decoration: none;">
                  <span>Join Meet</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                </a>
                <button type="button" class="st-btn secondary" style="padding: 7px 10px; font-size: 11px;" onclick="cancelBookedCall('${c.id}')" title="Cancel Booking">
                  Cancel
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
  }

  window.scrollToMentors = () => {
    const list = $('#mentors-list-grid');
    if (list) list.scrollIntoView({ behavior: 'smooth' });
  };

  let currentBookingMentor = null;

  window.openMentorshipBookingModal = mentorId => {
    const mentor = mentorsData.find(m => m.id === mentorId);
    if (!mentor) return;
    currentBookingMentor = mentor;

    const modal = $('#mentorship-booking-dialog');
    if (!modal) return;

    $('#booking-modal-mentor-name').textContent = mentor.name;
    $('#booking-modal-mentor-role').textContent = mentor.role;
    $('#booking-modal-mentor-rate').textContent = `${mentor.rate} / hour`;
    $('#booking-modal-initials').textContent = mentor.initials;

    // Reset date picker to today
    const today = new Date().toISOString().split('T')[0];
    const dateInput = $('#booking-input-date');
    if (dateInput) {
      dateInput.min = today;
      dateInput.value = today;
    }

    if (typeof modal.showModal === 'function') modal.showModal();
  };

  window.closeMentorshipBookingModal = () => {
    const modal = $('#mentorship-booking-dialog');
    if (modal && modal.open && typeof modal.close === 'function') modal.close();
  };

  window.confirmMentorshipBooking = event => {
    if (event) event.preventDefault();
    if (!currentBookingMentor) return;

    const dateVal = $('#booking-input-date')?.value || 'Today';
    const timeVal = $('#booking-input-time')?.value || '6:00 PM';
    const agendaVal = $('#booking-input-agenda')?.value || 'Mock Technical Interview';
    const notesVal = $('#booking-input-notes')?.value || '';

    const newBooking = {
      id: 'call-' + Date.now(),
      mentorId: currentBookingMentor.id,
      mentorName: currentBookingMentor.name,
      date: dateVal,
      timeSlot: timeVal,
      agenda: agendaVal,
      notes: notesVal,
      meetLink: 'https://meet.google.com/tpd-' + Math.random().toString(36).substring(2, 6) + '-' + Math.random().toString(36).substring(2, 6),
      bookedAt: new Date().toISOString()
    };

    const calls = getBookedCalls();
    calls.unshift(newBooking);
    writeStorage(CALLS_STORAGE_KEY, calls);

    // Award +50 XP
    try {
      const user = readStorage('torpedo_user', {});
      const key = 'torpedo_student_v2:' + (user.email || 'guest');
      const st = readStorage(key, { completed: [], tasks: [], activity: [] });
      if (Array.isArray(st.activity)) {
        st.activity.unshift({
          text: `Booked 1-on-1 mentorship call with ${currentBookingMentor.name}`,
          date: new Date().toISOString()
        });
        writeStorage(key, st);
      }
    } catch (e) {}

    closeMentorshipBookingModal();
    renderUpcomingCalls();

    if (window.showToast) {
      window.showToast(`🎉 Session booked with ${currentBookingMentor.name}! Google Meet link ready (+50 XP).`, 'success');
    }
  };

  window.cancelBookedCall = callId => {
    if (!confirm('Are you sure you want to cancel this mentorship booking? You can reschedule anytime for free.')) return;
    let calls = getBookedCalls();
    calls = calls.filter(c => c.id !== callId);
    writeStorage(CALLS_STORAGE_KEY, calls);
    renderUpcomingCalls();
    if (window.showToast) {
      window.showToast('Mentorship call reservation cancelled.', 'info');
    }
  };

  /* ==========================================================================
     2. REFERRALS HUB
     ========================================================================== */
  window.copyReferralLink = () => {
    const link = 'https://torpedo.learning/join?ref=TORPEDO-VIVEK-99';
    navigator.clipboard?.writeText(link).then(() => {
      if (window.showToast) window.showToast('Referral link copied to clipboard!', 'success');
    }).catch(() => {
      prompt('Copy your referral link:', link);
    });
  };

  window.copyReferralCode = () => {
    const code = 'TORPEDO-VIVEK-99';
    navigator.clipboard?.writeText(code).then(() => {
      if (window.showToast) window.showToast('Referral code copied to clipboard!', 'success');
    }).catch(() => {
      prompt('Copy your referral code:', code);
    });
  };

  window.shareReferralWhatsApp = () => {
    const text = encodeURIComponent('Join me on Torpedo Learning to prepare for top engineering roles! Use my invite link to get ₹500 credits: https://torpedo.learning/join?ref=TORPEDO-VIVEK-99');
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  window.shareReferralLinkedIn = () => {
    const url = encodeURIComponent('https://torpedo.learning/join?ref=TORPEDO-VIVEK-99');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  window.handleSendEmailInvite = event => {
    if (event) event.preventDefault();
    const input = $('#referral-invite-email');
    if (!input || !input.value) return;
    const email = input.value.trim();
    const subject = encodeURIComponent('Join me on Torpedo Learning');
    const body = encodeURIComponent('Here is my Torpedo Learning invite link: https://torpedo.learning/join?ref=TORPEDO-VIVEK-99');
    window.location.href = `mailto:${encodeURIComponent(email)}?subject=${subject}&body=${body}`;
  };

  window.claimReferralReward = (friendName, btn) => {
    if (btn) {
      btn.textContent = 'Claimed ✓';
      btn.disabled = true;
      btn.style.opacity = '0.6';
    }
    if (window.showToast) {
      window.showToast(`₹500 tuition credit from ${friendName}'s referral added to your balance!`, 'success');
    }
  };

  /* ==========================================================================
     3. TORPEDO AWARDS & HONORS
     ========================================================================== */
  const awardsData = [
    {
      id: 'award-1',
      icon: '⚡',
      title: 'Momentum Maker',
      desc: 'Maintained a 7-day continuous learning streak',
      category: 'academic',
      xp: '+150 XP',
      unlocked: true,
      earnedDate: 'Earned 3 days ago'
    },
    {
      id: 'award-2',
      icon: '⌘',
      title: 'Code Champion',
      desc: 'Solved 25+ Algorithmic Arena problems in Lifecode',
      category: 'coding',
      xp: '+300 XP',
      unlocked: true,
      earnedDate: 'Earned last week'
    },
    {
      id: 'award-3',
      icon: '✦',
      title: 'Alpha Graduate',
      desc: 'Completed first full accredited master track',
      category: 'academic',
      xp: '+500 XP',
      unlocked: true,
      earnedDate: 'Earned Oct 28'
    },
    {
      id: 'award-4',
      icon: '🛡️',
      title: 'Bug Slayer',
      desc: '0 runtime exceptions across 5 consecutive submissions',
      category: 'coding',
      xp: '+200 XP',
      unlocked: true,
      earnedDate: 'Earned 2 weeks ago'
    },
    {
      id: 'award-5',
      icon: '🤝',
      title: 'Mentor Minded',
      desc: 'Completed first verified 1-on-1 expert consultation',
      category: 'community',
      xp: '+150 XP',
      unlocked: true,
      earnedDate: 'Earned Nov 01'
    },
    {
      id: 'award-6',
      icon: '🚀',
      title: 'Hackathon Finalist',
      desc: 'Ranked in the top 10 in National Engineering Sprint',
      category: 'career',
      xp: '+450 XP',
      unlocked: true,
      earnedDate: 'Earned Oct 15'
    },
    {
      id: 'award-7',
      icon: '🌐',
      title: 'Full-Stack Architect',
      desc: 'Deployed 3 end-to-end full stack cloud services',
      category: 'coding',
      xp: '+350 XP',
      unlocked: true,
      earnedDate: 'Earned Sep 20'
    },
    {
      id: 'award-8',
      icon: '🎯',
      title: 'Placement Ready',
      desc: 'Passed all faculty benchmark mock assessments',
      category: 'career',
      xp: '+400 XP',
      unlocked: true,
      earnedDate: 'Earned Sep 10'
    },
    {
      id: 'award-9',
      icon: '👑',
      title: 'Campus Leader',
      desc: 'Reach Top 1% national rank on student leaderboard',
      category: 'community',
      xp: '+800 XP',
      unlocked: false,
      progress: '84% Completed'
    },
    {
      id: 'award-10',
      icon: '💎',
      title: 'Diamond Scholar',
      desc: 'Accumulate 1,000+ total lifetime learning XP',
      category: 'academic',
      xp: '+500 XP',
      unlocked: false,
      progress: '320 / 1,000 XP'
    },
    {
      id: 'award-11',
      icon: '⚙️',
      title: 'Architecture Maestro',
      desc: 'Complete all Distributed Systems & Microservices modules',
      category: 'academic',
      xp: '+600 XP',
      unlocked: false,
      progress: '60% Completed'
    },
    {
      id: 'award-12',
      icon: '🧠',
      title: 'AI Pioneer',
      desc: 'Design and evaluate a multi-agent LLM pipeline',
      category: 'coding',
      xp: '+750 XP',
      unlocked: false,
      progress: '45% Completed'
    }
  ];

  let activeAwardFilter = 'all';

  function renderAwardsCabinet() {
    const grid = $('#awards-cabinet-grid');
    if (!grid) return;

    const filtered = awardsData.filter(a => activeAwardFilter === 'all' || a.category === activeAwardFilter);

    grid.innerHTML = filtered.map(a => `
      <article class="award-badge-card ${a.unlocked ? 'unlocked' : 'locked'}">
        <div class="award-badge-icon">${a.icon}</div>
        <div class="award-badge-xp">${a.xp}</div>
        <h4 class="award-badge-title">${a.title}</h4>
        <p class="award-badge-desc">${a.desc}</p>
        <div class="award-badge-status">
          ${a.unlocked 
            ? `<span class="badge-unlocked-tag">✓ ${a.earnedDate}</span>` 
            : `<span class="badge-locked-tag">🔒 ${a.progress}</span>`}
        </div>
      </article>
    `).join('');
  }

  window.setAwardCategoryFilter = (cat, btn) => {
    activeAwardFilter = cat;
    $$('.award-filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderAwardsCabinet();
  };

  window.openVerifiedCertificateModal = () => {
    const modal = $('#awards-certificate-dialog');
    if (modal && typeof modal.showModal === 'function') modal.showModal();
  };

  window.closeVerifiedCertificateModal = () => {
    const modal = $('#awards-certificate-dialog');
    if (modal && modal.open && typeof modal.close === 'function') modal.close();
  };

  window.printCertificate = () => {
    window.print();
  };

  /* ==========================================================================
     4. BLOG INSIGHTS
     ========================================================================== */
  const articlesData = [
    {
      id: 'article-1',
      featured: true,
      category: 'career',
      readTime: '8 MIN READ',
      title: 'How Strong Engineers Design Their Learning Loop Without Burning Out',
      summary: 'A practical, structured system for turning technical curiosity into consistent daily engineering velocity while keeping mental clarity.',
      author: 'Dr. Evelyn Martinez',
      authorRole: 'Web Engineering Faculty Lead',
      date: 'Nov 04, 2026',
      content: `
        <h3>1. The Trap of Passive Consumption</h3>
        <p>Most junior engineers spend hours watching video tutorials without writing a single line of real code. This creates an illusion of competence that vanishes the moment you face an empty IDE or a production bug.</p>
        <p>To break this cycle, invert the ratio: for every 20 minutes of conceptual reading, spend 40 minutes actively building, breaking, and refactoring.</p>

        <h3>2. Build Small, Tight Feedback Loops</h3>
        <p>When studying distributed systems, don't just read about eventual consistency—write a small key-value store with an intentional replication lag. Observe what happens when a node fails.</p>

        <h3>3. The Two-Sentence Journal</h3>
        <p>At the end of every study session, write down two things: what surprised you today, and what question you want answered tomorrow. This primes your brain for associative learning overnight.</p>
      `
    },
    {
      id: 'article-2',
      featured: false,
      category: 'career',
      readTime: '10 MIN READ',
      title: 'Cracking Tier-1 SDE Placements: The System Design & DSA Blueprint',
      summary: 'The battle-tested playbook for clearing rounds at Stripe, Google, and Amazon: from edge-case discovery to clean modular code.',
      author: 'Manas Sharma',
      authorRole: 'Torpedo Systems Faculty',
      date: 'Nov 02, 2026',
      content: `
        <h3>System Design Fundamentals for Campus Hiring</h3>
        <p>Interviewers rarely expect a fresher to design global CDN caches from scratch. What they evaluate is structured communication, clarifying ambiguities upfront, and understanding space-time trade-offs.</p>
        <p>Always start by establishing functional and non-functional constraints before diving into database schemas.</p>
      `
    },
    {
      id: 'article-3',
      featured: false,
      category: 'frontend',
      readTime: '6 MIN READ',
      title: 'Understanding JavaScript Event Loop, Microtasks & Web Workers Deeply',
      summary: 'Demystifying the call stack, task queues, and render steps to guarantee zero jank and fluid 60fps animations.',
      author: 'Vivek Yadav',
      authorRole: 'Student Lead & Contributor',
      date: 'Oct 29, 2026',
      content: `
        <h3>The Microtask Queue Priority</h3>
        <p>Promises and MutationObservers run immediately after the current script executes, before any macrotasks (such as setTimeout or setInterval) are picked up.</p>
        <p>Offload heavy cryptographic or array-processing tasks to Web Workers to ensure the main UI thread never drops a frame.</p>
      `
    },
    {
      id: 'article-4',
      featured: false,
      category: 'cloud',
      readTime: '9 MIN READ',
      title: 'From Zero to Kubernetes: Demystifying Pods, Services & Ingress',
      summary: 'A clean mental model of container orchestration for engineering students building modern multi-tier web backends.',
      author: 'Rohan Deshmukh',
      authorRole: 'Staff Cloud Architect',
      date: 'Oct 24, 2026',
      content: `
        <h3>Why Containers Are Not Virtual Machines</h3>
        <p>Containers share the host kernel while providing isolated process namespaces and cgroups. Kubernetes schedules these containers across nodes with automatic self-healing.</p>
      `
    },
    {
      id: 'article-5',
      featured: false,
      category: 'ai',
      readTime: '11 MIN READ',
      title: 'Building Production AI Agents with Tool Calling and Structured Output',
      summary: 'Architecting resilient autonomous agents that reliably call external REST APIs, recover from errors, and maintain state.',
      author: 'Priya Nair',
      authorRole: 'Senior ML Engineer',
      date: 'Oct 18, 2026',
      content: `
        <h3>Deterministic Parsing from Stochastic Models</h3>
        <p>Learn how JSON schema enforcement and validator loops prevent hallucinations from breaking client-side UI states.</p>
      `
    },
    {
      id: 'article-6',
      featured: false,
      category: 'design',
      readTime: '7 MIN READ',
      title: 'Design Systems for Developers: Tokens, Typography & Accessibility',
      summary: 'How to structure color palettes, spacing ramps, and accessible ARIA attributes so your apps look world-class effortlessly.',
      author: 'Ananya Sen',
      authorRole: 'Principal Product Designer',
      date: 'Oct 12, 2026',
      content: `
        <h3>The Power of Semantic Tokens</h3>
        <p>Never hardcode hex values. Using abstract semantic design tokens makes dark mode, responsive scaling, and white-labeling trivial.</p>
      `
    }
  ];

  let activeBlogFilter = 'all';
  let activeBlogSearch = '';

  function articleBookmarkKey() {
    const email = readStorage('torpedo_user', {})?.email || 'guest';
    return `torpedo_saved_articles:${String(email).toLowerCase()}`;
  }

  function savedArticles() {
    const saved = readStorage(articleBookmarkKey(), []);
    return new Set(Array.isArray(saved) ? saved : []);
  }

  window.toggleArticleBookmark = id => {
    if (!articlesData.some(article => article.id === id)) return;
    const saved = savedArticles();
    if (saved.has(id)) saved.delete(id);
    else saved.add(id);
    if (!writeStorage(articleBookmarkKey(), [...saved])) {
      window.showToast?.('This browser could not update your saved articles.', 'error');
      return;
    }
    renderArticles();
    (document.querySelector(`[data-article-bookmark="${id}"]`) || $('.blog-filter-btn.active'))?.focus();
  };

  function renderArticles() {
    const grid = $('#articles-list-grid');
    if (!grid) return;

    const saved = savedArticles();
    const filtered = articlesData.filter(a => {
      const matchCat = activeBlogFilter === 'saved'
        ? saved.has(a.id)
        : activeBlogFilter === 'all' || a.category === activeBlogFilter;
      const q = activeBlogSearch.trim().toLowerCase();
      const matchSearch = !q || a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q) || a.author.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

    const status = $('#tr-articles-status');
    if (status) status.textContent = `${filtered.length} article${filtered.length === 1 ? '' : 's'} · ${saved.size} saved on this device`;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 40px; text-align: center; color: #64748b;">
          <h3 style="color: #0f172a; margin-bottom: 6px;">No articles found</h3>
          <p style="font-size: 13px; margin: 0 0 16px 0;">${activeBlogFilter === 'saved' && !saved.size ? 'Save an article to build your reading list.' : 'Try another search or browse all articles.'}</p>
          <button class="st-btn" onclick="resetBlogFilters()">View All Articles</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(a => `
      <article class="blog-article-card ${a.featured ? 'featured' : ''}">
        <div class="article-card-header">
          <span class="article-cat-tag">${a.category.toUpperCase()}</span>
          <span class="article-readtime">${a.readTime}</span>
          <button type="button" class="tr-bookmark" data-article-bookmark="${a.id}" aria-label="Save ${escapeHtml(a.title)}" aria-pressed="${saved.has(a.id)}" onclick="toggleArticleBookmark('${a.id}')">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 4h12v16l-6-4-6 4z"/></svg>
          </button>
        </div>
        <h3 class="article-card-title">${a.title}</h3>
        <p class="article-card-summary">${a.summary}</p>
        <div class="article-card-footer">
          <div class="article-author-info">
            <strong>${a.author}</strong>
            <small>${a.authorRole} • ${a.date}</small>
          </div>
          <button type="button" class="article-read-btn" onclick="openBlogArticleModal('${a.id}')">
            <span>Read →</span>
          </button>
        </div>
      </article>
    `).join('');
  }

  window.setBlogCategoryFilter = (cat, btn) => {
    activeBlogFilter = cat;
    $$('.blog-filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderArticles();
  };

  window.handleBlogSearch = query => {
    activeBlogSearch = query || '';
    renderArticles();
  };

  window.resetBlogFilters = () => {
    activeBlogFilter = 'all';
    activeBlogSearch = '';
    const input = $('#blog-search-input');
    if (input) input.value = '';
    $$('.blog-filter-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
    renderArticles();
  };

  window.openBlogArticleModal = articleId => {
    const article = articlesData.find(a => a.id === articleId);
    if (!article) return;

    const modal = $('#blog-reader-dialog');
    if (!modal) return;

    $('#reader-modal-title').textContent = article.title;
    $('#reader-modal-meta').textContent = `${article.author} (${article.authorRole}) • ${article.readTime} • ${article.date}`;
    $('#reader-modal-content').innerHTML = article.content;

    if (typeof modal.showModal === 'function') modal.showModal();
  };

  window.closeBlogArticleModal = () => {
    const modal = $('#blog-reader-dialog');
    if (modal && modal.open && typeof modal.close === 'function') modal.close();
  };

  /* ==========================================================================
     5. HELP & SUPPORT
     ========================================================================== */
  const faqsData = [
    {
      q: 'How do I claim my verified course completion certificate?',
      a: 'Once you complete 100% of all lessons, quizzes, and project checkpoints in an accredited curriculum, your certificate unlocks automatically in the "Certifications" tab. You can download it as a high-resolution PDF or verify it via our cryptographic credential checker.'
    },
    {
      q: 'How does 1-on-1 mentorship scheduling work with Google Meet?',
      a: 'When you confirm a booking with any faculty mentor, our scheduling engine reserves the slot on the mentor\'s calendar and instantly creates a private, verified Google Meet room. You will find the join link directly inside your "Upcoming Calls" panel.'
    },
    {
      q: 'What happens if my code encounters Time Limit Exceeded (TLE) in Lifecode?',
      a: 'TLE indicates your solution exceeded the execution sandbox threshold (typically 2.0 seconds). Check your algorithmic time complexity—replace nested loops (O(N²)) with hash maps (O(N)) or binary search patterns.'
    },
    {
      q: 'How are referral credits applied towards mentorship or courses?',
      a: 'Referral credits earned through your personal invite link accumulate in your student wallet. You can apply them at checkout to cover 1-on-1 mentorship calls, mock interview prep kits, or advanced track certifications.'
    },
    {
      q: 'Can I reschedule or cancel a booked mentorship call?',
      a: 'Yes! You can reschedule or cancel any booked consultation up to 4 hours prior to the call with zero penalty. Simply click "Cancel" or "Reschedule" on your upcoming calls card.'
    }
  ];

  function renderFaqs(searchQuery = '') {
    const container = $('#faq-accordion-container');
    if (!container) return;

    const q = searchQuery.trim().toLowerCase();
    const filtered = faqsData.filter(f => !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));

    if (filtered.length === 0) {
      container.innerHTML = '<p style="color: #64748b; font-size: 13px; padding: 12px 0;">No matching FAQs found. Try a different search or save a ticket below.</p>';
      return;
    }

    container.innerHTML = filtered.map((f, i) => `
      <div class="faq-item" id="faq-item-${i}">
        <button type="button" class="faq-question-btn" aria-expanded="false" aria-controls="faq-answer-${i}" onclick="toggleFaqAccordion(${i})">
          <span>${f.q}</span>
          <svg class="faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer-body" id="faq-answer-${i}" hidden>
          <p>${f.a}</p>
        </div>
      </div>
    `).join('');
  }

  window.toggleFaqAccordion = index => {
    const item = $(`#faq-item-${index}`);
    if (!item) return;
    const open = item.classList.toggle('open');
    item.querySelector('button').setAttribute('aria-expanded', String(open));
    item.querySelector('.faq-answer-body').hidden = !open;
  };

  window.handleFaqSearch = query => {
    renderFaqs(query);
  };

  const TICKETS_STORAGE_KEY = 'torpedo_support_tickets';

  function getTickets() {
    return readStorage(TICKETS_STORAGE_KEY, [
      {
        id: 'TPD-8120',
        category: 'Academic Track',
        subject: 'Course certification credential badge issue',
        status: 'Resolved',
        date: '3 days ago'
      }
    ]);
  }

  function renderTickets() {
    const list = $('#support-tickets-history-list');
    if (!list) return;

    const tickets = getTickets();
    list.innerHTML = tickets.map(t => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; margin-bottom: 8px;">
        <div>
          <strong style="display: block; font-size: 13px; color: #0f172a;">${escapeHtml(t.subject)}</strong>
          <small style="color: #64748b; font-size: 11px;">#${escapeHtml(t.id)} • ${escapeHtml(t.category)} • ${escapeHtml(t.date)}</small>
        </div>
        <span style="font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px; ${t.status === 'Resolved' ? 'background: #ecfdf5; color: #059669;' : 'background: #eff6ff; color: #1d4ed8;'}">
          ${escapeHtml(t.status)}
        </span>
      </div>
    `).join('');
  }

  window.openSupportTicketModal = () => {
    const modal = $('#support-ticket-dialog');
    if (modal && typeof modal.showModal === 'function') modal.showModal();
  };

  window.closeSupportTicketModal = () => {
    const modal = $('#support-ticket-dialog');
    if (modal && modal.open && typeof modal.close === 'function') modal.close();
  };

  window.submitSupportTicket = event => {
    if (event) event.preventDefault();
    const cat = $('#ticket-input-category')?.value || 'General Inquiry';
    const sub = $('#ticket-input-subject')?.value || 'Support Request';
    const desc = $('#ticket-input-desc')?.value || '';

    const newTicket = {
      id: 'TPD-' + Math.floor(1000 + Math.random() * 9000),
      category: cat,
      subject: sub,
      desc: desc,
      status: 'Saved locally',
      date: 'Just now'
    };

    const tickets = getTickets();
    tickets.unshift(newTicket);
    if (!writeStorage(TICKETS_STORAGE_KEY, tickets)) {
      window.showToast?.('This browser could not save the ticket.', 'error');
      return;
    }

    event?.target.reset();
    closeSupportTicketModal();
    renderTickets();

    if (window.showToast) {
      window.showToast(`Ticket #${newTicket.id} saved on this device.`, 'success');
    }
  };

  /* ==========================================================================
     6. COLLABORATIVE WORKSPACES & COHORTS (3RD RAIL PORTION)
     ========================================================================== */
  const defaultWorkspaces = [
    {
      id: 'ws-gtu2026',
      name: 'GTU CSE Cohort 2026 (Official)',
      category: 'cohort',
      typeLabel: 'Institutional',
      code: 'STU-GTU2026',
      desc: 'Official institutional cohort workspace for Gujarat Technological University CSE Batch 2026. Microservices & Distributed Systems sprint.',
      membersCount: 142,
      onlineCount: 38,
      stack: ['React 19', 'TypeScript', 'PostgreSQL', 'Docker'],
      repo: 'github.com/gtu-torpedo/cohort-2026-cse',
      sandboxStatus: 'Ready',
      activeSprint: 'Milestone 4: Caching & Message Queues'
    },
    {
      id: 'ws-hacknitro',
      name: 'HackNitro FinTech Squad Alpha',
      category: 'hackathons',
      typeLabel: 'Hackathon Squad',
      code: 'HACK-ALPH26',
      desc: 'National Web3 & FinTech sprint repository. Building decentralized credit scoring oracle on Polygon L2 with ZK proofs.',
      membersCount: 4,
      onlineCount: 4,
      stack: ['Next.js 15', 'Solidity', 'Polygon L2', 'Tailwind'],
      repo: 'github.com/torpedo-squads/hacknitro-fintech',
      sandboxStatus: 'Running',
      activeSprint: 'Demo Submission due in 3 days'
    },
    {
      id: 'ws-oss-lab',
      name: 'Torpedo Open-Source Systems Lab',
      category: 'lab',
      typeLabel: 'Research Lab',
      code: 'LAB-SYS88',
      desc: 'Kernel, WebAssembly runtimes, and distributed cache engine exploration. Open to all students with >25 solved Lifecode problems.',
      membersCount: 28,
      onlineCount: 9,
      stack: ['Rust', 'WebAssembly', 'Go', 'eBPF'],
      repo: 'github.com/torpedo-lms/oss-systems-lab',
      sandboxStatus: 'Idle',
      activeSprint: 'Wasm V8 Sandbox JIT Benchmark'
    },
    {
      id: 'ws-sde-prep',
      name: 'FAANG SDE Placement Sprint',
      category: 'cohort',
      typeLabel: 'Interview Prep',
      code: 'SDE-TIER1',
      desc: 'Daily LeetCode hard and system design mock rounds with peer code reviews and recruiter direct referrals.',
      membersCount: 64,
      onlineCount: 19,
      stack: ['Algorithms', 'System Design', 'C++', 'Python'],
      repo: 'github.com/torpedo-sde/daily-hard-solutions',
      sandboxStatus: 'Ready',
      activeSprint: 'Dynamic Programming & Graph Hard'
    }
  ];

  const defaultCohortMessages = [
    {
      id: 'cm-1',
      author: 'Priya Nair (AI Track)',
      time: '12m ago',
      text: 'Has anyone completed the gRPC service mesh challenge in lesson 14? Wondering if Envoy ingress config is needed.'
    },
    {
      id: 'cm-2',
      author: 'Arjun Mehta (DevOps)',
      time: '9m ago',
      text: 'Yes! Configure the Envoy proxy ingress route and all 4 test assertions pass. Check the Lifecode sandbox notes.'
    },
    {
      id: 'cm-3',
      author: 'Dr. Evelyn Martinez (Faculty)',
      time: '5m ago',
      text: 'Office hours are live today at 4:00 PM for the Polygon L2 smart contracts sprint. Join from the 1-on-1 Mentorship room.'
    }
  ];

  const WORKSPACES_STORAGE_KEY = 'torpedo_student_workspaces';
  const COHORT_STREAM_STORAGE_KEY = 'torpedo_cohort_stream_messages';

  const getWorkspaces = () => readStorage(WORKSPACES_STORAGE_KEY, defaultWorkspaces);
  const getCohortMessages = () => readStorage(COHORT_STREAM_STORAGE_KEY, defaultCohortMessages);

  let currentWsFilter = 'all';
  let currentWsSearch = '';

  const renderWorkspaces = () => {
    const container = $('#workspaces-grid-items');
    if (!container) return;

    let items = getWorkspaces();
    if (currentWsFilter !== 'all') {
      items = items.filter(w => w.category === currentWsFilter);
    }
    if (currentWsSearch) {
      const q = currentWsSearch.toLowerCase();
      items = items.filter(w => 
        w.name.toLowerCase().includes(q) ||
        w.code.toLowerCase().includes(q) ||
        w.desc.toLowerCase().includes(q) ||
        w.stack.some(s => s.toLowerCase().includes(q))
      );
    }

    const badgeClass = cat => {
      if (cat === 'cohort') return 'institutional';
      if (cat === 'hackathons') return 'hackathon';
      return 'lab';
    };

    container.innerHTML = `
      ${items.map(ws => `
        <div class="workspace-card">
          <div>
            <div class="workspace-card-head">
              <span class="workspace-type-badge ${badgeClass(ws.category)}">${ws.typeLabel}</span>
              <span class="workspace-code-chip" onclick="copyWorkspaceCode('${ws.code}')" title="Click to copy access code">
                🔑 ${ws.code} 📋
              </span>
            </div>

            <h3 class="workspace-title">
              ${ws.name}
              <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#10b981; margin-left:4px;" title="${ws.onlineCount} peers online"></span>
            </h3>
            <p class="workspace-desc">${ws.desc}</p>

            <div class="workspace-meta-row">
              <span style="font-size: 11.5px; color: #475569; font-weight: 600;">
                👥 ${ws.membersCount} Members (${ws.onlineCount} Online)
              </span>
              <span style="font-size: 11px; color: #64748b;">•</span>
              <span style="font-size: 11.5px; color: #1d4ed8; font-weight: 600;">
                ⚡ ${ws.activeSprint}
              </span>
            </div>

            <div class="workspace-tags">
              ${ws.stack.map(st => `<span class="workspace-tag">${st}</span>`).join('')}
            </div>
          </div>

          <div class="workspace-actions-row">
            <button type="button" class="st-btn" onclick="launchWorkspaceSandbox('${ws.id}')" style="padding: 8px 14px; font-size: 12px; font-weight: 700;">
              Launch Cloud IDE ↗
            </button>
            <button type="button" class="st-btn secondary" onclick="openWorkspaceRepo('${ws.repo}')" style="padding: 8px 12px; font-size: 12px;">
              Git Repo ↗
            </button>
            <button type="button" class="st-btn secondary" onclick="scrollToCohortRoom()" style="padding: 8px 10px; font-size: 12px;" title="Chat with squad">
              💬
            </button>
          </div>
        </div>
      `).join('')}

      <!-- Join another squad card -->
      <div class="workspace-join-card" onclick="openJoinWorkspaceModal()">
        <div style="width: 48px; height: 48px; border-radius: 12px; background: #eff6ff; color: #1d4ed8; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 12px;">
          +
        </div>
        <h4 style="margin: 0 0 4px 0; font-size: 15px; color: #0f172a;">Join Institutional Squad</h4>
        <p class="st-muted" style="margin: 0 0 14px 0; font-size: 12px; max-width: 260px;">Have an institutional or hackathon squad access code? Connect in 1 click.</p>
        <span class="st-btn secondary" style="padding: 8px 16px; font-size: 12px;">Enter Access Code &rarr;</span>
      </div>
    `;

    const countBadge = $('#stats-workspaces-count');
    if (countBadge) countBadge.textContent = String(getWorkspaces().length).padStart(2, '0');
  };

  window.setWorkspacesCategoryFilter = (category, btn) => {
    currentWsFilter = category;
    $$('.community-category-bar .category-pill').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderWorkspaces();
  };

  window.handleWorkspacesSearch = query => {
    currentWsSearch = String(query || '').trim();
    renderWorkspaces();
  };

  window.copyWorkspaceCode = code => {
    if (navigator.clipboard) navigator.clipboard.writeText(code);
    if (window.showToast) window.showToast(`Access code "${code}" copied to clipboard!`, 'info');
  };

  window.launchWorkspaceSandbox = wsId => {
    if (window.switchPortalTab) window.switchPortalTab('lifecode');
    if (window.showToast) window.showToast(`Connected to cloud container environment for ${wsId}.`, 'success');
  };

  window.openWorkspaceRepo = repoUrl => {
    window.open(`https://${repoUrl}`, '_blank');
    if (window.showToast) window.showToast(`Opening repository ${repoUrl}...`, 'info');
  };

  window.openCreateWorkspaceModal = () => {
    const dialog = $('#create-workspace-dialog');
    if (dialog && typeof dialog.showModal === 'function') dialog.showModal();
  };

  window.closeCreateWorkspaceModal = () => {
    const dialog = $('#create-workspace-dialog');
    if (dialog && dialog.open && typeof dialog.close === 'function') dialog.close();
  };

  window.handleCreateWorkspaceSubmit = event => {
    if (event) event.preventDefault();
    const name = $('#new-ws-name')?.value || 'New Squad';
    const cat = $('#new-ws-category')?.value || 'hackathons';
    const stackStr = $('#new-ws-stack')?.value || 'TypeScript, React';
    const desc = $('#new-ws-desc')?.value || '';

    const code = (name.slice(0, 4).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000));
    const newWs = {
      id: 'ws-' + Date.now(),
      name: name,
      category: cat,
      typeLabel: cat === 'hackathons' ? 'Hackathon Squad' : cat === 'cohort' ? 'Study Cohort' : 'Research Lab',
      code: code,
      desc: desc,
      membersCount: 1,
      onlineCount: 1,
      stack: stackStr.split(',').map(s => s.trim()).filter(Boolean),
      repo: `github.com/torpedo-squads/${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      sandboxStatus: 'Ready',
      activeSprint: 'Initial Sprint Planning'
    };

    const list = getWorkspaces();
    list.unshift(newWs);
    writeStorage(WORKSPACES_STORAGE_KEY, list);

    closeCreateWorkspaceModal();
    renderWorkspaces();

    if (window.showToast) {
      window.showToast(`🎉 Workspace "${name}" created! Access Code: ${code}`, 'success');
    }
  };

  const renderCohortFeed = () => {
    const feed = $('#cohort-stream-feed');
    if (!feed) return;

    const msgs = getCohortMessages();
    feed.innerHTML = msgs.map(m => `
      <div class="cohort-msg-bubble">
        <div class="cohort-msg-head">
          <span class="cohort-msg-author">${m.author}</span>
          <span class="cohort-msg-time">${m.time}</span>
        </div>
        <p class="cohort-msg-text">${m.text}</p>
      </div>
    `).join('');
  };

  window.handleSendCohortStreamMessage = event => {
    if (event) event.preventDefault();
    const input = $('#cohort-stream-input');
    const text = input ? input.value.trim() : '';
    if (!text) return;

    const msgs = getCohortMessages();
    msgs.unshift({
      id: 'cm-' + Date.now(),
      author: 'Vivek Yadav (You)',
      time: 'Just now',
      text: text
    });
    writeStorage(COHORT_STREAM_STORAGE_KEY, msgs);

    if (input) input.value = '';
    renderCohortFeed();

    if (window.showToast) {
      window.showToast('Message posted to Cohort Stream!', 'info');
    }
  };

  window.scrollToCohortRoom = () => {
    const el = document.getElementById('cohort-discussion-panel');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  /* ==========================================================================
     INITIALIZATION ON DOMContentLoaded
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    renderMentors();
    renderUpcomingCalls();
    renderAwardsCabinet();
    renderArticles();
    renderFaqs();
    renderTickets();
    renderWorkspaces();
    renderCohortFeed();
  });

})();

