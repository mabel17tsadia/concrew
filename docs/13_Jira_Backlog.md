# Jira Backlog Structure

> **Document ID:** DOC-013  
> **Primary Role:** Product Manager / Product Owner  
> **Supporting Roles:** Business Analyst, Software Engineer, QA Engineer  
> **SDLC Phase:** Planning  
> **Status:** Approved  
> **Version:** MVP v2.1

---

# Purpose

This document defines how the ConCrew MVP is organized within Jira.

The backlog translates product requirements into actionable engineering work using Agile practices. It provides a structured hierarchy of epics, user stories, and development tasks that support sprint planning and iterative delivery.

---

# Agile Approach

The project follows the Scrum framework.

Work is organized into:

- Product Backlog
- Sprint Backlog
- Increment

Jira is used to manage:

- Epics
- User Stories
- Sub-tasks
- Bugs

---

# Jira Hierarchy

```text
Epic
   │
   ├── Story
   │      ├── Development Task
   │      ├── Testing Task
   │      └── Documentation Task
   │
   └── Bug
```

---

# Epic 1 — Authentication, Onboarding & Profiles

## Goal

Allow users to securely register, authenticate, complete onboarding, and create professional profiles.

### Stories

- Register Account
- Log In (with onboarding redirect if incomplete)
- Log Out
- Reset Password
- Complete Onboarding (Conference Goals, Interests, Networking Preferences)
- Skip Onboarding
- Create Profile
- Edit Profile

`Upload Profile Photo` remains in the backlog, not yet implemented.

---

# Epic 2 — Conference Discovery

## Goal

Allow attendees to discover and join conferences.

### Stories

- Browse Conferences (Upcoming / Past tabs)
- Search Conferences
- View Conference Details
- Join Conference
- Leave Conference
- View Joined Conferences
- View Match-Based Recommendation Note on a Conference Card

---

# Epic 3 — Attendee Discovery

## Goal

Help users discover compatible attendees.

### Stories

- Browse People
- Search Attendees
- Filter Attendees (Company, School, City, Job Title, Interests, Networking Preferences)
- View Attendee Profile
- View Recommendations (match percentage)

`View Match Reasons` (itemized reasoning) and `Save Attendees` remain in the backlog, not yet implemented.

---

# Epic 4 — Connections

## Goal

Allow attendees to establish professional connections.

### Stories

- Send Connection Request
- Accept Connection (from the request or a live notification)
- Decline Connection (from the request or a live notification)
- View Connections
- Remove Connection

---

# Epic 5 — Conference Crews

## Goal

Allow attendees to organize into small groups.

### Stories

- Create Crew (public or private)
- Request to Join Crew (public)
- Invite to Crew (private)
- Approve or Decline Join Request
- Revoke Invitation
- Promote / Demote Admin
- Remove Member
- Transfer Ownership
- Change Crew Visibility
- Leave Crew (with confirmation)
- Delete Crew (owner only, with confirmation)
- View Crew Details
- Crew Chat

---

# Epic 6 — Meetups

## Goal

Coordinate in-person gatherings during conferences.

### Stories

- Create Meetup
- View Meetups

`Edit Meetup` and `Cancel Meetup` remain in the backlog, not yet implemented.

---

# Epic 7 — Messaging

## Goal

Let users continue conversations one-to-one, in real time.

### Stories

- View Conversations
- Send and Receive Direct Messages

---

# Epic 8 — Notifications

## Goal

Keep users informed of important activity, live.

### Stories

- View Notifications
- Live Delivery of Connection Requests, Connection Acceptances, Crew Join Requests, and Crew Invitations
- Accept or Decline a Request Directly from a Notification

`Mark Notification Read` and `Mark All Read` as dedicated actions remain in the backlog; a notification currently clears when the underlying request is resolved.

---

# Epic 9 — Testing & QA

## Goal

Ensure product quality before release.

### Stories

- Functional Testing
- Regression Testing
- Bug Fixes
- Release Validation

Automated testing (unit and end-to-end) is not yet in place; testing has been manual so far.

---

# Product Backlog Priorities

| Priority | Description |
|----------|-------------|
| **P0** | Required for MVP |
| **P1** | Important but can follow MVP |
| **P2** | Nice-to-have enhancements |
| **P3** | Future roadmap items |

---

## P0 – MVP (Shipped)

- Authentication
- Onboarding
- User Profiles
- Browse Conferences
- Join Conferences
- Browse Attendees
- Recommendations
- Connections
- Crews (including Crew Chat)
- Meetups
- Direct Messaging
- Live Notifications

---

## P1 – Post-MVP

- Push the local build to GitHub so the repository matches the running app
- Small server-side API layer for upcoming AI features
- Saved Attendees
- Skills and Years of Experience as filters
- Automated testing

---

## P2 – Future Enhancements

- Itemized "why you matched" recommendation reasoning
- Session-Based Discovery
- Calendar Integration
- Conference Maps

---

## P3 – Long-Term Vision

- QR Networking
- Mentor Matching
- Travel Coordination
- Cross-Conference Networking

---

# Story Template

Every Jira story follows the standard user story format.

```text
As a...

I want...

So that...
```

### Example

> As a conference attendee, I want to browse recommended attendees so that I can discover people with similar interests before the conference begins.

---

# Story Lifecycle

```text
Backlog
      │
      ▼
Ready
      │
      ▼
In Progress
      │
      ▼
Code Review
      │
      ▼
QA Testing
      │
      ▼
Done
```

---

# Definition of Ready

A story is ready for development when:

- Business value is understood.
- Acceptance criteria are defined.
- Dependencies are identified.
- The story fits within a sprint.
- QA can verify the outcome.

---

# Definition of Done

A story is complete when:

- Code is implemented.
- Acceptance criteria are satisfied.
- Unit testing passes, where automated tests exist (currently limited; see Epic 9).
- QA verification is complete.
- Documentation is updated.
- The feature is merged into the main branch.

> Several completed stories in this backlog exist locally but have not yet gone through the last step (merged into the main branch on GitHub). See the README's Known Gaps.

---

# Related Documents

- Product Requirements Document
- User Stories
- Functional Requirements
- Sprint Planning
- Development Workflow

---

# Key Decisions

- Jira Software (Scrum) will manage all development work.
- The backlog is organized by business capability (Epics).
- Stories represent user-facing functionality.
- Development tasks and QA work are tracked as sub-tasks.
- Sprint planning is documented separately.
- Messaging and Notifications, originally scoped as later epics, were pulled into the MVP once crew and connection flows needed a way to act on live requests.

---

## Revision History

| Version | Date | Author | Summary |
|----------|------|--------|---------|
| 1.0 | July 2026 | Tsadia Mabel | Initial backlog structure |
| 2.0 | July 2026 | Tsadia Mabel | Simplified to align with Jira Software Scrum workflow |
| 2.1 | September 2026 | Tsadia Mabel | Added Onboarding stories to Epic 1; expanded Epic 5 with the real crew-management, invitation, and chat stories; added a new Messaging epic; corrected Epic 3 and Epic 8 to flag itemized match reasoning, Save Attendees, and per-notification read actions as not yet implemented; moved Messaging and Notifications from Post-MVP to P0 Shipped; flagged that automated testing has not started and that some shipped stories have not yet been merged to GitHub |
