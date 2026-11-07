# Torpedo LMS — student experience update

## Start the application

Use your existing PHP host, or run from this project directory with PHP and PDO SQLite installed:

```sh
php -S localhost:8000 server.php
```

Open http://localhost:8000/dashboard.html for the redesigned student dashboard. The original landing page remains at http://localhost:8000/.

For a frontend-only preview, run `python3 -m http.server 8000` and open `/dashboard.html`. PHP/API features cannot run with this static server.

## Changes

- Redesigned dashboard with warm paper backgrounds, sage accents, an original book illustration, simpler single-column sidebar, course cards, weekly calendar and goal display.
- Two included self-paced reading paths, each with four original introductory lessons and practice prompts. Notes save automatically. Completion is idempotent and updates dashboard statistics and weekly goals.
- A personal study planner: create tasks, select a date, check completion and delete tasks. Pending tasks appear on the home dashboard.
- Profile/preferences editor and weekly goal settings; activity history reflects actual local actions.
- Responsive dashboard layouts, mobile navigation, keyboard focus styles, reduced-motion support, labeled controls and native accessible lesson dialogs.
- Preserved existing courses, library, certifications, coding, quiz, jobs and hackathon sections and PHP backend.
- Removed hard-coded logic that replaced certain students' names or deleted their sessions.
- Corrected the default home selection and reduced navigation toast noise.
- Sign-out clears the local user record. Names and initials update from the saved profile.
- Library downloads no longer claim success when a file is absent. Career application confirmation describes local saving, not recruiter delivery.
- Removed student-facing simulated faculty approval/rejection and blocked the corresponding functions. External certificate submissions are labeled local drafts.

## Storage and integration boundaries

The new planner, lesson notes, progress, activity and preferences are stored in localStorage. Learning data uses the signed-in email as a namespace, or a guest namespace when there is no email. This is device-local persistence, not database synchronization, and localStorage is not an authentication or authorization boundary. Existing sessions and backend code remain as supplied.

The two new reading paths are independent introductory content, not full replacements for the catalog's advanced paid courses. Catalog courses without attached lessons show an explicit unavailable-content message. No fabricated course videos were added.

Existing catalog, placement, credential, badge and quiz content includes seeded/sample records. Live faculty verification, employer delivery, real course media, licensed library downloads and account-level synchronization still need production integrations. Do not treat browser-saved certificates or application records as independently verified or externally submitted.

Before production use, the existing backend needs authenticated session enforcement, per-user authorization and a review of uploaded-file access and sandbox execution. This update does not claim to complete that backend work.

## Validation performed

- Syntax checked 18 JavaScript files and inline script blocks with Node.
- Browser checked the home dashboard, lesson reader, course navigation, library and certifications views.
- Confirmed saved lesson completion and notes, task creation and persistence after reload, and profile/weekly-goal persistence after reload.
- Responsive breakpoints are implemented; separate device-sized visual QA was not run.
- PHP is unavailable in the editing environment, so login/API, SQLite writes, upload handling and sandbox judging were not executed here.

## Files to review

- `dashboard.html`: replaces the old home tab and includes the enhancements; fixes session and misleading action behavior.
- `css/student-experience.css`: scoped dashboard design and shared portal theme.
- `js/student-experience.js`: learning reader, progress, planner, preferences and activity.
- `js/app.js`: removes session-deletion logic.

The archive retains application source, assets and the supplied database, but excludes Git history, macOS archive metadata and temporary preview files. No changes were pushed to GitHub or deployed to your existing hosting.
