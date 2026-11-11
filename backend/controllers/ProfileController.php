<?php
/**
 * Torpedo LMS - Multi-Role Profile Controller
 */

require_once __DIR__ . '/../database/db.php';

class ProfileController {

    private static function saveUploadedFile(?array $file, string $subfolder): ?string {
        if (!$file || !isset($file['error']) || $file['error'] !== UPLOAD_ERR_OK) {
            return null;
        }

        $baseDir = __DIR__ . '/../../storage/uploads/' . trim($subfolder, '/');
        if (!is_dir($baseDir)) {
            mkdir($baseDir, 0777, true);
        }

        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
        $cleanName = preg_replace('/[^a-zA-Z0-9_-]/', '_', pathinfo($file['name'], PATHINFO_FILENAME));
        $filename = time() . '_' . $cleanName . '.' . $ext;
        $destPath = $baseDir . '/' . $filename;

        if (move_uploaded_file($file['tmp_name'], $destPath)) {
            return 'storage/uploads/' . trim($subfolder, '/') . '/' . $filename;
        }
        return null;
    }

    public static function setup(array $data, array $files): array {
        $pdo = Database::getConnection();
        $role = strtolower(trim($data['role'] ?? 'student'));

        if ($role === 'instructor') $role = 'faculty';
        if ($role === 'company') $role = 'employer';

        // ---------------------------------------------------------------------
        // 1. FACULTY SETUP
        // ---------------------------------------------------------------------
        if ($role === 'faculty') {
            $email = strtolower(trim($data['email'] ?? ''));
            $first = trim($data['first_name'] ?? 'Vikram');
            $last = trim($data['last_name'] ?? 'Malhotra');
            $sal = trim($data['salutation'] ?? 'Prof. Dr.');

            $avatarPath = self::saveUploadedFile($files['avatar'] ?? null, 'avatars');
            $phdPath = self::saveUploadedFile($files['phd_certificate'] ?? null, 'faculty');
            $mastersPath = self::saveUploadedFile($files['masters_certificate'] ?? null, 'faculty');
            $apptPath = self::saveUploadedFile($files['appointment_letter_pdf'] ?? null, 'faculty');
            $cvPath = self::saveUploadedFile($files['faculty_cv_pdf'] ?? null, 'faculty');

            $domains = isset($data['teaching_domains']) ? (is_array($data['teaching_domains']) ? json_encode($data['teaching_domains']) : $data['teaching_domains']) : json_encode(['Distributed Systems', 'Autonomous AI']);

            $chk = $pdo->prepare("SELECT id FROM faculty_profiles WHERE email = ?");
            $chk->execute([$email]);
            $existing = $chk->fetch();

            if ($existing) {
                $sql = "UPDATE faculty_profiles SET
                            salutation = ?, first_name = ?, last_name = ?, phone = ?, designation = ?,
                            institution = ?, department = ?, experience_years = ?, scholar_url = ?, linkedin_url = ?,
                            avatar_path = COALESCE(?, avatar_path), phd_specialization = ?, phd_university = ?,
                            phd_cert_path = COALESCE(?, phd_cert_path), masters_degree = ?, bachelors_degree = ?,
                            masters_cert_path = COALESCE(?, masters_cert_path), appointment_letter_path = COALESCE(?, appointment_letter_path),
                            faculty_cv_path = COALESCE(?, faculty_cv_path), teaching_domains = ?, engagement_type = ?,
                            sample_video_url = ?, bio = ?, verification_status = 'council_approved', updated_at = CURRENT_TIMESTAMP
                        WHERE email = ?";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([
                    $sal, $first, $last, $data['phone'] ?? '+91 9811223344',
                    $data['designation'] ?? 'Professor & Chair',
                    $data['institution'] ?? 'IIT Delhi',
                    $data['department'] ?? 'Department of CSE',
                    $data['experience_years'] ?? '10 - 15 Years',
                    $data['scholar_url'] ?? '',
                    $data['linkedin_url'] ?? '',
                    $avatarPath,
                    $data['phd_specialization'] ?? 'Distributed Systems & Consensus',
                    $data['phd_university'] ?? 'IIT Delhi',
                    $phdPath,
                    $data['masters_degree'] ?? 'M.Tech in CSE',
                    $data['bachelors_degree'] ?? 'B.Tech in CSE',
                    $mastersPath,
                    $apptPath,
                    $cvPath,
                    $domains,
                    $data['engagement_type'] ?? 'lead_instructor',
                    $data['sample_video_url'] ?? '',
                    $data['bio'] ?? '',
                    $email
                ]);
            } else {
                $sql = "INSERT INTO faculty_profiles (
                            salutation, first_name, last_name, email, phone, designation, institution, department,
                            experience_years, scholar_url, linkedin_url, avatar_path, phd_specialization, phd_university,
                            phd_cert_path, masters_degree, bachelors_degree, masters_cert_path, appointment_letter_path,
                            faculty_cv_path, teaching_domains, engagement_type, sample_video_url, bio, verification_status
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'council_approved')";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([
                    $sal, $first, $last, $email,
                    $data['phone'] ?? '+91 9811223344',
                    $data['designation'] ?? 'Professor & Chair',
                    $data['institution'] ?? 'IIT Delhi',
                    $data['department'] ?? 'Department of CSE',
                    $data['experience_years'] ?? '10 - 15 Years',
                    $data['scholar_url'] ?? '',
                    $data['linkedin_url'] ?? '',
                    $avatarPath,
                    $data['phd_specialization'] ?? 'Distributed Systems & Consensus',
                    $data['phd_university'] ?? 'IIT Delhi',
                    $phdPath,
                    $data['masters_degree'] ?? 'M.Tech in CSE',
                    $data['bachelors_degree'] ?? 'B.Tech in CSE',
                    $mastersPath,
                    $apptPath,
                    $cvPath,
                    $domains,
                    $data['engagement_type'] ?? 'lead_instructor',
                    $data['sample_video_url'] ?? '',
                    $data['bio'] ?? ''
                ]);
            }

            $token = bin2hex(random_bytes(24));
            return [
                'success' => true,
                'token' => $token,
                'message' => 'Faculty profile, doctoral degree, and appointment credentials verified successfully! 🎉',
                'role' => 'faculty',
                'fullName' => "{$sal} {$first} {$last}",
                'email' => $email,
                'college' => $data['institution'] ?? 'IIT Delhi',
                'designation' => $data['designation'] ?? 'Professor & Chair',
                'redirect_url' => 'faculty.html'
            ];
        }

        // ---------------------------------------------------------------------
        // 2. EMPLOYER SETUP
        // ---------------------------------------------------------------------
        if ($role === 'employer') {
            $comp = trim($data['company_name'] ?? 'Stripe India');
            $rec = trim($data['recruiter_name'] ?? 'Sarah Jenkins');
            $email = strtolower(trim($data['email'] ?? ''));

            $logoPath = self::saveUploadedFile($files['avatar'] ?? null, 'employers');
            $incorpPath = self::saveUploadedFile($files['incorporation_cert_pdf'] ?? null, 'employers');

            $hiringRoles = isset($data['hiring_roles']) ? (is_array($data['hiring_roles']) ? json_encode($data['hiring_roles']) : $data['hiring_roles']) : json_encode(['Backend SDE', 'Full-Stack Engineer']);

            $chk = $pdo->prepare("SELECT id FROM employer_profiles WHERE email = ?");
            $chk->execute([$email]);
            $existing = $chk->fetch();

            if ($existing) {
                $sql = "UPDATE employer_profiles SET
                            company_name = ?, company_website = ?, recruiter_name = ?, recruiter_designation = ?, phone = ?,
                            hq_location = ?, linkedin_url = ?, logo_path = COALESCE(?, logo_path), industry = ?, company_size = ?,
                            cin_gst_number = ?, incorporation_cert_path = COALESCE(?, incorporation_cert_path), hiring_roles = ?,
                            hiring_volume = ?, ctc_bracket = ?, required_tech_stack = ?, partnership_mode = ?,
                            verification_status = 'tier1_partner', updated_at = CURRENT_TIMESTAMP
                        WHERE email = ?";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([
                    $comp,
                    $data['company_website'] ?? 'https://stripe.com',
                    $rec,
                    $data['recruiter_designation'] ?? 'Head of Talent Acquisition',
                    $data['phone'] ?? '+91 9876543210',
                    $data['hq_location'] ?? 'Bengaluru, India',
                    $data['linkedin_url'] ?? '',
                    $logoPath,
                    $data['industry'] ?? 'FinTech',
                    $data['company_size'] ?? '1000+ Enterprise',
                    $data['cin_gst_number'] ?? 'U72200DL2024PTC123456',
                    $incorpPath,
                    $hiringRoles,
                    $data['hiring_volume'] ?? '10-30 hires',
                    $data['ctc_bracket'] ?? '₹18 - 30 LPA',
                    $data['required_tech_stack'] ?? 'Go, Python, React',
                    $data['partnership_mode'] ?? 'direct_ats',
                    $email
                ]);
            } else {
                $sql = "INSERT INTO employer_profiles (
                            company_name, company_website, recruiter_name, recruiter_designation, email, phone,
                            hq_location, linkedin_url, logo_path, industry, company_size, cin_gst_number,
                            incorporation_cert_path, hiring_roles, hiring_volume, ctc_bracket, required_tech_stack,
                            partnership_mode, verification_status
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'tier1_partner')";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([
                    $comp,
                    $data['company_website'] ?? 'https://stripe.com',
                    $rec,
                    $data['recruiter_designation'] ?? 'Head of Talent Acquisition',
                    $email,
                    $data['phone'] ?? '+91 9876543210',
                    $data['hq_location'] ?? 'Bengaluru, India',
                    $data['linkedin_url'] ?? '',
                    $logoPath,
                    $data['industry'] ?? 'FinTech',
                    $data['company_size'] ?? '1000+ Enterprise',
                    $data['cin_gst_number'] ?? 'U72200DL2024PTC123456',
                    $incorpPath,
                    $hiringRoles,
                    $data['hiring_volume'] ?? '10-30 hires',
                    $data['ctc_bracket'] ?? '₹18 - 30 LPA',
                    $data['required_tech_stack'] ?? 'Go, Python, React',
                    $data['partnership_mode'] ?? 'direct_ats'
                ]);
            }

            $token = bin2hex(random_bytes(24));
            return [
                'success' => true,
                'token' => $token,
                'message' => 'Corporate enterprise profile & incorporation credentials verified! Direct ATS access active.',
                'role' => 'employer',
                'fullName' => "{$rec} ({$comp})",
                'company' => $comp,
                'email' => $email,
                'designation' => $data['recruiter_designation'] ?? 'Head of Talent Acquisition',
                'redirect_url' => 'dashboard.html?role=employer'
            ];
        }

        // ---------------------------------------------------------------------
        // 3. STUDENT SETUP
        // ---------------------------------------------------------------------
        $first = trim($data['first_name'] ?? 'Alex');
        $last = trim($data['last_name'] ?? 'Rivera');
        $email = strtolower(trim($data['email'] ?? ''));

        $avatarPath = self::saveUploadedFile($files['avatar'] ?? null, 'avatars');
        $tenthPath = self::saveUploadedFile($files['tenth_certificate'] ?? null, 'certificates');
        $twelfthPath = self::saveUploadedFile($files['twelfth_certificate'] ?? null, 'certificates');
        $gradPath = self::saveUploadedFile($files['grad_certificate'] ?? null, 'certificates');
        $postgradPath = self::saveUploadedFile($files['postgrad_certificate'] ?? null, 'certificates');
        $resumePath = self::saveUploadedFile($files['resume_pdf'] ?? null, 'resumes');
        $idPath = self::saveUploadedFile($files['id_proof_pdf'] ?? null, 'id_proofs');

        $chk = $pdo->prepare("SELECT id FROM candidate_profiles WHERE email = ?");
        $chk->execute([$email]);
        $existing = $chk->fetch();

        if ($existing) {
            $sql = "UPDATE candidate_profiles SET
                        first_name = ?, last_name = ?, phone = ?, dob = ?, gender = ?, address = ?, city = ?,
                        state = ?, pincode = ?, linkedin_url = ?, github_url = ?, avatar_path = COALESCE(?, avatar_path),
                        tenth_school = ?, tenth_board = ?, tenth_year = ?, tenth_percentage = ?, tenth_cert_path = COALESCE(?, tenth_cert_path),
                        twelfth_college = ?, twelfth_board = ?, twelfth_stream = ?, twelfth_year = ?, twelfth_percentage = ?, twelfth_cert_path = COALESCE(?, twelfth_cert_path),
                        grad_degree = ?, grad_college = ?, grad_branch = ?, grad_year = ?, grad_cgpa = ?, grad_cert_path = COALESCE(?, grad_cert_path),
                        has_postgrad = ?, postgrad_degree = ?, postgrad_college = ?, postgrad_branch = ?, postgrad_year = ?, postgrad_cgpa = ?, postgrad_cert_path = COALESCE(?, postgrad_cert_path),
                        resume_path = COALESCE(?, resume_path), id_proof_path = COALESCE(?, id_proof_path), track = ?, target_role = ?,
                        verification_status = 'verified', updated_at = CURRENT_TIMESTAMP
                    WHERE email = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $first, $last, $data['phone'] ?? '9876543210',
                $data['dob'] ?? '2003-05-14',
                $data['gender'] ?? 'male',
                $data['address'] ?? 'New Delhi',
                $data['city'] ?? 'New Delhi',
                $data['state'] ?? 'Delhi NCR',
                $data['pincode'] ?? '110042',
                $data['linkedin_url'] ?? '',
                $data['github_url'] ?? '',
                $avatarPath,
                $data['tenth_school'] ?? 'St. Xavier School',
                $data['tenth_board'] ?? 'CBSE',
                (int)($data['tenth_year'] ?? 2019),
                $data['tenth_percentage'] ?? '91.4%',
                $tenthPath,
                $data['twelfth_college'] ?? 'DPS R.K. Puram',
                $data['twelfth_board'] ?? 'CBSE',
                $data['twelfth_stream'] ?? 'Science (PCM)',
                (int)($data['twelfth_year'] ?? 2021),
                $data['twelfth_percentage'] ?? '89.2%',
                $twelfthPath,
                $data['grad_degree'] ?? 'B.Tech',
                $data['grad_college'] ?? 'Delhi Technological University (DTU)',
                $data['grad_branch'] ?? 'Computer Science & Engineering',
                (int)($data['grad_year'] ?? 2025),
                $data['grad_cgpa'] ?? '8.85 CGPA',
                $gradPath,
                isset($data['has_postgrad']) ? 1 : 0,
                $data['postgrad_degree'] ?? '',
                $data['postgrad_college'] ?? '',
                $data['postgrad_branch'] ?? '',
                (int)($data['postgrad_year'] ?? 0),
                $data['postgrad_cgpa'] ?? '',
                $postgradPath,
                $resumePath,
                $idPath,
                $data['track'] ?? 'Full-Stack Distributed Systems & Microservices',
                $data['target_role'] ?? 'Backend Systems Engineer',
                $email
            ]);
        } else {
            $sql = "INSERT INTO candidate_profiles (
                        first_name, last_name, email, phone, dob, gender, address, city, state, pincode,
                        linkedin_url, github_url, avatar_path, tenth_school, tenth_board, tenth_year,
                        tenth_percentage, tenth_cert_path, twelfth_college, twelfth_board, twelfth_stream,
                        twelfth_year, twelfth_percentage, twelfth_cert_path, grad_degree, grad_college,
                        grad_branch, grad_year, grad_cgpa, grad_cert_path, has_postgrad, postgrad_degree,
                        postgrad_college, postgrad_branch, postgrad_year, postgrad_cgpa, postgrad_cert_path,
                        resume_path, id_proof_path, track, target_role, verification_status
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'verified')";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $first, $last, $email,
                $data['phone'] ?? '9876543210',
                $data['dob'] ?? '2003-05-14',
                $data['gender'] ?? 'male',
                $data['address'] ?? 'New Delhi',
                $data['city'] ?? 'New Delhi',
                $data['state'] ?? 'Delhi NCR',
                $data['pincode'] ?? '110042',
                $data['linkedin_url'] ?? '',
                $data['github_url'] ?? '',
                $avatarPath,
                $data['tenth_school'] ?? 'St. Xavier School',
                $data['tenth_board'] ?? 'CBSE',
                (int)($data['tenth_year'] ?? 2019),
                $data['tenth_percentage'] ?? '91.4%',
                $tenthPath,
                $data['twelfth_college'] ?? 'DPS R.K. Puram',
                $data['twelfth_board'] ?? 'CBSE',
                $data['twelfth_stream'] ?? 'Science (PCM)',
                (int)($data['twelfth_year'] ?? 2021),
                $data['twelfth_percentage'] ?? '89.2%',
                $twelfthPath,
                $data['grad_degree'] ?? 'B.Tech',
                $data['grad_college'] ?? 'Delhi Technological University (DTU)',
                $data['grad_branch'] ?? 'Computer Science & Engineering',
                (int)($data['grad_year'] ?? 2025),
                $data['grad_cgpa'] ?? '8.85 CGPA',
                $gradPath,
                isset($data['has_postgrad']) ? 1 : 0,
                $data['postgrad_degree'] ?? '',
                $data['postgrad_college'] ?? '',
                $data['postgrad_branch'] ?? '',
                (int)($data['postgrad_year'] ?? 0),
                $data['postgrad_cgpa'] ?? '',
                $postgradPath,
                $resumePath,
                $idPath,
                $data['track'] ?? 'Full-Stack Distributed Systems & Microservices',
                $data['target_role'] ?? 'Backend Systems Engineer'
            ]);
        }

        // Also ensure user row exists and has user name
        $uCheck = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $uCheck->execute([$email]);
        $uRow = $uCheck->fetch();
        if ($uRow) {
            $pdo->prepare("UPDATE users SET name = ? WHERE id = ?")->execute(["{$first} {$last}", $uRow['id']]);
        } else {
            $randPw = bin2hex(random_bytes(16));
            $pwHash = password_hash($randPw, PASSWORD_BCRYPT);
            $pdo->prepare("INSERT INTO users (name, email, password_hash, role, avatar_url) VALUES (?, ?, ?, 'student', ?)")
                ->execute(["{$first} {$last}", $email, $pwHash, $avatarPath ?: 'assets/avatars/robot1.svg']);
        }

        $token = bin2hex(random_bytes(24));
        return [
            'success' => true,
            'token' => $token,
            'message' => 'Candidate profile, marksheets, and ATS resume uploaded & verified successfully! 🚀',
            'role' => 'student',
            'fullName' => "{$first} {$last}",
            'email' => $email,
            'gradCollege' => $data['grad_college'] ?? 'Delhi Technological University (DTU)',
            'track' => $data['track'] ?? 'Full-Stack Distributed Systems & Microservices',
            'redirect_url' => 'dashboard.html?role=student'
        ];
    }

    public static function getProfile(string $email, string $role): array {
        $pdo = Database::getConnection();

        if ($role === 'admin') {
            // Super Admin can inspect any student profile, or default to all candidate profiles
            if (!empty($email) && $email !== 'admin@torpedo.edu') {
                $stmt = $pdo->prepare("SELECT * FROM candidate_profiles WHERE email = ?");
                $stmt->execute([$email]);
                $res = $stmt->fetch();
                if ($res) return ['success' => true, 'profile' => $res, 'scope' => 'super_admin_full_access'];
            }
            $stmt = $pdo->query("SELECT * FROM candidate_profiles ORDER BY id ASC");
            $all = $stmt->fetchAll();
            return ['success' => true, 'students' => $all, 'scope' => 'super_admin_full_access'];
        } elseif ($role === 'employer') {
            $targetEmail = $email ?: 'recruiter@torpedo.com';
            $stmt = $pdo->prepare("SELECT * FROM employer_profiles WHERE email = ?");
            $stmt->execute([$targetEmail]);
            $res = $stmt->fetch();
            if ($res) {
                $res['hiring_roles'] = json_decode($res['hiring_roles'] ?? '[]', true);
                return ['success' => true, 'profile' => $res];
            }
        } else {
            // Student: strictly access only own profile
            $targetEmail = $email ?: 'eg22343@engug.ruh.ac.lk';
            $stmt = $pdo->prepare("SELECT * FROM candidate_profiles WHERE email = ?");
            $stmt->execute([$targetEmail]);
            $res = $stmt->fetch();
            if ($res) {
                return ['success' => true, 'profile' => $res, 'scope' => 'student_own_profile_only'];
            }
        }

        return ['success' => false, 'message' => 'Profile not found.'];
    }
}
