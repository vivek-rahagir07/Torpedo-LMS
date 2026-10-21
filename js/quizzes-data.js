/**
 * Torpedo LMS - Mock Quizzes & Assessment Engine Data
 * Comprehensive questions database across FAANG DSA, Web Dev, Databases, OS, and Aptitude.
 */

const TORPEDO_QUIZZES_DATA = {
  categories: [
    { id: 'all', name: 'All Assessments', count: 24, icon: '📋' },
    { id: 'dsa', name: 'Data Structures & Algorithms', count: 8, icon: '⚡' },
    { id: 'web', name: 'Full Stack & Web Dev', count: 6, icon: '🌐' },
    { id: 'db', name: 'Databases & SQL', count: 4, icon: '🗄️' },
    { id: 'os', name: 'OS & Computer Networks', count: 4, icon: '⚙️' },
    { id: 'aptitude', name: 'Aptitude & Problem Solving', count: 2, icon: '🧠' }
  ],

  quizzes: [
    {
      id: 'quiz-dsa-01',
      title: 'FAANG DSA Sprint: Binary Search & Two Pointers',
      category: 'dsa',
      categoryLabel: 'DSA & Algorithms',
      difficulty: 'Medium',
      durationMinutes: 20,
      totalQuestions: 5,
      xpReward: 120,
      attempts: '2.8k',
      passRate: '78%',
      description: 'Master binary search on answer spaces, rotated array mechanics, and two-pointer sliding window patterns.',
      topics: ['Binary Search', 'Two Pointers', 'Sliding Window', 'Time Complexity'],
      status: 'completed',
      lastScore: 100,
      questions: [
        {
          id: 'q1',
          question: 'What is the worst-case time complexity of finding an element in a sorted rotated array using modified Binary Search?',
          options: [
            'O(1)',
            'O(log N)',
            'O(N)',
            'O(N log N)'
          ],
          correctIndex: 1,
          explanation: 'Modified Binary Search identifies which half of the array is sorted at each step and discards the other, retaining O(log N) worst-case time complexity for distinct elements.',
          topic: 'Binary Search'
        },
        {
          id: 'q2',
          question: 'In the Two-Pointer technique for checking if a string is a palindrome, what is the space complexity if pointers move from opposite ends?',
          options: [
            'O(N) auxiliary space',
            'O(log N) recursive stack space',
            'O(1) auxiliary space',
            'O(N²) space'
          ],
          correctIndex: 2,
          explanation: 'Iterative two pointers only require two index variables, utilizing O(1) constant auxiliary space.',
          topic: 'Two Pointers'
        },
        {
          id: 'q3',
          question: 'Consider finding the lower_bound of target X in a sorted array. What does it return when all elements are smaller than X?',
          options: [
            'Index 0',
            'Index -1',
            'Index N (end iterator / array length)',
            'Throws IndexOutOfBoundsException'
          ],
          correctIndex: 2,
          explanation: 'lower_bound returns an iterator/index pointing to the first element not less than target. If all elements are smaller, it returns N (past-the-end).',
          topic: 'Binary Search'
        },
        {
          id: 'q4',
          question: 'In a sliding window problem with all positive integers where we want minimum subarray sum ≥ S, how does the window expand and contract?',
          options: [
            'Expand right pointer when sum < S; contract left pointer when sum ≥ S',
            'Expand left pointer when sum < S; contract right pointer when sum ≥ S',
            'Both pointers always move forward simultaneously',
            'Pointers move backward from array end'
          ],
          correctIndex: 0,
          explanation: 'The right pointer expands to accumulate sufficient sum; once sum ≥ S is reached, the left pointer contracts to minimize the window while recording candidate lengths.',
          topic: 'Sliding Window'
        },
        {
          id: 'q5',
          question: 'Which of the following binary search formulas prevents integer 32-bit overflow when calculating the midpoint?',
          options: [
            'mid = (low + high) / 2',
            'mid = low + (high - low) / 2',
            'mid = (low + high) >> 1',
            'mid = (high * low) / 2'
          ],
          correctIndex: 1,
          explanation: 'low + (high - low) / 2 calculates the distance between high and low without adding the two large positive integers together, preventing 32-bit signed integer overflow.',
          topic: 'Binary Search'
        }
      ]
    },
    {
      id: 'quiz-web-01',
      title: 'Modern Frontend Architecture & React 19 Internals',
      category: 'web',
      categoryLabel: 'Full Stack & Web Dev',
      difficulty: 'Hard',
      durationMinutes: 25,
      totalQuestions: 5,
      xpReward: 150,
      attempts: '1.9k',
      passRate: '71%',
      description: 'Deep dive into React 19 Server Actions, useActionState, hydration, and Web Vitals (CWV/INP) optimization.',
      topics: ['React 19', 'Server Actions', 'INP / CWV', 'Fiber Reconciliation'],
      status: 'available',
      lastScore: null,
      questions: [
        {
          id: 'q1',
          question: 'In React 19, what hook officially replaces the boilerplate pattern of managing pending states, form errors, and optimistic UI for asynchronous form actions?',
          options: [
            'useFormStatus',
            'useActionState',
            'useDeferredValue',
            'useImperativeHandle'
          ],
          correctIndex: 1,
          explanation: 'React 19 introduced useActionState to manage action state, returning [state, formAction, isPending], cleanly handling async transitions without manual useState flags.',
          topic: 'React 19'
        },
        {
          id: 'q2',
          question: 'Which Core Web Vital (CWV) officially replaced First Input Delay (FID) in Google Lighthouse to measure overall responsiveness throughout the page lifecycle?',
          options: [
            'LCP (Largest Contentful Paint)',
            'CLS (Cumulative Layout Shift)',
            'INP (Interaction to Next Paint)',
            'TTFB (Time to First Byte)'
          ],
          correctIndex: 2,
          explanation: 'INP (Interaction to Next Paint) assesses the overall responsiveness to all user clicks, taps, and keypresses on a page, replacing the single-interaction FID metric.',
          topic: 'Web Performance'
        },
        {
          id: 'q3',
          question: 'What is the primary benefit of the React Server Components (RSC) architecture regarding client bundle size?',
          options: [
            'RSC completely replaces JavaScript with WebAssembly',
            'Dependencies imported exclusively in Server Components are excluded from the browser JavaScript bundle',
            'RSC automatically converts all CSS into inline SVG',
            'It forces all database queries to execute in browser service workers'
          ],
          correctIndex: 1,
          explanation: 'Server Components execute only on the server, meaning their imported packages (markdown parsers, heavy utility libraries) never ship to the client bundle.',
          topic: 'React Architecture'
        },
        {
          id: 'q4',
          question: 'In CSS Grid Layout, which function allows tracks to automatically fill available space and wrap items with a minimum size without media queries?',
          options: [
            'grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))',
            'grid-template-columns: flex(1)',
            'grid-template-columns: auto-stretch(280px)',
            'grid-template-columns: clamp(280px, 50%, 1fr)'
          ],
          correctIndex: 0,
          explanation: 'repeat(auto-fit, minmax(280px, 1fr)) creates a fluid, fully responsive grid where columns dynamically adapt between 280px and 1fr based on viewport container width.',
          topic: 'Modern CSS'
        },
        {
          id: 'q5',
          question: 'When using CSS position: sticky, which parent property is known to break sticky positioning by creating an unintended scroll/overflow container?',
          options: [
            'overflow: visible',
            'overflow-x: hidden / overflow: hidden on an ancestor',
            'display: flex',
            'background-color: transparent'
          ],
          correctIndex: 1,
          explanation: 'overflow: hidden, auto, or scroll on any ancestor establishes a clipping context that prevents the element from sticking relative to the viewport or outer scroll window.',
          topic: 'Modern CSS'
        }
      ]
    },
    {
      id: 'quiz-db-01',
      title: 'PostgreSQL Internals, B-Tree Indexes & ACID Mastery',
      category: 'db',
      categoryLabel: 'Databases & SQL',
      difficulty: 'Medium',
      durationMinutes: 18,
      totalQuestions: 5,
      xpReward: 110,
      attempts: '3.4k',
      passRate: '82%',
      description: 'Analyze query execution plans with EXPLAIN ANALYZE, composite indexing rules, and transaction isolation levels.',
      topics: ['B-Tree Indexes', 'EXPLAIN ANALYZE', 'ACID Isolation', 'MVCC'],
      status: 'available',
      lastScore: null,
      questions: [
        {
          id: 'q1',
          question: 'In a composite B-Tree index on columns (A, B, C), which WHERE clause condition can NOT effectively utilize the index efficiently?',
          options: [
            'WHERE A = 10 AND B = 20',
            'WHERE A = 10',
            'WHERE B = 20 AND C = 30',
            'WHERE A = 10 AND B = 20 AND C = 30'
          ],
          correctIndex: 2,
          explanation: 'B-Tree indexes follow the leftmost-prefix rule. A query filtering only on B and C without the leading column A cannot traverse the B-Tree index root efficiently.',
          topic: 'Indexing'
        },
        {
          id: 'q2',
          question: 'What is the main distinction between EXPLAIN and EXPLAIN ANALYZE in PostgreSQL?',
          options: [
            'EXPLAIN modifies data, whereas EXPLAIN ANALYZE does not',
            'EXPLAIN generates cost estimates based on planner statistics, while EXPLAIN ANALYZE actually executes the query to measure actual runtime and row counts',
            'EXPLAIN ANALYZE only works on primary keys',
            'EXPLAIN is deprecated in PostgreSQL 16+'
          ],
          correctIndex: 1,
          explanation: 'EXPLAIN produces the optimizer’s estimated cost without running the query; EXPLAIN ANALYZE executes the statement and captures real execution times and disk page hits.',
          topic: 'Query Optimization'
        },
        {
          id: 'q3',
          question: 'Which transaction anomaly is prevented by the REPEATABLE READ isolation level that is permitted in READ COMMITTED?',
          options: [
            'Dirty Reads',
            'Non-Repeatable (Fuzzy) Reads',
            'Deadlocks',
            'Write Skew'
          ],
          correctIndex: 1,
          explanation: 'Non-repeatable reads occur when re-reading rows during a transaction yields modified data committed by concurrent transactions. REPEATABLE READ takes a transaction snapshot preventing this.',
          topic: 'ACID Transactions'
        },
        {
          id: 'q4',
          question: 'How does Multi-Version Concurrency Control (MVCC) in PostgreSQL prevent readers from blocking writers and writers from blocking readers?',
          options: [
            'By placing table-level exclusive locks on every SELECT',
            'By maintaining multiple physical row versions (tuples with xmin and xmax transaction IDs)',
            'By storing all writes in memory without ever writing to disk',
            'By executing queries strictly sequentially in a single thread'
          ],
          correctIndex: 1,
          explanation: 'PostgreSQL MVCC assigns xmin/xmax transaction IDs to each tuple version, allowing readers to read older consistent snapshot versions while writes insert new row versions.',
          topic: 'MVCC'
        },
        {
          id: 'q5',
          question: 'When should a BRIN (Block Range Index) be favored over a standard B-Tree index in PostgreSQL?',
          options: [
            'For small lookup tables with random UUID primary keys',
            'For massive append-only datasets where values correlate closely with physical table heap storage order (e.g. created_at timestamps)',
            'For full-text search across JSON documents',
            'BRIN is only valid for boolean columns'
          ],
          correctIndex: 1,
          explanation: 'BRIN indexes store minimum and maximum values for blocks of physical disk pages, making them exceptionally compact (orders of magnitude smaller than B-Trees) for ordered time-series data.',
          topic: 'Indexing'
        }
      ]
    },
    {
      id: 'quiz-os-01',
      title: 'Operating Systems: Concurrency, Virtual Memory & Linux I/O',
      category: 'os',
      categoryLabel: 'OS & Computer Networks',
      difficulty: 'Hard',
      durationMinutes: 22,
      totalQuestions: 5,
      xpReward: 140,
      attempts: '1.5k',
      passRate: '69%',
      description: 'Evaluate thread race conditions, semaphore vs mutex mechanics, page replacement algorithms, and epoll vs select.',
      topics: ['Virtual Memory', 'Semaphores', 'Deadlock Detection', 'Epoll I/O'],
      status: 'available',
      lastScore: null,
      questions: [
        {
          id: 'q1',
          question: 'Which of the following is NOT one of Coffman’s four necessary conditions for a system deadlock to occur?',
          options: [
            'Mutual Exclusion',
            'Hold and Wait',
            'Preemption Allowed',
            'Circular Wait'
          ],
          correctIndex: 2,
          explanation: 'The four Coffman conditions are Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. If preemption is allowed, deadlocks cannot persist.',
          topic: 'Deadlocks'
        },
        {
          id: 'q2',
          question: 'What is the key performance advantage of Linux epoll over traditional select/poll system calls for handling tens of thousands of concurrent network connections?',
          options: [
            'epoll runs in userspace without context switching',
            'epoll scales as O(number of active events) rather than O(total monitored file descriptors)',
            'epoll encrypts all TCP sockets automatically',
            'select does not support TCP connections'
          ],
          correctIndex: 1,
          explanation: 'select and poll require scanning the entire file descriptor list O(N) on every wakeup. epoll uses kernel event callbacks, delivering O(1)/O(active) readiness notifications.',
          topic: 'Linux I/O'
        },
        {
          id: 'q3',
          question: 'What phenomenon occurs in demand paging when an algorithm with more physical page frames yields MORE page faults (e.g., FIFO)?',
          options: [
            'Thrashing',
            'Bélády’s Anomaly',
            'Priority Inversion',
            'Cache Invalidation'
          ],
          correctIndex: 1,
          explanation: 'Bélády’s Anomaly is the counterintuitive phenomenon where increasing the number of page frames results in an increase in the number of page faults for certain access patterns under FIFO.',
          topic: 'Virtual Memory'
        },
        {
          id: 'q4',
          question: 'What is the role of the Translation Lookaside Buffer (TLB) in modern CPU memory management?',
          options: [
            'It stores CPU instructions during pipeline hazards',
            'It is a high-speed hardware cache for virtual-to-physical address translations to avoid multi-level page table traversals',
            'It writes dirty pages directly to NVMe SSDs',
            'It manages L1 data cache coherency between sockets'
          ],
          correctIndex: 1,
          explanation: 'The TLB caches recent virtual address to physical frame translations. A TLB hit avoids the costly latency of walking multi-level page tables in main memory.',
          topic: 'Virtual Memory'
        },
        {
          id: 'q5',
          question: 'How does a Counting Semaphore initialized with value K differ from a Binary Semaphore (Mutex)?',
          options: [
            'A counting semaphore can only be accessed by one thread at a time',
            'A counting semaphore allows up to K concurrent threads to access the shared resource pool',
            'A mutex cannot prevent race conditions',
            'A counting semaphore cannot be decremented'
          ],
          correctIndex: 1,
          explanation: 'A counting semaphore maintains a counter of available resource permits, allowing up to K concurrent acquisitions before subsequent calls block.',
          topic: 'Concurrency'
        }
      ]
    },
    {
      id: 'quiz-dsa-02',
      title: 'Trees, BST Traversals & Graph Shortest Path (Dijkstra)',
      category: 'dsa',
      categoryLabel: 'DSA & Algorithms',
      difficulty: 'Medium',
      durationMinutes: 20,
      totalQuestions: 5,
      xpReward: 130,
      attempts: '2.1k',
      passRate: '75%',
      description: 'Master inorder/preorder/postorder tree properties, LCA algorithms, and priority queue Dijkstra execution.',
      topics: ['Binary Trees', 'BST', 'Dijkstra', 'Graph BFS'],
      status: 'available',
      lastScore: null,
      questions: [
        {
          id: 'q1',
          question: 'Which traversal of a valid Binary Search Tree (BST) produces nodes in strictly ascending numerical order?',
          options: [
            'Preorder (Root, Left, Right)',
            'Inorder (Left, Root, Right)',
            'Postorder (Left, Right, Root)',
            'Level-Order (BFS)'
          ],
          correctIndex: 1,
          explanation: 'Inorder traversal visits left subtree (all smaller), then root, then right subtree (all larger), producing elements in strictly ascending sorted order.',
          topic: 'Trees'
        },
        {
          id: 'q2',
          question: 'What is the time complexity of Dijkstra’s Algorithm implemented with a Min-Heap (Priority Queue) on a graph with V vertices and E edges?',
          options: [
            'O(V²)',
            'O((V + E) log V)',
            'O(V * E)',
            'O(V³)'
          ],
          correctIndex: 1,
          explanation: 'Using an adjacency list and binary min-heap, extracting min takes O(log V) per vertex and edge relaxations take O(E log V), giving total time O((V + E) log V).',
          topic: 'Graph Algorithms'
        },
        {
          id: 'q3',
          question: 'Why does Dijkstra’s algorithm fail to guarantee the shortest path on graphs containing negative edge weights?',
          options: [
            'Because heaps cannot store negative numbers',
            'Because Dijkstra assumes that once a vertex is marked visited with the minimum tentative distance, no subsequent path can reduce that distance',
            'Because negative edges cause an immediate segmentation fault',
            'Dijkstra works correctly with negative edges; only Floyd-Warshall fails'
          ],
          correctIndex: 1,
          explanation: 'Dijkstra greedily marks vertices finalized. A negative weight edge encountered later could lower a previously finalized distance, violating Dijkstra’s greedy invariant (Bellman-Ford must be used instead).',
          topic: 'Graph Algorithms'
        },
        {
          id: 'q4',
          question: 'What is the height of a balanced AVL tree with N nodes?',
          options: [
            'O(1)',
            'O(log N)',
            'O(N)',
            'O(N log N)'
          ],
          correctIndex: 1,
          explanation: 'AVL trees enforce a balance factor difference ≤ 1 between left and right subtrees at every node, strictly guaranteeing O(log N) maximum height.',
          topic: 'Balanced Trees'
        },
        {
          id: 'q5',
          question: 'In finding the Lowest Common Ancestor (LCA) of two nodes p and q in a BST, when is the current root node determined to be the LCA?',
          options: [
            'When both p and q are greater than root.val',
            'When both p and q are less than root.val',
            'When one node is on the left (or equal to root) and the other is on the right (or equal to root)',
            'When root is a leaf node'
          ],
          correctIndex: 2,
          explanation: 'In a BST, if p and q split across root (one ≤ root.val and the other ≥ root.val), root is their lowest common ancestor where the search paths diverge.',
          topic: 'BST'
        }
      ]
    },
    {
      id: 'quiz-apt-01',
      title: 'FAANG Quantitative Aptitude & Logical Problem Solving',
      category: 'aptitude',
      categoryLabel: 'Aptitude & Problem Solving',
      difficulty: 'Easy',
      durationMinutes: 15,
      totalQuestions: 5,
      xpReward: 90,
      attempts: '4.2k',
      passRate: '88%',
      description: 'Probability, permutations, speed-distance-time, and logical deduction patterns frequently featured in technical screening rounds.',
      topics: ['Probability', 'Permutations', 'Relative Speed', 'Logic'],
      status: 'available',
      lastScore: null,
      questions: [
        {
          id: 'q1',
          question: 'Two trains running in opposite directions on parallel tracks at 60 km/h and 90 km/h take 12 seconds to cross each other. What is the combined length of the two trains?',
          options: [
            '450 meters',
            '500 meters',
            '350 meters',
            '600 meters'
          ],
          correctIndex: 1,
          explanation: 'Relative speed = 60 + 90 = 150 km/h = 150 * (5/18) = 125/3 m/s. Distance = Speed * Time = (125/3) * 12 = 500 meters.',
          topic: 'Speed & Distance'
        },
        {
          id: 'q2',
          question: 'What is the probability of rolling a sum of 7 or 11 with two standard fair six-sided dice?',
          options: [
            '1/6',
            '2/9',
            '7/36',
            '5/18'
          ],
          correctIndex: 1,
          explanation: 'Total outcomes = 36. Outcomes for sum 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6. Outcomes for sum 11: (5,6),(6,5) = 2. Total favorable = 8. Probability = 8/36 = 2/9.',
          topic: 'Probability'
        },
        {
          id: 'q3',
          question: 'In how many distinct ways can the letters of the word "TORPEDO" be arranged?',
          options: [
            '720',
            '2,520',
            '5,040',
            '1,260'
          ],
          correctIndex: 1,
          explanation: 'Word TORPEDO has 7 letters with the letter "O" repeating 2 times. Total permutations = 7! / 2! = 5040 / 2 = 2,520.',
          topic: 'Permutations'
        },
        {
          id: 'q4',
          question: 'A can complete a project in 12 days and B in 24 days. Working together, how many days will they take to complete the project?',
          options: [
            '6 days',
            '8 days',
            '9 days',
            '10 days'
          ],
          correctIndex: 1,
          explanation: '1-day combined work = (1/12) + (1/24) = 3/24 = 1/8. Therefore, together they finish in 8 days.',
          topic: 'Time & Work'
        },
        {
          id: 'q5',
          question: 'If CLOUD is coded as ENQWF in a cipher, how is SPEED coded in the same pattern?',
          options: [
            'URGGF',
            'UQGGF',
            'URGFE',
            'VRGGF'
          ],
          correctIndex: 0,
          explanation: 'Each letter is shifted forward by +2 alphabetical positions: C->E (+2), L->N (+2), O->Q (+2), U->W (+2), D->F (+2). Applying to SPEED: S(+2)->U, P(+2)->R, E(+2)->G, E(+2)->G, D(+2)->F => URGGF.',
          topic: 'Logical Reasoning'
        }
      ]
    }
  ]
};

