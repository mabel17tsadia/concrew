# Test Cases & Bug Log

> **Document ID:** DOC-017  
> **Primary Role:** QA Engineer  
> **Supporting Roles:** Software Engineer, Product Manager  
> **SDLC Phase:** Testing & Validation  
> **Status:** Living Document  
> **Version:** MVP v2.2

---

# Purpose

This document records the test cases executed for the ConCrew MVP and tracks defects discovered during development.

It provides traceability between business requirements, functional requirements, implementation, and validation to ensure every MVP feature is verified before release.

> **Note on this revision:** the prior revision (v2.1) covered every shipped module but was still mostly happy-path: does the feature work when the user does the right thing, in the right order. This revision adds negative, boundary, security/authorization, and edge-case coverage across the entire flow, from the landing page through every screen behind login, so the suite also tests what should go *wrong* on purpose: bad input, duplicate input, empty input, unauthorized access attempts, and race conditions. Each test case is tagged by category. As before, a case is marked **Passed** only where it has actually been manually verified; the rest are honestly **Not Started**.

---

# Test Strategy

Every functional requirement should have one or more associated test cases.

Each test case verifies:

- Functional behavior
- Acceptance criteria
- Expected user experience
- Error handling
- Business rules

---

# Test Case Categories

| Category | Description |
|----------|-------------|
| Happy Path | The user does the intended thing, with valid input, in the expected order |
| Negative | Invalid, malformed, or missing input that the system should reject with a clear error |
| Boundary | Input at or just past a limit (minimum/maximum length, zero items, exactly one item, empty state) |
| Security / Authorization | An attempt to access, modify, or view something the current user should not be able to |
| Edge Case / Concurrency | An unusual but realistic sequence of events, timing, or simultaneous actions |

---

# Test Case Status

| Status | Description |
|---------|-------------|
| Not Started | Test has not been executed |
| Passed | Test completed successfully |
| Failed | Expected result not achieved |
| Blocked | Cannot execute due to dependency |

---

# Test Case Template

| Field | Description |
|---------|-------------|
| Test Case ID | Unique identifier |
| Category | Happy Path / Negative / Boundary / Security / Edge Case |
| Feature | Feature under test |
| Requirement | Functional Requirement reference |
| Preconditions | Required setup |
| Test Steps | Actions performed |
| Expected Result | Expected system behavior |
| Actual Result | Actual outcome |
| Status | Current execution status |

---

# Functional Test Cases

---

## Module A — Landing Page & Navigation (Pre-Login)

### TC-A01 — Landing Page Loads Without Authentication

| Field | Value |
|--------|-------|
| Category | Happy Path |
| Preconditions | No active session |
| Steps | Visit the site root while logged out |
| Expected Result | Landing page renders with Log In and Create Account actions; no protected content is exposed |
| Status | Not Started |

---

### TC-A02 — Direct URL Access to a Protected Route While Logged Out

| Field | Value |
|--------|-------|
| Category | Security |
| Preconditions | No active session |
| Steps | Navigate directly to `/dashboard`, `/crews/{id}`, `/people`, or `/messages` by URL without logging in |
| Expected Result | User is redirected to Login rather than seeing any protected data |
| Status | Not Started |

---

### TC-A03 — Broken or Unknown Route

| Field | Value |
|--------|-------|
| Category | Negative |
| Preconditions | None |
| Steps | Visit a URL that does not correspond to any page (for example `/nonexistent`) |
| Expected Result | A not-found page is shown rather than a server error or blank screen |
| Status | Not Started |

---

## Module B — Registration

### TC-B01 — Register With Valid Details

| Field | Value |
|--------|-------|
| Category | Happy Path |
| Requirement | FR-1.1 |
| Preconditions | Email not already registered |
| Steps | Open Register → enter a valid, unused email and a password meeting the strength requirement → submit |
| Expected Result | Account created; confirmation email sent |
| Status | Not Started |

---

### TC-B02 — Register With Malformed Email

| Field | Value |
|--------|-------|
| Category | Negative |
| Requirement | FR-1.1 |
| Steps | Attempt registration with each of: `plainaddress`, `missing@domain`, `@missingusername.com`, `user@.com`, `user@domain..com`, `user name@domain.com` (space) |
| Expected Result | Each is rejected with a validation error before a request reaches the server; no account is created for any of them |
| Status | Not Started |

---

### TC-B03 — Register With Duplicate Email (Exact Match)

| Field | Value |
|--------|-------|
| Category | Negative |
| Requirement | FR-1.2 |
| Preconditions | An account already exists for `user@example.com` |
| Steps | Attempt to register again with `user@example.com` |
| Expected Result | Registration is rejected with a clear "email already in use" style error; no second account is created |
| Status | Not Started |

---

### TC-B04 — Register With Duplicate Email (Case-Insensitive)

| Field | Value |
|--------|-------|
| Category | Boundary |
| Requirement | FR-1.2 |
| Preconditions | An account already exists for `user@example.com` |
| Steps | Attempt to register with `User@Example.com` and separately with `USER@EXAMPLE.COM` |
| Expected Result | Both are rejected as duplicates; email uniqueness is not case-sensitive |
| Status | Not Started |

---

### TC-B05 — Register With Duplicate Email (Leading/Trailing Whitespace)

| Field | Value |
|--------|-------|
| Category | Boundary |
| Requirement | FR-1.2 |
| Preconditions | An account already exists for `user@example.com` |
| Steps | Attempt to register with `" user@example.com "` (space before and after) |
| Expected Result | The email is trimmed and still recognized as a duplicate, rather than silently creating a second, functionally identical account |
| Status | Not Started |

---

### TC-B06 — Register With Empty Required Fields

| Field | Value |
|--------|-------|
| Category | Negative |
| Requirement | FR-1.1 |
| Steps | Submit the Register form with the email field empty; separately, with the password field empty; separately, with both empty |
| Expected Result | Submission is blocked client-side with a field-level error in every case; no request is sent with missing required data |
| Status | Not Started |

