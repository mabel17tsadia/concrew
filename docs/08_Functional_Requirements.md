# Functional Requirements Specification (FRS)

> **Document ID:** DOC-008  
> **Role:** Business Analyst  
> **Supporting Roles:** Product Manager, Software Engineer, QA Engineer  
> **SDLC Phase:** Requirements Analysis  
> **Status:** Approved  
> **Version:** MVP v2.1

---

# Purpose

This Functional Requirements Specification (FRS) defines the functional behavior of the ConCrew MVP.

The document specifies **what the system must do**, independent of implementation technology or user interface design.

The FRS serves as the primary reference for:

- Product Management
- Software Engineering
- Quality Assurance
- Sprint Planning

---

# Scope

The MVP focuses on helping conference attendees discover compatible people before attending conferences.

The system shall enable users to:

- Create professional profiles
- Complete an onboarding step that captures compatibility signals
- Join conferences
- Discover compatible attendees
- Build conference crews, including live coordination through crew chat, connection requests, direct messages, and notifications
- Coordinate meetups

The document intentionally excludes technical implementation details.

---

# User Roles

## Conference Attendee

The primary user of the platform.

Capabilities:

- Register
- Login
- Complete onboarding
- Manage profile
- Join conferences
- Browse attendees
- Search attendees
- Receive recommendations
- Connect with attendees
- Send and receive direct messages
- Create and join crews

---

## Crew Owner / Admin

A conference attendee with elevated permissions inside a specific crew (the creator becomes owner; an owner can promote members to admin).

Additional capabilities:

- Approve or decline join requests
- Invite eligible conference attendees
- Revoke a pending invitation
- Promote or demote admins
- Remove a member
- Transfer ownership
- Change crew visibility (public or private)
- Delete the crew (owner only)
- Schedule meetups

---

## Administrator

Responsible for platform management. Not yet built into the application; conferences are currently added directly in the Supabase table editor rather than through an admin UI.

Capabilities (planned):

- Manage conferences
- Moderate users
- Suspend accounts
- Review reported content

---

# Functional Requirements

---

# Module 1 — Authentication

## FR-1.1 User Registration

The system shall allow users to register using an email address and password.

---

## FR-1.2 Email Validation

The system shall prevent duplicate email registrations.

---

## FR-1.3 User Login

The system shall authenticate registered users. On first login after registration, a user who has not completed onboarding shall be redirected there before reaching the dashboard.

---

## FR-1.4 User Logout

The system shall securely terminate authenticated sessions.

---

## FR-1.5 Password Reset

The system shall allow users to reset forgotten passwords.

---

# Module 2 — Onboarding

## FR-2.1 Compatibility Onboarding

Immediately after a new user's first login, the system shall present a short wizard collecting:

- Conference Goals
- Interests
- Networking Preferences

---

## FR-2.2 Skip Onboarding

The system shall allow the user to skip the wizard. Skipping shall still mark onboarding as complete so the user is not shown it again.

---

## FR-2.3 Retroactive Exemption

Existing accounts created before this feature was introduced shall not be required to complete onboarding.

---

# Module 3 — User Profile

## FR-3.1 Create Profile

The system shall allow users to create a professional profile.

The profile shall include:

- Biography
- Company
- School
- City
- Job Title
- LinkedIn
- GitHub

Profile Photo is not yet implemented.

---

## FR-3.2 Edit Profile

The system shall allow users to modify profile information, including the Conference Goals, Interests, and Networking Preferences captured during Onboarding.

---

# Module 4 — Conference Discovery

## FR-4.1 Browse Conferences

The system shall display conferences, split into an Upcoming tab and a Past tab.

Each conference shall display:

- Name
- Description
- Dates
- Location

---

## FR-4.2 Join Conference

The system shall allow users to join conferences.

---

## FR-4.3 Leave Conference

The system shall allow users to leave conferences.

---

## FR-4.4 View Conference Details

The system shall display conference information.

---

## FR-4.5 Conference Match Reasoning

The system shall indicate, on a conference card, when one or more people the user would likely match with are already attending.

---

# Module 5 — Attendee Discovery

## FR-5.1 Browse People

The system shall display attendees belonging to joined conferences.

---

## FR-5.2 Search People

Users shall search attendees by:

- Name
- Company
- School
- Job Title

---

## FR-5.3 Filter People

The system shall support filtering by:

- Company
- School
- City
- Job Title
- Interests
- Networking Preferences

Filtering by Conference Goals, Skills, and Years of Experience is not yet implemented.

---

## FR-5.4 Recommendations

The system shall recommend compatible attendees, ranked by profile-similarity (embedding) matching, and displayed as a match percentage.

A user must have saved a profile at least once to be included in matching.

---

## FR-5.5 Compatibility Explanation

Not yet implemented. Only the overall match percentage is shown; itemized reasoning (for example, "shared AI interests" or "same conference") is not currently generated.

---

## FR-5.6 Save Attendees

Not yet implemented. Sending a connection request is currently the only way to keep track of an attendee.

---

# Module 6 — Connections

## FR-6.1 Send Connection Request

Users shall send connection requests.

---

## FR-6.2 Accept Request

Recipients shall accept requests, directly from the request or from a live notification.

---

## FR-6.3 Decline Request

Recipients shall decline requests, directly from the request or from a live notification.

---

## FR-6.4 View Connections

Users shall view accepted professional connections.

---

## FR-6.5 Prevent Duplicate Requests

The system shall prevent duplicate requests.

---

## FR-6.6 Live Delivery

A connection request and its acceptance shall each generate a live notification for the relevant user, without requiring a page refresh.

