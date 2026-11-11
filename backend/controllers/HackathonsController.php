<?php
/**
 * Torpedo LMS - Hackathons & Code Sprints Controller
 */

require_once __DIR__ . '/../database/db.php';

class HackathonsController {

    public static function getAll(): array {
        $pdo = Database::getConnection();

        $stmt = $pdo->query("SELECT * FROM hackathons ORDER BY start_date ASC");
        $hacks = $stmt->fetchAll();

        return [
            'success' => true,
            'total' => count($hacks),
            'hackathons' => $hacks
        ];
    }

    public static function registerTeam(array $data): array {
        $pdo = Database::getConnection();

        $hackId = trim($data['hackathon_id'] ?? '');
        $teamName = trim($data['team_name'] ?? '');
        $leadEmail = strtolower(trim($data['lead_email'] ?? ''));
        $leadName = trim($data['lead_name'] ?? 'Candidate Lead');
        $projectTitle = trim($data['project_title'] ?? 'High-Throughput Web3 Architecture');
        $members = $data['members'] ?? [];

        if (empty($hackId) || empty($teamName)) {
            http_response_code(422);
            return ['success' => false, 'message' => 'Hackathon ID and Team Name are required.'];
        }

        $membersJson = is_array($members) ? json_encode($members) : (string)$members;

        // Check if already registered
        $check = $pdo->prepare("SELECT id FROM hackathon_teams WHERE hackathon_id = ? AND lead_email = ?");
        $check->execute([$hackId, $leadEmail]);
        if ($check->fetch()) {
            return [
                'success' => true,
                'already_registered' => true,
                'message' => 'Your squad is already registered for this tournament.'
            ];
        }

        $stmt = $pdo->prepare("INSERT INTO hackathon_teams (hackathon_id, team_name, lead_email, lead_name, members_json, project_title, status) VALUES (?, ?, ?, ?, ?, ?, 'Confirmed')");
        $stmt->execute([$hackId, $teamName, $leadEmail, $leadName, $membersJson, $projectTitle]);
        $teamId = $pdo->lastInsertId();

        // Increment participants count
        $pdo->prepare("UPDATE hackathons SET participants_count = participants_count + 1 WHERE id = ?")->execute([$hackId]);

        return [
            'success' => true,
            'message' => "Team '{$teamName}' confirmed! Fast-track tournament pass issued to {$leadName}.",
            'team_id' => $teamId,
            'hackathon_id' => $hackId,
            'status' => 'Confirmed'
        ];
    }

    public static function getUserTeams(string $userEmail): array {
        $pdo = Database::getConnection();
        $email = strtolower(trim($userEmail ?: ''));
        if (empty($email)) {
            return ['success' => true, 'count' => 0, 'teams' => []];
        }

        $stmt = $pdo->prepare("SELECT t.*, h.title as hackathon_title, h.prize_pool, h.format, h.start_date FROM hackathon_teams t JOIN hackathons h ON t.hackathon_id = h.id WHERE t.lead_email = ? ORDER BY t.registered_at DESC");
        $stmt->execute([$email]);
        $teams = $stmt->fetchAll();

        foreach ($teams as &$t) {
            $t['members'] = json_decode($t['members_json'], true) ?: [];
        }

        return [
            'success' => true,
            'count' => count($teams),
            'teams' => $teams
        ];
    }
}