---

### TC-B07 — Register With Password Below Minimum Strength

| Field | Value |
|--------|-------|
| Category | Boundary |
| Requirement | FR-1.1 |
| Steps | Enter passwords that each fail exactly one condition of the live password-strength indicator (for example: correct length but no number; correct length but no uppercase letter; one character short of the minimum length) |
| Expected Result | The strength indicator flags each as insufficient and the form blocks submission until all conditions are met |
| Status | Not Started |

---

### TC-B08 — Register With Password at Exactly the Minimum Valid Strength

| Field | Value |
|--------|-------|
| Category | Boundary |
| Requirement | FR-1.1 |
| Steps | Enter a password that satisfies every condition of the strength indicator at its minimum threshold (for example, exactly the minimum length, exactly one of each required character class) |
| Expected Result | The password is accepted and registration succeeds |
| Status | Not Started |

---

### TC-B09 — Register With Extremely Long Input

| Field | Value |
|--------|-------|
| Category | Boundary |
| Requirement | FR-1.1 |
| Steps | Enter an email and password each several thousand characters long |
| Expected Result | The form either enforces a sane maximum length or the request is rejected gracefully by the backend; no crash, timeout, or unhandled error is shown to the user |
| Status | Not Started |

---

### TC-B10 — Register With Script/HTML Injection in Fields

| Field | Value |
|--------|-------|
| Category | Security |
| Requirement | NFR-7 |
| Steps | Enter `<script>alert(1)</script>` or similar markup into the email field |
| Expected Result | Rejected as an invalid email; if any free-text field elsewhere in the app ever accepted this, it must be rendered as inert text, never executed |
| Status | Not Started |

---

### TC-B11 — Network Failure During Registration Submission

| Field | Value |
|--------|-------|
| Category | Edge Case |
| Steps | Submit a valid registration while offline or with the request interrupted |
| Expected Result | A clear error is shown; the form does not silently appear to succeed, and resubmitting after reconnecting does not create a duplicate account if the first attempt actually succeeded server-side |
| Status | Not Started |

---

## Module C — Login & Session

### TC-C01 — Login With Valid Credentials

| Field | Value |
|--------|-------|
| Category | Happy Path |
| Requirement | FR-1.3 |
| Preconditions | Existing, confirmed account |
| Steps | Enter correct email and password → submit |
| Expected Result | Login succeeds; user lands on Onboarding or Dashboard depending on onboarding status |
| Status | Not Started |

---

### TC-C02 — Login With Incorrect Password

| Field | Value |
|--------|-------|
| Category | Negative |
| Requirement | FR-1.3 |
| Preconditions | Existing account |
| Steps | Enter the correct email with an incorrect password |
| Expected Result | A generic authentication error is shown; the error does not reveal whether the email exists |
| Status | Not Started |

---

### TC-C03 — Login With Non-Existent Email

| Field | Value |
|--------|-------|
| Category | Negative |
| Steps | Attempt login with an email that has never been registered |
| Expected Result | The same generic authentication error as TC-C02 is shown, not a distinct "no such account" message |
| Status | Not Started |

---

### TC-C04 — Login Email Is Case-Insensitive

| Field | Value |
|--------|-------|
| Category | Boundary |
| Preconditions | Account registered as `user@example.com` |
| Steps | Log in using `User@Example.com` |
| Expected Result | Login succeeds; email matching ignores case |
| Status | Not Started |

---

### TC-C05 — Login Before Email Confirmation

| Field | Value |
|--------|-------|
| Category | Edge Case |
| Preconditions | Account registered but the confirmation email has not yet been actioned |
| Steps | Attempt to log in immediately after registering, before confirming |
| Expected Result | The system's actual behavior is documented here once verified: either login is blocked with a clear "please confirm your email" message, or confirmation is not actually required to log in. This needs to be explicitly verified and the FRS updated to match, since it is not currently documented either way. |
| Status | Not Started |

---

### TC-C06 — Login With Empty Fields

| Field | Value |
|--------|-------|
| Category | Negative |
| Steps | Submit the login form with the email empty, then with the password empty, then both |
| Expected Result | Client-side validation blocks submission in all three cases |
| Status | Not Started |

---

### TC-C07 — Repeated Failed Login Attempts

| Field | Value |
|--------|-------|
| Category | Security |
| Steps | Attempt login with an incorrect password 10+ times in a row for the same account |
| Expected Result | Document actual behavior: whether Supabase Auth applies any rate limiting or lockout. If none exists, this is a known gap to record, not an assumed protection. |
| Status | Not Started |

---

### TC-C08 — Session Persists Across a Page Refresh

| Field | Value |
|--------|-------|
| Category | Happy Path |
| Preconditions | Logged in |
| Steps | Refresh the browser on an authenticated page |
| Expected Result | Session remains active; user is not returned to the login page |
| Status | Not Started |

---

### TC-C09 — Logout Invalidates the Session

| Field | Value |
|--------|-------|
| Category | Security |
| Requirement | FR-1.4 |
| Preconditions | Logged in |
| Steps | Log out, then use the browser's Back button to return to a previously open authenticated page |
| Expected Result | The cached page, if shown briefly, does not allow any further authenticated action; any data request made after logout is rejected and the user is redirected to Login |
| Status | Not Started |

---

## Module D — Password Reset

### TC-D01 — Request Reset for an Existing Email

| Field | Value |
|--------|-------|
| Category | Happy Path |
| Requirement | FR-1.5 |
| Steps | Request a password reset for a registered email |
| Expected Result | A reset email is sent; the on-screen message does not reveal whether the account exists beyond what is necessary |
| Status | Not Started |

---

### TC-D02 — Request Reset for a Non-Existent Email

