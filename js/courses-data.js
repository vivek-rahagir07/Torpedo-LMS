/**
 * Torpedo LMS - Catalog Data & Sandbox Previews
 */

const TORPEDO_DATA = {
  categories: [
    { id: 'all', name: 'All Categories', count: '1,200+' },
    { id: 'development', name: 'Design & Development', count: '250+' },
    { id: 'marketing', name: 'Marketing & Communication', count: '350+' },
    { id: 'digital-marketing', name: 'Digital Marketing', count: '150+' },
    { id: 'business', name: 'Business & Consulting', count: '170+' },
    { id: 'finance', name: 'Finance Management', count: '220+' },
    { id: 'self-dev', name: 'Self Development', count: '90+' }
  ],

  courses: [
    {
      id: 'c1',
      category: 'development',
      title: 'Full-Stack Distributed Systems & Microservices',
      instructor: 'Dr. Vikram Malhotra (Ex-Google, Dean)',
      rating: 4.95,
      reviews: 1420,
      students: '12,450',
      duration: '16 Weeks',
      badge: 'Placement Fast-Track',
      badgeClass: 'badge-hot',
      techIcons: ['⚡', '🐳', '🦀'],
      price: '₹14,999',
      syllabusPreview: [
        'Week 1-3: Low-Level Concurrency & Memory Models in Rust/Go',
        'Week 4-7: gRPC, Protocol Buffers & High-Throughput Event Streaming',
        'Week 8-11: Distributed Consensus (Raft/Paxos) & Sharded Storage',
        'Week 12-16: Kubernetes Orchestration, Chaos Testing & Capstone Defense'
      ]
    },
    {
      id: 'c2',
      category: 'development',
      title: 'Modern Frontend Architecture & React 19 Internals',
      instructor: 'Ananya Sharma (Principal Frontend Lead)',
      rating: 4.92,
      reviews: 980,
      students: '8,920',
      duration: '12 Weeks',
      badge: 'Bestseller',
      badgeClass: 'badge-bestseller',
      techIcons: ['⚛️', '✨', '🎨'],
      price: '₹11,999',
      syllabusPreview: [
        'Week 1-3: React 19 Server Actions, Compiler & Fiber Reconciler',
        'Week 4-6: State Management at Scale & Web Vitals CWV Optimization',
        'Week 7-9: Design Systems Architecture with Tailwind & Modern Tokens',
        'Week 10-12: End-to-End Enterprise App with Lifecode VM Sandbox'
      ]
    },
    {
      id: 'c3',
      category: 'development',
      title: 'Autonomous AI Agents & Large Language Model Systems',
      instructor: 'Prof. R. Sengupta (IIT Delhi, AI Research)',
      rating: 4.98,
      reviews: 2100,
      students: '15,800',
      duration: '14 Weeks',
      badge: 'Hot Track',
      badgeClass: 'badge-hot',
      techIcons: ['🤖', '🧠', '🐍'],
      price: '₹16,499',
      syllabusPreview: [
        'Week 1-3: Transformer Architectures, Quantization & Fine-Tuning',
        'Week 4-6: Vector DBs, Hierarchical RAG Pipelines & Semantic Caching',
        'Week 7-10: Multi-Agent Loops with MCP, Function Calling & Evals',
        'Week 11-14: Production Latency Benchmarking & Capstone Deployment'
      ]
    },
    {
      id: 'c4',
      category: 'marketing',
      title: 'Strategic Brand Growth & Product Positioning',
      instructor: 'Pooja Kashyap (Chief Brand Officer)',
      rating: 4.88,
      reviews: 640,
      students: '6,100',
      duration: '8 Weeks',
      badge: 'Executive',
      badgeClass: 'badge-bestseller',
      techIcons: ['📢', '🎯', '🚀'],
      price: '₹8,999',
      syllabusPreview: [
        'Week 1-2: Core Market Segmentation & Quantitative ICP Discovery',
        'Week 3-4: Category Creation Frameworks & Narrative Architecture',
        'Week 5-6: Omnichannel GTM Campaign Engineering',
        'Week 7-8: Retention Loops, Viral Coefficients & Executive Review'
      ]
    },
    {
      id: 'c5',
      category: 'finance',
      title: 'Algorithmic Financial Engineering & Portfolio Optimization',
      instructor: 'Karan Mehra (Quant Strategist, Mumbai)',
      rating: 4.91,
      reviews: 810,
      students: '7,340',
      duration: '10 Weeks',
      badge: 'Industry Standard',
      badgeClass: 'badge-bestseller',
      techIcons: ['📊', '💹', '📈'],
      price: '₹12,499',
      syllabusPreview: [
        'Week 1-3: Stochastic Calculus, Risk Metrics & Monte Carlo Simulators',
        'Week 4-6: Python for Backtesting Alpha Strategies & Slippage Modeling',
        'Week 7-8: High-Frequency Data Feed Parsing & Market Microstructure',
        'Week 9-10: Live Paper Trading Sandbox Execution'
      ]
    },
    {
      id: 'c6',
      category: 'digital-marketing',
      title: 'Data-Driven Performance Marketing & Funnel Optimization',
      instructor: 'Rohan Deshmukh (Growth VP)',
      rating: 4.89,
      reviews: 740,
      students: '9,200',
      duration: '8 Weeks',
      badge: 'High ROI',
      badgeClass: 'badge-hot',
      techIcons: ['🔍', '📱', '💎'],
      price: '₹7,999',
      syllabusPreview: [
        'Week 1-2: Multi-Touch Attribution & Privacy-First Tracking Stack',
        'Week 3-4: Algorithmic Ad Bidding Strategies (Google/Meta)',
        'Week 5-6: Landing Page Conversion Rate Optimization (CRO)',
        'Week 7-8: Capstone ₹1L Scaled Campaign Case Study'
      ]
    }
  ],

  codeSnippets: {
    javascript: `// Torpedo Lifecode VM - In-Browser JavaScript Sandbox
function calculateSkillMastery(student) {
  const { completedModules, sandboxCommits, mockScore } = student;
  const competencyRating = (completedModules * 0.4) + (sandboxCommits * 0.3) + (mockScore * 0.3);
  
  return {
    student: student.name,
    score: Math.round(competencyRating),
    status: competencyRating >= 85 ? 'Verified Placement Ready 🚀' : 'Progressing 📈',
    badge: 'Blockchain Credential Issued'
  };
}

const harsh = {
  name: "Harsh Vardhan",
  completedModules: 94,
  sandboxCommits: 88,
  mockScore: 92
};

console.log("Analyzing Torpedo Student Portfolio...");
console.log(calculateSkillMastery(harsh));`,

    python: `# Torpedo Lifecode VM - Python 3.12 Runtime
class TorpedoPipeline:
    def __init__(self, candidate_name, track):
        self.candidate = candidate_name
        self.track = track
        self.metrics = {"dsa_score": 96, "system_design": 92, "ai_mock_status": "Passed"}

    def run_ats_match(self):
        print(f"Executing ATS Placement scan for {self.candidate} ({self.track})...")
        hiring_partners = ["Stripe", "Amazon", "Databricks", "Razorpay"]
        return {
            "candidate": self.candidate,
            "matched_partners": hiring_partners[:3],
            "salary_range": "24 - 36 LPA",
            "readiness": "100% Certified"
        }

student = TorpedoPipeline("Priya Nair", "Autonomous AI Track")
print(student.run_ats_match())`,

    sql: `-- Torpedo Lifecode - Live SQL Analytics
SELECT 
    c.track_name,
    COUNT(s.student_id) AS total_enrolled,
    ROUND(AVG(s.placement_salary_lpa), 2) AS avg_package_lpa,
    SUM(CASE WHEN s.hired_status = 'HIRED' THEN 1 ELSE 0 END) AS fast_tracked_offers
FROM torpedo_students s
JOIN torpedo_curriculum c ON s.course_id = c.id
GROUP BY c.track_name
ORDER BY avg_package_lpa DESC;`
  }
};
