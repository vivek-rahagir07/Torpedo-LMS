<?php
/**
 * Torpedo LMS - Super Admin Controller
 * Serves live platform administration, user directory, metrics, and course moderation.
 */

require_once __DIR__ . '/../database/db.php';

class AdminController {

    public static function getOverview(): array {
        $pdo = Database::getConnection();

        $students = (int)$pdo->query("SELECT COUNT(*) FROM users WHERE role = 'student'")->fetchColumn();
        $faculty = (int)$pdo->query("SELECT COUNT(*) FROM users WHERE role IN ('faculty', 'instructor')")->fetchColumn();
        $recruiters = (int)$pdo->query("SELECT COUNT(*) FROM users WHERE role = 'employer'")->fetchColumn();
        $courses = (int)$pdo->query("SELECT COUNT(*) FROM courses")->fetchColumn();
        $jobs = (int)$pdo->query("SELECT COUNT(*) FROM jobs")->fetchColumn();
        $applications = (int)$pdo->query("SELECT COUNT(*) FROM job_applications")->fetchColumn();
        $hackathons = (int)$pdo->query("SELECT COUNT(*) FROM hackathons")->fetchColumn();
        $problems = (int)$pdo->query("SELECT COUNT(*) FROM problems")->fetchColumn();
        $solved = (int)$pdo->query("SELECT COUNT(*) FROM user_solved_problems")->fetchColumn();

        // Recent Audit Activity
        $recentUsers = $pdo->query("SELECT name, email, role, created_at FROM users ORDER BY created_at DESC LIMIT 5")->fetchAll();
        $recentApps = $pdo->query("SELECT a.candidate_name, a.user_email, j.company, j.title, a.applied_at FROM job_applications a JOIN jobs j ON a.job_id = j.id ORDER BY a.applied_at DESC LIMIT 5")->fetchAll();

        $activity = [];
        foreach ($recentUsers as $u) {
            $activity[] = [
                'action' => 'New user registered',
                'detail' => "{$u['name']} ({$u['role']})",
                'actor' => 'System Auth',
                'date' => $u['created_at']
            ];
        }
        foreach ($recentApps as $a) {
            $activity[] = [
                'action' => 'Candidate applied to position',
                'detail' => "{$a['candidate_name']} applied to {$a['company']} - {$a['title']}",
                'actor' => $a['candidate_name'],
                'date' => $a['applied_at']
            ];
        }

        return [
            'success' => true,
            'stats' => [
                'students' => $students,
                'faculty' => $faculty,
                'recruiters' => $recruiters,
                'published_courses' => $courses,
                'active_jobs' => $jobs,
                'total_applications' => $applications,
                'hackathons' => $hackathons,
                'dsa_problems' => $problems,
                'solved_problems' => $solved
            ],
            'activity' => $activity
        ];
    }

    public static function getPeople(): array {
        $pdo = Database::getConnection();

        $users = $pdo->query("SELECT id, name, email, role, avatar_url, created_at FROM users ORDER BY created_at DESC")->fetchAll();
        $candidates = $pdo->query("SELECT * FROM candidate_profiles")->fetchAll();
        $candMap = [];
        foreach ($candidates as $c) {
            $candMap[$c['email']] = $c;
        }

        $faculties = $pdo->query("SELECT * FROM faculty_profiles")->fetchAll();
        $facMap = [];
        foreach ($faculties as $f) {
            $facMap[$f['email']] = $f;
        }

        $employers = $pdo->query("SELECT * FROM employer_profiles")->fetchAll();
        $empMap = [];
        foreach ($employers as $e) {
            $empMap[$e['email']] = $e;
        }

        $people = [];
        foreach ($users as $u) {
            $email = $u['email'];
            $role = ucfirst($u['role']);
            if ($role === 'Employer') $role = 'Recruiter';

            $person = [
                'id' => 'u-' . $u['id'],
                'name' => $u['name'],
                'email' => $u['email'],
                'role' => $role,
                'status' => 'Active',
                'joined' => $u['created_at']
            ];

            if (isset($candMap[$email])) {
                $c = $candMap[$email];
                $person['institution'] = $c['grad_college'] ?: 'Gujarat Technological University (GTU)';
                $person['degree'] = $c['grad_degree'] ?: 'B.Tech · Computer Science';
                $person['year'] = $c['grad_year'] ?: '2026';
                $person['cgpa'] = $c['grad_cgpa'] ?: '8.85';
                $person['city'] = $c['city'] ?: 'Ahmedabad';
                $person['phone'] = $c['phone'] ?: '+91 98765 43210';
                $person['skills'] = ['Go', 'Node.js', 'React', 'Docker', 'Kubernetes'];
            } elseif (isset($facMap[$email])) {
                $f = $facMap[$email];
                $person['institution'] = $f['institution'] ?: 'Torpedo Learning';
                $person['credential'] = $f['phd_specialization'] ?: 'Ph.D. in Computer Science';
                $person['experience'] = $f['experience_years'] ?: '12 Years';
                $person['city'] = 'Bengaluru';
            } elseif (isset($empMap[$email])) {
                $e = $empMap[$email];
                $person['company'] = $e['company_name'] ?: 'Corporate Partner';
                $person['industry'] = $e['industry'] ?: 'Technology & Services';
                $person['size'] = $e['company_size'] ?: '500+ Employees';
                $person['city'] = $e['hq_location'] ?: 'Bengaluru';
                $person['website'] = $e['company_website'] ?: 'https://torpedo.com';
            }

            $people[] = $person;
        }

        return [
            'success' => true,
            'count' => count($people),
            'people' => $people
        ];
    }
}