| Field | Value |
|--------|-------|
| Category | Security |
| Steps | Request a password reset for an email that has never been registered |
| Expected Result | The same generic confirmation message is shown as TC-D01 ("if an account exists, an email has been sent"), so the form cannot be used to enumerate registered accounts |
| Status | Not Started |

---

### TC-D03 — Reuse an Already-Used Reset Link

| Field | Value |
|--------|-------|
| Category | Boundary |
| Steps | Complete a password reset using a link, then attempt to use the same link a second time |
| Expected Result | The second attempt is rejected as an expired or invalid link |
| Status | Not Started |

---

### TC-D04 — Reset Link Expiry

| Field | Value |
|--------|-------|
| Category | Boundary |
| Steps | Wait until a reset link's expiry window has passed, then attempt to use it |
| Expected Result | The link is rejected with a clear "expired" message and a way to request a new one |
| Status | Not Started |

---

### TC-D05 — New Password Fails Strength Requirements

| Field | Value |
|--------|-------|
| Category | Negative |
| Steps | During reset, attempt to set a password that fails the same strength rules enforced at registration |
| Expected Result | Rejected with the same validation feedback as registration; the weaker rule set is not silently allowed here |
| Status | Not Started |

---

## Module E — Onboarding

### TC-E01 — Complete Onboarding With at Least One Selection Per Step

| Field | Value |
|--------|-------|
| Category | Happy Path |
| Requirement | FR-2.1 |
| Steps | Select at least one Conference Goal, Interest, and Networking Preference → Finish |
| Expected Result | Saved to the profile; `onboarding_completed` set true; redirected to Dashboard |
| Status | Not Started |

---

### TC-E02 — Finish a Step With Zero Selections

| Field | Value |
|--------|-------|
| Category | Boundary |
| Steps | Reach the Review step having selected nothing on one or more of the three steps |
| Expected Result | Document and verify the actual behavior: whether this is allowed (an empty array is saved for that field) or blocked. This is not currently specified and should be confirmed against the real component. |
| Status | Not Started |

---

### TC-E03 — Select Every Available Option in a Step

| Field | Value |
|--------|-------|
| Category | Boundary |
| Steps | Select every available Interest (or Goal, or Networking Preference) in a single step |
| Expected Result | All selections are accepted and saved without a maximum-selection error |
| Status | Not Started |

---

### TC-E04 — Skip Onboarding

| Field | Value |
|--------|-------|
| Category | Happy Path |
| Requirement | FR-2.2 |
| Steps | Select Skip on first login |
| Expected Result | `onboarding_completed` set true with no goals, interests, or preferences saved; wizard is not shown again |
| Status | Not Started |

---

### TC-E05 — Refresh Mid-Wizard

| Field | Value |
|--------|-------|
| Category | Edge Case |
| Steps | Make selections on step 2 of the wizard, then refresh the browser before finishing |
| Expected Result | Document actual behavior: whether in-progress, unsaved selections are lost (expected, since nothing is persisted until Finish) and the wizard restarts from step 1 |
| Status | Not Started |

---

### TC-E06 — Navigate Directly to `/onboarding` After Already Completing It

| Field | Value |
|--------|-------|
| Category | Edge Case |
| Preconditions | Onboarding already completed or skipped |
| Steps | Manually visit `/onboarding` by URL |
| Expected Result | Document actual behavior: whether the user can still reach and resubmit the wizard, overwriting prior selections, or is redirected away |
| Status | Not Started |

---

### TC-E07 — Navigate Directly to `/dashboard` Before Completing Onboarding

| Field | Value |
|--------|-------|
| Category | Security |
| Preconditions | New account, onboarding not completed or skipped |
| Steps | Manually visit `/dashboard` by URL, bypassing the Onboarding redirect |
| Expected Result | User is still redirected to Onboarding; the guard is not only a link the user could avoid clicking |
| Status | Not Started |

---

## Module F — Profile

### TC-F01 — Save a Complete Profile

| Field | Value |
|--------|-------|
| Category | Happy Path |
| Requirement | FR-3.1 |
| Steps | Fill in every profile field and save |
| Expected Result | Profile saved; embedding regenerated for matching |
| Status | Not Started |

---

### TC-F02 — Save With All Optional Fields Empty

| Field | Value |
|--------|-------|
| Category | Boundary |
| Steps | Save a profile with only the minimum required information |
| Expected Result | Save succeeds; profile displays gracefully with blank sections rather than showing "undefined" or broken layout |
| Status | Not Started |

---

### TC-F03 — Extremely Long Biography

| Field | Value |
|--------|-------|
| Category | Boundary |
| Steps | Enter a biography of several thousand characters |
| Expected Result | Either a maximum length is enforced with a clear message, or the field accepts it and renders without breaking the layout |
| Status | Not Started |

---

### TC-F04 — Invalid LinkedIn / GitHub URL Format

| Field | Value |
|--------|-------|
| Category | Negative |
| Steps | Enter a LinkedIn or GitHub value that is not a valid URL (for example, plain text with no domain) |
| Expected Result | Document actual behavior: whether the field validates URL format or accepts arbitrary text. If arbitrary text is accepted, confirm it is not rendered as a clickable link that could be misleading |
| Status | Not Started |

---

### TC-F05 — Script Injection in Biography

| Field | Value |
|--------|-------|
| Category | Security |
| Requirement | NFR-7 |
| Steps | Enter `<script>alert(1)</script>` or an `onerror` image tag into the biography field and save |
| Expected Result | The content is stored and rendered as inert text on the user's own profile and on anyone viewing it; it must never execute |
| Status | Not Started |

---

### TC-F06 — Edit Another User's Profile via Direct Request

| Field | Value |
|--------|-------|
| Category | Security |
| Requirement | BR-4 |
| Preconditions | Two distinct user accounts |
| Steps | While authenticated as User A, attempt to submit a profile update targeting User B's row (for example, by modifying a request in the browser's network tools) |
| Expected Result | Row-Level Security rejects the write; User B's profile is unchanged |
| Status | Not Started |

---

