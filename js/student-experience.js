/* Student workspace enhancements. Local progress is explicitly device-local. */
(() => {
'use strict';
const $ = s => document.querySelector(s);
const esc = v => String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const read = (k,f) => {try {return JSON.parse(localStorage.getItem(k)) ?? f;} catch{return f;}};
const user = read('torpedo_user',{});
const key = 'torpedo_student_v2:' + (user.email || 'guest');
let state = Object.assign({completed:[],notes:{},tasks:[],goal:5,activity:[],seen:false},read(key,{}));
for(const k of ['completed','tasks','activity']) if(!Array.isArray(state[k])) state[k]=[];
if(!state.notes || typeof state.notes!=='object')state.notes={};
state.goal = Math.max(1,Math.min(20,Number(state.goal)||5));
let activeCourse = 0, activeLesson = 0;
const tracks = [
 {title:'Modern Frontend Architecture',tag:'DEVELOPMENT',instructor:'React · Frontend engineering',art:'{ }',lessons:[['Think in components','A component owns one clear responsibility: displaying information or handling one interaction. Break a learning dashboard into a navigation shell, course list, and course card. Keep each component small enough that its inputs and output are easy to explain.','Sketch a CourseCard component. List three props it needs, and one piece of state it should not own.'],['State that stays predictable','State is information that changes over time. Derive values such as completion percentages from the source data rather than storing duplicate copies. When two components need the same state, move ownership to their closest shared parent.','Represent completed lesson IDs in an array. Write a function that calculates the course percentage without mutating the array.'],['Accessible interactions','Use buttons for actions and links for destinations. Every field needs a label. Keyboard users need visible focus and a logical tab order. A dialog must receive focus when opened and return focus when closed.','Navigate your interface using only Tab, Shift+Tab, Enter and Escape. Record one improvement.'],['Build your course dashboard','Combine clear component boundaries, predictable state and accessible controls. Include loading, empty, success and error states so learners always understand what happened.','Create a small course dashboard with two cards, a search field and a completed filter. Test it at a narrow mobile width.']]},
 {title:'Cloud & DevOps Foundations',tag:'CLOUD ENGINEERING',instructor:'Systems · Deployment fundamentals',art:'☁',lessons:[['From code to a service','A service is a running program that handles requests. Deployment packages your code, configuration and dependencies into an environment where the service can run consistently. Secrets belong outside source control.','Draw the path from a browser request through a web server to a database. Identify which component owns each responsibility.'],['Containers and configuration','A container packages an application and its dependencies. An image is the reusable template; a container is a running instance. Keep persistent application data outside an ephemeral container filesystem.','Explain why deleting a container should not delete a learner’s course progress. Sketch a persistent storage arrangement.'],['Continuous integration','Continuous integration runs checks whenever code changes. A useful pipeline installs dependencies, validates the application and builds an artifact. Failures should be visible before deployment.','Write the steps for a pipeline that prevents a broken JavaScript build from reaching your users.'],['Observe and improve','Logs describe events, metrics measure behavior over time, and traces follow requests through services. Choose a few signals that matter, such as request errors and latency.','Define three signals for a learning platform and explain what you would investigate when each signal changes.']]}
];
const art = `<svg class="st-art" viewBox="0 0 260 230" fill="none" aria-hidden="true"><ellipse cx="145" cy="212" rx="102" ry="12" fill="#dbeafe"/><path d="M59 158L170 137L223 164L108 190Z" fill="#93c5fd"/><path d="M59 158V177L108 206V190Z" fill="#3b82f6"/><path d="M108 190L223 164V181L108 206Z" fill="#bfdbfe"/><path d="M74 130L183 111L224 137L115 160Z" fill="#ffffff"/><path d="M74 130V148L115 174V160Z" fill="#dbeafe"/><path d="M115 160L224 137V152L115 174Z" fill="#eff6ff"/><path d="M112 56Q150 43 171 65V125Q145 110 112 123Z" fill="#ffffff"/><path d="M171 65Q192 41 229 46V113Q197 109 171 125Z" fill="#bfdbfe"/><path d="M171 66V123" stroke="#2563eb" stroke-width="3"/><path d="M123 71L155 72M123 82L155 83M123 93L149 94M184 70L215 62M184 82L215 74M184 94L210 88" stroke="#60a5fa" stroke-width="3"/><path d="M63 137Q35 95 50 63Q77 83 63 137Z" fill="#1d4ed8"/><path d="M64 137Q58 93 92 80Q97 111 64 137Z" fill="#2563eb"/><path d="M45 128H80L74 163H52Z" fill="#38bdf8"/><circle cx="100" cy="44" r="5" fill="#60a5fa"/><path d="M211 23V35M205 29H217" stroke="#3b82f6" stroke-width="2"/></svg>`;
function save(){try{localStorage.setItem(key,JSON.stringify(state));return true;}catch{showToast('Your browser could not save this change. Please check storage permissions.','error');return false;}}
function log(text){state.activity.unshift({text,date:new Date().toISOString()});state.activity=state.activity.slice(0,30);state.seen=false;}
function completed(i){return tracks[i].lessons.filter((_,n)=>state.completed.includes(`${i}:${n}`)).length;}
function go(tab){if(tab==='settings'||tab==='profile'){if(typeof openProfileDossierModal==='function'){openProfileDossierModal();}return;}switchPortalTab(tab);document.title=({planner:'Study planner'}[tab]||document.title.replace(' · Torpedo',''))+' · Torpedo';if(tab==='planner')renderPlanner();}
function tasksMarkup(limit=99){const rows=state.tasks.slice().sort((a,b)=>Number(a.done)-Number(b.done)).slice(0,limit);return rows.length?rows.map(t=>`<div class="st-task ${t.done?'done':''}"><input type="checkbox" aria-label="Complete ${esc(t.text)}" data-check="${esc(t.id)}" ${t.done?'checked':''}><div><div class="st-task-title">${esc(t.text)}</div><small>${t.date?esc(new Date(t.date+'T12:00:00').toLocaleDateString(undefined,{month:'short',day:'numeric'})):'No due date'}</small></div><button class="st-link" data-delete="${esc(t.id)}" aria-label="Delete task">×</button></div>`).join(''):'<div class="st-empty">A little room to breathe.<br>Add your next learning task.</div>';}
function weekMarkup(){const today=new Date(),start=new Date(today);start.setDate(today.getDate()-((today.getDay()+6)%7));return Array.from({length:7},(_,i)=>{const d=new Date(start);d.setDate(start.getDate()+i);return `<div class="st-day ${d.toDateString()===today.toDateString()?'today':''}">${['M','T','W','T','F','S','S'][i]}<strong>${d.getDate()}</strong></div>`;}).join('');}
function thisWeekCount(){const start=new Date();start.setHours(0,0,0,0);start.setDate(start.getDate()-((start.getDay()+6)%7));return state.activity.filter(x=>x.kind==='lesson'&&new Date(x.date)>=start).length;}
function render(){
  const u=read('torpedo_user',{});
  const name=u.name||'Vivek Yadav';
  const first=name.split(' ')[0];
  const total=state.completed.length;
  const weekly=thisWeekCount();
  const goalPct=Math.min(100,Math.round((weekly/state.goal)*100));

  let bookedCalls=[];
  try{bookedCalls=JSON.parse(localStorage.getItem('torpedo_mentorship_bookings')||'[]');}catch(e){}
  const nextCall=bookedCalls[0];

  $('#student-home').innerHTML=`
    <div class="st-page">
      <!-- Topline: Executive Greeting & Live Badges -->
      <div class="st-exec-topline">
        <div>
          <div class="st-eyebrow">YOUR STUDENT WORKSPACE</div>
          <h1 class="st-exec-title">Welcome back, ${esc(first)} </h1>
          <p class="st-muted">Keep learning, practise a skill, or plan your next study session.</p>
        </div>
        <div class="st-exec-badges">
          <div class="st-badge-pill date">📅 ${new Date().toLocaleDateString(undefined,{month:'short',day:'numeric'})}</div>
        </div>
      </div>

      <!-- Compact Executive Hero Strip -->
      <section class="st-exec-hero">
        <div class="st-exec-hero-copy">
          <span class="st-exec-hero-kicker">ACTIVE LEARNING TRACK • SELF-PACED</span>
          <h2 class="st-exec-hero-heading">${tracks[activeCourse||0].title}</h2>
          <p class="st-exec-hero-desc">${completed(activeCourse||0) === 4 ? "All 4 lessons completed. Revisit any lesson to review." : `Lesson ${completed(activeCourse||0)+1} of 4: ${tracks[activeCourse||0].lessons[completed(activeCourse||0)][0]}`}</p>
        </div>
        <div class="st-exec-hero-actions">
          <button type="button" class="st-btn" data-course="${activeCourse||0}" style="padding: 10px 18px; font-weight: 700;">
            <span>${completed(activeCourse||0) === 4 ? "Review lessons" : "Resume lesson"} ↗</span>
          </button>
          <button type="button" class="st-btn secondary" onclick="switchPortalTab('lifecode')" style="padding: 10px 14px;">
            <span>Coding practice</span>
          </button>
        </div>
      </section>

      <!-- 4 Compact Stat Cards -->
      <div class="community-stats-grid" style="margin-bottom: 20px;">
        <div class="community-stat-card">
          <div class="stat-header-row">
            <span>COURSE TRACKS</span>
            <div class="stat-icon-wrap wifi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></div>
          </div>
          <div class="stat-main-row">
            <span class="stat-value">02</span>
            <span class="stat-value-sub">Enrolled</span>
          </div>
          <span class="stat-subtext">${total} of 8 reading lessons completed</span>
          <div class="stat-footer-row">
            <span class="stat-badge green">✓ ${Math.round((total/8)*100)}% Overall Progress</span>
          </div>
        </div>

        <div class="community-stat-card">
          <div class="stat-header-row">
            <span>DSA ARENA</span>
            <div class="stat-icon-wrap video"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg></div>
          </div>
          <div class="stat-main-row">
            <span class="stat-value-sub">Coding practice</span>
          </div>
          <span class="stat-subtext">Explore algorithm challenges</span>
          <div class="stat-footer-row">
            <button type="button" class="st-link" data-go="lifecode">Open Lifecode ↗</button>
          </div>
        </div>

        <div class="community-stat-card">
          <div class="stat-header-row">
            <span>MOCK TESTS</span>
            <div class="stat-icon-wrap star"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
          </div>
          <div class="stat-main-row">
            <span class="stat-value-sub">Test your knowledge</span>
          </div>
          <span class="stat-subtext">Try timed practice assessments</span>
          <div class="stat-footer-row">
            <button type="button" class="st-link" data-go="quizzes">Browse quizzes ↗</button>
          </div>
        </div>

        <div class="community-stat-card">
          <div class="stat-header-row">
            <span>WEEKLY SPRINT</span>
            <div class="stat-icon-wrap xp"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
          </div>
          <div class="stat-main-row">
            <span class="stat-value">${weekly}</span>
            <span class="stat-value-sub">/ ${state.goal} Lessons</span>
          </div>
          <div style="background: #e2e8f0; height: 5px; border-radius: 99px; overflow: hidden; margin: 4px 0 8px;">
            <div style="background: #2563eb; width: ${goalPct}%; height: 100%;"></div>
          </div>
          <div class="stat-footer-row">
            <span style="color: ${weekly>=state.goal?'#059669':'#2563eb'}; font-size: 11px; font-weight: 700;">
              ${weekly>=state.goal?'✓ Goal Completed!':`${state.goal-weekly} lessons to target`}
            </span>
          </div>
        </div>
      </div>

      <!-- Main Layout: 2 Columns -->
      <div class="st-columns">
        <!-- Main Column -->
        <div class="st-main" style="gap: 18px;">
          <!-- Active Pathways (Sleek Horizontal Cards) -->
          <section class="st-panel" style="padding: 18px 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
              <h3 style="margin: 0; font-size: 15px; font-weight: 700; color: #0f172a;">Active Curriculums</h3>
              <button class="st-link" data-go="courses" style="font-size: 12px;">Explore All Catalog ↗</button>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${tracks.map((c,i)=>`
                <div class="st-compact-course-card">
                  <div class="st-course-badge-accent">${c.tag}</div>
                  <div style="flex: 1; min-width: 0;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                      <h4 style="margin: 0; font-size: 14.5px; font-weight: 700; color: #0f172a;">${c.title}</h4>
                      <span style="font-size: 11.5px; font-weight: 700; color: #2563eb;">${completed(i)} of 4 Lessons</span>
                    </div>
                    <p style="margin: 0 0 8px 0; font-size: 12px; color: #64748b;">${c.instructor}</p>
                    <div style="background: #eff6ff; height: 5px; border-radius: 99px; overflow: hidden; margin-bottom: 6px;">
                      <div style="background: #2563eb; width: ${completed(i)*25}%; height: 100%;"></div>
                    </div>
                  </div>
                  <button type="button" class="st-btn secondary" data-course="${i}" style="padding: 7px 14px; font-size: 11.5px; white-space: nowrap;">
                    ${completed(i)===4?'Review Track ↗':'Resume Lesson →'}
                  </button>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- Study Planner Mini-Sprint on Home -->
          <section class="st-panel" style="padding: 18px 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <div>
                <h3 style="margin: 0; font-size: 15px; font-weight: 700; color: #0f172a;">Today's Study Checklist</h3>
                <span class="st-muted" style="font-size: 11.5px;">Directly actionable from your command center</span>
              </div>
              <button class="st-link" data-go="planner" style="font-size: 12px;">Full Planner (${state.tasks.filter(t=>!t.done).length} Pending) ↗</button>
            </div>
            
            <div class="st-home-tasks-wrap">
              ${tasksMarkup(4)}
            </div>

            <form id="st-task-form" style="display: flex; gap: 8px; margin-top: 14px;">
              <input class="st-input" name="text" placeholder="Add a quick task (e.g., Practice LRU Cache, Read Lesson 3)..." style="font-size: 12.5px; padding: 8px 12px;" required>
              <button class="st-btn" style="padding: 8px 14px; white-space: nowrap; font-size: 12px;">+ Add Task</button>
            </form>
          </section>

          <!-- Quick Launchpad -->
          <section>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <h3 style="margin: 0; font-size: 14px; font-weight: 700; color: #0f172a;">Developer Launchpad</h3>
              <span class="st-muted" style="font-size: 11px;">Direct shortcuts</span>
            </div>
            <div class="st-launchpad-grid">
              <button type="button" class="st-launch-tile" onclick="switchPortalTab('lifecode')">
                <div class="st-launch-icon">&lt;/&gt;</div>
                <div>
                  <strong>Lifecode IDE</strong>
                  <small>Problem Arena &amp; Code Sandbox</small>
                </div>
              </button>
              <button type="button" class="st-launch-tile" onclick="switchPortalTab('mentorships')">
                <div class="st-launch-icon" style="background: #eff6ff; color: #2563eb;">🤝</div>
                <div>
                  <strong>1-on-1 Mentorship</strong>
                  <small>24 Live Faculty Available</small>
                </div>
              </button>
              <button type="button" class="st-launch-tile" onclick="switchPortalTab('quizzes')">
                <div class="st-launch-icon" style="background: #fef3c7; color: #b45309;">◎</div>
                <div>
                  <strong>Mock Assessments</strong>
                  <small>48 Curated Technical Exams</small>
                </div>
              </button>
              <button type="button" class="st-launch-tile" onclick="switchPortalTab('referrals')">
                <div class="st-launch-icon" style="background: #ecfdf5; color: #059669;">🎁</div>
                <div>
                  <strong>Referrals Hub</strong>
                  <small>₹1,500 Credits Available</small>
                </div>
              </button>
            </div>
          </section>
        </div>

        <!-- Right Intelligence Aside -->
        <aside class="st-aside" style="gap: 16px;">
          <!-- Week Tracker -->
          <section class="st-panel" style="padding: 18px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <strong style="font-size: 13.5px; color: #0f172a;">Sprint Calendar</strong>
              <span class="st-muted" style="font-size: 11px;">${new Date().toLocaleDateString(undefined,{month:'short',year:'numeric'})}</span>
            </div>
            <div class="st-week" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; text-align: center;">
              ${weekMarkup()}
            </div>
          </section>

          <!-- Weekly Goal Widget -->
          <section class="st-panel" style="padding: 18px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <strong style="font-size: 13.5px; color: #0f172a;">Weekly Learning Pace</strong>
              <span style="font-size: 11.5px; font-weight: 700; color: #2563eb;">${weekly} / ${state.goal}</span>
            </div>
            <p class="st-muted" style="font-size: 11.5px; margin: 0 0 10px 0;">Goal: ${state.goal} completed lessons per week</p>
            <div style="background: #f1f5f9; height: 7px; border-radius: 99px; overflow: hidden; margin-bottom: 10px;">
              <div style="background: #2563eb; width: ${goalPct}%; height: 100%;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <small class="st-muted" style="font-size: 11px;">${goalPct}% Achieved</small>
              <button class="st-link" data-go="settings" style="font-size: 11px;">Adjust Goal →</button>
            </div>
          </section>

          <!-- Mentorship Status -->
          <section class="st-panel" style="padding: 18px; border-color: #bfdbfe; background: linear-gradient(180deg, #ffffff 0%, #f8faff 100%);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 10px; font-weight: 700; color: #1d4ed8; text-transform: uppercase;">1-ON-1 CONSULTATION</span>
              <span style="font-size: 10px; font-weight: 700; color: #10b981; background: #ecfdf5; padding: 2px 6px; border-radius: 4px;">24 ONLINE</span>
            </div>
            ${nextCall ? `
              <h4 style="margin: 0 0 2px 0; font-size: 13.5px; color: #0f172a;">${nextCall.mentorName}</h4>
              <p class="st-muted" style="margin: 0 0 12px 0; font-size: 11.5px;">${nextCall.agenda} • ${nextCall.date} at ${nextCall.timeSlot}</p>
              <a href="${nextCall.meetLink}" target="_blank" class="st-btn" style="width: 100%; padding: 7px 10px; font-size: 11.5px; text-decoration: none;">Join Google Meet Room ↗</a>
            ` : `
              <h4 style="margin: 0 0 4px 0; font-size: 13.5px; color: #0f172a;">Book Private Mentorship</h4>
              <p class="st-muted" style="margin: 0 0 12px 0; font-size: 11.5px; line-height: 1.4;">Get 1-on-1 resume feedback &amp; mock interviews from Stripe, Google &amp; Netflix engineers.</p>
              <button type="button" class="st-btn" onclick="switchPortalTab('mentorships')" style="width: 100%; padding: 8px 12px; font-size: 11.5px;">Browse Mentors (24 Live) →</button>
            `}
          </section>

          <!-- Badges Mini Cabinet -->
          <section class="st-panel" style="padding: 18px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <strong style="font-size: 13.5px; color: #0f172a;">Earned Credentials</strong>
              <button class="st-link" onclick="switchPortalTab('awards')" style="font-size: 11px;">View All (8) →</button>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; align-items: center; gap: 10px; padding: 8px 10px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
                <span style="font-size: 18px;">⚡</span>
                <div>
                  <strong style="display: block; font-size: 12px; color: #0f172a;">Momentum Maker</strong>
                  <small style="color: #64748b; font-size: 10.5px;">7-Day Study Streak</small>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 10px; padding: 8px 10px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
                <span style="font-size: 18px;">⌘</span>
                <div>
                  <strong style="display: block; font-size: 12px; color: #0f172a;">Code Champion</strong>
                  <small style="color: #64748b; font-size: 10.5px;">25+ Lifecode Problems</small>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  `;
  $('#notif-count-badge').textContent=state.seen?'0':String(state.activity.length);
}
let plannerView='today';
const todayKey=()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');};
function renderPlanner(){
 const today=todayKey();
 const tasks=state.tasks.filter(t=>plannerView==='all'||(plannerView==='today'?t.date===today:plannerView==='upcoming'?t.date>today:!t.done&&t.date&&t.date<today));
 $('#student-planner').innerHTML=`<div class="st-page"><div class="st-topline"><div><div class="st-eyebrow">PLAN YOUR NEXT SMALL WIN</div><h1>Your study planner</h1></div><button class="st-btn" data-quick>Add a task +</button></div><nav style="display:flex;gap:8px;margin:18px 0;flex-wrap:wrap">${['today','upcoming','overdue','all'].map(v=>`<button class="st-btn ${v===plannerView?'':'secondary'}" data-view="${v}" aria-pressed="${v===plannerView}">${v[0].toUpperCase()+v.slice(1)}</button>`).join('')}</nav><div class="st-panel"><form id="st-task-form" class="st-form"><label>Task<input class="st-input" name="text" maxlength="180" required placeholder="What will you work on?"></label><label>Due date<input class="st-input" type="date" name="date" value="${today}"></label><label>Attach learning<select class="st-input" name="attachment"><option value="">No attachment</option>${tracks.map((c,i)=>c.lessons.map((l,n)=>`<option value="${i}:${n}">${esc(c.title)} — ${esc(l[0])}</option>`).join('')).join('')}<option value="practice">Lifecode practice</option></select></label><button class="st-btn">Add task +</button></form></div><div class="st-panel" style="margin-top:18px">${tasks.length?tasks.map(t=>`<div class="st-task"><input type="checkbox" aria-label="Complete ${esc(t.text)}" data-check="${esc(t.id)}" ${t.done?'checked':''}><div><strong>${esc(t.text)}</strong><small>${esc(t.date||'No due date')}</small>${t.attachment?`<button class="st-link" data-attachment="${esc(t.attachment)}">Open attached learning →</button>`:''}</div><button class="st-link" data-delete="${esc(t.id)}" aria-label="Delete task">×</button></div>`).join(''):'<p>No tasks in this view.</p>'}</div></div>`;
}
document.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.dataset.view){plannerView=b.dataset.view;renderPlanner();}
 if(b.hasAttribute('data-quick'))$('#st-task-form [name="text"]').focus();
 if(b.dataset.attachment){if(b.dataset.attachment==='practice')go('lifecode');else{const [i,n]=b.dataset.attachment.split(':').map(Number);if(tracks[i]?.lessons[n])lesson(i,n);}}
});
function renderSettings(){const u=read('torpedo_user',{});$('#student-settings').innerHTML=`<div class="st-page" style="max-width:760px;margin-left:0"><div class="st-topline"><div><div class="st-eyebrow">MAKE YOURSELF AT HOME</div><h1 style="margin-top:10px">Profile & preferences</h1><p class="st-muted">Personalize your learning space on this device.</p></div></div><form id="st-settings-form" class="st-panel st-form"><label>Your name<input name="name" value="${esc(u.name||'')}" required maxlength="80" autocomplete="name"></label><label>College or university<input name="college" value="${esc(u.college||'')}" maxlength="150"></label><label>Degree / program<input name="degree" value="${esc(u.degree||'')}" maxlength="100"></label><label>A little about you<textarea name="bio" maxlength="500">${esc(u.bio||'')}</textarea></label><label>Weekly learning goal<select name="goal">${[1,3,5,7,10,15,20].map(n=>`<option value="${n}" ${state.goal===n?'selected':''}>${n} lessons per week</option>`).join('')}</select></label><div><button class="st-btn">Save changes</button></div><p class="st-note">These preferences are stored in this browser. Account credentials are managed by your existing login system.</p></form></div>`;}
let returnFocus;
function dialog(title,body){let d=$('#st-dialog');if(!d?.open)returnFocus=document.activeElement;if(!d){d=document.createElement('dialog');d.id='st-dialog';d.className='st-dialog st-page';document.body.append(d);d.addEventListener('click',e=>{if(e.target===d)d.close();});d.addEventListener('close',()=>returnFocus?.focus());}d.innerHTML=`<div class="st-dialog-head"><h2 id="st-dialog-title">${esc(title)}</h2><button class="st-btn secondary" data-close aria-label="Close dialog">×</button></div><div class="st-dialog-body">${body}</div>`;d.setAttribute('aria-labelledby','st-dialog-title');if(!d.open)d.showModal();}
function lesson(i,n){activeCourse=i;activeLesson=n;const c=tracks[i],l=c.lessons[n],id=`${i}:${n}`;dialog(c.title,`<div class="st-lesson-layout"><nav class="st-lesson-nav" aria-label="Lessons">${c.lessons.map((x,j)=>`<button data-lesson="${j}" class="${j===n?'active':''}">${state.completed.includes(`${i}:${j}`)?'✓':String(j+1).padStart(2,'0')} &nbsp; ${x[0]}</button>`).join('')}</nav><section class="st-reading"><div class="st-eyebrow">LESSON ${n+1} OF 4 · READING & PRACTICE</div><h2>${l[0]}</h2><p>${l[1]}</p><div class="st-banner"><strong>Try it yourself</strong><br>${l[2]}</div><label for="st-notes" style="display:block;margin:20px 0 8px;font-size:12px">Your lesson notes</label><textarea id="st-notes" class="st-input" placeholder="Ideas, questions, or your practice solution…">${esc(state.notes[id]||'')}</textarea><div id="st-note-status" class="st-save-status" aria-live="polite">Notes save automatically on this device</div><div style="display:flex;gap:12px;margin-top:22px;flex-wrap:wrap"><button class="st-btn" data-complete ${state.completed.includes(id)?'disabled':''}>${state.completed.includes(id)?'✓ Completed':'Mark lesson complete'}</button>${n<3?'<button class="st-btn secondary" data-next>Next lesson →</button>':''}</div></section></div>`);}
window.openCoursePlayerModal = title => {let i=/cloud|devops/i.test(title||'')?1:0;if(title&&!/frontend|react|cloud|devops/i.test(title)){dialog(title,'<div class="st-banner">Lesson media for this catalog course has not been connected yet. Explore the included reading paths from your dashboard while your instructor adds course content.</div>');return;}const n=tracks[i].lessons.findIndex((_,j)=>!state.completed.includes(`${i}:${j}`));lesson(i,n<0?0:n);};
window.closeCoursePlayerModal=()=>$('#st-dialog')?.close();
window.openNotificationsModal=()=>{dialog('Your learning activity',state.activity.length?state.activity.map(a=>`<div class="st-task"><span>✓</span><div>${esc(a.text)}<small>${esc(new Date(a.date).toLocaleString())}</small></div></div>`).join(''):'<div class="st-empty">Your story starts here. Completed lessons and planner updates will appear here.</div>');state.seen=true;save();render();};
window.addNewTodoTask=text=>{if(!text){go('planner');return;}state.tasks.push({id:crypto.randomUUID(),text:String(text),date:'',done:false});save();render();};
document.addEventListener('click',e=>{const b=e.target.closest('button,a');if(!b)return;if(b.dataset.go){go(b.dataset.go);}if(b.dataset.course!==undefined){const i=Number(b.dataset.course);let n=tracks[i].lessons.findIndex((_,j)=>!state.completed.includes(`${i}:${j}`));lesson(i,n<0?0:n);}if(b.dataset.lesson!==undefined)lesson(activeCourse,Number(b.dataset.lesson));if(b.hasAttribute('data-close'))$('#st-dialog').close();if(b.hasAttribute('data-next'))lesson(activeCourse,Math.min(3,activeLesson+1));if(b.hasAttribute('data-complete')){const id=`${activeCourse}:${activeLesson}`;if(!state.completed.includes(id)){state.completed.push(id);log(`Completed “${tracks[activeCourse].lessons[activeLesson][0]}”`);state.activity[0].kind='lesson';save();render();lesson(activeCourse,activeLesson);}}if(b.dataset.delete){state.tasks=state.tasks.filter(t=>t.id!==b.dataset.delete);save();render();renderPlanner();}});
document.addEventListener('change',e=>{if(e.target.dataset.check){const t=state.tasks.find(t=>t.id===e.target.dataset.check);if(t){t.done=e.target.checked;save();render();renderPlanner();}}});
document.addEventListener('input',e=>{if(e.target.id==='st-notes'){state.notes[`${activeCourse}:${activeLesson}`]=e.target.value;$('#st-note-status').textContent=save()?'Saved on this device':'Could not save notes';}});
document.addEventListener('submit',e=>{if(e.target.id==='st-task-form'){e.preventDefault();const f=new FormData(e.target),text=String(f.get('text')).trim();if(!text)return;plannerView='all';state.tasks.push({id:crypto.randomUUID(),text,date:f.get('date'),attachment:f.get('attachment')||'',done:false});log('Added a task to your study planner');save();render();renderPlanner();}if(e.target.id==='st-settings-form'){e.preventDefault();const f=new FormData(e.target),name=String(f.get('name')).trim();if(!name)return;const u={...read('torpedo_user',{}),name,college:f.get('college'),degree:f.get('degree'),bio:f.get('bio')};try{localStorage.setItem('torpedo_user',JSON.stringify(u));}catch{showToast('Unable to save profile in this browser.','error');return;}state.goal=Number(f.get('goal'));save();loadStudentSession();render();showToast('Your preferences are saved on this device.','success');}});
document.addEventListener('DOMContentLoaded',()=>{
 const skip=document.createElement('a');skip.href='#student-home';skip.onclick=e=>{e.preventDefault();go('home');$('#student-home').tabIndex=-1;$('#student-home').focus();};skip.className='st-skip';skip.textContent='Skip to dashboard';document.body.prepend(skip);
 const currentUser=read('torpedo_user',{});if(!currentUser.name){$('#sidebar-student-name').textContent='Your workspace';$('#sidebar-student-role').textContent='Personal learning space';$('.profile-monogram-box span').textContent='VY';}
 const profile=$('.sidebar-bottom-profile');profile.onclick=()=>go('settings');profile.setAttribute('role','button');profile.tabIndex=0;profile.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go('settings');}};
 const bell=$('[onclick="openNotificationsModal()"]');bell.setAttribute('role','button');bell.tabIndex=0;bell.setAttribute('aria-label','Learning activity');bell.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openNotificationsModal();}};
 const logout=$('a[title="Sign Out"]');logout.onclick=()=>{localStorage.removeItem('torpedo_user');};
 render();renderPlanner();renderSettings();const hash=location.hash.slice(1).split(/[?&/]/)[0];if(!hash)go('home');else if(['planner','settings'].includes(hash))go(hash);
 window.addEventListener('hashchange',()=>{const h=location.hash.slice(1);if(['planner','settings'].includes(h))go(h);});
});
})();
