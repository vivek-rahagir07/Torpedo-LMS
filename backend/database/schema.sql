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
