# Torpedo Super Admin console

The Super Admin portal uses the same compact Torpedo header, rounded icon rail, pale blue sidebar, small typography, and grouped navigation as the other portals. It is a functional local UI prototype integrated with the existing browser-based faculty, recruiter, and student experiences.

## Open it

Keep the existing shared login/signup form in `login.html` or the home-page account modal. Verified admin login routes to `super-admin.html`. No separate admin or recruiter login page is added.

To explore the UI without an account, serve the project and open:

    super-admin.html?preview=1

For the existing PHP application, run from the project directory:

    php -S localhost:8000 server.php

Then visit http://localhost:8000/super-admin.html?preview=1. A static server also supports the UI preview. Preview access does not authenticate an administrator or grant server privileges.

## Sections

- **Overview:** people totals, published courses, review queue, public updates, and recent activity.
- **Course approvals:** searchable queue, complete curriculum review, approval/publication, required feedback when requesting changes or rejecting, and archive action for approved courses.
- **All courses:** catalogue with status filters and individual course details.
- **People directory:** search/filter students, faculty, recruiters, and account status; export the current view; inspect full contact, education/company, skills, course, and account information in one view.
- **Profile management:** edit profile details and record suspension/restoration reasons. These are local account records, not server access controls.
- **Public workspaces:** create/edit spaces, descriptions, codes and guidelines; set public/private visibility; publish or archive.
- **Updates & announcements:** compose, edit, pin/unpin, publish, draft, and archive updates; choose workspace and audience.
- **Moderation:** review reports and record resolved/dismissed decisions with notes.
- **Activity log:** searchable local history of decisions and changes.
- **Platform settings:** identity, support email, public-post policy preference, and local maintenance notice. Faculty course approval remains required.
- **My profile:** editable administrator name, work email, phone, location, department, and bio.

## Faculty course workflow

1. Faculty creates or edits a course in Curriculum Studio.
2. **Submit for approval** stores it as **Pending approval**, with an ID, author, email, and submission time. Faculty can still save a draft.
3. In Super Admin, select **View portal data** to review actual records saved on this browser.
4. **Approve & publish** changes the course to Published and records the reviewer and time. **Request changes** and **Reject submission** require written feedback.
5. Faculty sees the updated status and feedback in My Courses. Revised submissions return to Pending approval.
6. Only published courses with a recorded approval appear in the added student-facing approved-courses section. Archiving removes a course from that section.

Existing example courses and static catalogue content are preserved. The new approved-course section exposes the curriculum; real enrollment and lesson delivery still require a course service.

## Cross-portal local connections

`js/platform-bridge.js` captures submitted student, faculty, and recruiter profile details in a local directory. It adds approved faculty courses and officially managed public workspaces to the existing student views. Public workspace dialogs display published announcements for the selected audience. Private, draft, and archived spaces stay out of the public list.

Real browser records use `torpedoCourses`, `torpedoPeopleRegistry`, and `torpedoAdminState`. Illustrative records use separate `torpedoAdminDemoState` and `torpedoAdminDemoCourses` keys. Sample actions never overwrite the actual local faculty catalogue. Use the sample/portal toggle to change datasets.

## Verification and production scope

Browser-verified: overview, course review and approval, full faculty dossier and linked course history, creation of a published workspace, publication/pinning of an update, and administrator profile form.

Isolated workflow tests passed for faculty submission → change request → faculty resubmission → admin approval → archive, feedback/audit persistence, and separation of sample and portal data. Bridge tests passed for approved-only course visibility, public/published-only workspace visibility, and role-aware profile capture without password storage. New/modified JavaScript and faculty inline scripts were syntax checked.

This delivery is the UI and same-browser workflow. It does not implement production administrator authorization, server-side review enforcement, institution-wide user retrieval, server account suspension, file/document verification, real moderation intake, or cross-device synchronization. Existing PHP authentication is retained with its shared Super Admin sign-in route; PHP runtime verification was unavailable in the editing environment. Connect these management operations to authenticated backend endpoints before production use.
