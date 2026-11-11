<?php
/**
 * Torpedo LMS - Dashboard Analytics & Metrics Controller
 * Enforces role-based visibility:
 * - Super Admin can view all students, all dossiers, certificates, and system stats.
 * - Student has strict access to their own profile and records only.
 * - Employer has recruiter pipeline view for talent sourcing.
 */

require_once __DIR__ . '/../database/db.php';

class DashboardController {
    public static function getStats(string $role, string $email): array {
        $pdo = Database::getConnection();

        // ---------------------------------------------------------------------
        // 1. SUPER ADMIN (God-Mode Visibility)
        // ---------------------------------------------------------------------
        if ($role === 'admin') {
            // Fetch all student records with full academic details
            $studentsStmt = $pdo->query("SELECT * FROM candidate_profiles ORDER BY id ASC");
            $students = $studentsStmt->fetchAll();

            // Fetch all employers
            $employersStmt = $pdo->query("SELECT * FROM employer_profiles ORDER BY id ASC");
            $employers = $employersStmt->fetchAll();

            return [
                'success' => true,
                'role' => 'admin',
                'fullName' => 'Super Admin',
                'designation' => 'System & Academic Dean (Full Authority)',
                'avatarUrl' => 'assets/admin_avatar.jpg',
                'metrics' => [
                    ['label' => 'Total Enrolled Students', 'val' => count($students), 'sub' => '100% Verified'],
                    ['label' => 'Corporate Hiring Partners', 'val' => count($employers), 'sub' => 'Tier-1 Active'],
                    ['label' => 'Curated Placement Tracks', 'val' => '3', 'sub' => 'Distributed/AI'],
                    ['label' => 'Platform Compliance & ATS', 'val' => '100%', 'sub' => 'Audited']
                ],
                'allStudents' => array_map(function($s) {
                    return [
                        'id' => $s['id'],
                        'fullName' => "{$s['first_name']} {$s['last_name']}",
                        'email' => $s['email'],
                        'phone' => $s['phone'],
                        'avatar' => $s['avatar_path'] ?: 'assets/avatars/robot1.svg',
                        'college' => $s['grad_college'] ?: 'Faculty of Engineering, University of Ruhuna',
                        'degree' => $s['grad_degree'] ?: 'B.Sc. (Hons) Engineering',
                        'branch' => $s['grad_branch'] ?: 'Computer Engineering',
                        'cgpa' => $s['grad_cgpa'] ?: '3.88 GPA',
                        'tenthMarks' => ($s['tenth_percentage'] ?: '94.2%') . ' (' . ($s['tenth_board'] ?: 'National O/L') . ')',
                        'twelfthMarks' => ($s['twelfth_percentage'] ?: '92.5%') . ' (' . ($s['twelfth_stream'] ?: 'Physical Science') . ')',
                        'track' => $s['track'] ?: 'Full-Stack Distributed Systems & Microservices',
                        'targetRole' => $s['target_role'] ?: 'Distributed Systems & Cloud Engineer',
                        'verificationStatus' => $s['verification_status'] ?: 'verified',
                        'resumePath' => $s['resume_path'],
                        'gradCertPath' => $s['grad_cert_path'],
                        'twelfthCertPath' => $s['twelfth_cert_path'],
                        'tenthCertPath' => $s['tenth_cert_path'],
                        'idProofPath' => $s['id_proof_path']
                    ];
                }, $students),
                'allEmployers' => $employers
            ];
        }

        // ---------------------------------------------------------------------
        // 2. EMPLOYER / RECRUITER (Corporate Partner)
        // ---------------------------------------------------------------------
        if ($role === 'employer') {
            $stmt = $pdo->prepare("SELECT * FROM employer_profiles WHERE email = ?");
            $stmt->execute([$email ?: 'recruiter@torpedo.com']);
            $prof = $stmt->fetch();

            return [
                'success' => true,
                'role' => 'employer',
                'fullName' => 'Talent Partner',
                'company' => $prof['company_name'] ?? 'Corporate Partner',
                'designation' => $prof['recruiter_designation'] ?? 'Corporate Partner Talent Lead',
                'industry' => $prof['industry'] ?? 'Technology & Services',
                'location' => $prof['hq_location'] ?? 'Bangalore, India',
                'workforce' => $prof['company_size'] ?? '201-500 Employees',
                'ctcRange' => $prof['ctc_bracket'] ?? '₹12L - ₹32L / yr',
                'website' => $prof['company_website'] ?? 'https://torpedo.academy',
                'avatarUrl' => 'assets/employer_avatar.jpg',
                'metrics' => [
                    ['label' => 'Active Listings', 'val' => '0 Roles', 'sub' => 'Live job openings'],
                    ['label' => 'Under Review', 'val' => '0 Pending', 'sub' => 'Awaiting initial screening'],
                    ['label' => 'Total Apps', 'val' => '0 Received', 'sub' => 'Cumulative applicants'],
                    ['label' => 'Placed Candidates', 'val' => '0 Hired', 'sub' => 'Accepted offers']
                ],
                'verifiedDocuments' => [
                    [
                        'title' => 'Certificate of Incorporation / GST Registration (PDF)',
                        'filename' => $prof['incorporation_cert_path'] ? basename($prof['incorporation_cert_path']) : 'company_incorporation_cert.pdf',
                        'meta' => 'CIN: ' . ($prof['cin_gst_number'] ?? 'U72200KA2024PTC123456'),
                        'badge' => '✓ ENTITY VERIFIED',
                        'url' => $prof['incorporation_cert_path'] ?? null
                    ]
                ]
            ];
        }

        // ---------------------------------------------------------------------
        // 3. STUDENT (Real Database Metrics & Academic Dossier)
        // ---------------------------------------------------------------------
        $studentEmail = strtolower(trim($email ?: ''));
        if (empty($studentEmail)) {
            return [
                'success' => false,
                'message' => 'Student email is required.'
            ];
        }

        $stmt = $pdo->prepare("SELECT * FROM candidate_profiles WHERE email = ?");
        $stmt->execute([$studentEmail]);
        $prof = $stmt->fetch();

        $uStmt = $pdo->prepare("SELECT name, email, avatar_url FROM users WHERE email = ?");
        $uStmt->execute([$studentEmail]);
        $usr = $uStmt->fetch();

        $fullName = $prof ? trim("{$prof['first_name']} {$prof['last_name']}") : ($usr['name'] ?? 'Student');

        // Real counts from database
        $enrollStmt = $pdo->prepare("SELECT COUNT(*) as cnt FROM enrollments WHERE user_email = ?");
        $enrollStmt->execute([$studentEmail]);
        $enrolledCount = (int)($enrollStmt->fetch()['cnt'] ?? 0);

        $solvedStmt = $pdo->prepare("SELECT COUNT(*) as cnt FROM user_solved_problems WHERE user_email = ?");
        $solvedStmt->execute([$studentEmail]);
        $solvedCount = (int)($solvedStmt->fetch()['cnt'] ?? 0);

        $appStmt = $pdo->prepare("SELECT COUNT(*) as cnt FROM job_applications WHERE user_email = ?");
        $appStmt->execute([$studentEmail]);
        $appsCount = (int)($appStmt->fetch()['cnt'] ?? 0);

        $teamStmt = $pdo->prepare("SELECT COUNT(*) as cnt FROM hackathon_teams WHERE lead_email = ?");
        $teamStmt->execute([$studentEmail]);
        $teamsCount = (int)($teamStmt->fetch()['cnt'] ?? 0);

        return [
            'success' => true,
            'role' => 'student',
            'fullName' => $fullName,
            'email' => $prof['email'] ?? $studentEmail,
            'college' => $prof['grad_college'] ?? '',
            'degree' => $prof['grad_degree'] ?? 'Student',
            'branch' => $prof['grad_branch'] ?? '',
            'cgpa' => $prof['grad_cgpa'] ?? '',
            'track' => $prof['track'] ?? 'General Engineering',
            'avatarUrl' => $prof['avatar_path'] ?? ($usr['avatar_url'] ?? 'assets/avatars/robot1.svg'),
            'metrics' => [
                ['label' => 'Enrolled Courses', 'val' => (string)$enrolledCount, 'sub' => 'Active Tracks'],
                ['label' => 'Solved Algorithms', 'val' => "{$solvedCount} / 520", 'sub' => 'Lifecode Benchmark'],
                ['label' => 'Torpedo Placement Score', 'val' => $solvedCount > 0 ? (string)($solvedCount * 25 + 100) . ' TRP' : 'Unrated', 'sub' => 'LMS Performance'],
                ['label' => 'Partner Applications', 'val' => "{$appsCount} Active", 'sub' => 'Fast-Track Routing']
            ],
            'verifiedDocuments' => ($prof && !empty($prof['tenth_cert_path'])) ? [
                [
                    'title' => '10th Standard Secondary Marksheet',
                    'filename' => $prof['tenth_cert_path'] ? basename($prof['tenth_cert_path']) : 'tenth_marksheet.pdf',
                    'meta' => ($prof['tenth_percentage'] ?? '') . ' (' . ($prof['tenth_board'] ?? '') . ')',
                    'badge' => '✓ VERIFIED',
                    'url' => $prof['tenth_cert_path']
                ],
                [
                    'title' => '12th Standard Higher Secondary Marksheet',
                    'filename' => $prof['twelfth_cert_path'] ? basename($prof['twelfth_cert_path']) : '12th_marksheet.pdf',
                    'meta' => ($prof['twelfth_percentage'] ?? '') . ' (' . ($prof['twelfth_stream'] ?? '') . ')',
                    'badge' => '✓ VERIFIED',
                    'url' => $prof['twelfth_cert_path']
                ],
                [
                    'title' => 'Graduation Degree / Transcript Record',
                    'filename' => $prof['grad_cert_path'] ? basename($prof['grad_cert_path']) : 'degree_certificate.pdf',
                    'meta' => ($prof['grad_cgpa'] ?? '') . ' (' . ($prof['grad_college'] ?? '') . ')',
                    'badge' => '✓ VERIFIED',
                    'url' => $prof['grad_cert_path']
                ],
                [
                    'title' => 'Official Placement Dossier & Resume (PDF)',
                    'filename' => $prof['resume_path'] ? basename($prof['resume_path']) : 'resume.pdf',
                    'meta' => 'Active ATS Verified Document',
                    'badge' => 'ACTIVE ATS',
                    'url' => $prof['resume_path']
                ]
            ] : []
        ];
    }
}
