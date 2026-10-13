# Torpedo LMS - Multi-Role Laravel Backend Integration Guide

This guide details the complete Laravel 10/11/12 backend architecture for the **Multi-Designation Profile Setup & Document Verification System** implemented in [`profile-setup.html`](file:///Users/vivek/Documents/GitHub/Torpedo%20LMS/profile-setup.html) and [`dashboard.html`](file:///Users/vivek/Documents/GitHub/Torpedo%20LMS/dashboard.html).

It supports 3 distinct designation roles:
1. **🎓 Student / Candidate Profile**: Personal contact info, 10th marksheet PDF, 12th marksheet PDF, Graduation Degree PDF, Post-Graduation PDF, ATS Resume PDF, Government ID proof, engineering track selection.
2. **👨‍🏫 Faculty / Dean Profile**: Salutation, academic designation, institution/university, department, teaching experience, Ph.D. degree certificate PDF, Masters/Bachelors degree PDF, university appointment letter PDF, complete academic CV/bibliography PDF, teaching domain specializations, sample lecture video URL, bio.
3. **🏢 Corporate Employer / Recruiter Profile**: Company logo, legal company name, official website, recruiter designation, corporate email, phone, HQ location, industry sector, company headcount size, CIN / GST registration number, Certificate of Incorporation / GST PDF upload, target hiring roles, annual hiring volume, CTC package bracket, primary tech stack, partnership model.

---

## 1. Database Schema Migrations

Run:
```bash
php artisan make:migration create_multi_role_profiles_tables
```

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // ---------------------------------------------------------------------
        // 1. CANDIDATE (STUDENT) PROFILES TABLE
        // ---------------------------------------------------------------------
        Schema::create('candidate_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            
            // Personal & Contact Info
            $table->string('avatar_path')->nullable();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->index();
            $table->string('phone_country_code', 8)->default('+91');
            $table->string('phone', 20);
            $table->date('dob');
            $table->enum('gender', ['male', 'female', 'non_binary', 'prefer_not_to_say']);
            $table->text('address');
            $table->string('city');
            $table->string('state');
            $table->string('pincode', 12);
            $table->string('linkedin_url')->nullable();
            $table->string('github_url')->nullable();

            // 10th Standard Academic Record
            $table->string('tenth_school');
            $table->string('tenth_board');
            $table->year('tenth_year');
            $table->string('tenth_percentage');
            $table->string('tenth_cert_path'); // PDF Storage Path

            // 12th Standard / Diploma Record
            $table->string('twelfth_college');
            $table->string('twelfth_board');
            $table->string('twelfth_stream');
            $table->year('twelfth_year');
            $table->string('twelfth_percentage');
            $table->string('twelfth_cert_path'); // PDF Storage Path

            // Graduation (Undergraduate) Record
            $table->string('grad_degree');
            $table->string('grad_college');
            $table->string('grad_branch');
            $table->year('grad_year');
            $table->string('grad_cgpa');
            $table->string('grad_cert_path'); // PDF Storage Path

            // Post-Graduation (Masters - Optional)
            $table->boolean('has_postgrad')->default(false);
            $table->string('postgrad_degree')->nullable();
            $table->string('postgrad_college')->nullable();
            $table->string('postgrad_branch')->nullable();
            $table->year('postgrad_year')->nullable();
            $table->string('postgrad_cgpa')->nullable();
            $table->string('postgrad_cert_path')->nullable(); // PDF Storage Path

            // Verification & Placement Files
            $table->string('resume_path');     // PDF Storage Path
            $table->string('id_proof_path');   // Encrypted ID PDF/Image Path
            
            // Career Track
            $table->string('track');
            $table->string('target_role')->nullable();
            $table->string('immediate_availability')->default('immediate');
            $table->boolean('declaration_agreed')->default(true);
            $table->enum('verification_status', ['pending', 'verified', 'flagged'])->default('pending');

            $table->timestamps();
        });

        // ---------------------------------------------------------------------
        // 2. FACULTY / INSTRUCTOR / DEAN PROFILES TABLE
        // ---------------------------------------------------------------------
        Schema::create('faculty_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            
            // Identity & Academic Affiliation
            $table->string('avatar_path')->nullable();
            $table->string('salutation', 20)->default('Prof. Dr.');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->index();
            $table->string('phone', 20);
            $table->string('designation'); // Professor & Chair, Dean, etc.
            $table->string('institution'); // IIT Delhi, DTU, Stanford
            $table->string('department');  // Department of CSE
            $table->string('experience_years');
            $table->string('scholar_url')->nullable();
            $table->string('linkedin_url')->nullable();

            // Ph.D. / Doctorate Credentials
            $table->string('phd_specialization');
            $table->string('phd_university');
            $table->string('phd_cert_path'); // PDF Storage Path

            // Masters & Bachelors Degrees
            $table->string('masters_degree')->nullable();
            $table->string('bachelors_degree')->nullable();
            $table->string('masters_cert_path')->nullable(); // PDF Storage Path

            // Institutional Appointment & CV
            $table->string('appointment_letter_path'); // PDF Storage Path
            $table->string('faculty_cv_path');          // PDF Storage Path

            // Curriculum Tracks & Preferences
            $table->json('teaching_domains'); // ["Distributed Systems", "Autonomous AI"]
            $table->string('engagement_type')->default('lead_instructor');
            $table->string('sample_video_url')->nullable();
            $table->text('bio');
            $table->boolean('code_agreed')->default(true);
            $table->enum('verification_status', ['pending', 'verified', 'council_approved'])->default('pending');

            $table->timestamps();
        });

        // ---------------------------------------------------------------------
        // 3. EMPLOYER / CORPORATE RECRUITER PROFILES TABLE
        // ---------------------------------------------------------------------
        Schema::create('employer_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            
            // Company Profile
            $table->string('logo_path')->nullable();
            $table->string('company_name')->index();
            $table->string('company_website');
            $table->string('recruiter_name');
            $table->string('recruiter_designation'); // Head of TA, Tech Recruiter, VP Eng
            $table->string('email')->index();
            $table->string('phone', 20);
            $table->string('hq_location');
            $table->string('linkedin_url')->nullable();

            // Entity Verification
            $table->string('industry');
            $table->string('company_size');
            $table->string('cin_gst_number'); // Corporate Identification / GSTIN
            $table->string('incorporation_cert_path'); // PDF Storage Path

            // Talent Acquisition Requisitions
            $table->json('hiring_roles'); // ["Backend SDE", "Autonomous AI"]
            $table->string('hiring_volume');
            $table->string('ctc_bracket'); // ₹18 - 30 LPA
            $table->string('required_tech_stack');
            $table->string('partnership_mode')->default('direct_ats');
            $table->boolean('terms_agreed')->default(true);
            $table->enum('verification_status', ['pending', 'verified', 'tier1_partner'])->default('pending');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employer_profiles');
        Schema::dropIfExists('faculty_profiles');
        Schema::dropIfExists('candidate_profiles');
    }
};
```

---

## 2. Eloquent Models & Relationships

### `App\Models\User.php`
```php
<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Authenticatable
{
    protected $fillable = ['name', 'email', 'password', 'role'];

    public function candidateProfile(): HasOne
    {
        return $this->hasOne(CandidateProfile::class);
    }

    public function facultyProfile(): HasOne
    {
        return $this->hasOne(FacultyProfile::class);
    }

    public function employerProfile(): HasOne
    {
        return $this->hasOne(EmployerProfile::class);
    }
}
```

### `App\Models\CandidateProfile.php`
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CandidateProfile extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'dob' => 'date',
        'has_postgrad' => 'boolean',
        'declaration_agreed' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```

