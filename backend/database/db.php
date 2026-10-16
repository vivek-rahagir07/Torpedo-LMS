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

        // 2. Seed Default Test Accounts for Student, Faculty, Employer
        $pwHash = password_hash('TorpedoPass@2026', PASSWORD_BCRYPT);

        // Student Account
        $pdo->prepare("INSERT OR IGNORE INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)")
            ->execute(['Alex Rivera', 'alex.rivera@torpedo.edu', $pwHash, 'student']);
        
        $pdo->prepare("INSERT OR IGNORE INTO candidate_profiles (first_name, last_name, email, phone, dob, gender, address, city, state, pincode, tenth_school, tenth_board, tenth_year, tenth_percentage, tenth_cert_path, twelfth_college, twelfth_board, twelfth_stream, twelfth_year, twelfth_percentage, twelfth_cert_path, grad_degree, grad_college, grad_branch, grad_year, grad_cgpa, grad_cert_path, resume_path, id_proof_path, track) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
            ->execute([
                'Alex', 'Rivera', 'alex.rivera@torpedo.edu', '9876543210', '2003-05-14', 'male',
                'Flat 402, Sector 15', 'New Delhi', 'Delhi NCR', '110042',
                'St. Xavier High School', 'CBSE', 2019, '91.4%', 'storage/uploads/certificates/tenth_marksheet.pdf',
                'Delhi Public School R.K. Puram', 'CBSE', 'Science (PCM)', 2021, '89.2%', 'storage/uploads/certificates/12th_marksheet.pdf',
                'B.Tech', 'Delhi Technological University (DTU)', 'Computer Science & Engineering', 2025, '8.85 CGPA', 'storage/uploads/certificates/degree_certificate.pdf',
                'storage/uploads/resumes/alex_rivera_resume.pdf', 'storage/uploads/id_proofs/govt_id.pdf',
                'Full-Stack Distributed Systems & Microservices'
            ]);

        // Faculty Account
        $pdo->prepare("INSERT OR IGNORE INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)")
            ->execute(['Prof. Dr. Vikram Malhotra', 'v.malhotra@iitd.ac.in', $pwHash, 'faculty']);

        $pdo->prepare("INSERT OR IGNORE INTO faculty_profiles (salutation, first_name, last_name, email, phone, designation, institution, department, experience_years, phd_specialization, phd_university, phd_cert_path, appointment_letter_path, faculty_cv_path, teaching_domains, bio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
            ->execute([
                'Prof. Dr.', 'Vikram', 'Malhotra', 'v.malhotra@iitd.ac.in', '+91 9811223344',
                'Professor & Chair', 'IIT Delhi', 'Department of Computer Science & Engineering', '12+ Years Experience',
                'Distributed Consensus & Fault-Tolerant Raft Protocols', 'IISc Bangalore', 'storage/uploads/faculty/phd_degree.pdf',
                'storage/uploads/faculty/faculty_appointment_letter.pdf', 'storage/uploads/faculty/prof_malhotra_academic_cv.pdf',
                json_encode(['Distributed Systems', 'Autonomous AI & LLMs', 'Cloud Infrastructure']),
                'Author of 24+ peer-reviewed papers on distributed transaction scheduling and consensus algorithms. Actively guiding university cohorts in low-latency systems and containerized architectures.'
            ]);

        // Employer Account
        $pdo->prepare("INSERT OR IGNORE INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)")
            ->execute(['Sarah Jenkins', 's.jenkins@stripe.com', $pwHash, 'employer']);

        $pdo->prepare("INSERT OR IGNORE INTO employer_profiles (company_name, company_website, recruiter_name, recruiter_designation, email, phone, hq_location, industry, company_size, cin_gst_number, incorporation_cert_path, hiring_roles, hiring_volume, ctc_bracket, required_tech_stack) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
            ->execute([
                'Stripe India', 'https://stripe.com', 'Sarah Jenkins', 'Head of Talent Acquisition',
                's.jenkins@stripe.com', '+91 9876543210', 'Bengaluru, India',
                'FinTech & High-Frequency Systems', '1,000+ (Enterprise)', 'U72200DL2024PTC123456',
                'storage/uploads/employers/company_incorporation_cert.pdf',
                json_encode(['Backend SDE', 'Full-Stack Engineer', 'Autonomous AI Engineer']),
                '10 - 30 Annual Hires', '₹18 - 30 LPA',
                'Go, Python, React, PostgreSQL, gRPC, Docker'
            ]);
    }
}
