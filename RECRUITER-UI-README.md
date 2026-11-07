# Recruiter workspace refresh

Open `recruiter.html` directly, or choose Employer on the existing login page.
For the complete existing app, serve this directory with PHP and SQLite support:

    php -S localhost:8000 server.php

Then visit http://localhost:8000/login.html. A static server can preview the recruiter interface without the PHP API.

## What changed

- Dedicated recruiter workspace with a single, compact sidebar.
- Overview with hiring metrics, one candidate pipeline, and a company snapshot.
- Searchable talent directory with discipline/year filters, saved candidates, and filtered CSV export.
- Candidate detail view with skills, education, and clear assessment hierarchy.
- Applications with review, shortlist, interview, and offer stages.
- Three-step opportunity form with auto-saved progress, optional editable screening questions, and live preview.
- Job list with search, status filtering, editing, closing, and deletion confirmation.
- Company profile form and contextual help.
- Responsive navigation, keyboard focus states, accessible form labels, reduced-motion support, and native dialogs.
- Employer login, registration, legacy dashboard, and profile setup routes now open the recruiter workspace. Student and instructor routes remain intact.

## Data and integration

Recruiter profiles, saved openings, draft progress, and candidate stages are stored in browser localStorage using `torpedoRecruiter…` keys. They do not sync between browsers. Use “Explore with sample data” to enable the clearly marked fictional candidate directory. Samples are hidden by default.

This change does not implement live candidate retrieval, real applications, email/interview invitations, or live job publication. Existing PHP APIs and database are retained; the new recruiter data layer is local. Connect the recruiter workspace to your recruiting endpoints before production use. Existing authentication is retained and this UI change is not a production authentication implementation.

## Verification

JavaScript syntax checked. Browser-verified overview, talent search (Docker → two matching candidates), candidate detail navigation, sample pipeline add/stage changes, and complete job creation through review and local save. Responsive CSS breakpoints are included; a separate mobile-device browser run was not performed. PHP syntax/runtime checks were unavailable because PHP is not installed in the editing environment.

## Files

New: `recruiter.html`, `css/recruiter.css`, `js/recruiter.js`, this guide.
Updated routing: `js/app.js`, `dashboard.html`, `profile-setup.html`, `backend/controllers/AuthController.php`.
All other uploaded project files are preserved.

## Compact reference-style update

The recruiter shell now follows the supplied reference: fixed Torpedo header, slim rounded icon rail, pale blue navigation panel, solid blue active item, and the same Home / Talent Sourcing / Course Analytics / Hiring & ATS / Insights & Support groups. Text, icons, headings, controls, and card padding are slightly smaller throughout the recruiter workspace. The rail collapses the panel; its resource and workspace buttons switch navigation contexts. Saved candidates, applications, and company settings remain available through the workspace rail. Course Analytics and Blog Insights have dedicated screens.

Verified in the browser: expanded and collapsed navigation, Course Analytics, Blog Insights, and return to Home. The existing local recruiting data and student/faculty pages are preserved.

## Shared account forms

No recruiter-specific sign-in or signup page is added. Use the existing `login.html` or the account modal in `index.html`; both now expose Student, Instructor, Recruiter, and Super Admin. The recruiter workspace remains a post-login destination. Signup uses the existing split visual card; the extra login-story panel is hidden during signup.

Super Admin signup records a pending access request (`admin_pending`) in the PHP user table and does not create an authenticated admin session. The platform owner must provision/approve access before the account can sign in as `admin`; an approval-management screen is outside this UI update. Super Admin authentication requires an actual API result and does not use the existing local demo fallback or Google demo path. Existing admin accounts require their real stored password, rather than a demo password override.

Validation: browser checked all four role options, recruiter signup, the Super Admin signup notice, and preservation of the selected Super Admin role when switching to sign-in. JavaScript syntax passed. Mocked client tests passed for pending registration, unavailable API denial, non-admin role denial, and verified admin routing. PHP runtime tests remain unavailable in this editing environment.
