<?php
/**
 * Torpedo LMS - Database Connection & Bootstrapper (SQLite)
 */

class Database {
    private static ?PDO $instance = null;

    public static function getConnection(): PDO {
        if (self::$instance === null) {
            $dbDir = __DIR__;
            $dbPath = $dbDir . '/torpedo.sqlite';
            $isNew = !file_exists($dbPath);

            self::$instance = new PDO("sqlite:" . $dbPath);
            self::$instance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            self::$instance->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

            if ($isNew) {
                self::initializeSchema();
            }
        }
        return self::$instance;
    }

    public static function initializeSchema(): void {
        $pdo = self::getConnection();
        $schemaSql = file_get_contents(__DIR__ . '/schema.sql');
        $pdo->exec($schemaSql);
        self::seedInitialData($pdo);
    }

    private static function seedInitialData(PDO $pdo): void {
        // 1. Seed Courses
        $courses = [
            [
                'id' => 'c1',
                'category' => 'development',
                'title' => 'Full-Stack Distributed Systems & Microservices',
                'instructor' => 'Dr. Vikram Malhotra (Ex-Google, Dean)',
                'rating' => 4.95,
                'reviews' => 1420,
                'students' => '12,450',
                'duration' => '16 Weeks',
                'badge' => 'Placement Fast-Track',
                'badge_class' => 'badge-hot',
                'price' => '₹14,999',
                'syllabus' => json_encode([
                    'Week 1-3: Low-Level Concurrency & Memory Models in Rust/Go',
                    'Week 4-7: gRPC, Protocol Buffers & High-Throughput Event Streaming',
                    'Week 8-11: Distributed Consensus (Raft/Paxos) & Sharded Storage',
                    'Week 12-16: Kubernetes Orchestration, Chaos Testing & Capstone Defense'
                ])
            ],
            [
                'id' => 'c2',
                'category' => 'development',
                'title' => 'Modern Frontend Architecture & React 19 Internals',
                'instructor' => 'Ananya Sharma (Principal Frontend Lead)',
                'rating' => 4.92,
                'reviews' => 980,
                'students' => '8,920',
                'duration' => '12 Weeks',
                'badge' => 'Bestseller',
                'badge_class' => 'badge-bestseller',
                'price' => '₹11,999',
                'syllabus' => json_encode([
                    'Week 1-3: React 19 Server Actions, Compiler & Fiber Reconciler',
                    'Week 4-6: State Management at Scale & Web Vitals CWV Optimization',
                    'Week 7-9: Design Systems Architecture with Tailwind & Modern Tokens',
                    'Week 10-12: End-to-End Enterprise App with Lifecode VM Sandbox'
                ])
            ],
            [
                'id' => 'c3',
                'category' => 'development',
                'title' => 'Autonomous AI Agents & Large Language Model Systems',
                'instructor' => 'Prof. R. Sengupta (IIT Delhi, AI Research)',
                'rating' => 4.98,
                'reviews' => 2100,
                'students' => '15,800',
                'duration' => '14 Weeks',
                'badge' => 'Hot Track',
                'badge_class' => 'badge-hot',
                'price' => '₹16,999',
                'syllabus' => json_encode([
                    'Week 1-3: LLM Foundations, Quantization & KV Cache Architecture',
                    'Week 4-7: Autonomous Agent Loops, Planning & Function Calling',
                    'Week 8-10: Advanced RAG with Graph Search, Re-ranking & Context Caching',
                    'Week 11-14: Model Context Protocol (MCP) Multi-Agent Production Systems'
                ])
            ]
        ];

        $stmt = $pdo->prepare("INSERT OR IGNORE INTO courses (id, category, title, instructor, rating, reviews, students, duration, badge, badge_class, price, syllabus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        foreach ($courses as $c) {
            $stmt->execute([
                $c['id'], $c['category'], $c['title'], $c['instructor'],
                $c['rating'], $c['reviews'], $c['students'], $c['duration'],
                $c['badge'], $c['badge_class'], $c['price'], $c['syllabus']
            ]);
        }

        // 2. Seed Default Verified Accounts (Vivek Yadav Student, Faculty, Employer, Super Admin)
        $pwHash = password_hash('password123', PASSWORD_BCRYPT);
        $adminPwHash = password_hash('admin123', PASSWORD_BCRYPT);

        // 1. STUDENT ACCOUNT (Vivek Yadav - GTU CSE 2026)
        $pdo->prepare("INSERT OR REPLACE INTO users (id, name, email, password_hash, role, avatar_url) VALUES (?, ?, ?, ?, ?, ?)")
            ->execute([1, 'Vivek Yadav', 'vivek.hr362007@gmail.com', $pwHash, 'student', 'assets/avatars/robot1.svg']);
        
        $pdo->prepare("INSERT OR REPLACE INTO candidate_profiles (id, user_id, first_name, last_name, email, phone, dob, gender, address, city, state, pincode, avatar_path, tenth_school, tenth_board, tenth_year, tenth_percentage, tenth_cert_path, twelfth_college, twelfth_board, twelfth_stream, twelfth_year, twelfth_percentage, twelfth_cert_path, grad_degree, grad_college, grad_branch, grad_year, grad_cgpa, grad_cert_path, resume_path, id_proof_path, track, target_role, verification_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
            ->execute([
                1, 1, 'Vivek', 'Yadav', 'vivek.hr362007@gmail.com', '+91 9876543210', '2004-03-15', 'male',
                'Chandkheda Campus Corridor', 'Ahmedabad', 'Gujarat', '382424',
                'assets/avatars/robot1.svg',
                'Delhi Public School (DPS)', 'CBSE', 2020, '94.6%', 'storage/uploads/certificates/tenth_marksheet.pdf',
                'Kendriya Vidyalaya', 'CBSE', 'Science (PCM & Computer Science)', 2022, '92.8%', 'storage/uploads/certificates/12th_marksheet.pdf',
                'B.Tech in Computer Science & Engineering', 'Gujarat Technological University (GTU), Ahmedabad', 'Computer Science & Engineering', 2026, '8.85 CGPA', 'storage/uploads/certificates/degree_certificate.pdf',
                'storage/uploads/resumes/vivek_yadav_resume.pdf', 'storage/uploads/id_proofs/gtu_student_id.pdf',
                'Full-Stack Distributed Systems & Microservices', 'Backend Distributed Systems Engineer', 'verified'
            ]);

        // Student Course Enrollments (Vivek Yadav)
        $pdo->prepare("INSERT OR REPLACE INTO enrollments (id, user_email, course_id, progress_percentage) VALUES (?, ?, ?, ?)")
            ->execute([1, 'vivek.hr362007@gmail.com', 'c1', 30]);
        $pdo->prepare("INSERT OR REPLACE INTO enrollments (id, user_email, course_id, progress_percentage) VALUES (?, ?, ?, ?)")
            ->execute([2, 'vivek.hr362007@gmail.com', 'c2', 70]);
        $pdo->prepare("INSERT OR REPLACE INTO enrollments (id, user_email, course_id, progress_percentage) VALUES (?, ?, ?, ?)")
            ->execute([3, 'vivek.hr362007@gmail.com', 'c3', 100]);

        // 2. FACULTY ACCOUNT (Prof. Dr. Vikram Malhotra)
        $pdo->prepare("INSERT OR REPLACE INTO users (id, name, email, password_hash, role, avatar_url) VALUES (?, ?, ?, ?, ?, ?)")
            ->execute([2, 'Prof. Dr. Vikram Malhotra', 'faculty@torpedo.edu', $pwHash, 'instructor', 'assets/avatars/robot1.svg']);

        $pdo->prepare("INSERT OR REPLACE INTO faculty_profiles (id, user_id, salutation, first_name, last_name, email, phone, designation, institution, department, experience_years, phd_specialization, phd_university, teaching_domains, engagement_type, verification_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
            ->execute([
                1, 2, 'Prof. Dr.', 'Vikram', 'Malhotra', 'faculty@torpedo.edu', '+91 9811223344',
                'Professor & Department Chair', 'IIT Delhi', 'Department of Computer Science & Engineering', '12+ Years',
                'Distributed Systems & Consensus Protocols', 'IIT Delhi',
                json_encode(['Distributed Systems', 'Cloud DevOps', 'Autonomous AI Agents']),
                'lead_instructor', 'council_approved'
            ]);

        // 3. EMPLOYER ACCOUNT (Vivek - Razorpay Talent Acquisition)
        $pdo->prepare("INSERT OR REPLACE INTO users (id, name, email, password_hash, role, avatar_url) VALUES (?, ?, ?, ?, ?, ?)")
            ->execute([3, 'Vivek (Razorpay)', 'recruiter@torpedo.com', $pwHash, 'employer', 'assets/employer_avatar.jpg']);

        $pdo->prepare("INSERT OR REPLACE INTO employer_profiles (id, user_id, company_name, company_website, recruiter_name, recruiter_designation, email, phone, hq_location, industry, company_size, cin_gst_number, incorporation_cert_path, hiring_roles, hiring_volume, ctc_bracket, required_tech_stack, partnership_mode, verification_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
            ->execute([
                1, 3, 'Razorpay Software Private Limited', 'https://razorpay.com', 'Vivek', 'Head of Campus & Engineering Talent',
                'recruiter@torpedo.com', '+91 9876543210', 'Bengaluru, Karnataka',
                'Fintech & Enterprise Payment Infrastructure', '2,500+ Employees', 'U72200KA2013PTC097389',
                'storage/uploads/employers/company_incorporation_cert.pdf',
                json_encode(['Backend SDE Intern (Payments)', 'Cloud Infrastructure Engineer', 'Full-Stack Platform Engineer']),
                '20 - 50 Annual Hires', '₹18L - ₹32L / yr (Internship: ₹50,000 / mo)',
                'Go, Node.js, MySQL, Kafka, Redis, Distributed Systems',
                'tier1_partner', 'tier1_partner'
            ]);

        // 4. SUPER ADMIN ACCOUNT (Full Authority)
        $pdo->prepare("INSERT OR REPLACE INTO users (id, name, email, password_hash, role, avatar_url) VALUES (?, ?, ?, ?, ?, ?)")
            ->execute([4, 'Torpedo Super Admin', 'admin@torpedo.edu', $adminPwHash, 'admin', 'assets/admin_avatar.jpg']);

        // 5. Seed Enterprise Job Openings
        $jobs = [
            [
                'id' => 'job-rzp-01',
                'title' => 'Backend SDE Intern (Payments Gateway)',
                'company' => 'Razorpay',
                'company_logo' => 'R',
                'location' => 'Bengaluru, Karnataka',
                'work_mode' => 'On-site',
                'job_type' => 'Internship',
                'stipend' => '₹50,000 / month',
                'batch' => '2026 Batch',
                'description' => 'Work on the high-throughput payment routing infrastructure that powers UPI, credit card tokenization, and instant settlements across India.',
                'skills' => json_encode(['Go', 'Node.js', 'MySQL', 'Kafka', 'Redis']),
                'match_score' => 98,
                'applicants_count' => 168,
                'urgent' => 1,
                'days_left' => 3
            ],
            [
                'id' => 'job-postman-02',
                'title' => 'Developer Experience & API Engineer Intern',
                'company' => 'Postman',
                'company_logo' => 'P',
                'location' => 'Remote (All India)',
                'work_mode' => 'Remote',
                'job_type' => 'Internship',
                'stipend' => '₹45,000 / month',
                'batch' => '2026 Batch',
                'description' => 'Help build and test public API workspaces, automated Newman collection runners, and developer documentation guides for the global API ecosystem.',
                'skills' => json_encode(['Node.js', 'APIs', 'REST', 'GraphQL', 'Technical Writing']),
                'match_score' => 97,
                'applicants_count' => 142,
                'urgent' => 1,
                'days_left' => 7
            ],
            [
                'id' => 'job-goog-03',
                'title' => 'Software Engineering Intern - Summer 2026',
                'company' => 'Google',
                'company_logo' => 'G',
                'location' => 'Bengaluru, Karnataka',
                'work_mode' => 'On-site',
                'job_type' => 'Internship',
                'stipend' => '₹1,25,000 / month',
                'batch' => '2026 Batch',
                'description' => 'Collaborate with Google engineering teams on distributed systems, developer tools, search infrastructure, or machine learning pipelines.',
                'skills' => json_encode(['C++', 'Java', 'Python', 'Algorithms', 'Data Structures']),
                'match_score' => 96,
                'applicants_count' => 320,
                'urgent' => 0,
                'days_left' => 12
            ],
            [
                'id' => 'job-amzn-04',
                'title' => 'Software Development Engineer Intern (AWS)',
                'company' => 'Amazon',
                'company_logo' => 'A',
                'location' => 'Hyderabad / Bengaluru',
                'work_mode' => 'Hybrid',
                'job_type' => 'Internship',
                'stipend' => '₹1,10,000 / month',
                'batch' => '2026 Batch',
                'description' => 'Build high-availability AWS cloud platform microservices, database engine integrations, and high-concurrency client SDKs.',
                'skills' => json_encode(['Java', 'Distributed Systems', 'AWS', 'Microservices', 'SQL']),
                'match_score' => 94,
                'applicants_count' => 285,
                'urgent' => 0,
                'days_left' => 9
            ],
            [
                'id' => 'job-cred-05',
                'title' => 'Full-Stack Platform Engineer (Fintech Core)',
                'company' => 'CRED',
                'company_logo' => 'C',
                'location' => 'Bengaluru, Karnataka',
                'work_mode' => 'On-site',
                'job_type' => 'Full-Time',
                'stipend' => '₹18,00,000 - ₹24,00,000 / year',
                'batch' => 'Freshers',
                'description' => 'Architect zero-latency reactive user interfaces and resilient backend microservices processing billions of dollars in daily transactions.',
                'skills' => json_encode(['React', 'TypeScript', 'Go', 'Kafka', 'PostgreSQL']),
                'match_score' => 95,
                'applicants_count' => 195,
                'urgent' => 1,
                'days_left' => 5
            ],
            [
                'id' => 'job-swiggy-06',
                'title' => 'SDE-1 (Delivery Logistics & Concurrency)',
                'company' => 'Swiggy',
                'company_logo' => 'S',
                'location' => 'Bengaluru, Karnataka',
                'work_mode' => 'Hybrid',
                'job_type' => 'Full-Time',
                'stipend' => '₹16,00,000 - ₹22,00,000 / year',
                'batch' => 'Freshers',
                'description' => 'Scale order dispatch routing algorithms, geospatial indexing clusters, and real-time partner event loops under peak meal-hour traffic.',
                'skills' => json_encode(['Java', 'Spring Boot', 'Redis', 'Kafka', 'Distributed Systems']),
                'match_score' => 92,
                'applicants_count' => 176,
                'urgent' => 0,
                'days_left' => 8
            ]
        ];

        $stmtJob = $pdo->prepare("INSERT OR REPLACE INTO jobs (id, title, company, company_logo, location, work_mode, job_type, stipend, batch, description, skills, match_score, applicants_count, urgent, days_left) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        foreach ($jobs as $j) {
            $stmtJob->execute([
                $j['id'], $j['title'], $j['company'], $j['company_logo'],
                $j['location'], $j['work_mode'], $j['job_type'], $j['stipend'],
                $j['batch'], $j['description'], $j['skills'], $j['match_score'],
                $j['applicants_count'], $j['urgent'], $j['days_left']
            ]);
        }

        // 6. Seed Application for Vivek Yadav (Razorpay - Applied)
        $pdo->prepare("INSERT OR REPLACE INTO job_applications (id, job_id, user_email, candidate_name, match_score, status) VALUES (?, ?, ?, ?, ?, ?)")
            ->execute([1, 'job-rzp-01', 'vivek.hr362007@gmail.com', 'Vivek Yadav', 98, 'Applied']);

        // 7. Seed Verified Hackathons
        $hacks = [
            [
                'id' => 'hack-polygon-01',
                'title' => 'Polygon BUIDL Demo Day (ZK Track)',
                'organizer' => 'Polygon Labs & Ethereum Foundation',
                'banner_img' => 'assets/hackathons/polygon-buidl.webp',
                'prize_pool' => '$20,000 (~₹16.5 Lakhs)',
                'format' => 'Hybrid',
                'domain' => 'Web3',
                'start_date' => 'Nov 14, 2026',
                'duration' => '48 Hours',
                'participants_count' => 1240,
                'status' => 'Open',
                'description' => 'Build high-throughput zero-knowledge rollup applications, decentralized identity bridges, and gas-optimized EVM smart contracts.'
            ],
            [
                'id' => 'hack-ai-02',
                'title' => 'Global AI Agents & LLM Systems Sprint',
                'organizer' => 'LangGraph, Anthropic & Torpedo',
                'banner_img' => 'assets/hackathons/ai-agents.webp',
                'prize_pool' => '$25,000 (~₹20.8 Lakhs)',
                'format' => 'Online',
                'domain' => 'AI & LLM',
                'start_date' => 'Nov 20, 2026',
                'duration' => '72 Hours',
                'participants_count' => 1890,
                'status' => 'Open',
                'description' => 'Create autonomous multi-agent teams using Model Context Protocol (MCP), dynamic tool invocation, and self-correcting code generation workflows.'
            ],
            [
                'id' => 'hack-fintech-03',
                'title' => 'Razorpay Open Fintech Challenge',
                'organizer' => 'Razorpay & NPCI',
                'banner_img' => 'assets/hackathons/razorpay-fintech.webp',
                'prize_pool' => '$15,000 (~₹12.5 Lakhs)',
                'format' => 'Online',
                'domain' => 'Fintech',
                'start_date' => 'Nov 28, 2026',
                'duration' => '36 Hours',
                'participants_count' => 960,
                'status' => 'Open',
                'description' => 'Engineer ultra-low-latency UPI transaction routers, fraud detection graphs, and real-time biometric merchant settlement pipelines.'
            ],
            [
                'id' => 'hack-cloud-04',
                'title' => 'Cloud Native Kubernetes Infrastructure Sprint',
                'organizer' => 'CNCF & Linux Foundation',
                'banner_img' => 'assets/hackathons/cloud-native.webp',
                'prize_pool' => '$18,000 (~₹15.0 Lakhs)',
                'format' => 'Online',
                'domain' => 'Cloud',
                'start_date' => 'Dec 05, 2026',
                'duration' => '48 Hours',
                'participants_count' => 840,
                'status' => 'Upcoming',
                'description' => 'Deploy custom Kubernetes operators, service mesh traffic balancers (Envoy/Istio), and automated chaos engineering drills.'
            ]
        ];

        $stmtHack = $pdo->prepare("INSERT OR REPLACE INTO hackathons (id, title, organizer, banner_img, prize_pool, format, domain, start_date, duration, participants_count, status, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        foreach ($hacks as $h) {
            $stmtHack->execute([
                $h['id'], $h['title'], $h['organizer'], $h['banner_img'],
                $h['prize_pool'], $h['format'], $h['domain'], $h['start_date'],
                $h['duration'], $h['participants_count'], $h['status'], $h['description']
            ]);
        }

        // 8. Seed Team Registration for Vivek Yadav
        $pdo->prepare("INSERT OR REPLACE INTO hackathon_teams (id, hackathon_id, team_name, lead_email, lead_name, members_json, project_title, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
            ->execute([
                1, 'hack-polygon-01', 'ZK-Rollup Architects', 'vivek.hr362007@gmail.com', 'Vivek Yadav',
                json_encode([
                    ['name' => 'Vivek Yadav (Lead)', 'role' => 'Smart Contract & Systems Architect', 'roll' => '22002170310065'],
                    ['name' => 'Aryan Patel', 'role' => 'Zero-Knowledge Proof Engineer', 'roll' => '22002170310082'],
                    ['name' => 'Diya Shah', 'role' => 'Full-Stack Frontend & Web3.js', 'roll' => '22002170310041']
                ]),
                'ZK-Shield: Privacy-Preserving Micropayments Protocol',
                'Confirmed'
            ]);
    }
}
