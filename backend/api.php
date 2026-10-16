<?php
/**
 * Torpedo LMS - Unified API Gateway
 */

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/database/db.php';
require_once __DIR__ . '/controllers/AuthController.php';
require_once __DIR__ . '/controllers/ProfileController.php';
require_once __DIR__ . '/controllers/CoursesController.php';
require_once __DIR__ . '/controllers/DashboardController.php';
require_once __DIR__ . '/controllers/SandboxController.php';

// Ensure DB is initialized
Database::getConnection();

// Parse URI
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Normalize path: strip prefix if needed
$path = preg_replace('#^/api/#', '', $uri);
$path = trim($path, '/');

// Parse JSON request body if present
$inputJson = json_decode(file_get_contents('php://input'), true) ?: [];
$requestData = array_merge($_GET, $_POST, $inputJson);

header('Content-Type: application/json; charset=utf-8');

try {
    $response = null;

    switch ($path) {
        // --- AUTHENTICATION ---
        case 'auth/register':
            if ($method === 'POST') {
                $response = AuthController::register($requestData);
            }
            break;

        case 'auth/login':
            if ($method === 'POST') {
                $response = AuthController::login($requestData);
            }
            break;

        case 'auth/me':
            if ($method === 'GET') {
                $email = $requestData['email'] ?? 'alex.rivera@torpedo.edu';
                $response = AuthController::me($email);
            }
            break;

        // --- PROFILE SETUP & DOCUMENTS ---
        case 'profile/setup':
            if ($method === 'POST') {
                $response = ProfileController::setup($requestData, $_FILES);
            }
            break;

        case 'profile':
            if ($method === 'GET') {
                $email = $requestData['email'] ?? 'alex.rivera@torpedo.edu';
                $role = $requestData['role'] ?? 'student';
                $response = ProfileController::getProfile($email, $role);
            }
            break;

        // --- COURSES ---
        case 'courses':
            if ($method === 'GET') {
                $response = CoursesController::getAll();
            }
            break;

        case 'courses/enroll':
            if ($method === 'POST') {
                $response = CoursesController::enroll($requestData);
            }
            break;

        // --- DASHBOARD ANALYTICS ---
        case 'dashboard/stats':
            if ($method === 'GET') {
                $role = $requestData['role'] ?? 'student';
                $email = $requestData['email'] ?? '';
                $response = DashboardController::getStats($role, $email);
            }
            break;

        // --- LIFECODE VM SANDBOX ---
        case 'sandbox/evaluate':
        case 'sandbox/run':
            if ($method === 'POST') {
                $response = SandboxController::evaluate($requestData);
            }
            break;

        default:
            http_response_code(404);
            $response = [
                'success' => false,
                'message' => "API endpoint '/api/{$path}' not found."
            ];
            break;
    }

    if ($response !== null) {
        echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    } else {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => "Method {$method} not allowed for endpoint '{$path}'."]);
    }
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Internal Server Error: ' . $e->getMessage()
    ]);
}
