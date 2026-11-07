<?php
/**
 * Torpedo LMS - Unified API Gateway
 */

// Enable CORS
if (!headers_sent()) {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
}

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
require_once __DIR__ . '/controllers/ProblemsController.php';
require_once __DIR__ . '/controllers/JobsController.php';
require_once __DIR__ . '/controllers/HackathonsController.php';

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

if (!headers_sent()) {
    header('Content-Type: application/json; charset=utf-8');
}

try {
    $response = null;

    // Handle dynamic /api/problems/{id}
    if (preg_match('#^problems/([0-9]+)$#', $path, $matches)) {
        if ($method === 'GET') {
            $userEmail = $requestData['email'] ?? 'vivek.hr362007@gmail.com';
            $response = ProblemsController::getById((int)$matches[1], $userEmail);
        }
    } else {
        switch ($path) {
            // --- LIFECODE PROBLEMS & JUDGE ENGINE ---
            case 'problems':
                if ($method === 'GET') {
                    if (isset($requestData['id']) || isset($requestData['slug'])) {
                        $idOrSlug = $requestData['id'] ?? $requestData['slug'];
                        $userEmail = $requestData['email'] ?? 'vivek.hr362007@gmail.com';
                        $response = ProblemsController::getById($idOrSlug, $userEmail);
                    } else {
                        $response = ProblemsController::getAll($requestData);
                    }
                }
                break;

            case 'problems/get':
                if ($method === 'GET') {
                    $idOrSlug = $requestData['id'] ?? $requestData['slug'] ?? 1552;
                    $userEmail = $requestData['email'] ?? 'vivek.hr362007@gmail.com';
                    $response = ProblemsController::getById($idOrSlug, $userEmail);
                }
                break;

            case 'problems/random':
                if ($method === 'GET') {
                    $response = ProblemsController::getRandom();
                }
                break;

            case 'problems/stats':
                if ($method === 'GET') {
                    $userEmail = $requestData['email'] ?? 'vivek.hr362007@gmail.com';
                    $response = ProblemsController::getStats($userEmail);
                }
                break;

            case 'problems/run':
                if ($method === 'POST') {
                    $response = ProblemsController::runCode($requestData);
                }
                break;

            case 'problems/submit':
                if ($method === 'POST') {
                    $response = ProblemsController::submitCode($requestData);
                }
                break;
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
                $email = $requestData['email'] ?? 'vivek.hr362007@gmail.com';
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
                $email = $requestData['email'] ?? 'vivek.hr362007@gmail.com';
                $role = $requestData['role'] ?? 'student';
                $response = ProfileController::getProfile($email, $role);
            }
            break;

        // --- JOBS & PLACEMENTS ---
        case 'jobs':
            if ($method === 'GET') {
                $response = JobsController::getAll($requestData);
            }
            break;

        case 'jobs/get':
            if ($method === 'GET') {
                $jobId = trim($requestData['id'] ?? 'job-rzp-01');
                $response = JobsController::getById($jobId);
            }
            break;

        case 'jobs/apply':
            if ($method === 'POST') {
                $response = JobsController::apply($requestData);
            }
            break;

        case 'jobs/applications':
            if ($method === 'GET') {
                $userEmail = $requestData['email'] ?? 'vivek.hr362007@gmail.com';
                $response = JobsController::getUserApplications($userEmail);
            }
            break;

        // --- HACKATHONS ---
        case 'hackathons':
            if ($method === 'GET') {
                $response = HackathonsController::getAll();
            }
            break;

        case 'hackathons/register':
            if ($method === 'POST') {
                $response = HackathonsController::registerTeam($requestData);
            }
            break;

        case 'hackathons/teams':
            if ($method === 'GET') {
                $userEmail = $requestData['email'] ?? 'vivek.hr362007@gmail.com';
                $response = HackathonsController::getUserTeams($userEmail);
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
