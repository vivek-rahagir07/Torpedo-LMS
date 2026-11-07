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
        $email = strtolower(trim($data['email'] ?? 'vivek.hr362007@gmail.com'));
        $courseId = trim($data['course_id'] ?? '');

        if (empty($email) || empty($courseId)) {
            http_response_code(422);
            return ['success' => false, 'message' => 'Email and course ID are required.'];
        }

        // Check if already enrolled
        $check = $pdo->prepare("SELECT id, progress_percentage FROM enrollments WHERE user_email = ? AND course_id = ?");
        $check->execute([$email, $courseId]);
        $existing = $check->fetch();
        if ($existing) {
            return [
                'success' => true,
                'already_enrolled' => true,
                'message' => 'You are already enrolled in this course track.',
                'course_id' => $courseId,
                'progress' => (int)$existing['progress_percentage']
            ];
        }

        $stmt = $pdo->prepare("INSERT INTO enrollments (user_email, course_id, progress_percentage) VALUES (?, ?, 0)");
        $stmt->execute([$email, $courseId]);

        return [
            'success' => true,
            'message' => 'Successfully enrolled in course module!',
            'course_id' => $courseId,
            'progress' => 0
        ];
    }

    public static function getUserEnrollments(string $email): array {
        $pdo = Database::getConnection();
        $userEmail = strtolower(trim($email ?: 'vivek.hr362007@gmail.com'));

        $stmt = $pdo->prepare("SELECT e.*, c.title, c.category, c.instructor, c.badge, c.badge_class, c.duration, c.price FROM enrollments e LEFT JOIN courses c ON e.course_id = c.id WHERE e.user_email = ? ORDER BY e.created_at DESC");
        $stmt->execute([$userEmail]);
        $enrollments = $stmt->fetchAll();

        return [
            'success' => true,
            'count' => count($enrollments),
            'enrollments' => $enrollments
        ];
    }

    public static function createCourse(array $data): array {
        $pdo = Database::getConnection();
        $id = trim($data['id'] ?? ('c-' . time()));
        $title = trim($data['title'] ?? '');
        $category = trim($data['category'] ?? 'development');
        $instructor = trim($data['instructor'] ?? 'Prof. Dr. Vikram Malhotra');
        $price = trim($data['price'] ?? 'Free');
        $duration = trim($data['duration'] ?? '12 Weeks');
        $badge = trim($data['badge'] ?? 'New Track');
        $syllabus = is_array($data['syllabus'] ?? null) ? json_encode($data['syllabus']) : ($data['syllabus'] ?? '[]');

        if (empty($title)) {
            http_response_code(422);
            return ['success' => false, 'message' => 'Course title is required.'];
        }

        $stmt = $pdo->prepare("INSERT OR REPLACE INTO courses (id, category, title, instructor, duration, badge, price, syllabus) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$id, $category, $title, $instructor, $duration, $badge, $price, $syllabus]);

        return [
            'success' => true,
            'message' => 'Course created and saved to curriculum!',
            'course_id' => $id
        ];
    }
}
