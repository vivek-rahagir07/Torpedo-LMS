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

        // 2. Seed Default Test Accounts: Exactly 1 Student, 1 Super Admin, 1 Employer
        $pwHash = password_hash('TorpedoPass@2026', PASSWORD_BCRYPT);

        // 1. STUDENT ACCOUNT (Tharindu Damsara)
        $pdo->prepare("INSERT OR REPLACE INTO users (id, name, email, password_hash, role, avatar_url) VALUES (?, ?, ?, ?, ?, ?)")
            ->execute([1, 'Tharindu Damsara', 'eg22343@engug.ruh.ac.lk', $pwHash, 'student', 'assets/tharindu_avatar.jpg']);
        
        $pdo->prepare("INSERT OR REPLACE INTO candidate_profiles (id, user_id, first_name, last_name, email, phone, dob, gender, address, city, state, pincode, avatar_path, tenth_school, tenth_board, tenth_year, tenth_percentage, tenth_cert_path, twelfth_college, twelfth_board, twelfth_stream, twelfth_year, twelfth_percentage, twelfth_cert_path, grad_degree, grad_college, grad_branch, grad_year, grad_cgpa, grad_cert_path, resume_path, id_proof_path, track, target_role, verification_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
            ->execute([
                1, 1, 'Tharindu', 'Damsara', 'eg22343@engug.ruh.ac.lk', '+94 77 123 4567', '2002-08-20', 'male',
                'Hapugala Campus Quarters', 'Galle', 'Southern Province', '80000',
                'assets/tharindu_avatar.jpg',
                'Richmond College Galle', 'National GCE O/L', 2018, '9A Distinction (94.2%)', 'storage/uploads/certificates/tenth_marksheet.pdf',
                'Mahinda College Galle', 'National GCE A/L', 'Physical Science & Advanced Mathematics', 2021, '3A Z-Score 2.45 (92.5%)', 'storage/uploads/certificates/12th_marksheet.pdf',
                'B.Sc. (Hons) Engineering', 'Faculty of Engineering, University of Ruhuna', 'Computer Engineering', 2025, '3.88 GPA (First Class Honours)', 'storage/uploads/certificates/degree_certificate.pdf',
                'storage/uploads/resumes/tharindu_damsara_resume.pdf', 'storage/uploads/id_proofs/university_id.pdf',
                'Full-Stack Distributed Systems & Microservices', 'Distributed Systems & Cloud Engineer', 'verified'
            ]);

        // Student Course Enrollments
        $pdo->prepare("INSERT OR IGNORE INTO enrollments (user_email, course_id, progress_percentage) VALUES (?, ?, ?)")
            ->execute(['eg22343@engug.ruh.ac.lk', 'c1', 78]);
        $pdo->prepare("INSERT OR IGNORE INTO enrollments (user_email, course_id, progress_percentage) VALUES (?, ?, ?)")
            ->execute(['eg22343@engug.ruh.ac.lk', 'c2', 64]);
        $pdo->prepare("INSERT OR IGNORE INTO enrollments (user_email, course_id, progress_percentage) VALUES (?, ?, ?)")
            ->execute(['eg22343@engug.ruh.ac.lk', 'c3', 42]);

        // 2. SUPER ADMIN ACCOUNT (Full Authority)
        $pdo->prepare("INSERT OR REPLACE INTO users (id, name, email, password_hash, role, avatar_url) VALUES (?, ?, ?, ?, ?, ?)")
            ->execute([2, 'Super Admin', 'admin@torpedo.edu', $pwHash, 'admin', 'assets/admin_avatar.jpg']);

        // 3. EMPLOYER ACCOUNT (Vivek - Corporate Partner)
        $pdo->prepare("INSERT OR REPLACE INTO users (id, name, email, password_hash, role, avatar_url) VALUES (?, ?, ?, ?, ?, ?)")
            ->execute([3, 'Vivek', 'recruiter@torpedo.com', $pwHash, 'employer', 'assets/employer_avatar.jpg']);

        $pdo->prepare("INSERT OR REPLACE INTO employer_profiles (id, user_id, company_name, company_website, recruiter_name, recruiter_designation, email, phone, hq_location, industry, company_size, cin_gst_number, incorporation_cert_path, hiring_roles, hiring_volume, ctc_bracket, required_tech_stack, partnership_mode, verification_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
            ->execute([
                1, 3, 'Corporate Partner', 'https://torpedo.academy', 'Vivek', 'Corporate Partner Talent Lead',
                'recruiter@torpedo.com', '+91 9876543210', 'Bangalore, India',
                'Technology & Services', '201-500 Employees', 'U72200KA2024PTC123456',
                'storage/uploads/employers/company_incorporation_cert.pdf',
                json_encode(['Full-Stack Engineer', 'Backend SDE', 'Autonomous AI Engineer']),
                '10 - 25 Annual Hires', '₹12L - ₹32L / yr',
                'Go, Python, React, Distributed Systems, Cloud Architecture',
                'tier1_partner', 'tier1_partner'
            ]);
    }
}
