# Jira Backlog Structure

> **Document ID:** DOC-013  
> **Primary Role:** Product Manager / Product Owner  
> **Supporting Roles:** Business Analyst, Software Engineer, QA Engineer  
> **SDLC Phase:** Planning  
> **Status:** Approved  
> **Version:** MVP v2.0

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

# Epic 1 — Authentication & Profiles

## Goal

Allow users to securely register, authenticate, and create professional profiles.

### Stories

- Register Account
- Log In
- Log Out
- Reset Password
- Create Profile
- Edit Profile
- Upload Profile Photo
- Configure Conference Preferences

---

# Epic 2 — Conference Discovery

## Goal

Allow attendees to discover and join conferences.

### Stories

- Browse Conferences
- Search Conferences
- View Conference Details
- Join Conference
- Leave Conference
- View Joined Conferences

---

# Epic 3 — Attendee Discovery

## Goal

Help users discover compatible attendees.

### Stories

- Browse People
- Search Attendees
- Filter Attendees
- View Attendee Profile
- View Recommendations
- View Match Reasons
- Save Attendees

---

# Epic 4 — Connections

## Goal

Allow attendees to establish professional connections.

### Stories

- Send Connection Request
- Accept Connection
- Decline Connection
- View Connections
- Remove Connection

---

# Epic 5 — Conference Crews

## Goal

Allow attendees to organize into small groups.

### Stories

- Create Crew
- Join Crew
- Leave Crew
- Invite Members
- Remove Members
- View Crew Details

---

# Epic 6 — Meetups

## Goal

Coordinate in-person gatherings during conferences.

### Stories

- Create Meetup
- Edit Meetup
- Cancel Meetup
- View Meetups

---

# Epic 7 — Notifications

## Goal

Keep users informed of important activity.

### Stories

- View Notifications
- Mark Notification Read
- Mark All Read

---

# Epic 8 — Testing & QA

## Goal

Ensure product quality before release.

### Stories

- Functional Testing
- Regression Testing
- Bug Fixes
- Release Validation

---

# Product Backlog Priorities

| Priority | Description |
|----------|-------------|
| **P0** | Required for MVP |
| **P1** | Important but can follow MVP |
| **P2** | Nice-to-have enhancements |
| **P3** | Future roadmap items |

---

## P0 – MVP

- Authentication
- User Profiles
- Conference Preferences
- Browse Conferences
- Join Conferences
- Browse Attendees
- Recommendations
- Connections
- Crews
- Meetups
- Notifications

---

## P1 – Post-MVP

- Saved Attendees
- Advanced Filters
- Crew Invitations
- Organizer Controls

---

## P2 – Future Enhancements

- Session-Based Discovery
- AI Recommendations
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
- Unit testing passes.
- QA verification is complete.
- Documentation is updated.
- The feature is merged into the main branch.

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

---

## Revision History

| Version | Date | Author | Summary |
|----------|------|--------|---------|
| 1.0 | July 2026 | Tsadia Mabel | Initial backlog structure |
| 2.0 | July 2026 | Tsadia Mabel | Simplified to align with Jira Software Scrum workflow |
