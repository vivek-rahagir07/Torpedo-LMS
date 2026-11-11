-- Torpedo LMS Database Schema (SQLite)

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'student', -- 'student' | 'faculty' | 'employer'
    avatar_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS candidate_profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone_country_code TEXT DEFAULT '+91',
    phone TEXT NOT NULL,
    dob TEXT,
    gender TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    pincode TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    avatar_path TEXT,
    
    -- 10th
    tenth_school TEXT,
    tenth_board TEXT,
    tenth_year INTEGER,
    tenth_percentage TEXT,
    tenth_cert_path TEXT,

    -- 12th
    twelfth_college TEXT,
    twelfth_board TEXT,
    twelfth_stream TEXT,
    twelfth_year INTEGER,
    twelfth_percentage TEXT,
    twelfth_cert_path TEXT,

    -- Graduation
    grad_degree TEXT,
    grad_college TEXT,
    grad_branch TEXT,
    grad_year INTEGER,
    grad_cgpa TEXT,
    grad_cert_path TEXT,

    -- Post-Graduation
    has_postgrad INTEGER DEFAULT 0,
    postgrad_degree TEXT,
    postgrad_college TEXT,
    postgrad_branch TEXT,
    postgrad_year INTEGER,
    postgrad_cgpa TEXT,
    postgrad_cert_path TEXT,

    -- Verification Documents
    resume_path TEXT,
    id_proof_path TEXT,

    -- Career Track
    track TEXT,
    target_role TEXT,
    immediate_availability TEXT DEFAULT 'immediate',
    verification_status TEXT DEFAULT 'verified',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS faculty_profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    salutation TEXT DEFAULT 'Prof. Dr.',
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    designation TEXT NOT NULL,
    institution TEXT NOT NULL,
    department TEXT NOT NULL,
    experience_years TEXT NOT NULL,
    scholar_url TEXT,
    linkedin_url TEXT,
    avatar_path TEXT,

    -- Doctorate
    phd_specialization TEXT NOT NULL,
    phd_university TEXT NOT NULL,
    phd_cert_path TEXT,

    -- Degrees
    masters_degree TEXT,
    bachelors_degree TEXT,
    masters_cert_path TEXT,

    -- Credentials
    appointment_letter_path TEXT,
    faculty_cv_path TEXT,

    -- Domains & Bio
    teaching_domains TEXT, -- JSON array
    engagement_type TEXT DEFAULT 'lead_instructor',
    sample_video_url TEXT,
    bio TEXT,
    verification_status TEXT DEFAULT 'council_approved',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS employer_profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    company_name TEXT NOT NULL,
    company_website TEXT NOT NULL,
    recruiter_name TEXT NOT NULL,
    recruiter_designation TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    hq_location TEXT NOT NULL,
    linkedin_url TEXT,
    logo_path TEXT,

    -- Entity
    industry TEXT NOT NULL,
    company_size TEXT NOT NULL,
    cin_gst_number TEXT NOT NULL,
    incorporation_cert_path TEXT,

    -- Requisitions
    hiring_roles TEXT, -- JSON array
    hiring_volume TEXT,
    ctc_bracket TEXT,
    required_tech_stack TEXT,
    partnership_mode TEXT DEFAULT 'direct_ats',
    verification_status TEXT DEFAULT 'tier1_partner',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS courses (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    instructor TEXT NOT NULL,
    rating REAL DEFAULT 4.9,
    reviews INTEGER DEFAULT 1200,
    students TEXT DEFAULT '12,000+',
    duration TEXT DEFAULT '14 Weeks',
    badge TEXT DEFAULT 'Hot Track',
    badge_class TEXT DEFAULT 'badge-hot',
    price TEXT DEFAULT '₹14,999',
    syllabus TEXT, -- JSON array
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS enrollments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email TEXT NOT NULL,
    course_id TEXT NOT NULL,
    progress_percentage INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    company_logo TEXT,
    location TEXT NOT NULL,
    work_mode TEXT NOT NULL, -- 'Remote' | 'On-site' | 'Hybrid'
    job_type TEXT NOT NULL,  -- 'Internship' | 'Full-Time'
    stipend TEXT NOT NULL,
    batch TEXT NOT NULL,
    description TEXT NOT NULL,
    skills TEXT NOT NULL,    -- JSON array
    match_score INTEGER DEFAULT 95,
    applicants_count INTEGER DEFAULT 0,
    urgent INTEGER DEFAULT 0,
    days_left INTEGER DEFAULT 7,
    posted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS job_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    job_id TEXT NOT NULL,
    user_email TEXT NOT NULL,
    candidate_name TEXT NOT NULL,
    match_score INTEGER DEFAULT 95,
    status TEXT DEFAULT 'Under Review', -- 'Applied' | 'Under Review' | 'Shortlisted' | 'Offered'
    applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(job_id) REFERENCES jobs(id)
);

CREATE TABLE IF NOT EXISTS hackathons (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    organizer TEXT NOT NULL,
    banner_img TEXT,
    prize_pool TEXT NOT NULL,
    format TEXT NOT NULL, -- 'Online' | 'Hybrid' | 'In-Person'
    domain TEXT NOT NULL, -- 'Web3' | 'AI & LLM' | 'Fintech' | 'Cloud'
    start_date TEXT NOT NULL,
    duration TEXT NOT NULL,
    participants_count INTEGER DEFAULT 0,
    status TEXT DEFAULT 'Open', -- 'Open' | 'Ongoing' | 'Upcoming' | 'Closed'
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hackathon_teams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hackathon_id TEXT NOT NULL,
    team_name TEXT NOT NULL,
    lead_email TEXT NOT NULL,
    lead_name TEXT NOT NULL,
    members_json TEXT,
    project_title TEXT,
    status TEXT DEFAULT 'Registered',
    registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(hackathon_id) REFERENCES hackathons(id)
);

CREATE TABLE IF NOT EXISTS problems (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    category TEXT NOT NULL,
    tags TEXT NOT NULL,
    acceptance_rate TEXT NOT NULL,
    likes INTEGER DEFAULT 0,
    dislikes INTEGER DEFAULT 0,
    description TEXT NOT NULL,
    constraints TEXT NOT NULL,
    hints TEXT NOT NULL,
    starter_codes TEXT NOT NULL,
    testcases TEXT NOT NULL,
    hidden_testcases TEXT NOT NULL,
    editorial TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS problem_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email TEXT NOT NULL,
    problem_id INTEGER NOT NULL,
    language TEXT NOT NULL,
    code TEXT NOT NULL,
    status TEXT NOT NULL,
    runtime_ms INTEGER DEFAULT 0,
    memory_mb REAL DEFAULT 0.0,
    tests_passed INTEGER DEFAULT 0,
    total_tests INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_solved_problems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email TEXT NOT NULL,
    problem_id INTEGER NOT NULL,
    solved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_email, problem_id)
);

CREATE TABLE IF NOT EXISTS email_otps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    otp_code TEXT NOT NULL,
    purpose TEXT DEFAULT 'verification', -- 'signup' | 'login' | 'reset'
    expires_at DATETIME NOT NULL,
    verified INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);