// Global Quiz Runner State
let currentActiveQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = {}; // { questionId: selectedIndex }
let flaggedQuestions = new Set();
let quizTimerInterval = null;
let remainingTimeSeconds = 0;
let quizCategoryFilter = 'all';
let quizSearchQuery = '';

/**
 * Filter and render quizzes into the catalog grid
 */
function renderQuizzesCatalog() {
  const container = document.getElementById('quizzes-catalog-grid');
  if (!container) return;

  const countEl = document.getElementById('quizzes-count-badge');

  let list = TORPEDO_QUIZZES_DATA.quizzes;

  if (quizCategoryFilter !== 'all') {
    list = list.filter(q => q.category === quizCategoryFilter);
  }

  if (quizSearchQuery.trim() !== '') {
    const q = quizSearchQuery.toLowerCase();
    list = list.filter(item => 
      item.title.toLowerCase().includes(q) ||
      item.topics.some(t => t.toLowerCase().includes(q)) ||
      item.categoryLabel.toLowerCase().includes(q)
    );
  }

  if (countEl) {
    countEl.textContent = `${list.length} Assessments Available`;
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: #ffffff; border-radius: 14px; border: 1px dashed #cbd5e1;">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">🔍</div>
        <h3 style="font-size: 1.1rem; color: #0f172a; margin-bottom: 6px;">No Mock Assessments Found</h3>
        <p style="font-size: 0.86rem; color: #64748b; margin-bottom: 16px;">Try adjusting your search terms or category filter to discover more quizzes.</p>
        <button type="button" class="lc-cat-pill active" onclick="setQuizCategoryFilter('all')">View All Assessments</button>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map((quiz, idx) => {
    const diffClass = quiz.difficulty.toLowerCase();
    const isCompleted = quiz.status === 'completed' || quiz.lastScore !== null;
    const scoreTag = isCompleted ? `<span class="quiz-score-tag">Score: ${quiz.lastScore}%</span>` : '';

    return `
      <div class="quiz-card" style="animation-delay: ${idx * 0.05}s;">
        <div class="quiz-card-header">
          <div class="quiz-badge-wrap">
            <span class="quiz-cat-chip">${quiz.categoryLabel}</span>
            <span class="quiz-diff-badge ${diffClass}">${quiz.difficulty}</span>
          </div>
          ${scoreTag}
        </div>

        <h4 class="quiz-card-title">${quiz.title}</h4>
        <p class="quiz-card-desc">${quiz.description}</p>

        <div class="quiz-topics-wrap">
          ${quiz.topics.map(t => `<span class="quiz-topic-tag">${t}</span>`).join('')}
        </div>

        <div class="quiz-meta-row">
          <div class="quiz-meta-item" title="Duration">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>${quiz.durationMinutes} Mins</span>
          </div>
          <div class="quiz-meta-item" title="Questions">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <span>${quiz.totalQuestions} Questions</span>
          </div>
          <div class="quiz-meta-item" title="Reward Points">
            <span style="color: #f59e0b;">⚡ +${quiz.xpReward} TRP</span>
          </div>
        </div>

        <div class="quiz-card-footer">
          <span class="quiz-attempts-sub">${quiz.attempts} attempts • ${quiz.passRate} pass rate</span>
          <button type="button" class="btn-start-quiz" onclick="startQuizRunner('${quiz.id}')">
            ${isCompleted ? 'Retake Quiz ↻' : 'Start Assessment →'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Filter category tab setter
 */
function setQuizCategoryFilter(catId, btnEl) {
  quizCategoryFilter = catId;
  document.querySelectorAll('.quiz-filter-pill').forEach(btn => btn.classList.remove('active'));
  if (btnEl) {
    btnEl.classList.add('active');
  } else {
    const target = document.querySelector(`.quiz-filter-pill[data-cat="${catId}"]`);
    if (target) target.classList.add('active');
  }
  renderQuizzesCatalog();
}

/**
 * Filter by search query
 */
function handleQuizSearchInput(query) {
  quizSearchQuery = query;
  renderQuizzesCatalog();
}

/**
 * Launch Interactive Quiz Runner
 */
function startQuizRunner(quizId) {
  const quiz = TORPEDO_QUIZZES_DATA.quizzes.find(q => q.id === quizId) || TORPEDO_QUIZZES_DATA.quizzes[0];
  currentActiveQuiz = quiz;
  currentQuestionIndex = 0;
  userAnswers = {};
  flaggedQuestions = new Set();
  remainingTimeSeconds = quiz.durationMinutes * 60;

  const modal = document.getElementById('quiz-runner-modal');
  if (!modal) return;

  // Set modal header
  document.getElementById('quiz-modal-title').textContent = quiz.title;
  document.getElementById('quiz-modal-cat-badge').textContent = quiz.categoryLabel;

  // Render question navigator palette
  renderQuestionPalette();

  // Render first question
  renderActiveQuestion();

  // Start timer
  startQuizTimer();

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Render Question Navigation Palette
 */
function renderQuestionPalette() {
  const palette = document.getElementById('quiz-question-palette');
  if (!palette || !currentActiveQuiz) return;

  palette.innerHTML = currentActiveQuiz.questions.map((q, idx) => {
    let statusClass = 'unanswered';
    if (userAnswers[q.id] !== undefined) statusClass = 'answered';
    if (flaggedQuestions.has(q.id)) statusClass = 'flagged';
    if (idx === currentQuestionIndex) statusClass += ' current';

    return `
      <button type="button" class="quiz-pal-btn ${statusClass}" onclick="jumpToQuizQuestion(${idx})" title="Question ${idx + 1}">
        ${idx + 1}
      </button>
    `;
  }).join('');

  // Update progress tracker
  const answeredCount = Object.keys(userAnswers).length;
  const progressText = document.getElementById('quiz-progress-counter');
  if (progressText) {
    progressText.textContent = `${answeredCount} of ${currentActiveQuiz.questions.length} Answered`;
  }

  const progressBar = document.getElementById('quiz-progress-bar-fill');
  if (progressBar) {
    const pct = Math.round((answeredCount / currentActiveQuiz.questions.length) * 100);
    progressBar.style.width = `${pct}%`;
  }
}

/**
 * Render the currently active question
 */
function renderActiveQuestion() {
  if (!currentActiveQuiz) return;
  const q = currentActiveQuiz.questions[currentQuestionIndex];
  if (!q) return;

  // Update question index title
  document.getElementById('quiz-question-num').textContent = `Question ${currentQuestionIndex + 1} of ${currentActiveQuiz.questions.length}`;
  document.getElementById('quiz-question-topic').textContent = q.topic || 'Core Concept';
  document.getElementById('quiz-question-text').textContent = q.question;

  // Options rendering
  const optionsContainer = document.getElementById('quiz-options-container');
  const letters = ['A', 'B', 'C', 'D'];
  const selectedIdx = userAnswers[q.id];

  optionsContainer.innerHTML = q.options.map((opt, i) => {
    const isSelected = selectedIdx === i;
    return `
      <div class="quiz-option-card ${isSelected ? 'selected' : ''}" onclick="selectQuizOption(${i})">
        <div class="quiz-option-letter">${letters[i]}</div>
        <div class="quiz-option-text">${opt}</div>
        <div class="quiz-option-radio">
          <div class="quiz-radio-dot"></div>
        </div>
      </div>
    `;
  }).join('');

  // Update flag button status
  const flagBtn = document.getElementById('btn-quiz-flag');
  if (flagBtn) {
    if (flaggedQuestions.has(q.id)) {
      flagBtn.classList.add('flagged');
      flagBtn.innerHTML = '🚩 Flagged';
    } else {
      flagBtn.classList.remove('flagged');
      flagBtn.innerHTML = '🏳️ Flag for Review';
    }
  }

  // Update prev/next button states
  const prevBtn = document.getElementById('btn-quiz-prev');
  if (prevBtn) prevBtn.disabled = currentQuestionIndex === 0;

  const nextBtn = document.getElementById('btn-quiz-next');
  if (nextBtn) {
    if (currentQuestionIndex === currentActiveQuiz.questions.length - 1) {
      nextBtn.innerHTML = 'Review & Submit →';
    } else {
      nextBtn.innerHTML = 'Save & Next →';
    }
  }

  renderQuestionPalette();
}

/**
 * Select Option
 */
function selectQuizOption(optIdx) {
  if (!currentActiveQuiz) return;
  const q = currentActiveQuiz.questions[currentQuestionIndex];
  userAnswers[q.id] = optIdx;
  renderActiveQuestion();
}

/**
 * Clear Selection
 */
function clearQuizSelection() {
  if (!currentActiveQuiz) return;
  const q = currentActiveQuiz.questions[currentQuestionIndex];
  delete userAnswers[q.id];
  renderActiveQuestion();
}

/**
 * Toggle Flag for Review
 */
function toggleQuizFlag() {
  if (!currentActiveQuiz) return;
  const q = currentActiveQuiz.questions[currentQuestionIndex];
  if (flaggedQuestions.has(q.id)) {
    flaggedQuestions.delete(q.id);
  } else {
    flaggedQuestions.add(q.id);
  }
  renderActiveQuestion();
}

/**
 * Jump to specific question
 */
function jumpToQuizQuestion(idx) {
  if (!currentActiveQuiz) return;
  if (idx >= 0 && idx < currentActiveQuiz.questions.length) {
    currentQuestionIndex = idx;
    renderActiveQuestion();
  }
}

/**
 * Previous Question
 */
function quizPrevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderActiveQuestion();
  }
}

/**
 * Next Question or Submit
 */
function quizNextQuestion() {
  if (!currentActiveQuiz) return;
  if (currentQuestionIndex < currentActiveQuiz.questions.length - 1) {
    currentQuestionIndex++;
    renderActiveQuestion();
  } else {
    promptSubmitQuiz();
  }
}

/**
 * Timer Runner
 */
function startQuizTimer() {
  clearInterval(quizTimerInterval);
  updateTimerDisplay();

  quizTimerInterval = setInterval(() => {
    remainingTimeSeconds--;
    updateTimerDisplay();

    if (remainingTimeSeconds <= 0) {
      clearInterval(quizTimerInterval);
      if (typeof showToast === 'function') {
        showToast('Time is up! Submitting assessment automatically...', 'warning');
      }
      submitQuizAssessment();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const timerEl = document.getElementById('quiz-countdown-timer');
  if (!timerEl) return;

  const minutes = Math.floor(remainingTimeSeconds / 60);
  const seconds = remainingTimeSeconds % 60;
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  timerEl.textContent = formatted;

  if (remainingTimeSeconds <= 120) {
    timerEl.parentElement.classList.add('urgent');
  } else {
    timerEl.parentElement.classList.remove('urgent');
  }
}

/**
 * Prompt Submit
 */
function promptSubmitQuiz() {
  const answeredCount = Object.keys(userAnswers).length;
  const total = currentActiveQuiz.questions.length;
  const unattempted = total - answeredCount;

  let msg = `Ready to submit? You answered ${answeredCount} of ${total} questions.`;
  if (unattempted > 0) {
    msg += ` (${unattempted} questions remain unattempted).`;
  }

  if (confirm(msg)) {
    submitQuizAssessment();
  }
}

/**
 * Grade and show scorecard
 */
function submitQuizAssessment() {
  clearInterval(quizTimerInterval);
  if (!currentActiveQuiz) return;

  let correctCount = 0;
  const total = currentActiveQuiz.questions.length;

  currentActiveQuiz.questions.forEach(q => {
    if (userAnswers[q.id] === q.correctIndex) {
      correctCount++;
    }
  });

  const scorePct = Math.round((correctCount / total) * 100);
  currentActiveQuiz.status = 'completed';
  currentActiveQuiz.lastScore = scorePct;

  // Close runner modal
  const runnerModal = document.getElementById('quiz-runner-modal');
  if (runnerModal) runnerModal.classList.remove('active');

  // Open Result Scorecard Modal
  openQuizScorecard(scorePct, correctCount, total);

  // Re-render catalog to show new score badge
  renderQuizzesCatalog();
}

/**
 * Display Scorecard Modal with Explanations
 */
function openQuizScorecard(scorePct, correctCount, total) {
  const resultModal = document.getElementById('quiz-result-modal');
  if (!resultModal || !currentActiveQuiz) return;

  document.getElementById('result-quiz-title').textContent = currentActiveQuiz.title;
  document.getElementById('result-score-number').textContent = `${scorePct}%`;
  document.getElementById('result-correct-count').textContent = `${correctCount} / ${total}`;
  document.getElementById('result-accuracy-stat').textContent = `${scorePct}%`;
  document.getElementById('result-points-earned').textContent = `+${currentActiveQuiz.xpReward} TRP`;

  const banner = document.getElementById('result-message-banner');
  if (scorePct >= 80) {
    banner.className = 'result-status-banner pass';
    banner.innerHTML = '🎉 Outstanding Performance! You demonstrated strong mastery of this assessment track.';
  } else if (scorePct >= 60) {
    banner.className = 'result-status-banner passing';
    banner.innerHTML = '👍 Good Effort! You passed the qualifying threshold. Review the explanations below to refine weak spots.';
  } else {
    banner.className = 'result-status-banner needs-work';
    banner.innerHTML = '💡 Keep Practicing! Re-review the solution breakdowns and retake to boost your LMS bracket rank.';
  }

  // Render question-by-question review
  const reviewContainer = document.getElementById('result-review-container');
  if (reviewContainer) {
    const letters = ['A', 'B', 'C', 'D'];
    reviewContainer.innerHTML = currentActiveQuiz.questions.map((q, idx) => {
      const userChoice = userAnswers[q.id];
      const isCorrect = userChoice === q.correctIndex;
      const wasAnswered = userChoice !== undefined;

      return `
        <div class="result-review-card ${isCorrect ? 'correct' : 'incorrect'}">
          <div class="result-review-header">
            <span class="result-review-pill ${isCorrect ? 'correct' : 'incorrect'}">
              ${isCorrect ? '✓ Correct' : (wasAnswered ? '✗ Incorrect' : '○ Unattempted')}
            </span>
            <span style="font-size: 0.75rem; color: #64748b; font-weight: 600;">Question ${idx + 1} • ${q.topic}</span>
          </div>

          <div class="result-review-q">${q.question}</div>

          <div class="result-review-options">
            ${q.options.map((opt, i) => {
              let optClass = '';
              if (i === q.correctIndex) optClass = 'opt-correct';
              else if (i === userChoice && !isCorrect) optClass = 'opt-user-wrong';

              return `
                <div class="review-opt-row ${optClass}">
                  <span class="review-opt-letter">${letters[i]}</span>
                  <span>${opt}</span>
                  ${i === q.correctIndex ? '<span class="review-check-tag">✓ Correct Answer</span>' : ''}
                  ${i === userChoice && !isCorrect ? '<span class="review-wrong-tag">Your Choice</span>' : ''}
                </div>
              `;
            }).join('')}
          </div>

          <div class="result-explanation-box">
            <strong>💡 Explanation:</strong> ${q.explanation}
          </div>
        </div>
      `;
    }).join('');
  }

  resultModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeQuizRunnerModal() {
  if (confirm('Are you sure you want to exit the assessment? Your active progress will be lost.')) {
    clearInterval(quizTimerInterval);
    const modal = document.getElementById('quiz-runner-modal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function closeQuizScorecardModal() {
  const modal = document.getElementById('quiz-result-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

/**
 * Faculty Course Quizzes Database (Accessed via Faculty-Provided Access Codes)
 */
const FACULTY_COURSE_QUIZZES = {
  'CSE-401': {
    code: 'CSE-401',
    aliases: ['DEVOPS-MID', 'CLOUD401'],
    courseName: 'Cloud DevOps & Microservices Architecture',
    courseId: 'c1',
    faculty: 'Dr. Vikram Malhotra (Ex-Google, Dean)',
    facultyAvatar: 'assets/avatars/avatar1.svg',
    title: 'Cloud DevOps & Microservices: Midterm Examination',
    category: 'web',
    categoryLabel: 'Course Exam • DevOps',
    difficulty: 'Hard',
    durationMinutes: 25,
    totalQuestions: 5,
    xpReward: 160,
    attempts: '680 students',
    passRate: '81%',
    isFacultyQuiz: true,
    description: 'Official university mid-term covering Docker containerization, Kubernetes pods, service meshes, and Twelve-Factor application architecture.',
    topics: ['Docker', 'Kubernetes', 'gRPC', 'Microservices'],
    questions: [
      {
        id: 'cq1',
        question: 'In Kubernetes architecture, what is the smallest deployable computing unit that shares the same network namespace and IP address?',
        options: [
          'Container',
          'Pod',
          'Deployment',
          'ConfigMap'
        ],
        correctIndex: 1,
        explanation: 'A Pod is the smallest execution unit in Kubernetes. Containers inside the same Pod share the same network namespace (localhost) and storage volumes.',
        topic: 'Kubernetes'
      },
      {
        id: 'cq2',
        question: 'Which Twelve-Factor App methodology principle dictates how application configuration should be handled across environments?',
        options: [
          'Hardcode secrets in repository branches',
          'Store configuration strictly in environment variables (Config factor)',
          'Store config in git submodules only',
          'Download config over FTP on boot'
        ],
        correctIndex: 1,
        explanation: 'Twelve-Factor App Factor III states that config must be strictly separated from code and provided via environment variables, ensuring zero config leakage into code repositories.',
        topic: 'Twelve-Factor Apps'
      },
      {
        id: 'cq3',
        question: 'Why is HTTP/2 multiplexing in gRPC superior to standard HTTP/1.1 REST APIs for inter-microservice communication?',
        options: [
          'It only works with XML payloads',
          'It enables bidirectional streaming and multiplexes multiple concurrent requests over a single TCP connection without head-of-line blocking',
          'HTTP/2 does not require TLS encryption',
          'It replaces CPU registers with GPU buffers'
        ],
        correctIndex: 1,
        explanation: 'gRPC uses HTTP/2 which multiplexes parallel RPC calls across a single persistent TCP connection using binary framing (Protobuf), drastically cutting socket handshake overhead.',
        topic: 'gRPC & Microservices'
      },
      {
        id: 'cq4',
        question: 'In a CI/CD pipeline, what distinguishes Blue/Green Deployment from Canary Deployment?',
        options: [
          'Blue/Green switches 100% of traffic to the new identical environment instantly, while Canary routes a small percentage of traffic (e.g. 5%) first to monitor error rates',
          'Canary requires two identical data centers',
          'Blue/Green requires manual FTP file uploads',
          'Canary deployments cannot be rolled back'
        ],
        correctIndex: 0,
        explanation: 'Blue/Green maintains two identical environments and switches the router instantly, whereas Canary incrementally rolls out the new version to a subset of users while telemetry is analyzed.',
        topic: 'CI/CD'
      },
      {
        id: 'cq5',
        question: 'What is the purpose of the Circuit Breaker pattern in distributed microservices (e.g. Netflix Hystrix / Resilience4j)?',
        options: [
          'To intentionally trip electrical switches in data centers',
          'To prevent cascading failure across dependent services by quickly returning a fallback response when downstream failure rates exceed a threshold',
          'To encrypt TLS certificates at runtime',
          'To delete obsolete database tables'
        ],
        correctIndex: 1,
        explanation: 'The Circuit Breaker prevents a failing downstream service from exhausting resources (threads, connections) across the entire system by failing fast and executing fallback logic.',
        topic: 'Resilience Patterns'
      }
    ]
  },
  'DSA-302': {
    code: 'DSA-302',
    aliases: ['ALGO-VIVA', 'DSA302'],
    courseName: 'Data Structures & Algorithms Mastery',
    courseId: 'c2',
    faculty: 'Prof. Tharindu Senanayake (Principal DSA Lead)',
    facultyAvatar: 'assets/avatars/avatar2.svg',
    title: 'Advanced Algorithms & Graph Theory: Faculty Lab Quiz',
    category: 'dsa',
    categoryLabel: 'Course Exam • DSA',
    difficulty: 'Medium',
    durationMinutes: 20,
    totalQuestions: 5,
    xpReward: 140,
    attempts: '940 students',
    passRate: '86%',
    isFacultyQuiz: true,
    description: 'Scheduled academic practical assessment on Segment Trees, Disjoint Set Union (DSU), and topological dag traversals.',
    topics: ['Segment Trees', 'DSU', 'Topological Sort', 'DAG'],
    questions: [
      {
        id: 'dsa_q1',
        question: 'What is the time complexity to query a range sum and update a point value in a Segment Tree of size N?',
        options: [
          'O(N) Query, O(1) Update',
          'O(log N) Query, O(log N) Update',
          'O(1) Query, O(N) Update',
          'O(N log N) for both'
        ],
        correctIndex: 1,
        explanation: 'Both point update and range query in a Segment Tree traverse the tree from root to leaf or examine at most 4 nodes per level, achieving O(log N) time.',
        topic: 'Segment Trees'
      },
      {
        id: 'dsa_q2',
        question: 'What is the nearly constant amortized time complexity of Disjoint Set Union (DSU) operations with Union by Rank and Path Compression?',
        options: [
          'O(log N)',
          'O(α(N)) - Inverse Ackermann function (≤ 4 for all practical N)',
          'O(N)',
          'O(1) strictly worst-case'
        ],
        correctIndex: 1,
        explanation: 'Combining path compression with union by rank guarantees that both find and union operations run in O(α(N)) amortized time, where α is the inverse Ackermann function.',
        topic: 'DSU'
      },
      {
        id: 'dsa_q3',
        question: 'Kahn’s Algorithm for Topological Sorting uses which traversal strategy and data structure to detect cycles?',
        options: [
          'DFS with recursion stack',
          'BFS with a Queue tracking nodes with in-degree equal to 0',
          'Bellman-Ford relaxation',
          'Binary Heap'
        ],
        correctIndex: 1,
        explanation: 'Kahn’s algorithm calculates in-degrees, pushes 0 in-degree nodes into a queue, and decrements neighbors. If the processed count is less than V, a cycle exists.',
        topic: 'Topological Sort'
      },
      {
        id: 'dsa_q4',
        question: 'In a Directed Acyclic Graph (DAG), what is the time complexity to find the Single Source Shortest Path using topological ordering?',
        options: [
          'O(V + E)',
          'O((V + E) log V)',
          'O(V * E)',
          'O(V²)'
        ],
        correctIndex: 0,
        explanation: 'By relaxing edges in topological order, each vertex and edge is examined exactly once, giving optimal linear time O(V + E), even with negative edge weights.',
        topic: 'DAG Algorithms'
      },
      {
        id: 'dsa_q5',
        question: 'What is the space complexity of an adjacency list representation of a sparse graph with V vertices and E edges?',
        options: [
          'O(V²)',
          'O(V + E)',
          'O(E²)',
          'O(V * log E)'
        ],
        correctIndex: 1,
        explanation: 'An adjacency list stores V vertex headers and exactly 2E (undirected) or E (directed) edge nodes, yielding O(V + E) optimal space.',
        topic: 'Graph Representation'
      }
    ]
  },
  'WEB-109': {
    code: 'WEB-109',
    aliases: ['REACT-TEST', 'WEB109'],
    courseName: 'Modern Frontend Architecture & React 19 Internals',
    courseId: 'c3',
    faculty: 'Ananya Sharma (Principal Frontend Lead)',
    facultyAvatar: 'assets/avatars/avatar3.svg',
    title: 'Modern Full-Stack Engineering: End-Term Assessment',
    category: 'web',
    categoryLabel: 'Course Exam • Web',
    difficulty: 'Medium',
    durationMinutes: 20,
    totalQuestions: 5,
    xpReward: 150,
    attempts: '810 students',
    passRate: '79%',
    isFacultyQuiz: true,
    description: 'Faculty-administered assessment evaluating Next.js App Router, React Server Actions, hydration boundary management, and WebSockets.',
    topics: ['Server Actions', 'Hydration', 'WebSockets', 'Next.js'],
    questions: [
      {
        id: 'web_q1',
        question: 'What causes a React hydration mismatch error when using Server-Side Rendering (SSR)?',
        options: [
          'Database query timeout on the backend',
          'Difference between the pre-rendered server HTML and the initial render tree produced by client-side JavaScript execution',
          'Browser disabling cookies',
          'CSS file not being minified'
        ],
        correctIndex: 1,
        explanation: 'Hydration mismatches occur when the initial client render produces a different DOM structure or text than the server-rendered HTML (e.g. using window.innerWidth or un-seeded dates during SSR).',
        topic: 'Hydration'
      },
      {
        id: 'web_q2',
        question: 'How do React 19 Server Actions handle form submission when JavaScript has failed or is disabled in the browser?',
        options: [
          'They cannot function without client JavaScript',
          'They progressively enhance standard HTML form POST submissions, submitting directly to the server endpoint without JavaScript',
          'They throw an unhandled promise rejection',
          'They redirect to a 404 page'
        ],
        correctIndex: 1,
        explanation: 'Server Actions support progressive enhancement. When passed to form action, they function as standard HTML form POST requests even before or without client JS hydration.',
        topic: 'Server Actions'
      },
      {
        id: 'web_q3',
        question: 'What HTTP status code and header does a browser client send to upgrade an HTTP connection to a full-duplex WebSocket connection?',
        options: [
          'Status 200 with Connection: keep-alive',
          'Status 101 Switching Protocols with Upgrade: websocket and Connection: Upgrade',
          'Status 301 Moved Permanently',
          'Status 204 No Content'
        ],
        correctIndex: 1,
        explanation: 'WebSocket handshakes begin with an HTTP GET containing Upgrade: websocket and Connection: Upgrade. The server acknowledges with HTTP 101 Switching Protocols.',
        topic: 'WebSockets'
      },
      {
        id: 'web_q4',
        question: 'Which HTTP caching header directive ensures a browser revalidates cached content with the origin server before using it?',
        options: [
          'Cache-Control: no-store',
          'Cache-Control: no-cache',
          'Cache-Control: public, max-age=31536000',
          'Cache-Control: immutable'
        ],
        correctIndex: 1,
        explanation: 'no-cache allows the client to store the response, but requires validating it with the origin server (using ETag or If-Modified-Since) before serving it from cache.',
        topic: 'HTTP Caching'
      },
      {
        id: 'web_q5',
        question: 'In modern CSS, what pseudo-class matches an input element only after the user has interacted with it and the value is invalid?',
        options: [
          ':invalid',
          ':user-invalid',
          ':focus-visible',
          ':out-of-range'
        ],
        correctIndex: 1,
        explanation: ':user-invalid only matches once the user has blurred or attempted to submit the form with an invalid field, avoiding eager premature error styling on initial page load.',
        topic: 'Modern CSS'
      }
    ]
  }
};

/**
 * Open Join Course Quiz Modal
 */
function openJoinCourseQuizModal() {
  const modal = document.getElementById('join-course-quiz-modal');
  if (modal) {
    modal.classList.add('active');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    const input = document.getElementById('course-quiz-code-input');
    if (input) {
      input.focus();
      if (input.value.trim() !== '') {
        checkCourseQuizCode(input.value);
      }
    }
  }
}

/**
 * Close Join Course Quiz Modal
 */
function closeJoinCourseQuizModal() {
  const modal = document.getElementById('join-course-quiz-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

/**
 * Find Quiz by Faculty Code or Alias
 */
function findFacultyQuizByCode(rawCode) {
  if (!rawCode) return null;
  const clean = rawCode.trim().toUpperCase();
  for (const key in FACULTY_COURSE_QUIZZES) {
    const q = FACULTY_COURSE_QUIZZES[key];
    if (q.code.toUpperCase() === clean) return q;
    if (q.aliases && q.aliases.some(a => a.toUpperCase() === clean)) return q;
  }
  return null;
}

/**
 * Real-time code preview in modal
 */
function checkCourseQuizCode(val) {
  const previewBox = document.getElementById('course-quiz-preview-box');
  const errorMsg = document.getElementById('course-quiz-error-msg');
  const joinBtn = document.getElementById('btn-submit-join-quiz');
  if (!previewBox) return;

  const quiz = findFacultyQuizByCode(val);

  if (quiz) {
    if (errorMsg) errorMsg.style.display = 'none';
    previewBox.style.display = 'block';
    if (joinBtn) joinBtn.disabled = false;

    previewBox.innerHTML = `
      <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 12px; padding: 14px 16px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
          <span style="background: #dcfce7; color: #15803d; font-size: 0.69rem; font-weight: 800; padding: 3px 8px; border-radius: 6px; letter-spacing: 0.04em;">✓ VERIFIED FACULTY CODE: ${quiz.code}</span>
          <span style="font-size: 0.72rem; color: #16a34a; font-weight: 700;">🟢 Active Examination</span>
        </div>
        <h4 style="margin: 0 0 4px 0; color: #0f172a; font-size: 0.98rem; font-weight: 800;">${quiz.title}</h4>
        <div style="font-size: 0.78rem; color: #334155; margin-bottom: 8px;">
          <strong>Course:</strong> ${quiz.courseName}
        </div>
        <div style="display: flex; align-items: center; gap: 10px; font-size: 0.74rem; color: #475569; flex-wrap: wrap;">
          <span>👨‍🏫 <strong>${quiz.faculty}</strong></span>
          <span>⏱️ ${quiz.durationMinutes} Mins</span>
          <span>📋 ${quiz.totalQuestions} Questions</span>
          <span style="color: #b45309; font-weight: 750;">⚡ +${quiz.xpReward} TRP</span>
        </div>
      </div>
    `;
  } else {
    previewBox.style.display = 'none';
    if (val.trim().length >= 3) {
      if (errorMsg) {
        errorMsg.style.display = 'block';
        errorMsg.textContent = 'Invalid access code. Please verify the code provided by your course faculty.';
      }
      if (joinBtn) joinBtn.disabled = true;
    } else {
      if (errorMsg) errorMsg.style.display = 'none';
      if (joinBtn) joinBtn.disabled = false;
    }
  }
}

/**
 * Click a quick sample code
 */
function quickFillQuizCode(code) {
  const input = document.getElementById('course-quiz-code-input');
  if (input) {
    input.value = code;
    checkCourseQuizCode(code);
  }
}

/**
 * Submit Course Code & Launch Exam
 */
function submitJoinCourseQuiz() {
  const input = document.getElementById('course-quiz-code-input');
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  const facultyQuiz = findFacultyQuizByCode(code);

  if (!facultyQuiz) {
    const errorMsg = document.getElementById('course-quiz-error-msg');
    if (errorMsg) {
      errorMsg.style.display = 'block';
      errorMsg.textContent = 'Please enter a valid course quiz code (e.g. CSE-401, DSA-302, WEB-109).';
    }
    if (typeof showToast === 'function') {
      showToast('Invalid access code. Please check with your faculty.', 'warning');
    }
    return;
  }

  // Check if already in TORPEDO_QUIZZES_DATA.quizzes, otherwise prepend
  const quizId = `faculty-${facultyQuiz.code.toLowerCase()}`;
  facultyQuiz.id = quizId;

  const exists = TORPEDO_QUIZZES_DATA.quizzes.some(q => q.id === quizId);
  if (!exists) {
    TORPEDO_QUIZZES_DATA.quizzes.unshift(facultyQuiz);
  }

  closeJoinCourseQuizModal();

  if (typeof showToast === 'function') {
    showToast(`Unlocked Faculty Assessment: ${facultyQuiz.title}`, 'success');
  }

  renderQuizzesCatalog();

  // Launch the proctored quiz runner immediately!
  startQuizRunner(quizId);
}

/**
 * Initialize Quizzes Portal Tab
 */
function initQuizzesPortal() {
  renderQuizzesCatalog();
}

// Global window exposure for robust click handlers
window.openJoinCourseQuizModal = openJoinCourseQuizModal;
window.closeJoinCourseQuizModal = closeJoinCourseQuizModal;
window.checkCourseQuizCode = checkCourseQuizCode;
window.quickFillQuizCode = quickFillQuizCode;
window.submitJoinCourseQuiz = submitJoinCourseQuiz;
window.findFacultyQuizByCode = findFacultyQuizByCode;