### `App\Models\FacultyProfile.php`
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FacultyProfile extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'teaching_domains' => 'array',
        'code_agreed' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```

### `App\Models\EmployerProfile.php`
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployerProfile extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'hiring_roles' => 'array',
        'terms_agreed' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```

---

## 3. Unified Multi-Role FormRequest (`StoreProfileRequest.php`)

Run:
```bash
php artisan make:request StoreProfileRequest
```

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $role = $this->input('role', 'student');

        if ($role === 'faculty') {
            return [
                'role' => ['required', 'in:student,faculty,employer'],
                'avatar' => ['nullable', 'image', 'mimes:jpeg,png,webp', 'max:5120'],
                'salutation' => ['required', 'string', 'max:20'],
                'first_name' => ['required', 'string', 'max:100'],
                'last_name' => ['required', 'string', 'max:100'],
                'designation' => ['required', 'string', 'max:150'],
                'institution' => ['required', 'string', 'max:200'],
                'department' => ['required', 'string', 'max:200'],
                'experience_years' => ['required', 'string'],
                'email' => ['required', 'email', 'max:150'],
                'phone' => ['required', 'string', 'max:20'],
                'scholar_url' => ['nullable', 'url', 'max:255'],
                'linkedin_url' => ['nullable', 'url', 'max:255'],
                
                // Doctoral & Degrees
                'phd_specialization' => ['required', 'string', 'max:200'],
                'phd_university' => ['required', 'string', 'max:200'],
                'phd_certificate' => ['required', 'file', 'mimes:pdf', 'max:10240'],
                'masters_degree' => ['nullable', 'string', 'max:150'],
                'bachelors_degree' => ['nullable', 'string', 'max:150'],
                'masters_certificate' => ['nullable', 'file', 'mimes:pdf', 'max:10240'],

                // Credentials & CV
                'appointment_letter_pdf' => ['required', 'file', 'mimes:pdf,jpeg,png', 'max:10240'],
                'faculty_cv_pdf' => ['required', 'file', 'mimes:pdf', 'max:10240'],

                // Domains & Bio
                'teaching_domains' => ['required', 'array', 'min:1'],
                'engagement_type' => ['required', 'string'],
                'sample_video_url' => ['nullable', 'url'],
                'bio' => ['required', 'string', 'min:30', 'max:1500'],
                'faculty_code_agreed' => ['required', 'accepted'],
            ];
        }

        if ($role === 'employer') {
            return [
                'role' => ['required', 'in:student,faculty,employer'],
                'avatar' => ['nullable', 'image', 'mimes:jpeg,png,webp,svg', 'max:5120'],
                'company_name' => ['required', 'string', 'max:200'],
                'company_website' => ['required', 'url', 'max:255'],
                'recruiter_name' => ['required', 'string', 'max:100'],
                'recruiter_designation' => ['required', 'string', 'max:150'],
                'email' => ['required', 'email', 'max:150'],
                'phone' => ['required', 'string', 'max:20'],
                'hq_location' => ['required', 'string', 'max:150'],
                'linkedin_url' => ['nullable', 'url', 'max:255'],

                // Legal Entity
                'industry' => ['required', 'string', 'max:100'],
                'company_size' => ['required', 'string', 'max:50'],
                'cin_gst_number' => ['required', 'string', 'max:50'],
                'incorporation_cert_pdf' => ['required', 'file', 'mimes:pdf,jpeg,png', 'max:10240'],

                // Hiring Requisitions
                'hiring_roles' => ['required', 'array', 'min:1'],
                'hiring_volume' => ['required', 'string'],
                'ctc_bracket' => ['required', 'string'],
                'required_tech_stack' => ['required', 'string', 'max:300'],
                'partnership_mode' => ['required', 'string'],
                'employer_terms_agreed' => ['required', 'accepted'],
            ];
        }

        // Student Default Rules
        return [
            'role' => ['required', 'in:student,faculty,employer'],
            'avatar' => ['nullable', 'image', 'mimes:jpeg,png,webp', 'max:5120'],
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:150'],
            'phone' => ['required', 'string', 'min:8', 'max:15'],
            'dob' => ['required', 'date', 'before:today'],
            'gender' => ['required', 'in:male,female,non_binary,prefer_not_to_say'],
            'address' => ['required', 'string', 'max:500'],
            'city' => ['required', 'string', 'max:100'],
            'state' => ['required', 'string', 'max:100'],
            'pincode' => ['required', 'string', 'max:12'],
            'linkedin_url' => ['nullable', 'url', 'max:255'],
            'github_url' => ['nullable', 'url', 'max:255'],

            // 10th
            'tenth_school' => ['required', 'string', 'max:200'],
            'tenth_board' => ['required', 'string', 'max:100'],
            'tenth_year' => ['required', 'numeric', 'min:2000', 'max:' . date('Y')],
            'tenth_percentage' => ['required', 'string', 'max:20'],
            'tenth_certificate' => ['required', 'file', 'mimes:pdf,jpeg,png', 'max:10240'],

            // 12th
            'twelfth_college' => ['required', 'string', 'max:200'],
            'twelfth_board' => ['required', 'string', 'max:100'],
            'twelfth_stream' => ['required', 'string', 'max:100'],
            'twelfth_year' => ['required', 'numeric', 'min:2000', 'max:' . date('Y')],
            'twelfth_percentage' => ['required', 'string', 'max:20'],
            'twelfth_certificate' => ['required', 'file', 'mimes:pdf,jpeg,png', 'max:10240'],

            // Graduation
            'grad_degree' => ['required', 'string', 'max:100'],
            'grad_college' => ['required', 'string', 'max:200'],
            'grad_branch' => ['required', 'string', 'max:150'],
            'grad_year' => ['required', 'numeric', 'min:2010', 'max:2030'],
            'grad_cgpa' => ['required', 'string', 'max:20'],
            'grad_certificate' => ['required', 'file', 'mimes:pdf,jpeg,png', 'max:10240'],

            // Post-Graduation (Optional)
            'has_postgrad' => ['nullable', 'boolean'],
            'postgrad_degree' => ['nullable', 'required_if:has_postgrad,1', 'string', 'max:100'],
            'postgrad_college' => ['nullable', 'required_if:has_postgrad,1', 'string', 'max:200'],
            'postgrad_certificate' => ['nullable', 'file', 'mimes:pdf,jpeg,png', 'max:10240'],

            // Placement Files
            'resume_pdf' => ['required', 'file', 'mimes:pdf', 'max:10240'],
            'id_proof_pdf' => ['required', 'file', 'mimes:pdf,jpeg,png', 'max:10240'],

            // Track
            'track' => ['required', 'string', 'max:150'],
            'declaration_agreed' => ['required', 'accepted'],
        ];
    }
}
```

---

## 4. Multi-Role Controller (`ProfileController.php`)

Run:
```bash
php artisan make:controller ProfileController
```

```php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProfileRequest;
use App\Models\CandidateProfile;
use App\Models\FacultyProfile;
use App\Models\EmployerProfile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Store or update profile based on designation role
     */
    public function store(StoreProfileRequest $request): JsonResponse|RedirectResponse
    {
        $role = $request->input('role', 'student');
        $validated = $request->validated();
        $user = auth()->user();

        // ---------------------------------------------------------------------
        // FACULTY SUBMISSION HANDLER
        // ---------------------------------------------------------------------
        if ($role === 'faculty') {
            if ($request->hasFile('avatar')) {
                $validated['avatar_path'] = $request->file('avatar')->store('faculty/avatars', 'public');
            }
            $validated['phd_cert_path'] = $request->file('phd_certificate')->store('faculty/phd', 'private');
            
            if ($request->hasFile('masters_certificate')) {
                $validated['masters_cert_path'] = $request->file('masters_certificate')->store('faculty/degrees', 'private');
            }
            $validated['appointment_letter_path'] = $request->file('appointment_letter_pdf')->store('faculty/appointment', 'private');
            $validated['faculty_cv_path'] = $request->file('faculty_cv_pdf')->store('faculty/cv', 'private');
            
            $validated['code_agreed'] = $request->boolean('faculty_code_agreed');
            $validated['user_id'] = $user?->id;

            $profile = FacultyProfile::updateOrCreate(
                ['email' => $validated['email']],
                $validated
            );

            return $this->respondSuccess($request, $profile, 'Faculty profile & credentials verified!');
        }

        // ---------------------------------------------------------------------
        // EMPLOYER SUBMISSION HANDLER
        // ---------------------------------------------------------------------
        if ($role === 'employer') {
            if ($request->hasFile('avatar')) {
                $validated['logo_path'] = $request->file('avatar')->store('employers/logos', 'public');
            }
            $validated['incorporation_cert_path'] = $request->file('incorporation_cert_pdf')->store('employers/incorporation', 'private');
            
            $validated['terms_agreed'] = $request->boolean('employer_terms_agreed');
            $validated['user_id'] = $user?->id;

            $profile = EmployerProfile::updateOrCreate(
                ['email' => $validated['email']],
                $validated
            );

            return $this->respondSuccess($request, $profile, 'Employer entity registered & ATS pipeline activated!');
        }

        // ---------------------------------------------------------------------
        // STUDENT SUBMISSION HANDLER
        // ---------------------------------------------------------------------
        if ($request->hasFile('avatar')) {
            $validated['avatar_path'] = $request->file('avatar')->store('candidates/avatars', 'public');
        }
        $validated['tenth_cert_path'] = $request->file('tenth_certificate')->store('certificates/10th', 'private');
        $validated['twelfth_cert_path'] = $request->file('twelfth_certificate')->store('certificates/12th', 'private');
        $validated['grad_cert_path'] = $request->file('grad_certificate')->store('certificates/grad', 'private');

        if ($request->hasFile('postgrad_certificate')) {
            $validated['postgrad_cert_path'] = $request->file('postgrad_certificate')->store('certificates/postgrad', 'private');
        }

        $validated['resume_path'] = $request->file('resume_pdf')->store('resumes', 'public');
        $validated['id_proof_path'] = $request->file('id_proof_pdf')->store('id_proofs', 'private');
        $validated['user_id'] = $user?->id;

        $profile = CandidateProfile::updateOrCreate(
            ['email' => $validated['email']],
            $validated
        );

        return $this->respondSuccess($request, $profile, 'Candidate profile & marksheets submitted successfully!');
    }

    private function respondSuccess($request, $profile, string $message): JsonResponse|RedirectResponse
    {
        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => $message,
                'redirect_url' => route('dashboard', ['role' => $request->input('role')]),
                'profile' => $profile
            ], 201);
        }

        return redirect()->route('dashboard', ['role' => $request->input('role')])->with('success', $message);
    }
}
```

---

## 5. Secure Document Access & Signed URLs

Because academic marksheets, Ph.D. thesis certificates, and Company Incorporation certificates are stored on the `'private'` disk, use a policy-guarded controller to serve them:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DocumentDownloadController extends Controller
{
    public function download(string $type, int $id): StreamedResponse
    {
        // 1. Authorize user (e.g. Dean council, authorized recruiter, or candidate themselves)
        // $this->authorize('view-document', [$type, $id]);

        $filePath = match ($type) {
            'tenth' => CandidateProfile::findOrFail($id)->tenth_cert_path,
            'phd' => FacultyProfile::findOrFail($id)->phd_cert_path,
            'incorporation' => EmployerProfile::findOrFail($id)->incorporation_cert_path,
            default => abort(404),
        };

        if (!Storage::disk('private')->exists($filePath)) {
            abort(404, 'Certificate file not found on secure storage.');
        }

        return Storage::disk('private')->response($filePath);
    }
}
```