## Module G — Conference Discovery

### TC-G01 — Browse Conferences, Upcoming and Past Tabs

| Field | Value |
|--------|-------|
| Category | Happy Path |
| Requirement | FR-4.1 |
| Preconditions | At least one conference ending in the past and one in the future |
| Steps | Open Conferences → switch tabs |
| Expected Result | Correct conferences and counts per tab; a conference with no end date appears under Upcoming |
| Status | Not Started |

---

### TC-G02 — Zero Conferences Available

| Field | Value |
|--------|-------|
| Category | Boundary |
| Preconditions | No published conferences exist |
| Steps | Open Conferences |
| Expected Result | A clear empty state is shown, not a blank screen or loading spinner that never resolves |
| Status | Not Started |

---

### TC-G03 — Search With No Matching Results

| Field | Value |
|--------|-------|
| Category | Boundary |
| Steps | Search for a conference name that does not exist |
| Expected Result | A clear "no results" state is shown |
| Status | Not Started |

---

### TC-G04 — Filter Combination Yields Zero Results

| Field | Value |
|--------|-------|
| Category | Boundary |
| Steps | Combine a category filter and a month filter such that no conference matches both |
| Expected Result | A clear empty state is shown, and the applied filters remain visible so the user can adjust them |
| Status | Not Started |

---

### TC-G05 — Join the Same Conference Twice

| Field | Value |
|--------|-------|
| Category | Boundary |
| Preconditions | User has already joined a conference |
| Steps | Attempt to join it again (for example, by re-submitting the join action) |
| Expected Result | The action is idempotent: no duplicate `conference_attendees` row is created, and the UI does not error |
| Status | Not Started |

---

### TC-G06 — Leave a Conference the User Has Not Joined

| Field | Value |
|--------|-------|
| Category | Edge Case |
| Steps | Attempt to trigger a leave action for a conference the user never joined (for example, a stale UI state or replayed request) |
| Expected Result | The action fails gracefully with no error thrown to the user and no unintended data change |
| Status | Not Started |

---

## Module H — Attendee Discovery, Search, Filters & Recommendations

### TC-H01 — Filter Attendees by Interests and Networking Preferences

| Field | Value |
|--------|-------|
| Category | Happy Path |
| Requirement | FR-5.3 |
| Steps | Apply an Interests filter and a Networking Preferences filter together |
| Expected Result | Only attendees matching both are shown |
| Status | Not Started |

---

### TC-H02 — Filters Combine to Zero Results

| Field | Value |
|--------|-------|
| Category | Boundary |
| Steps | Choose a filter combination no attendee satisfies |
| Expected Result | A clear empty state, not an error or an unfiltered fallback list |
| Status | Not Started |

---

### TC-H03 — Search With Special Characters

| Field | Value |
|--------|-------|
| Category | Negative |
| Steps | Search attendees using `%`, `_`, `'`, or other characters that have special meaning in SQL `LIKE` patterns |
| Expected Result | Treated as literal search text; no error, no unintended matching of unrelated records, no SQL error surfaced to the user |
| Status | Not Started |

---

### TC-H04 — Current User Does Not Appear in Their Own Attendee List

| Field | Value |
|--------|-------|
| Category | Boundary |
| Steps | Browse People while joined to a conference the current user also joined |
| Expected Result | The current user is excluded from their own Browse/Recommended list |
| Status | Not Started |

---

### TC-H05 — Recommendations Show Match Percentage Only

| Field | Value |
|--------|-------|
| Category | Happy Path |
| Requirement | FR-5.4, FR-5.5 |
| Preconditions | User has saved a profile at least once |
| Steps | Open Recommended for You |
| Expected Result | A match percentage is shown; no itemized reasoning (not yet built) |
| Status | Not Started |

---

### TC-H06 — No Recommendations Before First Profile Save

| Field | Value |
|--------|-------|
| Category | Boundary |
| Requirement | BR-8 |
| Preconditions | New user, profile never saved |
| Steps | Open People |
| Expected Result | User sees no recommendations, and does not appear in others' recommendations, until a profile is saved |
| Status | Not Started |

---

### TC-H07 — Recommendations With Only One Other Eligible Attendee

| Field | Value |
|--------|-------|
| Category | Boundary |
| Preconditions | Exactly one other attendee besides the current user has a saved profile |
| Steps | Open Recommended for You |
| Expected Result | That one attendee is shown; no error from requesting more matches than exist |
| Status | Not Started |

---

## Module I — Connections

### TC-I01 — Send a Connection Request

| Field | Value |
|--------|-------|
| Category | Happy Path |
| Requirement | FR-6.1 |
| Steps | View another attendee's profile → Connect |
| Expected Result | Request created with status Pending |
| Status | Not Started |

---

### TC-I02 — Send a Connection Request to Self

