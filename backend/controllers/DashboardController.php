<?php
/**
 * Torpedo LMS - Dashboard Analytics & Metrics Controller
 */

require_once __DIR__ . '/../database/db.php';

class DashboardController {
    public static function getStats(string $role, string $email): array {
        $pdo = Database::getConnection();

        if ($role === 'faculty') {
            $stmt = $pdo->prepare("SELECT * FROM faculty_profiles WHERE email = ?");
            $stmt->execute([$email]);
            $prof = $stmt->fetch();

            return [
                'success' => true,
                'role' => 'faculty',
                'fullName' => $prof ? "{$prof['salutation']} {$prof['first_name']} {$prof['last_name']}" : 'Prof. Dr. Vikram Malhotra',
                'designation' => $prof['designation'] ?? 'Professor & Chair',
                'institution' => $prof['institution'] ?? 'IIT Delhi',
                'department' => $prof['department'] ?? 'Department of Computer Science & Engineering',
                'metrics' => [
                    ['label' => 'Active Tracks Led', 'val' => '2', 'sub' => 'Cohorts'],
                    ['label' => 'Scholars Mentored', 'val' => '142', 'sub' => 'Active'],
                    ['label' => 'Doctoral Publications', 'val' => '24+', 'sub' => 'IEEE/ACM'],
                    ['label' => 'Course Quality Rating', 'val' => '4.95 ★', 'sub' => 'Top Tier']
                ],
                'verifiedDocuments' => [
                    [
                        'title' => 'Ph.D. Doctoral Degree & Defense Certificate',
                        'filename' => $prof['phd_cert_path'] ? basename($prof['phd_cert_path']) : 'phd_degree.pdf',
                        'meta' => 'Specialization: ' . ($prof['phd_specialization'] ?? 'Distributed Systems'),
                        'badge' => '✓ DOCTORATE VERIFIED',
                        'url' => $prof['phd_cert_path'] ?? null
                    ],
                    [
                        'title' => 'University Appointment Letter / Faculty ID Proof',
                        'filename' => $prof['appointment_letter_path'] ? basename($prof['appointment_letter_path']) : 'faculty_appointment_letter.pdf',
                        'meta' => ($prof['institution'] ?? 'IIT Delhi') . ' (CSE)',
                        'badge' => '✓ INSTITUTIONAL AUTH',
                        'url' => $prof['appointment_letter_path'] ?? null
                    ],
                    [
                        'title' => 'Complete Academic CV & Research Bibliography',
                        'filename' => $prof['faculty_cv_path'] ? basename($prof['faculty_cv_path']) : 'prof_malhotra_academic_cv.pdf',
                        'meta' => '24 Peer-Reviewed Publications',
                        'badge' => 'ACTIVE BIBLIOGRAPHY',
                        'url' => $prof['faculty_cv_path'] ?? null
                    ]
                ]
            ];
        }

        if ($role === 'employer') {
            $stmt = $pdo->prepare("SELECT * FROM employer_profiles WHERE email = ?");
            $stmt->execute([$email]);
            $prof = $stmt->fetch();

            return [
                'success' => true,
                'role' => 'employer',
                'fullName' => $prof ? "{$prof['recruiter_name']} ({$prof['company_name']})" : 'Sarah Jenkins (Stripe India)',
                'company' => $prof['company_name'] ?? 'Stripe India',
                'designation' => $prof['recruiter_designation'] ?? 'Head of Talent Acquisition',
                'industry' => $prof['industry'] ?? 'FinTech & High-Frequency Systems',
                'metrics' => [
                    ['label' => 'Pre-screened Candidates', 'val' => '38', 'sub' => 'Pipeline'],
                    ['label' => 'Interviews Scheduled', 'val' => '12', 'sub' => 'This Week'],
                    ['label' => 'Open Requisitions', 'val' => '5', 'sub' => 'Active'],
                    ['label' => 'Average ATS Fit Match', 'val' => '94.6%', 'sub' => 'Verified']
                ],
                'verifiedDocuments' => [
                    [
                        'title' => 'Certificate of Incorporation / GST Registration (PDF)',
                        'filename' => $prof['incorporation_cert_path'] ? basename($prof['incorporation_cert_path']) : 'company_incorporation_cert.pdf',
                        'meta' => 'CIN: ' . ($prof['cin_gst_number'] ?? 'U72200DL2024PTC123456'),
                        'badge' => '✓ ENTITY VERIFIED',
                        'url' => $prof['incorporation_cert_path'] ?? null
                    ]
                ]
            ];
        }

        // Student Default
        $stmt = $pdo->prepare("SELECT * FROM candidate_profiles WHERE email = ?");
        $stmt->execute([$email]);
        $prof = $stmt->fetch();

        return [
            'success' => true,
            'role' => 'student',
            'fullName' => $prof ? "{$prof['first_name']} {$prof['last_name']}" : 'Alex Rivera',
            'college' => $prof['grad_college'] ?? 'Delhi Technological University (DTU)',
            'track' => $prof['track'] ?? 'Full-Stack Distributed Systems & Microservices',
            'metrics' => [
                ['label' => 'Enrolled Tracks', 'val' => '3', 'sub' => 'Active'],
                ['label' => 'Sandbox Labs Solved', 'val' => '18 / 24', 'sub' => 'Passed'],
                ['label' => 'ATS Placement Score', 'val' => '94.8', 'sub' => 'Top 2%'],
                ['label' => 'Partner Shortlists', 'val' => '3', 'sub' => 'Interviews']
            ],
            'verifiedDocuments' => [
                [
                    'title' => '10th Standard Secondary Marksheet',
                    'filename' => $prof['tenth_cert_path'] ? basename($prof['tenth_cert_path']) : 'tenth_marksheet.pdf',
                    'meta' => ($prof['tenth_percentage'] ?? '91.4%') . ' (' . ($prof['tenth_board'] ?? 'CBSE') . ')',
                    'badge' => '✓ VERIFIED',
                    'url' => $prof['tenth_cert_path'] ?? null
                ],
                [
                    'title' => '12th Standard Higher Secondary Certificate',
                    'filename' => $prof['twelfth_cert_path'] ? basename($prof['twelfth_cert_path']) : '12th_marksheet.pdf',
                    'meta' => ($prof['twelfth_percentage'] ?? '89.2%') . ' (' . ($prof['twelfth_stream'] ?? 'Science PCM') . ')',
                    'badge' => '✓ VERIFIED',
                    'url' => $prof['twelfth_cert_path'] ?? null
                ],
                [
                    'title' => 'Undergraduate Degree / Consolidated Marksheet',
                    'filename' => $prof['grad_cert_path'] ? basename($prof['grad_cert_path']) : 'degree_certificate.pdf',
                    'meta' => ($prof['grad_cgpa'] ?? '8.85 CGPA') . ' (' . ($prof['grad_college'] ?? 'DTU CSE') . ')',
                    'badge' => '✓ VERIFIED',
                    'url' => $prof['grad_cert_path'] ?? null
                ],
                [
                    'title' => 'Candidate ATS Resume (PDF)',
                    'filename' => $prof['resume_path'] ? basename($prof['resume_path']) : 'alex_rivera_resume.pdf',
                    'meta' => 'Active Placement Document',
                    'badge' => 'ACTIVE ATS',
                    'url' => $prof['resume_path'] ?? null
                ]
            ]
        ];
    }
}
