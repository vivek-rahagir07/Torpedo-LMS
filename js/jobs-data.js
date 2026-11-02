/**
 * Torpedo Learning - Jobs & Internships Dataset
 * Verified corporate hiring partners, SDE internships, and graduate engineering roles.
 */

const TORPEDO_JOBS_DATA = [
  {
    id: "job-google-swe-intern",
    title: "Software Engineering Intern - Summer 2026",
    company: "Google",
    logoColor: "#4285f4",
    logoBg: "#eff6ff",
    logoLetter: "G",
    location: "Bengaluru, Karnataka",
    workMode: "Hybrid",
    type: "Internship",
    duration: "3 - 6 Months",
    stipendSalary: "₹1,25,000 / month",
    compensationValue: 125000,
    batch: "2026 & 2027 Batch",
    department: "Core Systems & Infrastructure",
    experience: "Freshers / Students",
    trpRequired: 600,
    matchRate: 96,
    applicantsCount: 284,
    deadlineDays: 4,
    featured: true,
    urgent: true,
    tags: ["DSA", "C++", "Java", "Distributed Systems", "Algorithms"],
    aboutCompany: "Google's mission is to organize the world's information and make it universally accessible and useful. Through products like Search, Maps, Cloud, Android, and YouTube, billions of people navigate their lives daily.",
    description: "As a Software Engineering Intern at Google, you will work on our core consumer and cloud products, critical infrastructure, and breakthrough technologies. You will collaborate with elite engineers and research scientists to develop scalable distributed architectures.",
    responsibilities: [
      "Design, implement, test, and release robust software components and services.",
      "Analyze and optimize algorithmic complexity, cache locality, and latency profiles.",
      "Participate in design reviews, peer code audits, and sprint planning sessions.",
      "Work closely with product managers and site reliability engineers."
    ],
    requirements: [
      "Pursuing a Bachelor's or Master's degree in Computer Science, IT, or related technical field graduating in 2026/2027.",
      "Demonstrated proficiency in C++, Java, Python, or Go with strong computer science fundamentals.",
      "Solid foundation in Data Structures, Algorithms, Complexity Analysis, and Operating Systems.",
      "Familiarity with Git, unit testing, and Linux command-line environments."
    ],
    hiringRounds: [
      { step: 1, name: "Torpedo Screening & TRP Evaluation", desc: "Shortlist based on DSA rank & verified LeetCode/Lifecode track" },
      { step: 2, name: "Google Online Coding Challenge", desc: "2 Complex Algorithmic problems (90 mins)" },
      { step: 3, name: "Technical Interview I", desc: "Data Structures, Trees, Graphs & Dynamic Programming" },
      { step: 4, name: "Technical Interview II & Hiring Committee", desc: "System Design intuition & Engineering problem-solving" }
    ],
    prepTopics: ["Binary Search", "Dynamic Programming", "Graph / BFS", "Tree Traversal"],
    postedDaysAgo: 1
  },
  {
    id: "job-microsoft-sde1",
    title: "Software Engineer (SDE-1) - Azure Cloud",
    company: "Microsoft",
    logoColor: "#00a4ef",
    logoBg: "#f0fdf4",
    logoLetter: "MS",
    location: "Hyderabad, Telangana",
    workMode: "Hybrid",
    type: "Full-Time",
    duration: "Permanent",
    stipendSalary: "₹24 - ₹28 LPA",
    compensationValue: 2600000,
    batch: "2025 & 2026 Batch",
    department: "Azure Cloud & AI Platform",
    experience: "0 - 1 Years",
    trpRequired: 550,
    matchRate: 94,
    applicantsCount: 412,
    deadlineDays: 6,
    featured: true,
    urgent: false,
    tags: ["C#", ".NET Core", "Azure", "Microservices", "REST APIs"],
    aboutCompany: "Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge. Azure powers mission-critical cloud computing for the world's largest enterprises.",
    description: "Join the Azure Cloud Infrastructure team building hyperscale cloud services. You will design resilient backend microservices handling millions of transactions per second with zero-downtime tolerance.",
    responsibilities: [
      "Architect and code scalable cloud microservices running on Azure Kubernetes Service.",
      "Implement resilient API telemetry, structured logging, and automated failure-recovery pipelines.",
      "Collaborate across international teams spanning Redmond, Dublin, and Hyderabad."
    ],
    requirements: [
      "B.Tech/B.E. in CSE, Information Technology, or equivalent degree.",
      "Strong coding proficiency in C#, C++, Java, or Go.",
      "Sound understanding of Object-Oriented Design, Microservices, and Relational Databases."
    ],
    hiringRounds: [
      { step: 1, name: "Online Coding Assessment", desc: "3 algorithmic challenges on DSA & Matrix operations" },
      { step: 2, name: "Technical Round I", desc: "Data Structures & Low-Level Design" },
      { step: 3, name: "Technical Round II", desc: "Concurrency, Multithreading & DB Locking" },
      { step: 4, name: "AA (As-Appropriate) Interview", desc: "Engineering mindset and leadership values" }
    ],
    prepTopics: ["Design", "Array", "Heap / Priority Queue", "Databases & SQL"],
    postedDaysAgo: 2
  },
  {
    id: "job-razorpay-backend-intern",
    title: "Backend SDE Intern (Payments Gateway)",
    company: "Razorpay",
    logoColor: "#0c2340",
    logoBg: "#e0f2fe",
    logoLetter: "R",
    location: "Bengaluru, Karnataka",
    workMode: "On-site",
    type: "Internship",
    duration: "6 Months (PPO Opportunity)",
    stipendSalary: "₹50,000 / month",
    compensationValue: 50000,
    batch: "2026 Batch",
    department: "Core Payments Engine",
    experience: "Final Year Students",
    trpRequired: 400,
    matchRate: 98,
    applicantsCount: 168,
    deadlineDays: 3,
    featured: true,
    urgent: true,
    tags: ["Go", "Node.js", "MySQL", "Kafka", "Redis"],
    aboutCompany: "Razorpay is India's leading full-stack financial solutions company powering frictionless digital payments for millions of businesses, startups, and enterprises.",
    description: "Work on the high-throughput payment routing infrastructure that powers UPI, credit card tokenization, and instant settlements across India.",
    responsibilities: [
      "Build high-throughput idempotent payment APIs with sub-50ms latency.",
      "Integrate Kafka event streaming for real-time reconciliation and fraud monitoring.",
      "Write unit and integration tests achieving 90%+ code coverage."
    ],
    requirements: [
      "Strong understanding of Node.js, Go, or Python.",
      "Deep understanding of relational databases (MySQL/PostgreSQL), transactions, and indexes.",
      "Knowledge of caching layers (Redis) and message queues."
    ],
    hiringRounds: [
      { step: 1, name: "Resume & TRP Verification", desc: "Shortlisting on Torpedo LMS score" },
      { step: 2, name: "Online Machine Coding Round", desc: "Build an API prototype with concurrency control (90m)" },
      { step: 3, name: "Technical Interview", desc: "Deep dive into OS, DB transactions (ACID), and DSA" },
      { step: 4, name: "HR & Offer Discussion", desc: "Internship terms and PPO conversion criteria" }
    ],
    prepTopics: ["Databases & SQL", "Hash Table", "Concurrency", "Two Pointers"],
    postedDaysAgo: 1
  },
  {
    id: "job-swiggy-frontend-sde",
    title: "Associate Frontend Engineer",
    company: "Swiggy",
    logoColor: "#fc8019",
    logoBg: "#fff7ed",
    logoLetter: "S",
    location: "Remote / Bengaluru",
    workMode: "Remote",
    type: "Full-Time",
    duration: "Permanent",
    stipendSalary: "₹16 - ₹20 LPA",
    compensationValue: 1800000,
    batch: "2025 & 2026 Batch",
    department: "Consumer Web & Instamart",
    experience: "0 - 2 Years",
    trpRequired: 450,
    matchRate: 92,
    applicantsCount: 310,
    deadlineDays: 8,
    featured: false,
    urgent: false,
    tags: ["React", "TypeScript", "Next.js", "Redux", "Web Performance"],
    aboutCompany: "Swiggy is India's leading on-demand convenience platform, connecting consumers with restaurants, grocery stores, and local delivery partners across 500+ cities.",
    description: "Create pixel-perfect, hyper-optimized web and mobile web experiences for over 100 million active consumers across Swiggy Food and Instamart.",
    responsibilities: [
      "Build component libraries adhering strictly to WCAG accessibility and Core Web Vitals (LCP < 1.8s).",
      "Optimize client-side bundle size, route pre-fetching, and responsive state synchronization.",
      "Implement real-time order tracking with WebSockets and Server-Sent Events."
    ],
    requirements: [
      "Solid expertise in React, modern JavaScript (ES6+), TypeScript, and CSS architecture.",
      "Strong understanding of DOM rendering cycles, hydration, and browser performance.",
      "Familiarity with state management libraries (Redux Toolkit, Zustand, or TanStack Query)."
    ],
    hiringRounds: [
      { step: 1, name: "Frontend Online Assessment", desc: "JS fundamentals, DOM manipulation & algorithmic logic" },
      { step: 2, name: "Machine Coding Live Round", desc: "Build a responsive infinite-scroll component in React" },
      { step: 3, name: "Frontend Architecture & Web Vitals", desc: "Deep dive into networking, cache headers, and SSR" },
      { step: 4, name: "Managerial Round", desc: "Culture alignment and product thinking" }
    ],
    prepTopics: ["Sliding Window", "String", "Full Stack Web", "Modern Web APIs"],
    postedDaysAgo: 3
  },
  {
    id: "job-cred-fullstack-dev",
    title: "Full Stack Engineer (Growth & Rewards)",
    company: "CRED",
    logoColor: "#171717",
    logoBg: "#f5f5f5",
    logoLetter: "CR",
    location: "Bengaluru, Karnataka",
    workMode: "On-site",
    type: "Full-Time",
    duration: "Permanent",
    stipendSalary: "₹22 - ₹30 LPA",
    compensationValue: 2600000,
    batch: "2025 & 2026 Batch",
    department: "Member Experience",
    experience: "0 - 2 Years",
    trpRequired: 650,
    matchRate: 88,
    applicantsCount: 195,
    deadlineDays: 5,
    featured: true,
    urgent: true,
    tags: ["React", "Kotlin", "Spring Boot", "PostgreSQL", "Kafka"],
    aboutCompany: "CRED is a high-trust community of creditworthy individuals, financial institutions, and modern brands delivering premium experiences and rewards.",
    description: "We are looking for engineers with an uncompromising eye for product design, seamless micro-interactions, and bulletproof backend transaction integrity.",
    responsibilities: [
      "Craft fluid micro-animations, gamified reward carousels, and robust server-side APIs.",
      "Ensure sub-second response times across high-traffic flash event spikes.",
      "Work closely with our product designers and financial risk teams."
    ],
    requirements: [
      "Hands-on experience building full-stack applications with React/Next.js and Java/Kotlin or Go.",
      "Appreciation for design, typography, and frontend craftsmanship.",
      "Demonstrated ability to write clean, maintainable, modular code."
    ],
    hiringRounds: [
      { step: 1, name: "Design & Code Hackathon", desc: "Build a creative financial UI with live API mocking" },
      { step: 2, name: "Technical Architecture Round", desc: "State management, event-driven architecture, and caching" },
      { step: 3, name: "Systems & DSA Problem Solving", desc: "Advanced data structures & optimization" },
      { step: 4, name: "Founder / Executive Chat", desc: "Product vision and cultural fit" }
    ],
    prepTopics: ["Design", "Dynamic Programming", "Heap / Priority Queue", "Full Stack Web"],
    postedDaysAgo: 2
  },
  {
    id: "job-amazon-sde-intern",
    title: "Software Development Engineer Intern (AWS)",
    company: "Amazon",
    logoColor: "#ff9900",
    logoBg: "#fffbeb",
    logoLetter: "A",
    location: "Hyderabad / Bengaluru",
    workMode: "Hybrid",
    type: "Internship",
    duration: "6 Months",
    stipendSalary: "₹1,10,000 / month",
    compensationValue: 110000,
    batch: "2026 Batch",
    department: "Amazon Web Services (AWS)",
    experience: "Pre-Final / Final Year",
    trpRequired: 500,
    matchRate: 95,
    applicantsCount: 520,
    deadlineDays: 7,
    featured: true,
    urgent: false,
    tags: ["Java", "AWS", "DynamoDB", "Cloud Computing", "OOP"],
    aboutCompany: "Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking.",
    description: "Join AWS building enterprise cloud services used by Netflix, Airbnb, and millions of businesses worldwide. You'll gain real-world ownership of cloud features deployed into production.",
    responsibilities: [
      "Develop secure, scalable distributed cloud features using Java and AWS serverless stack.",
      "Instrument synthetic monitoring, automated testing, and CI/CD pipelines.",
      "Participate in operational reviews and root-cause analysis sessions."
    ],
    requirements: [
      "Enrolled in B.Tech/M.Tech Computer Science or related degree graduating in 2026.",
      "Strong coding proficiency in Java, C++, or Python.",
      "Solid understanding of CS fundamentals: algorithms, data structures, and computer networks."
    ],
    hiringRounds: [
      { step: 1, name: "Amazon OA (Online Assessment)", desc: "2 DSA questions + Work Styles Simulation" },
      { step: 2, name: "Technical Interview I", desc: "DSA (Trees, Graphs, Hash Maps) + Leadership Principles" },
      { step: 3, name: "Technical Interview II", desc: "Low-Level Design (LLD), Object-Oriented Modeling" }
    ],
    prepTopics: ["Tree", "Graph / BFS", "Stack", "Design"],
    postedDaysAgo: 4
  },
  {
    id: "job-atlassian-sde",
    title: "Graduate Software Engineer (Systems)",
    company: "Atlassian",
    logoColor: "#0052cc",
    logoBg: "#eff6ff",
    logoLetter: "AT",
    location: "Bengaluru, Karnataka (Remote First)",
    workMode: "Remote",
    type: "Full-Time",
    duration: "Permanent",
    stipendSalary: "₹28 - ₹34 LPA",
    compensationValue: 3100000,
    batch: "2025 & 2026 Batch",
    department: "Jira & Confluence Cloud Core",
    experience: "Freshers / 0-1 Yrs",
    trpRequired: 700,
    matchRate: 85,
    applicantsCount: 380,
    deadlineDays: 9,
    featured: true,
    urgent: false,
    tags: ["Java", "Kotlin", "Distributed Systems", "AWS", "PostgreSQL"],
    aboutCompany: "Atlassian builds collaboration software like Jira, Confluence, and Bitbucket that powers modern teamwork across millions of companies worldwide.",
    description: "Join Atlassian's distributed systems group scaling cloud data storage, live collaboration engines, and real-time synchronization engines.",
    responsibilities: [
      "Write high-quality, fault-tolerant backend services in Kotlin and Java.",
      "Contribute to distributed query engines handling billions of daily operations.",
      "Drive observability improvements with OpenTelemetry, Grafana, and AWS CloudWatch."
    ],
    requirements: [
      "Degree in Computer Science or Software Engineering.",
      "Strong algorithm and system design foundation.",
      "Deep interest in concurrency, data consistency models, and cloud infrastructure."
    ],
    hiringRounds: [
      { step: 1, name: "HackerRank Coding Challenge", desc: "2 Algorithmic DSA questions" },
      { step: 2, name: "Technical Pair Programming", desc: "Code an interactive problem live with a Senior Engineer" },
      { step: 3, name: "System Design & Architecture", desc: "Design a high-scale service component" },
      { step: 4, name: "Values & Teamwork Interview", desc: "Open Company No Bullshit alignment" }
    ],
    prepTopics: ["Dynamic Programming", "Graph / BFS", "Heap / Priority Queue", "Design"],
    postedDaysAgo: 5
  },
  {
    id: "job-zerodha-frontend-perf",
    title: "Frontend & Performance Engineer",
    company: "Zerodha",
    logoColor: "#387ed1",
    logoBg: "#eff6ff",
    logoLetter: "Z",
    location: "Bengaluru, Karnataka",
    workMode: "On-site",
    type: "Full-Time",
    duration: "Permanent",
    stipendSalary: "₹18 - ₹24 LPA",
    compensationValue: 2100000,
    batch: "2025 & 2026 Batch",
    department: "Kite Trading Platform",
    experience: "0 - 2 Years",
    trpRequired: 400,
    matchRate: 91,
    applicantsCount: 225,
    deadlineDays: 5,
    featured: false,
    urgent: false,
    tags: ["Vue.js", "Vanilla JS", "WebSockets", "Canvas", "Performance"],
    aboutCompany: "Zerodha is India's largest stockbroker, pioneering zero-brokerage investing and building ultra-fast, minimalist financial tools with an engineering-first culture.",
    description: "Work on Kite Web, rendering 60 FPS live market charts, order ticks, and millions of concurrent WebSocket updates with lightweight, dependency-free JavaScript.",
    responsibilities: [
      "Develop high-performance financial charts and trading tables using HTML5 Canvas & WebGL.",
      "Optimize WebSocket binary data unpacking and real-time state mutation.",
      "Champion minimalist web design with zero unnecessary third-party libraries."
    ],
    requirements: [
      "Mastery of modern JavaScript, DOM internals, Canvas API, and WebSockets.",
      "Passion for building lightning-fast web UIs that load in under 500ms.",
      "Comfortable reading and profiling browser memory allocations and frame rates."
    ],
    hiringRounds: [
      { step: 1, name: "Offline Coding Task", desc: "Build a miniature WebSocket ticker or chart renderer" },
      { step: 2, name: "Code Review & Architecture Discussion", desc: "Reviewing code choices with core tech leads" },
      { step: 3, name: "Culture & Philosophy Discussion", desc: "Engineering independence and open source philosophy" }
    ],
    prepTopics: ["Sliding Window", "Binary Search", "Full Stack Web"],
    postedDaysAgo: 3
  },
  {
    id: "job-flipkart-sde-grad",
    title: "Graduate SDE - Supply Chain Tech",
    company: "Flipkart",
    logoColor: "#2874f0",
    logoBg: "#eff6ff",
    logoLetter: "F",
    location: "Bengaluru, Karnataka",
    workMode: "Hybrid",
    type: "Full-Time",
    duration: "Permanent",
    stipendSalary: "₹18 - ₹22 LPA",
    compensationValue: 2000000,
    batch: "2025 & 2026 Batch",
    department: "Logistics & Fulfillment Tech",
    experience: "Freshers / 2025-2026 Grad",
    trpRequired: 480,
    matchRate: 93,
    applicantsCount: 340,
    deadlineDays: 6,
    featured: false,
    urgent: true,
    tags: ["Java", "Spring Boot", "MySQL", "Kafka", "DSA"],
    aboutCompany: "Flipkart is India's homegrown e-commerce marketplace leading innovation in retail, logistics, hyper-local grocery, and fintech ecosystems.",
    description: "Build automated fulfillment routing algorithms, package tracking microservices, and warehouse inventory optimization systems for millions of daily orders.",
    responsibilities: [
      "Design and deploy Java backend microservices on Flipkart Cloud.",
      "Solve combinatorial optimization problems for order batching and delivery dispatch.",
      "Monitor system health, error budgets, and performance metrics."
    ],
    requirements: [
      "Degree in Computer Science or related branch graduating in 2025 or 2026.",
      "Strong knowledge of Data Structures, Algorithms, and Object-Oriented Programming.",
      "Basic understanding of SQL, caching, and distributed message queues."
    ],
    hiringRounds: [
      { step: 1, name: "Flipkart GRiD Online Test", desc: "Coding round with 3 DSA questions" },
      { step: 2, name: "Problem Solving & Data Structures", desc: "Live coding on algorithmic efficiency" },
      { step: 3, name: "Machine Coding & Object-Oriented Design", desc: "Design a working subsystem with clean classes" },
      { step: 4, name: "Hiring Manager Round", desc: "Discussion on past projects and team dynamics" }
    ],
    prepTopics: ["Array", "Linked List", "Dynamic Programming", "Databases & SQL"],
    postedDaysAgo: 4
  },
  {
    id: "job-uber-swe-intern",
    title: "Software Engineering Intern - Maps & Routing",
    company: "Uber",
    logoColor: "#000000",
    logoBg: "#f4f4f5",
    logoLetter: "U",
    location: "Hyderabad, Telangana",
    workMode: "Hybrid",
    type: "Internship",
    duration: "6 Months",
    stipendSalary: "₹1,15,000 / month",
    compensationValue: 115000,
    batch: "2026 Batch",
    department: "Rider & Driver Routing Algorithms",
    experience: "Final Year Students",
    trpRequired: 620,
    matchRate: 89,
    applicantsCount: 290,
    deadlineDays: 5,
    featured: true,
    urgent: false,
    tags: ["Go", "Java", "Spatial Algorithms", "Graphs", "Distributed Systems"],
    aboutCompany: "Uber revolutionizes mobility and delivery across 70+ countries, moving people and things with technology, algorithms, and real-time dispatch systems.",
    description: "Work on shortest-path routing, graph partitioning, and spatial indexing algorithms determining optimal driver-rider matching in milliseconds.",
    responsibilities: [
      "Implement graph routing optimizations using Dijkstra, A*, and contraction hierarchies.",
      "Benchmark throughput and memory consumption across real-time GPS coordinate feeds.",
      "Integrate automated integration tests into Uber's global monorepo."
    ],
    requirements: [
      "Strong expertise in Data Structures, particularly Graphs, Priority Queues, and Geometry.",
      "Proficiency in Go, Java, C++, or Python.",
      "Curiosity about large-scale real-time engineering problems."
    ],
    hiringRounds: [
      { step: 1, name: "Online Code Screen", desc: "2 algorithmic graph / DP questions" },
      { step: 2, name: "Technical Interview I", desc: "Advanced Graph Algorithms & Complexity" },
      { step: 3, name: "Technical Interview II", desc: "Concurrency & Low Level System Design" }
    ],
    prepTopics: ["Graph / BFS", "Heap / Priority Queue", "Two Pointers"],
    postedDaysAgo: 3
  },
  {
    id: "job-postman-devrel-intern",
    title: "Developer Experience & API Engineer Intern",
    company: "Postman",
    logoColor: "#ff6c37",
    logoBg: "#fff7ed",
    logoLetter: "P",
    location: "Remote (All India)",
    workMode: "Remote",
    type: "Internship",
    duration: "6 Months",
    stipendSalary: "₹45,000 / month",
    compensationValue: 45000,
    batch: "2026 Batch",
    department: "API Ecosystem & Developer Tools",
    experience: "Students / Freshers",
    trpRequired: 300,
    matchRate: 97,
    applicantsCount: 142,
    deadlineDays: 7,
    featured: false,
    urgent: true,
    tags: ["Node.js", "APIs", "REST", "GraphQL", "Technical Writing"],
    aboutCompany: "Postman is the world's leading API platform used by over 30 million developers and 500,000 organizations to design, test, document, and collaborate on APIs.",
    description: "Help build and test public API workspaces, automated Newman collection runners, and developer documentation guides for the global API ecosystem.",
    responsibilities: [
      "Build reference API collections, mock servers, and interactive Postman flows.",
      "Test SDK integrations across Node.js, Python, and Go.",
      "Write technical tutorials explaining RESTful standards and webhook architectures."
    ],
    requirements: [
      "Clear understanding of HTTP methods, status codes, headers, and JSON payloads.",
      "Hands-on coding experience in JavaScript or Python.",
      "Passion for developer tooling, open source, and technical writing."
    ],
    hiringRounds: [
      { step: 1, name: "API Practical Challenge", desc: "Create a Postman collection testing a public API" },
      { step: 2, name: "Technical Interview", desc: "HTTP, networking, JS async, and problem solving" },
      { step: 3, name: "Team Alignment & Offer", desc: "Internship goals and onboarding" }
    ],
    prepTopics: ["Full Stack Web", "String", "Databases & SQL"],
    postedDaysAgo: 2
  },
  {
    id: "job-phonepe-sde-core",
    title: "Software Engineer - Payments Platform",
    company: "PhonePe",
    logoColor: "#6739b7",
    logoBg: "#f3e8ff",
    logoLetter: "PP",
    location: "Pune, Maharashtra",
    workMode: "Hybrid",
    type: "Full-Time",
    duration: "Permanent",
    stipendSalary: "₹20 - ₹26 LPA",
    compensationValue: 2300000,
    batch: "2025 & 2026 Batch",
    department: "UPI & Merchant Settlements",
    experience: "0 - 2 Years",
    trpRequired: 520,
    matchRate: 92,
    applicantsCount: 260,
    deadlineDays: 4,
    featured: false,
    urgent: false,
    tags: ["Java", "HBase", "Kafka", "Aerospike", "Microservices"],
    aboutCompany: "PhonePe is India's leading digital payments and financial services company processing over 6 billion monthly transactions on UPI.",
    description: "Build ultra-reliable payment settlement microservices that process tens of thousands of transactions per second during national peak sales events.",
    responsibilities: [
      "Design fault-tolerant distributed transaction workflows with zero data loss guarantee.",
      "Tune NoSQL key-value stores (Aerospike/HBase) for single-digit millisecond latency.",
      "Contribute to real-time reconciliation pipelines using Apache Flink and Kafka."
    ],
    requirements: [
      "Bachelor's degree in Computer Science, IT, or equivalent engineering disciplines.",
      "Solid knowledge of Java, distributed database fundamentals, and concurrency.",
      "Deep understanding of ACID properties and distributed consensus concepts."
    ],
    hiringRounds: [
      { step: 1, name: "Online Coding Test", desc: "3 DSA challenges with strict time & memory limits" },
      { step: 2, name: "Data Structures & Problem Solving", desc: "Live whiteboard session with principal engineer" },
      { step: 3, name: "Low-Level Design (LLD)", desc: "Design a rate limiter or concurrent payment queue" },
      { step: 4, name: "Director / HR Round", desc: "Culture and behavioral alignment" }
    ],
    prepTopics: ["Design", "Array", "Stack", "Databases & SQL"],
    postedDaysAgo: 3
  },
  {
    id: "job-oracle-cloud-sde",
    title: "Cloud Infrastructure Engineer (OCI)",
    company: "Oracle",
    logoColor: "#f80000",
    logoBg: "#fef2f2",
    logoLetter: "O",
    location: "Pune / Bengaluru",
    workMode: "Hybrid",
    type: "Full-Time",
    duration: "Permanent",
    stipendSalary: "₹15 - ₹19 LPA",
    compensationValue: 1700000,
    batch: "2025 & 2026 Batch",
    department: "Oracle Cloud Infrastructure (OCI)",
    experience: "Freshers / 0-1 Yrs",
    trpRequired: 420,
    matchRate: 94,
    applicantsCount: 210,
    deadlineDays: 8,
    featured: false,
    urgent: false,
    tags: ["Java", "Python", "Linux", "Terraform", "OCI"],
    aboutCompany: "Oracle is a global enterprise cloud and database leader powering critical operations for top Fortune 500 corporations and financial institutions.",
    description: "Help build the next generation of cloud storage, compute orchestration, and enterprise networking services on Oracle Cloud Infrastructure (OCI).",
    responsibilities: [
      "Develop automated provisioning scripts and microservice APIs for OCI Compute.",
      "Investigate hardware telemetry, network packet drops, and hypervisor efficiency.",
      "Write comprehensive test automation suites in Python and Java."
    ],
    requirements: [
      "B.E./B.Tech in Computer Science, IT, or Electronics & Communication.",
      "Strong understanding of Linux systems, networking protocols, and scripting.",
      "Good command over Data Structures and Object-Oriented principles."
    ],
    hiringRounds: [
      { step: 1, name: "Aptitude & Coding Assessment", desc: "CS fundamentals + 2 programming questions" },
      { step: 2, name: "Technical Interview I", desc: "OS internals, Memory management, and DSA" },
      { step: 3, name: "Technical Interview II", desc: "Networking (TCP/IP), Databases, and Problem solving" },
      { step: 4, name: "HR Fitment Round", desc: "Compensation and role briefing" }
    ],
    prepTopics: ["OS & Networks", "Databases & SQL", "Binary Search"],
    postedDaysAgo: 5
  },
  {
    id: "job-cisco-security-sde",
    title: "Network Security & Software Engineer",
    company: "Cisco Systems",
    logoColor: "#1ba0d7",
    logoBg: "#f0fdfa",
    logoLetter: "C",
    location: "Bengaluru, Karnataka",
    workMode: "Hybrid",
    type: "Full-Time",
    duration: "Permanent",
    stipendSalary: "₹17 - ₹21 LPA",
    compensationValue: 1900000,
    batch: "2025 & 2026 Batch",
    department: "Secure Cloud Architecture",
    experience: "Freshers / 2025 Grad",
    trpRequired: 460,
    matchRate: 90,
    applicantsCount: 185,
    deadlineDays: 10,
    featured: false,
    urgent: false,
    tags: ["Python", "C++", "Networking", "Cybersecurity", "Docker"],
    aboutCompany: "Cisco is the worldwide leader in technology that powers the Internet, delivering innovative networking, security, collaboration, and cloud solutions.",
    description: "Design and implement high-speed packet inspection microservices, zero-trust cryptographic protocols, and automated threat mitigation pipelines.",
    responsibilities: [
      "Write multi-threaded C++ and Python services for real-time traffic analysis.",
      "Implement cryptographic handshakes, TLS termination, and firewall policies.",
      "Containerize microservices with Docker and deploy to Kubernetes clusters."
    ],
    requirements: [
      "Strong grasp of Computer Networks (OSI layers, TCP/IP, DNS, Routing, Firewalls).",
      "Proficiency in Python or C++ programming.",
      "Knowledge of basic cybersecurity principles and operating systems."
    ],
    hiringRounds: [
      { step: 1, name: "Cisco Ideathon / Online Test", desc: "Networking MCQs + 2 algorithmic coding problems" },
      { step: 2, name: "Technical Round I", desc: "Deep dive into Networks, Sockets, and DSA" },
      { step: 3, name: "Technical Round II", desc: "Security architecture, Linux, and code design" },
      { step: 4, name: "Managerial & HR Round", desc: "Values and career goals" }
    ],
    prepTopics: ["OS & Networks", "Binary Search", "Hash Table"],
    postedDaysAgo: 6
  },
  {
    id: "job-jio-ai-intern",
    title: "AI & Python Software Intern",
    company: "Jio Platforms",
    logoColor: "#0a2885",
    logoBg: "#eff6ff",
    logoLetter: "JIO",
    location: "Navi Mumbai, Maharashtra",
    workMode: "Hybrid",
    type: "Internship",
    duration: "6 Months",
    stipendSalary: "₹35,000 / month",
    compensationValue: 35000,
    batch: "2026 Batch",
    department: "Jio AI & Cloud Labs",
    experience: "Pre-Final / Final Year",
    trpRequired: 350,
    matchRate: 95,
    applicantsCount: 198,
    deadlineDays: 5,
    featured: false,
    urgent: true,
    tags: ["Python", "FastAPI", "PyTorch", "NLP", "PostgreSQL"],
    aboutCompany: "Jio Platforms is transforming India's digital landscape across telecom, enterprise cloud, 5G, streaming entertainment, and indigenous AI technologies.",
    description: "Work with Jio's AI Research group building high-throughput inference APIs, LLM document summarization agents, and voice-assisted customer interfaces.",
    responsibilities: [
      "Build and optimize asynchronous REST APIs in FastAPI and Python.",
      "Benchmark model latency on TensorRT and deploy inference microservices.",
      "Process high-volume tabular and text datasets for model fine-tuning."
    ],
    requirements: [
      "Hands-on experience with Python, NumPy, Pandas, and modern web frameworks.",
      "Understanding of Machine Learning and Natural Language Processing concepts.",
      "Familiarity with SQL and Docker."
    ],
    hiringRounds: [
      { step: 1, name: "Online Coding Test", desc: "Python algorithmic logic & data manipulation" },
      { step: 2, name: "Technical Interview", desc: "Machine learning basics, FastAPI, and CS fundamentals" },
      { step: 3, name: "HR Discussion", desc: "Internship agreement and schedule" }
    ],
    prepTopics: ["Array", "Hash Table", "Databases & SQL"],
    postedDaysAgo: 1
  },
  {
    id: "job-zomato-mobile-eng",
    title: "Associate Product Engineer (Mobile & React Native)",
    company: "Zomato",
    logoColor: "#cb202d",
    logoBg: "#fef2f2",
    logoLetter: "ZOM",
    location: "Gurugram, Haryana",
    workMode: "On-site",
    type: "Full-Time",
    duration: "Permanent",
    stipendSalary: "₹16 - ₹22 LPA",
    compensationValue: 1900000,
    batch: "2025 & 2026 Batch",
    department: "Consumer Mobile Experience",
    experience: "0 - 2 Years",
    trpRequired: 440,
    matchRate: 91,
    applicantsCount: 174,
    deadlineDays: 7,
    featured: false,
    urgent: false,
    tags: ["React Native", "TypeScript", "Redux", "iOS / Android", "UI/UX"],
    aboutCompany: "Zomato is a leading food services and quick commerce company, helping millions of users discover great food and delivering happiness in minutes.",
    description: "Ship high-impact consumer mobile features used by tens of millions of daily diners and foodies across India with fluid 60fps animations.",
    responsibilities: [
      "Build cross-platform mobile features in React Native and TypeScript.",
      "Optimize app startup time, JS bundle execution, and native bridge communications.",
      "Work directly with product designers to prototype next-generation food discovery interactions."
    ],
    requirements: [
      "Strong foundation in React, React Native, TypeScript, and state management.",
      "Understanding of native mobile concepts (iOS CocoaPods, Android Gradle).",
      "Obsession with micro-interactions, layout polish, and zero jank."
    ],
    hiringRounds: [
      { step: 1, name: "Take-home Mobile App Task", desc: "Build a mini restaurant feed with filters and cart" },
      { step: 2, name: "Technical Deep Dive", desc: "React Native internals, re-render profiling & state" },
      { step: 3, name: "Product & Culture Fit", desc: "Fast-paced ownership and design intuition" }
    ],
    prepTopics: ["Full Stack Web", "Two Pointers", "Sliding Window"],
    postedDaysAgo: 4
  }
];

// Initial mock applied jobs for Student Vivek Yadav
const INITIAL_APPLIED_JOBS = [
  {
    jobId: "job-google-swe-intern",
    appliedDate: "Yesterday, 04:30 PM",
    status: "Shortlisted",
    stageText: "Technical Interview Scheduled for Nov 4",
    statusBadgeClass: "status-shortlisted"
  },
  {
    jobId: "job-razorpay-backend-intern",
    appliedDate: "3 days ago",
    status: "Applied",
    stageText: "Application Under Recruiter Review",
    statusBadgeClass: "status-applied"
  }
];

if (typeof window !== 'undefined') {
  window.TORPEDO_JOBS_DATA = TORPEDO_JOBS_DATA;
  window.INITIAL_APPLIED_JOBS = INITIAL_APPLIED_JOBS;
}