---

# Module 7 — Conference Crews

## FR-7.1 Create Crew

Users shall create conference crews, setting a name, description, and visibility (public or private). The creator becomes the owner.

---

## FR-7.2 Join Crew

For a public crew, users shall submit a join request that an owner or admin approves or declines. For a private crew, membership is granted only by invitation from an owner or admin.

---

## FR-7.3 Manage Crew

An owner or admin shall be able to:

- Approve or decline join requests
- Invite eligible conference attendees
- Revoke a pending invitation
- Promote a member to admin, or remove admin status
- Remove a member
- Transfer ownership
- Change crew visibility

---

## FR-7.4 Leave Crew

Users shall leave crews, after confirming in a dialog. The crew's owner cannot leave until ownership is transferred to another member.

---

## FR-7.5 Delete Crew

An owner shall be able to delete a crew, after confirming in a dialog. Deleting removes the crew's members, join requests, invitations, and scheduled meetups.

---

## FR-7.6 View Crew

The system shall display:

- Members, with an avatar stack and total count
- Description
- Conference
- Upcoming Meetups
- Crew Chat

---

## FR-7.7 Crew Chat

Current members shall be able to send and receive messages in a chat scoped to their crew, in real time. If a user's membership is granted while they are viewing the crew page, the chat shall become available without a refresh.

---

## FR-7.8 Crew Capacity

Not currently enforced. A recommended size of 3 to 5 members is a design guideline, not a system-enforced limit in the MVP.

---

## FR-7.9 Live Membership Updates

Join requests and membership changes shall appear live to anyone viewing the crew, without a refresh.

---

# Module 8 — Meetups

## FR-8.1 Schedule Meetup

Crew owners and admins shall schedule meetups.

Meetups include:

- Title
- Time
- Location
- Description

---

## FR-8.2 View Meetups

Crew members shall view upcoming meetups.

---

# Module 9 — Messaging

## FR-9.1 View Conversations

The system shall list a user's active conversations with a preview of the latest message.

---

## FR-9.2 Send and Receive Direct Messages

Users shall send and receive one-to-one direct messages in real time, without requiring a page refresh.

---

# Module 10 — Notifications

The system shall notify users, live and without a refresh, when:

- A connection request is received
- A connection request is accepted
- A crew join request is received
- A crew invitation is received

A connection or crew request notification shall support accepting or declining directly from the notification. A notification resolved elsewhere (for example, approved from the crew page instead of the bell) shall disappear from the bell live.

Meetup-scheduled and conference-approaching notifications are not yet implemented.

---

# Business Rules

| ID | Rule |
|----|------|
| BR-1 | Users must authenticate before joining conferences. |
| BR-2 | Users only browse attendees for joined conferences. |
| BR-3 | Recommendations require having saved a profile at least once. |
| BR-4 | Duplicate connection requests are prohibited. |
| BR-5 | Crew size is not currently enforced by the system. |
| BR-6 | Users may leave crews at any time, except an owner, who must transfer ownership first. |
| BR-7 | Only an owner or admin approves crew membership or manages crew settings. |
| BR-8 | Only current crew members may view or send crew chat messages. |

---

# Error Handling

The system shall display meaningful error messages for:

- Failed authentication
- Registration errors
- Duplicate accounts
- Conference join failures
- Missing required fields
- Network connectivity issues

---

# Assumptions

- Users already possess conference tickets.
- Administrators manage conferences (currently through direct database access, not an admin UI).
- Users provide accurate profile information.
- Recommendations use profile-similarity (embedding-based) matching, not rule-based scoring.

---

# Out of Scope

The MVP excludes:

- AI-generated introductions
- Video conferencing
- Ticket purchasing
- Travel booking
- QR networking
- Calendar synchronization
- Mentor matching
- Server-side API routes (the client currently queries Supabase directly)
- Automated tests

Direct messaging was originally excluded but shipped as part of the MVP; see Module 9.

---

# Requirement Traceability

| User Story | Functional Requirements |
|------------|-------------------------|
| User Registration / Login | FR-1.1–FR-1.5 |
| Onboarding | FR-2.1–FR-2.3 |
| Create / Edit Profile | FR-3.1–FR-3.2 |
| Conference Discovery | FR-4.1–FR-4.5 |
| Browse / Filter / Recommend People | FR-5.1–FR-5.6 |
| Connections | FR-6.1–FR-6.6 |
| Conference Crews | FR-7.1–FR-7.9 |
| Meetups | FR-8.1–FR-8.2 |
| Messaging | FR-9.1–FR-9.2 |
| Notifications | Module 10 |

---

# Key Decisions

- Onboarding, not a standalone Conference Preferences screen, drives recommendations.
- Recommendations use profile-similarity (embedding-based) matching, not rule-based scoring.
- Messaging and live notifications, originally deferred, shipped as part of the MVP.
- Small conference crews are prioritized over large communities, though crew size is a guideline rather than an enforced limit.

---

## Revision History

| Version | Date | Author | Summary |
|----------|------|--------|---------|
| 1.0 | July 2026 | Tsadia Mabel | Initial FRS |
| 2.0 | July 2026 | Tsadia Mabel | Updated after Jira planning and refined MVP scope |
| 2.1 | September 2026 | Tsadia Mabel | Added Onboarding, Crew Management, Crew Chat, Messaging, and Notification modules to match what shipped; corrected Compatibility Explanation and Save Attendees to "not yet implemented"; corrected recommendations from rule-based to embedding-based; corrected Crew Capacity to "not enforced"; moved Direct Messaging out of Out of Scope; renumbered modules and requirement traceability accordingly |
