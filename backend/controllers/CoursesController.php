<?php
/**
 * Torpedo LMS - Courses Catalog Controller
 */

require_once __DIR__ . '/../database/db.php';

class CoursesController {
    public static function getAll(): array {
        $pdo = Database::getConnection();
        $stmt = $pdo->query("SELECT * FROM courses ORDER BY rating DESC");
        $courses = $stmt->fetchAll();

        foreach ($courses as &$c) {
            $c['syllabus'] = json_decode($c['syllabus'] ?? '[]', true);
        }

        return [
            'success' => true,
            'count' => count($courses),
            'courses' => $courses
        ];
    }

    public static function enroll(array $data): array {
        $pdo = Database::getConnection();
        $email = strtolower(trim($data['email'] ?? ''));
        $courseId = trim($data['course_id'] ?? '');

        if (empty($email) || empty($courseId)) {
            http_response_code(422);
            return ['success' => false, 'message' => 'Email and course ID are required.'];
        }

        $stmt = $pdo->prepare("INSERT INTO enrollments (user_email, course_id, progress_percentage) VALUES (?, ?, 0)");
        $stmt->execute([$email, $courseId]);

        return [
            'success' => true,
            'message' => 'Successfully enrolled in course module!',
            'course_id' => $courseId
        ];
    }
}