| Field | Value |
|--------|-------|
| Category | Security |
| Steps | Attempt to trigger a connection request where the sender and recipient are the same user (for example, by direct request manipulation, since the UI should not expose a Connect action on one's own profile) |
| Expected Result | Rejected; a user cannot connect with themselves |
| Status | Not Started |

---

### TC-I03 — Duplicate Connection Request

| Field | Value |
|--------|-------|
| Category | Negative |
| Requirement | FR-6.5 |
| Preconditions | A pending request already exists between two users |
| Steps | Attempt to send another request to the same user |
| Expected Result | Rejected as a duplicate |
| Status | Not Started |

---

### TC-I04 — Simultaneous Mutual Requests

| Field | Value |
|--------|-------|
| Category | Edge Case |
| Preconditions | Neither user has yet requested the other |
| Steps | User A and User B send each other a connection request at nearly the same time |
| Expected Result | The system resolves this to a single accepted connection rather than two conflicting pending rows, or clearly defines and displays both consistently. Actual behavior needs to be verified and documented. |
| Status | Not Started |

---

### TC-I05 — Request Already Withdrawn or Deleted Before Response

| Field | Value |
|--------|-------|
| Category | Edge Case |
| Preconditions | A pending request exists, then is removed by some other path before the recipient responds |
| Steps | Recipient attempts to accept or decline a request that no longer exists |
| Expected Result | A clear error, not a crash; the UI updates to reflect the request is gone |
| Status | Not Started |

---

### TC-I06 — Decline, Then Re-Send a Request

| Field | Value |
|--------|-------|
| Category | Boundary |
| Preconditions | A previous request between two users was declined |
| Steps | The original sender sends a new request to the same recipient |
| Expected Result | A new request can be created; a previously declined request does not permanently block future requests |
| Status | Not Started |

---

### TC-I07 — Live Notification on Request and Acceptance

| Field | Value |
|--------|-------|
| Category | Happy Path |
| Requirement | FR-6.6 |
| Preconditions | `notifications` in the `supabase_realtime` publication |
| Steps | User A sends a request; User B accepts, without either refreshing |
| Expected Result | Both notifications appear live |
| Status | Not Started |

---

## Module J — Conference Crews

### TC-J01 — Create a Crew

| Field | Value |
|--------|-------|
| Category | Happy Path |
| Requirement | FR-7.1 |
| Steps | Create crew with name, description, visibility |
| Expected Result | Created; creator becomes owner |
| Status | Not Started |

---

### TC-J02 — Create a Crew With an Empty Name

| Field | Value |
|--------|-------|
| Category | Negative |
| Steps | Submit the Create Crew form with the name field empty |
| Expected Result | Rejected client-side with a validation error |
| Status | Not Started |

---

### TC-J03 — Create a Crew With an Extremely Long Name or Description

| Field | Value |
|--------|-------|
| Category | Boundary |
| Steps | Enter a crew name or description several thousand characters long |
| Expected Result | Either a maximum length is enforced, or the value is accepted without breaking the layout elsewhere (crew lists, cards) |
| Status | Not Started |

---

### TC-J04 — Request to Join a Public Crew

| Field | Value |
|--------|-------|
| Category | Happy Path |
| Requirement | FR-7.2 |
| Steps | Request to join a public crew not yet joined |
| Expected Result | Join request created, Pending, visible to owner/admins |
| Status | Not Started |

---

### TC-J05 — Private Crew Has No Public Join Path

| Field | Value |
|--------|-------|
| Category | Security |
| Requirement | FR-7.2 |
| Preconditions | A private crew the user has not been invited to |
| Steps | Attempt to submit a join request directly against a private crew (bypassing the UI, which should not expose this option) |
| Expected Result | Rejected; private crews are joinable only by invitation |
| Status | Not Started |

---

### TC-J06 — Request to Join a Crew Already Joined

| Field | Value |
|--------|-------|
| Category | Boundary |
| Preconditions | User is already a member |
| Steps | Attempt to submit another join request for the same crew |
| Expected Result | Rejected or a no-op; no duplicate membership or duplicate pending request is created |
| Status | Not Started |

---

### TC-J07 — Approve Join Request Updates Membership Live

| Field | Value |
|--------|-------|
| Category | Happy Path |
| Requirement | FR-7.3, FR-7.9 |
| Preconditions | Pending join request; requester viewing the crew page; realtime enabled |
| Steps | Owner/admin approves, without the requester refreshing |
| Expected Result | Membership and count update live |
| Actual Result | Confirmed working after the Realtime fix (see BUG-004). User-reported screenshot showed 2/8 → 3/8 members updating live with "You're a member" and "Leave Crew" appearing. |
| Status | Passed |

---

### TC-J08 — Non-Owner/Admin Attempts to Approve a Join Request

| Field | Value |
|--------|-------|
| Category | Security |
| Requirement | BR-7 |
| Preconditions | A regular member (not owner or admin) of a crew with a pending join request |
| Steps | Attempt to approve or decline the request as that member (bypassing the UI, which should not expose this control) |
| Expected Result | Rejected by Row-Level Security / authorization checks |
| Status | Not Started |

---

### TC-J09 — Non-Member Views a Private Crew's Details

| Field | Value |
|--------|-------|
| Category | Security |
| Steps | While not a member, attempt to load a private crew's detail page or data directly by ID |
| Expected Result | Access is denied or the page shows no membership-restricted content |
| Status | Not Started |

---

### TC-J10 — Promote, Demote, Remove, Transfer Ownership

| Field | Value |
|--------|-------|
| Category | Happy Path |
| Requirement | FR-7.3 |
| Preconditions | Owner or admin, crew with other members |
| Steps | Promote a member to admin; demote them; remove a different member; transfer ownership to a third member |
| Expected Result | Each succeeds and reflects immediately, and live for other viewers |
| Status | Not Started |

---

### TC-J11 — Transfer Ownership to a Non-Member

| Field | Value |
|--------|-------|
| Category | Negative |
| Steps | Attempt to transfer ownership to a user who is not a crew member (for example, via a manipulated request) |
| Expected Result | Rejected; ownership can only transfer to an existing member |
| Status | Not Started |

---

### TC-J12 — Owner Attempts to Leave Without Transferring Ownership

| Field | Value |
|--------|-------|
| Category | Boundary |
| Requirement | BR-18 |
| Preconditions | User is the sole owner of a crew with at least one other member |
| Steps | Attempt to leave without transferring ownership first |
| Expected Result | Blocked, or the leave flow requires an ownership transfer as part of leaving |
| Status | Not Started |

---

### TC-J13 — Owner Is the Only Member and Wants to Leave

| Field | Value |
|--------|-------|
| Category | Edge Case |
| Preconditions | A crew with exactly one member, the owner |
| Steps | Attempt to leave |
| Expected Result | Document actual behavior: since there is no other member to transfer ownership to, verify whether the only path forward is Delete Crew, and that this is surfaced clearly to the user rather than a dead end |
| Status | Not Started |

---

### TC-J14 — Non-Owner Attempts to Delete a Crew

| Field | Value |
|--------|-------|
| Category | Security |
| Requirement | FR-7.5 |
| Preconditions | User is an admin or regular member, not the owner |
| Steps | Attempt to delete the crew (bypassing the UI, which should not expose this to non-owners) |
| Expected Result | Rejected |
| Status | Not Started |

---

### TC-J15 — Leave Crew Requires Confirmation

| Field | Value |
|--------|-------|
| Category | Happy Path |
| Requirement | FR-7.4 |
| Steps | Select Leave Crew, then cancel the confirmation modal |
| Expected Result | Membership remains intact after cancel; only confirming removes it |
| Status | Not Started |

---

### TC-J16 — Delete Crew Cascades Correctly

| Field | Value |
|--------|-------|
| Category | Boundary |
| Requirement | FR-7.5 |
| Preconditions | A crew with members, a pending join request, a pending invitation, and a scheduled meetup |
| Steps | Owner deletes the crew |
| Expected Result | The crew, its members, join requests, invitations, and meetups are all removed; no orphaned rows remain referencing the deleted crew |
| Status | Not Started |

---

### TC-J17 — Two Admins Approve the Same Join Request Concurrently

| Field | Value |
|--------|-------|
| Category | Edge Case |
| Preconditions | Two admins of the same crew, one pending join request |
| Steps | Both admins approve the same request at nearly the same time |
| Expected Result | The request is resolved exactly once; the second approval attempt fails gracefully (already resolved) rather than creating a duplicate membership or erroring destructively |
| Status | Not Started |

---

### TC-J18 — Crew Chat Accessible Only to Current Members

| Field | Value |
|--------|-------|
| Category | Security |
| Requirement | FR-7.7, BR-8 |
| Preconditions | User is not a member |
| Steps | Open the crew's chat panel |
| Expected Result | A message indicates the user must join to see or send messages; no message content is exposed |
| Status | Passed |

---

### TC-J19 — Crew Chat Unlocks Live When Membership Is Granted Mid-Session

| Field | Value |
|--------|-------|
| Category | Happy Path |
| Requirement | FR-7.7 |
| Preconditions | User viewing chat with a pending join request; realtime enabled |
| Steps | Owner/admin approves while requester stays on the page |
| Expected Result | Chat becomes usable automatically |
| Actual Result | Originally failed (see BUG-002); fixed by passing `isMember` as a prop and re-running the membership check when it changes. Confirmed working after the fix. |
| Status | Passed |

---

### TC-J20 — Send an Empty Crew Chat Message

| Field | Value |
|--------|-------|
| Category | Negative |
| Steps | Attempt to send a message with no text (blank or whitespace-only) |
| Expected Result | Blocked client-side; no empty message is created |
| Status | Not Started |

---

### TC-J21 — Send an Extremely Long Crew Chat Message

| Field | Value |
|--------|-------|
| Category | Boundary |
| Steps | Send a message several thousand characters long |
| Expected Result | Either a maximum length is enforced, or the message is accepted and rendered without breaking the chat layout |
| Status | Not Started |

---

### TC-J22 — Script Injection in a Crew Chat Message

| Field | Value |
|--------|-------|
| Category | Security |
| Steps | Send `<script>alert(1)</script>` as a message |
| Expected Result | Rendered as inert text to every recipient; never executed |
| Status | Not Started |

---

## Module K — Meetups

### TC-K01 — Schedule a Meetup

| Field | Value |
|--------|-------|
| Category | Happy Path |
| Requirement | FR-8.1 |
| Preconditions | Owner or admin |
| Steps | Create a meetup with title, time, location, description |
| Expected Result | Created and visible to all crew members |
| Status | Not Started |

---

### TC-K02 — Meetup End Time Before Start Time

| Field | Value |
|--------|-------|
| Category | Negative |
| Steps | Attempt to create a meetup where the end time is earlier than the start time |
| Expected Result | Rejected with a validation error |
| Status | Not Started |

---

### TC-K03 — Meetup Scheduled in the Past

| Field | Value |
|--------|-------|
| Category | Boundary |
| Steps | Attempt to create a meetup with a start time already in the past |
| Expected Result | Document actual behavior: whether this is blocked or allowed. If allowed, confirm it does not break the crew's meetup display |
| Status | Not Started |

---

### TC-K04 — Regular Member Attempts to Schedule a Meetup

| Field | Value |
|--------|-------|
| Category | Security |
| Requirement | BR-20 |
| Preconditions | User is a regular member, not owner or admin |
| Steps | Attempt to create a meetup (bypassing the UI, which should not expose this to regular members) |
| Expected Result | Rejected |
| Status | Not Started |

---

## Module L — Messaging

### TC-L01 — Send and Receive a Direct Message

| Field | Value |
|--------|-------|
| Category | Happy Path |
| Requirement | FR-9.2 |
| Preconditions | Existing conversation; realtime enabled |
| Steps | User A sends; User B has the conversation open |
| Expected Result | User B sees it live |
| Status | Not Started |

---

### TC-L02 — Send an Empty Message

| Field | Value |
|--------|-------|
| Category | Negative |
| Steps | Attempt to send a blank or whitespace-only direct message |
| Expected Result | Blocked client-side |
| Status | Not Started |

---

### TC-L03 — Switching Conversations Does Not Flash Stale Content

| Field | Value |
|--------|-------|
| Category | Edge Case |
| Steps | Open one conversation, then quickly switch to another before it fully loads |
| Expected Result | The message list updates cleanly to the newly selected conversation |
| Status | Not Started |

---

### TC-L04 — Message a User With No Existing Connection

| Field | Value |
|--------|-------|
| Category | Edge Case |
| Steps | Attempt to start a direct conversation with a user who is not an accepted connection |
| Expected Result | Document and confirm the actual business rule: whether messaging requires an accepted connection first. This is not currently specified in the FRS and should be clarified and recorded there once verified. |
| Status | Not Started |

---

### TC-L05 — Non-Participant Attempts to Read a Direct Conversation

| Field | Value |
|--------|-------|
| Category | Security |
| Steps | Attempt to load messages for a conversation the current user is not a participant in |
| Expected Result | Rejected by Row-Level Security |
| Status | Not Started |

---

## Module M — Notifications

### TC-M01 — Notification Bell Updates Live

| Field | Value |
|--------|-------|
| Category | Happy Path |
| Requirement | Module 10 |
| Preconditions | `notifications` in the `supabase_realtime` publication |
| Steps | Trigger each of the four notification types for the same user, one at a time |
| Expected Result | Bell count and list update live for each |
| Actual Result | Originally failed entirely (see BUG-003); fixed by adding a subscription to `NotificationBell.tsx` and enabling the publication. Confirmed working after the fix. |
| Status | Passed |

---

### TC-M02 — Resolving a Request Elsewhere Clears Its Notification Live

| Field | Value |
|--------|-------|
| Category | Happy Path |
| Requirement | BR-23 |
| Steps | Approve a join request from Manage Crew instead of the bell |
| Expected Result | The bell's corresponding notification disappears live |
| Status | Not Started |

---

### TC-M03 — Notification for a Now-Deleted Crew or Connection

| Field | Value |
|--------|-------|
| Category | Edge Case |
| Preconditions | A notification referencing a crew invitation exists, then the crew is deleted before the recipient acts on it |
| Steps | Recipient opens the still-present notification and attempts to accept |
| Expected Result | A clear error is shown rather than a crash; the stale notification is cleared |
| Status | Not Started |

---

# Requirement Traceability Matrix

| Requirement | Test Cases |
|-------------|-----------|
| FR-1.1 | TC-B01–TC-B11 |
| FR-1.2 | TC-B03, TC-B04, TC-B05 |
| FR-1.3 | TC-C01–TC-C07 |
| FR-1.4 | TC-C09 |
| FR-1.5 | TC-D01–TC-D05 |
| FR-2.1–FR-2.3 | TC-E01–TC-E07 |
| FR-3.1 | TC-F01–TC-F06 |
| BR-4 | TC-F06 |
| FR-4.1 | TC-G01, TC-G02 |
| FR-4.2 | TC-G05, TC-G06 |
| FR-5.3 | TC-H01–TC-H03 |
| FR-5.4, FR-5.5 | TC-H05, TC-H06, TC-H07 |
| FR-6.1, FR-6.5, FR-6.6 | TC-I01–TC-I07 |
| FR-7.1–FR-7.5 | TC-J01–TC-J17 |
| FR-7.7, FR-7.9, BR-8 | TC-J18–TC-J22 |
| FR-8.1, BR-20 | TC-K01–TC-K04 |
| FR-9.2 | TC-L01–TC-L05 |
| Module 10 / BR-23 | TC-M01–TC-M03 |
| NFR-7 (Security / Injection) | TC-B10, TC-F05, TC-J22 |

```text
Functional Requirements
          │
          ▼
      Test Cases
          │
          ▼
   Test Execution
          │
          ▼
      Bug Reports
          │
          ▼
      Bug Fixes
          │
          ▼
    Regression Tests
          │
          ▼
    Release Approval
```

---

# Bug Management

Every confirmed defect is tracked and summarized below.

---

## Bug Status

| Status |
|---------|
| Open |
| In Progress |
| Ready for Testing |
| Closed |
| Deferred |

---

## Bug Severity

| Severity | Description |
|-----------|-------------|
| Critical | Application unusable |
| High | Major feature unavailable |
| Medium | Feature partially functional |
| Low | Cosmetic or minor issue |

---

## Bug Priority

| Priority | Description |
|----------|-------------|
| P1 | Immediate fix |
| P2 | Required before release |
| P3 | Scheduled improvement |
| P4 | Future enhancement |

---

# Bug Report Template

| Field | Description |
|---------|-------------|
| Bug ID | Unique identifier |
| Title | Brief summary |
| Environment | Development / Testing / Production |
| Build Version | Version tested |
| Severity | Critical / High / Medium / Low |
| Priority | P1–P4 |
| Preconditions | Required setup |
| Steps to Reproduce | Reproduction steps |
| Expected Result | Expected behavior |
| Actual Result | Observed behavior |
| Root Cause | Investigation summary |
| Resolution | Fix implemented |
| Status | Current lifecycle |

---

# Bug Log

The following are the actual defects found and fixed during development.

---

## BUG-001 — Crew Membership and Join Requests Not Reflected Without a Manual Refresh

| Field | Value |
|---------|-------|
| Environment | Development |
| Severity | High |
| Priority | P1 |
| Preconditions | A crew join request approved, or a member removed, while another user is viewing the crew |
| Steps to Reproduce | Approve a pending join request from a second browser session while the requester's crew page is open; observe that the requester's view does not update |
| Expected Result | Membership and join-request changes appear live, without a refresh |
| Actual Result | The page only reflected the change after a manual reload |
| Root Cause | No realtime subscriptions existed on the `crew_members` or `crew_join_requests` tables in the crew detail page |
| Resolution | Added `postgres_changes` subscriptions for both tables in `app/crews/[id]/page.tsx`, plus `enable_realtime.sql` to ensure the relevant tables are part of the `supabase_realtime` publication |
| Status | Closed |

---

## BUG-002 — Crew Chat Stuck Showing "Not a Member of This Crew" After Live Membership Update

| Field | Value |
|---------|-------|
| Environment | Development |
| Severity | High |
| Priority | P1 |
| Preconditions | A user's join request is approved while they are viewing the crew page with the chat panel open |
| Steps to Reproduce | Approve a pending request for a user who is currently viewing that crew's chat |
| Expected Result | The chat becomes usable as soon as membership is granted |
| Actual Result | Chat continued to show "Not a member of this crew" even after the header and member list updated correctly |
| Root Cause | `CrewChat`'s membership check ran once on mount, before the realtime-driven membership update had landed, with no mechanism to retry |
| Resolution | Passed `isMember` down from the parent (which is updated live) as a prop, used it as a guard, and added it to the effect's dependency array so the membership check re-runs when it changes |
| Status | Closed |

---

## BUG-003 — Notification Bell Never Updates Live

| Field | Value |
|---------|-------|
| Environment | Development |
| Severity | High |
| Priority | P1 |
| Preconditions | A new notification is generated for a user (connection request, acceptance, crew join request, or invitation) |
| Steps to Reproduce | Trigger any of the four notification types while the recipient has the app open, without them refreshing |
| Expected Result | The bell's unread count and list update immediately |
| Actual Result | Nothing appeared until the page was manually reloaded |
| Root Cause | Two causes: (1) `NotificationBell.tsx` only ever loaded notifications once, on mount, with no subscription at all; (2) the `notifications` table had not been added to the `supabase_realtime` publication |
| Resolution | Added a realtime subscription to `NotificationBell.tsx` for INSERT, UPDATE, and DELETE on `notifications`, and added the table to the publication via `enable_realtime.sql` |
| Status | Closed |

---

## BUG-004 — Supabase Realtime Not Enabled for Any Table

| Field | Value |
|---------|-------|
| Environment | Development |
| Severity | Critical |
| Priority | P1 |
| Preconditions | Any feature relying on live updates |
| Steps to Reproduce | Any realtime feature (crew membership, join requests, notifications, messages) fails to update live even with a correct client-side subscription |
| Expected Result | Subscribed clients receive `postgres_changes` events |
| Actual Result | No events were ever received |
| Root Cause | None of the relevant tables had been added to the `supabase_realtime` publication. This is a project-level Supabase setting, separate from Row-Level Security or the application code, and had never been configured |
| Resolution | `enable_realtime.sql`, an idempotent script adding `crew_members`, `crew_join_requests`, `crew_invitations`, `connections`, `notifications`, and `messages` to the publication |
| Status | Closed |

---

# Known Untested Risk Areas

These are boundary and negative scenarios identified while writing this suite that have not yet been executed, but stand out as the most likely places to find real defects, based on what the rest of this document set has confirmed is genuinely built versus assumed:

- Email confirmation gating at login (TC-C05) is not documented behavior anywhere else in this document set and needs to be verified once, then written into the FRS.
- Simultaneous mutual connection requests (TC-I04) and simultaneous join-request approvals (TC-J17) are both realistic in a live, multi-user realtime app and have not been tested.
- Whether messaging requires an accepted connection first (TC-L04) is an open question carried over from DOC-009 Business Rules and should be resolved.
- Script/HTML injection across every free-text field (bio, crew name/description, chat messages) has not been tested anywhere, and is the highest-severity untested category given the app renders user-supplied content in several places.
- Authorization bypass attempts (editing another user's profile, approving requests as a non-admin, reading a conversation as a non-participant) rely entirely on Row-Level Security and have not been independently verified by attempting to circumvent the UI.

---

# QA Metrics

| Metric | Target | Current |
|----------|---------|---------|
| Test Cases Executed | 100% | 6 of 76 (see status column above) |
| Test Pass Rate | ≥95% | 6 of 6 executed cases passed |
| Critical Defects | 0 open | 0 open (1 found and closed: BUG-004) |
| High Priority Defects | 0 open before release | 0 open (3 found and closed: BUG-001, BUG-002, BUG-003) |
| Regression Failures | 0 | Not yet formally tracked |
| Story Acceptance Rate | 100% | Not yet formally measured |
| Security/Authorization Cases Executed | 100% before release | 0 of 12 |

---

# Release Readiness Checklist

The MVP is ready for release when:

- All planned test cases have been executed, with particular attention to the Security and Boundary categories, not only Happy Path.
- All Critical defects are resolved.
- All High priority defects are resolved.
- Smoke testing passes.
- Regression testing passes.
- Documentation is complete.
- The local build has been pushed to GitHub, so the deployed and documented product match.
- Product Owner approves the release.

---

# Related Documents

- DOC-008 Functional Requirements
- DOC-009 Business Rules
- DOC-013 Jira Backlog Structure
- DOC-014 Sprint Planning & Release Plan
- DOC-015 Engineering Workflow
- DOC-016 Quality Assurance Strategy

---

# Key Decisions

- Every functional requirement must be traceable to at least one test case.
- Test cases are categorized as Happy Path, Negative, Boundary, Security, or Edge Case, and release readiness explicitly requires covering all five, not just Happy Path.
- Every confirmed defect is documented with its root cause and resolution, not just its symptom.
- Release decisions are based on objective quality metrics, tracked honestly even while most cases remain unexecuted.
- Where a test case exposes an undocumented or ambiguous business rule (email confirmation gating, connection-required messaging), the rule is flagged for resolution rather than assumed.

---

## Revision History

| Version | Date | Author | Summary |
|----------|------|--------|---------|
| 1.0 | July 2026 | Tsadia Mabel | Initial test cases and bug log |
| 2.0 | July 2026 | Tsadia Mabel | Added traceability matrix, QA metrics, and release readiness checklist |
| 2.1 | September 2026 | Tsadia Mabel | Replaced the 9 generic placeholder test cases with 31 covering every shipped module; replaced the 5 fictional bug log entries with the 4 real defects found and fixed during development |
| 2.2 | September 2026 | Tsadia Mabel | Expanded from 31 to 76 test cases, adding explicit Negative, Boundary, Security, and Edge Case coverage across every module, from the landing page through login and every screen behind it (malformed/duplicate/empty registration input, password strength boundaries, session and authorization bypass attempts, injection attempts, concurrency and race-condition scenarios, and empty/zero-result states); added a Test Case Categories section and a Known Untested Risk Areas section flagging the highest-value gaps still to execute |
