<?php
/**
 * Torpedo LMS - Jobs & Career Placement Controller
 */

require_once __DIR__ . '/../database/db.php';

class JobsController {

    public static function getAll(array $filters = []): array {
        $pdo = Database::getConnection();

        $query = "SELECT * FROM jobs WHERE 1=1";
        $params = [];

        if (!empty($filters['batch']) && $filters['batch'] !== 'all') {
            $query .= " AND batch LIKE ?";
            $params[] = '%' . $filters['batch'] . '%';
        }

        if (!empty($filters['mode']) && $filters['mode'] !== 'all') {
            $query .= " AND work_mode = ?";
            $params[] = $filters['mode'];
        }

        if (!empty($filters['type']) && $filters['type'] !== 'all') {
            $query .= " AND job_type = ?";
            $params[] = $filters['type'];
        }

        if (!empty($filters['search'])) {
            $query .= " AND (title LIKE ? OR company LIKE ? OR skills LIKE ? OR location LIKE ?)";
            $searchTerm = '%' . $filters['search'] . '%';
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
        }

        $query .= " ORDER BY urgent DESC, match_score DESC, posted_at DESC";

        $stmt = $pdo->prepare($query);
        $stmt->execute($params);
        $jobs = $stmt->fetchAll();

        // Check if user has applied to any of these jobs
        $userEmail = $filters['email'] ?? '';
        $appliedJobIds = [];
        if (!empty($userEmail)) {
            $appStmt = $pdo->prepare("SELECT job_id FROM job_applications WHERE user_email = ?");
            $appStmt->execute([$userEmail]);
            $appliedJobIds = $appStmt->fetchAll(PDO::FETCH_COLUMN) ?: [];
        }

        $formatted = array_map(function($j) use ($appliedJobIds) {
            $skills = json_decode($j['skills'], true) ?: [];
            return [
                'id' => $j['id'],
                'title' => $j['title'],
                'company' => $j['company'],
                'company_logo' => $j['company_logo'],
                'location' => $j['location'],
                'work_mode' => $j['work_mode'],
                'job_type' => $j['job_type'],
                'stipend' => $j['stipend'],
                'batch' => $j['batch'],
                'description' => $j['description'],
                'skills' => $skills,
                'match_score' => (int)$j['match_score'],
                'applicants_count' => (int)$j['applicants_count'],
                'urgent' => (bool)$j['urgent'],
                'days_left' => (int)($j['days_left'] ?? 7),
                'applied' => in_array($j['id'], $appliedJobIds)
            ];
        }, $jobs);

        return [
            'success' => true,
            'total' => count($formatted),
            'jobs' => $formatted
        ];
    }

    public static function getById(string $id): array {
        $pdo = Database::getConnection();
        $stmt = $pdo->prepare("SELECT * FROM jobs WHERE id = ?");
        $stmt->execute([$id]);
        $job = $stmt->fetch();

        if (!$job) {
            http_response_code(404);
            return ['success' => false, 'message' => "Job opening '{$id}' not found."];
        }

        $job['skills'] = json_decode($job['skills'], true) ?: [];
        return ['success' => true, 'job' => $job];
    }

    public static function apply(array $data): array {
        $pdo = Database::getConnection();

        $jobId = trim($data['job_id'] ?? '');
        $userEmail = strtolower(trim($data['email'] ?? 'vivek.hr362007@gmail.com'));
        $candidateName = trim($data['candidate_name'] ?? 'Vivek Yadav');
        $matchScore = (int)($data['match_score'] ?? 98);

        if (empty($jobId)) {
            http_response_code(422);
            return ['success' => false, 'message' => 'Job ID is required to submit application.'];
        }

        // Check if already applied
        $check = $pdo->prepare("SELECT id FROM job_applications WHERE job_id = ? AND user_email = ?");
        $check->execute([$jobId, $userEmail]);
        if ($check->fetch()) {
            return [
                'success' => true,
                'already_applied' => true,
                'message' => 'You have already applied for this opening with your verified dossier.'
            ];
        }

        $insert = $pdo->prepare("INSERT INTO job_applications (job_id, user_email, candidate_name, match_score, status) VALUES (?, ?, ?, ?, 'Applied')");
        $insert->execute([$jobId, $userEmail, $candidateName, $matchScore]);
        $appId = $pdo->lastInsertId();

        // Increment applicant count on job
        $pdo->prepare("UPDATE jobs SET applicants_count = applicants_count + 1 WHERE id = ?")->execute([$jobId]);

        return [
            'success' => true,
            'message' => 'Application dispatched directly to hiring manager ATS with verified dossier!',
            'application_id' => $appId,
            'job_id' => $jobId,
            'status' => 'Applied'
        ];
    }

    public static function getUserApplications(string $userEmail): array {
        $pdo = Database::getConnection();
        $email = strtolower(trim($userEmail ?: 'vivek.hr362007@gmail.com'));

        $stmt = $pdo->prepare("SELECT a.*, j.title, j.company, j.location, j.stipend, j.job_type FROM job_applications a JOIN jobs j ON a.job_id = j.id WHERE a.user_email = ? ORDER BY a.applied_at DESC");
        $stmt->execute([$email]);
        $apps = $stmt->fetchAll();

        return [
            'success' => true,
            'count' => count($apps),
            'applications' => $apps
        ];
    }
}
