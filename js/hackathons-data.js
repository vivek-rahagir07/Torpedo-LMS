/**
 * TORPEDO LEARNING - HACKATHONS & CODE SPRINTS REPOSITORY
 * Verified national, campus, and global hackathon drives with prize pools,
 * team formation, eligibility criteria, and submission deadlines.
 */

const TORPEDO_HACKATHONS_DATA = [
  {
    id: "hack-poly-01",
    title: "Polygon BUIDL India Sprint 2026",
    organizer: "Polygon Labs & Torpedo Learning",
    badgeLetter: "P",
    badgeBg: "linear-gradient(135deg, #7b3fe4 0%, #4c1d95 100%)",
    badgeColor: "#ffffff",
    prizePool: "₹5,00,000",
    prizeSub: "+ $10,000 Founder Grants",
    status: "Live Now",
    statusClass: "live",
    deadlineDays: 4,
    deadlineDate: "Nov 5, 2026",
    mode: "Virtual / Online",
    teamSize: "1 - 4 Members",
    category: "Web3",
    tags: ["Web3", "Solidity", "Zero Knowledge", "Smart Contracts", "DeFi"],
    description: "Build decentralized applications, high-speed ZK rollups, or next-gen DeFi protocols on Polygon. Top 3 teams receive fast-track angel accelerator pitches and SDE Web3 internships.",
    problemStatements: [
      "Cross-chain identity verification using ZK-proofs for students",
      "Micro-lending credit score protocol without KYC data leaks",
      "Gasless automated recurring subscriptions on EVM chains"
    ],
    timeline: [
      { step: "1", name: "Ideation & Proposal", date: "Oct 25" },
      { step: "2", name: "Prototype Submission", date: "Nov 5" },
      { step: "3", name: "Live Demo Day (Top 10)", date: "Nov 9" }
    ],
    registeredTeams: 342,
    sponsors: ["Polygon Labs", "Ethereum Foundation", "QuickNode"],
    featured: true
  },
  {
    id: "hack-gcp-02",
    title: "Google Cloud GenAI Innovators Challenge",
    organizer: "Google for Developers",
    badgeLetter: "G",
    badgeBg: "linear-gradient(135deg, #4285F4 0%, #0d47a1 100%)",
    badgeColor: "#ffffff",
    prizePool: "₹7,50,000",
    prizeSub: "+ $5,000 Vertex AI Credits",
    status: "Registration Open",
    statusClass: "open",
    deadlineDays: 8,
    deadlineDate: "Nov 9, 2026",
    mode: "Hybrid (Finals @ Google Blr)",
    teamSize: "2 - 4 Members",
    category: "AI/ML",
    tags: ["Generative AI", "Gemini API", "Python", "Cloud Run", "RAG"],
    description: "Harness Gemini 1.5 Pro and Flash to build intelligent multimodal agents, adaptive learning companions, or autonomous productivity copilots.",
    problemStatements: [
      "Real-time voice-interactive multilingual classroom tutor",
      "Automated legal & regulatory compliance auditor using RAG",
      "Multimodal medical report simplification for patients"
    ],
    timeline: [
      { step: "1", name: "Team Registration", date: "Nov 9" },
      { step: "2", name: "API Sprint & Build", date: "Nov 15" },
      { step: "3", name: "Google HQ Grand Finale", date: "Nov 22" }
    ],
    registeredTeams: 580,
    sponsors: ["Google Cloud", "TensorFlow", "Kaggle"],
    featured: true
  },
  {
    id: "hack-sih-03",
    title: "Smart India Hackathon 2026 (Internal GTU Qualifier)",
    organizer: "Ministry of Education & GTU",
    badgeLetter: "S",
    badgeBg: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)",
    badgeColor: "#ffffff",
    prizePool: "₹1,00,000",
    prizeSub: "+ Direct National SIH Nomination",
    status: "Closing Soon",
    statusClass: "urgent",
    deadlineDays: 2,
    deadlineDate: "Nov 3, 2026",
    mode: "GTU Campus / In-Person",
    teamSize: "6 Members (Min 1 Female)",
    category: "Campus",
    tags: ["IoT", "Clean Tech", "GovTech", "Smart Education", "Full Stack"],
    description: "Official internal university screening for SIH 2026. Top 5 teams will represent Gujarat Technological University at the National Grand Finale.",
    problemStatements: [
      "AI-driven crop disease detection via satellite imagery",
      "Dynamic traffic signal management with IoT camera feeds",
      "Digital verification of rural land registry records"
    ],
    timeline: [
      { step: "1", name: "Campus Pitch Round", date: "Nov 3" },
      { step: "2", name: "24-Hour Non-stop Hack", date: "Nov 4" },
      { step: "3", name: "Jury Announcement", date: "Nov 5" }
    ],
    registeredTeams: 88,
    sponsors: ["AICTE", "GTU Innovation Council", "Govt of Gujarat"],
    featured: false
  },
  {
    id: "hack-rzp-04",
    title: "Razorpay FT Innovate Hackfest (Fintech Systems)",
    organizer: "Razorpay Engineering",
    badgeLetter: "R",
    badgeBg: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
    badgeColor: "#ffffff",
    prizePool: "₹3,50,000",
    prizeSub: "+ Fast-Track SDE-1 PPI Offers",
    status: "Registration Open",
    statusClass: "open",
    deadlineDays: 12,
    deadlineDate: "Nov 13, 2026",
    mode: "Virtual",
    teamSize: "1 - 3 Members",
    category: "Fintech",
    tags: ["Fintech", "Go", "Distributed Systems", "Payments", "Kafka"],
    description: "Solve ultra-low latency transaction processing challenges, instant dispute reconciliations, and merchant cashflow analytics at 10,000+ TPS scale.",
    problemStatements: [
      "Sub-50ms fraud scoring pipeline for UPI transactions",
      "Automated cross-border currency hedging calculator",
      "Multi-tenant billing anomaly detector"
    ],
    timeline: [
      { step: "1", name: "Online Architecture Quiz", date: "Nov 13" },
      { step: "2", name: "36-Hour Hackathon", date: "Nov 18" },
      { step: "3", name: "Interview Fast-Track", date: "Nov 25" }
    ],
    registeredTeams: 215,
    sponsors: ["Razorpay", "AWS", "Redis Labs"],
    featured: false
  },
  {
    id: "hack-aws-05",
    title: "Kaggle & AWS Vision AI Grand Prix",
    organizer: "Kaggle & AWS ML Labs",
    badgeLetter: "A",
    badgeBg: "linear-gradient(135deg, #ff9900 0%, #b45309 100%)",
    badgeColor: "#ffffff",
    prizePool: "₹12,00,000",
    prizeSub: "($15,000 USD Global Pool)",
    status: "Live Now",
    statusClass: "live",
    deadlineDays: 18,
    deadlineDate: "Nov 19, 2026",
    mode: "Global Online",
    teamSize: "1 - 4 Members",
    category: "AI/ML",
    tags: ["PyTorch", "Computer Vision", "HuggingFace", "Transformers", "AWS"],
    description: "Benchmark vision-language models on edge-case scene reconstruction and autonomous aerial robotics video streams.",
    problemStatements: [
      "Zero-shot object localization in zero-visibility drone feeds",
      "Dense 3D bounding box prediction from sparse lidar scans"
    ],
    timeline: [
      { step: "1", name: "Public Dataset Release", date: "Oct 20" },
      { step: "2", name: "Benchmark Submissions", date: "Nov 19" },
      { step: "3", name: "Leaderboard Freeze", date: "Nov 22" }
    ],
    registeredTeams: 740,
    sponsors: ["AWS", "Kaggle", "Weights & Biases"],
    featured: false
  },
  {
    id: "hack-os-06",
    title: "Open Source Builder Sprint (Linux Foundation)",
    organizer: "Linux Foundation & Torpedo LMS",
    badgeLetter: "L",
    badgeBg: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
    badgeColor: "#ffffff",
    prizePool: "₹2,00,000",
    prizeSub: "+ 200 TRP Bonus + Swag Boxes",
    status: "Live Now",
    statusClass: "live",
    deadlineDays: 22,
    deadlineDate: "Nov 23, 2026",
    mode: "Remote / Async",
    teamSize: "Individual or Pair",
    category: "Open Source",
    tags: ["Open Source", "Rust", "TypeScript", "Linux", "Git"],
    description: "Submit verified pull requests to curated open source developer tooling, security scanners, or kernel utilities to claim student developer bounties.",
    problemStatements: [
      "Add HTTP/3 client bindings to Rust memory-safe proxy",
      "Build VS Code extension for AST visualization"
    ],
    timeline: [
      { step: "1", name: "Issue Claiming", date: "Nov 1" },
      { step: "2", name: "Merged PR Verification", date: "Nov 23" },
      { step: "3", name: "Certificate Issuance", date: "Nov 26" }
    ],
    registeredTeams: 1240,
    sponsors: ["Linux Foundation", "GitHub", "Cloud Native Foundation"],
    featured: false
  },
  {
    id: "hack-oai-07",
    title: "OpenAI & Anthropic Autonomous Agent Sprint 2026",
    organizer: "OpenAI Dev Community & Torpedo Learning",
    badgeLetter: "O",
    badgeBg: "linear-gradient(135deg, #10a37f 0%, #0d8c6c 100%)",
    badgeColor: "#ffffff",
    prizePool: "₹8,00,000",
    prizeSub: "+ $10,000 API Compute Credits",
    status: "Live Now",
    statusClass: "live",
    deadlineDays: 14,
    deadlineDate: "Nov 20, 2026",
    mode: "Virtual / Global",
    teamSize: "1 - 4 Members",
    category: "AI/ML",
    tags: ["Autonomous Agents", "LLMs", "Tool Use", "Python", "LangChain"],
    description: "Design multi-agent autonomous engineering assistants that write tests, self-heal runtime exceptions, and automate complex workflows.",
    problemStatements: [
      "Autonomous sandbox debugger that replicates bug reports and proposes pull requests",
      "Multi-agent collaborative research analyst with citation verification"
    ],
    timeline: [
      { step: "1", name: "Agent Registration", date: "Nov 6" },
      { step: "2", name: "Evaluation Benchmark", date: "Nov 20" },
      { step: "3", name: "Virtual Showcase", date: "Nov 24" }
    ],
    registeredTeams: 610,
    sponsors: ["OpenAI", "Anthropic", "Y Combinator"],
    featured: true
  },
  {
    id: "hack-ms-08",
    title: "Microsoft Azure Zero-Trust CyberShield Sprint",
    organizer: "Microsoft Security & Torpedo LMS",
    badgeLetter: "M",
    badgeBg: "linear-gradient(135deg, #0078d4 0%, #004578 100%)",
    badgeColor: "#ffffff",
    prizePool: "₹6,00,000",
    prizeSub: "+ Azure Cloud Vouchers + PPIs",
    status: "Registration Open",
    statusClass: "open",
    deadlineDays: 25,
    deadlineDate: "Dec 1, 2026",
    mode: "Virtual",
    teamSize: "2 - 4 Members",
    category: "Cybersecurity",
    tags: ["Cybersecurity", "Zero Trust", "Azure", "Threat Detection", "Rust"],
    description: "Build automated threat detection probes, memory-safe network firewalls, and cryptographic verifiable identity protocols for cloud-native infrastructure.",
    problemStatements: [
      "Real-time eBPF anomaly detection engine for container clusters",
      "Post-quantum resistant key exchange for decentralized web apps"
    ],
    timeline: [
      { step: "1", name: "Threat Briefing", date: "Nov 10" },
      { step: "2", name: "Prototype Build", date: "Dec 1" },
      { step: "3", name: "Blue Team Defense Day", date: "Dec 5" }
    ],
    registeredTeams: 380,
    sponsors: ["Microsoft Azure", "CrowdStrike", "Cloudflare"],
    featured: false
  }
];

const INITIAL_REGISTERED_TEAMS = [];

