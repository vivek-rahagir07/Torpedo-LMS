<?php
/**
 * Torpedo LMS - Unified Development Server Router
 * Serves both Frontend Assets and Real PHP/SQLite Backend APIs seamlessly.
 *
 * Usage:
 *   php -S localhost:8000 server.php
 */

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// 1. API Requests -> Route to backend/api.php
if (strpos($uri, '/api/') === 0 || $uri === '/api') {
    require __DIR__ . '/backend/api.php';
    return;
}

// 2. Storage Uploads -> Stream files safely
if (strpos($uri, '/storage/') === 0) {
    $filePath = __DIR__ . $uri;
    if (file_exists($filePath) && is_file($filePath)) {
        $ext = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
        $mimes = [
            'pdf' => 'application/pdf',
            'png' => 'image/png',
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'webp' => 'image/webp',
            'svg' => 'image/svg+xml'
        ];
        $contentType = $mimes[$ext] ?? 'application/octet-stream';
        header("Content-Type: $contentType");
        readfile($filePath);
        return;
    }
}

// 3. Pretty URLs
$routes = [
    '/' => 'index.html',
    '/login' => 'login.html',
    '/dashboard' => 'dashboard.html',
    '/profile-setup' => 'profile-setup.html',
    '/courses' => 'courses.html'
];

if (isset($routes[$uri])) {
    require __DIR__ . '/' . $routes[$uri];
    return;
}

// 4. Existing static file -> let PHP serve directly
$localFile = __DIR__ . $uri;
if ($uri !== '/' && file_exists($localFile) && is_file($localFile)) {
    return false; // Built-in server serves static file
}

// 5. Fallback -> index.html
if (file_exists(__DIR__ . '/index.html')) {
    require __DIR__ . '/index.html';
    return;
}

http_response_code(404);
echo "404 Not Found";