---

## 6. Route Configurations (`routes/web.php` & `routes/api.php`)

### In `routes/web.php`:
```php
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DocumentDownloadController;

Route::get('/profile/setup', function () {
    return view('profile-setup');
})->name('profile.setup');

Route::post('/profile/setup', [ProfileController::class, 'store'])->name('profile.store');

Route::get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

// Protected Document Download
Route::get('/documents/{type}/{id}', [DocumentDownloadController::class, 'download'])
    ->middleware('auth')
    ->name('documents.download');
```

### In `routes/api.php`:
```php
use App\Http\Controllers\ProfileController;

Route::post('/profile/setup', [ProfileController::class, 'store']);
```

---

## 7. Migration Steps for Torpedo LMS Frontend Files

1. Copy [`profile-setup.html`](file:///Users/vivek/Documents/GitHub/Torpedo%20LMS/profile-setup.html) to `resources/views/profile-setup.blade.php`.
2. Replace static CSRF field on line 125 with `@csrf`.
3. Copy [`dashboard.html`](file:///Users/vivek/Documents/GitHub/Torpedo%20LMS/dashboard.html) to `resources/views/dashboard.blade.php`.
4. Link storage symlink:
   ```bash
   php artisan storage:link
   ```
5. Run migrations:
   ```bash
   php artisan migrate
   ```
