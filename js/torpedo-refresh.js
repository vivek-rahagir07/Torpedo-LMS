(() => {
  const menu = document.querySelector('.tr-mobile-menu');
  if (menu) {
    const nav = document.getElementById(menu.getAttribute('aria-controls'));
    const setOpen = open => {
      nav.classList.toggle('tr-open', open);
      menu.setAttribute('aria-expanded', String(open));
    };
    menu.addEventListener('click', () => setOpen(menu.getAttribute('aria-expanded') === 'false'));
    document.addEventListener('click', event => {
      if (nav.contains(event.target) && !event.target.closest('a')) return;
      if (!menu.contains(event.target)) setOpen(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        menu.focus();
      }
    });
  }

  const trigger = document.querySelector('.tr-jump-trigger');
  if (!trigger) return;

  const destinations = [
    ['home', 'Dashboard', 'Learning overview'],
    ['planner', 'Study planner', 'Tasks and dates'],
    ['courses', 'Courses', 'Catalog and learning paths'],
    ['library', 'Library', 'Books and resources'],
    ['certifications', 'Certifications', 'Credentials'],
    ['lifecode', 'Lifecode', 'Coding practice and IDE'],
    ['quizzes', 'Mock quizzes', 'Practice tests'],
    ['jobs', 'Jobs and internships', 'Career opportunities'],
    ['hackathons', 'Hackathons', 'Events and teams'],
    ['mentorships', 'Mentorship', 'Expert guidance'],
    ['referrals', 'Referrals', 'Community opportunities'],
    ['awards', 'Awards', 'Achievements'],
    ['insights', 'Insights', 'Articles and ideas'],
    ['support', 'Support', 'Help centre'],
    ['workspaces', 'Workspaces', 'Cohorts and labs'],
    ['profile', 'My dossier', 'Profile and academic records']
  ];

  const dialog = document.createElement('dialog');
  dialog.className = 'tr-jump-dialog';
  dialog.id = 'tr-jump-dialog';
  dialog.setAttribute('aria-labelledby', 'tr-jump-title');
  dialog.innerHTML = `
    <div class="tr-jump-heading">
      <h2 id="tr-jump-title">Jump to a workspace</h2>
      <form method="dialog"><button class="tr-jump-trigger">Close</button></form>
    </div>
    <input type="search" aria-label="Filter workspaces" placeholder="Try courses, quizzes or internships" autofocus>
    <p role="status"></p>
    <div class="tr-jump-list"></div>`;
  document.body.append(dialog);
  trigger.setAttribute('aria-controls', dialog.id);

  const search = dialog.querySelector('input');
  const list = dialog.querySelector('.tr-jump-list');
  const status = dialog.querySelector('[role="status"]');

  function render() {
    const query = search.value.trim().toLowerCase();
    const matches = destinations.filter(([, label, detail]) =>
      `${label} ${detail}`.toLowerCase().includes(query));
    list.replaceChildren(...matches.map(([tab, label, detail]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'tr-jump-result';
      button.dataset.tab = tab;
      const name = document.createElement('span');
      name.textContent = label;
      const description = document.createElement('small');
      description.textContent = detail;
      button.append(name, description);
      return button;
    }));
    status.textContent = matches.length ? `${matches.length} destinations` : 'No destinations match your search.';
  }

  trigger.addEventListener('click', () => {
    search.value = '';
    render();
    dialog.showModal();
  });
  search.addEventListener('input', render);
  list.addEventListener('click', event => {
    const result = event.target.closest('[data-tab]');
    if (!result) return;
    const tab = result.dataset.tab;
    dialog.close();
    switchPortalTab(tab);
    const pane = document.getElementById(`tab-view-${tab}`);
    if (pane) {
      pane.tabIndex = -1;
      pane.focus({ preventScroll: true });
    }
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'Enter' && event.target === search) {
      event.preventDefault();
      list.firstElementChild?.click();
      return;
    }
    if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
    const options = [...list.children];
    if (!options.length || (event.target !== search && !list.contains(event.target))) return;
    event.preventDefault();
    const current = options.indexOf(event.target);
    const next = event.key === 'ArrowDown' ? current + 1 : current < 0 ? options.length - 1 : current - 1;
    (options[next] || search).focus();
  });
})();
