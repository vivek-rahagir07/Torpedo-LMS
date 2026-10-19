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
                        'avatar' => $s['avatar_path'] ?: 'assets/tharindu_avatar.jpg',
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
        // 2. EMPLOYER / RECRUITER (Vivek - Corporate Partner)
        // ---------------------------------------------------------------------
        if ($role === 'employer') {
            $stmt = $pdo->prepare("SELECT * FROM employer_profiles WHERE email = ?");
            $stmt->execute([$email ?: 'recruiter@torpedo.com']);
            $prof = $stmt->fetch();

            return [
                'success' => true,
                'role' => 'employer',
                'fullName' => 'Vivek',
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
        // 3. STUDENT (Tharindu Damsara - Private Own-Profile Access Only)
        // ---------------------------------------------------------------------
        $stmt = $pdo->prepare("SELECT * FROM candidate_profiles WHERE email = ?");
        $stmt->execute([$email ?: 'eg22343@engug.ruh.ac.lk']);
        $prof = $stmt->fetch();

        return [
            'success' => true,
            'role' => 'student',
            'fullName' => $prof ? "{$prof['first_name']} {$prof['last_name']}" : 'Tharindu Damsara',
            'email' => $prof['email'] ?? 'eg22343@engug.ruh.ac.lk',
            'college' => $prof['grad_college'] ?? 'Faculty of Engineering, University of Ruhuna',
            'degree' => $prof['grad_degree'] ?? 'B.Sc. (Hons) Engineering',
            'branch' => $prof['grad_branch'] ?? 'Computer Engineering',
            'cgpa' => $prof['grad_cgpa'] ?? '3.88 GPA (First Class Honours)',
            'track' => $prof['track'] ?? 'Full-Stack Distributed Systems & Microservices',
            'avatarUrl' => 'assets/tharindu_avatar.jpg',
            'metrics' => [
                ['label' => 'Enrolled Tracks', 'val' => '3', 'sub' => 'Active SDE'],
                ['label' => 'Sandbox Labs Solved', 'val' => '18 / 24', 'sub' => 'Passed'],
                ['label' => 'ATS Placement Score', 'val' => '94.8', 'sub' => 'Top 2%'],
                ['label' => 'Partner Shortlists', 'val' => '3', 'sub' => 'Interviews']
            ],
            'verifiedDocuments' => [
                [
                    'title' => '10th Standard Secondary Marksheet / GCE O/L',
                    'filename' => $prof['tenth_cert_path'] ? basename($prof['tenth_cert_path']) : 'tenth_marksheet.pdf',
                    'meta' => ($prof['tenth_percentage'] ?? '94.2%') . ' (' . ($prof['tenth_board'] ?? 'National O/L') . ')',
                    'badge' => '✓ VERIFIED',
                    'url' => $prof['tenth_cert_path'] ?? null
                ],
                [
                    'title' => '12th Standard Higher Secondary / GCE A/L',
                    'filename' => $prof['twelfth_cert_path'] ? basename($prof['twelfth_cert_path']) : '12th_marksheet.pdf',
                    'meta' => ($prof['twelfth_percentage'] ?? '92.5%') . ' (' . ($prof['twelfth_stream'] ?? 'Physical Science & Math') . ')',
                    'badge' => '✓ VERIFIED',
                    'url' => $prof['twelfth_cert_path'] ?? null
                ],
                [
                    'title' => 'Undergraduate Degree / Consolidated Marksheet',
                    'filename' => $prof['grad_cert_path'] ? basename($prof['grad_cert_path']) : 'degree_certificate.pdf',
                    'meta' => ($prof['grad_cgpa'] ?? '3.88 GPA') . ' (' . ($prof['grad_college'] ?? 'Univ of Ruhuna') . ')',
                    'badge' => '✓ VERIFIED',
                    'url' => $prof['grad_cert_path'] ?? null
                ],
                [
                    'title' => 'Candidate ATS Resume (PDF)',
                    'filename' => $prof['resume_path'] ? basename($prof['resume_path']) : 'tharindu_damsara_resume.pdf',
                    'meta' => 'Active Placement Document',
                    'badge' => 'ACTIVE ATS',
                    'url' => $prof['resume_path'] ?? null
                ]
            ]
        ];
    }
}
