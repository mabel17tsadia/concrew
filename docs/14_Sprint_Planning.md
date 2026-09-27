# Sprint Planning & Release Plan

> **Document ID:** DOC-014  
> **Primary Role:** Scrum Master / Product Owner  
> **Supporting Roles:** Software Engineer, QA Engineer  
> **SDLC Phase:** Planning & Execution  
> **Status:** Approved  
> **Version:** MVP v2.1

---

# Purpose

This document defines how the ConCrew MVP will be delivered using an iterative Agile Scrum approach.

It outlines:

- Sprint goals
- Sprint scope
- Release planning
- Definition of Ready
- Definition of Done
- Success criteria

The objective is to deliver a functional MVP through incremental development while allowing for continuous testing, feedback, and improvement.

> **Note on this revision:** the original plan targeted five sprints. As built, Crews and Messaging each needed more room than originally scoped, mainly to get live updates working correctly, so the plan below reflects six sprints. See DOC-004 Product Roadmap for the same breakdown from a release-planning perspective.

---

# Delivery Strategy

The ConCrew MVP will be delivered over **six sprints**:

- Sprint 0 – Project Foundation
- Sprint 1 – Authentication, Onboarding & Profiles
- Sprint 2 – Conference Discovery & Attendee Browsing
- Sprint 3 – Recommendations, Connections & Notifications
- Sprint 4 – Conference Crews
- Sprint 5 – Messaging, Meetups & Release Preparation

Each sprint concludes with working software that can be demonstrated and evaluated.

---

# Sprint Timeline

| Sprint | Duration | Goal |
|---------|----------|------|
| Sprint 0 | 1 Week | Engineering Foundation |
| Sprint 1 | 2 Weeks | Authentication, Onboarding & Profiles |
| Sprint 2 | 2 Weeks | Conference Discovery & Attendee Browsing |
| Sprint 3 | 2 Weeks | Recommendations, Connections & Notifications |
| Sprint 4 | 2 Weeks | Conference Crews |
| Sprint 5 | 2 Weeks | Messaging, Meetups, Visual Identity & Release |

---

# Release Roadmap

```text
Sprint 0
      │
      ▼
Sprint 1
      │
      ▼
Sprint 2
      │
      ▼
Sprint 3
      │
      ▼
Sprint 4
      │
      ▼
Sprint 5
      │
      ▼
MVP Release
```

---

# Sprint 0 — Engineering Foundation

## Goal

Prepare the project for implementation.

### Deliverables

- GitHub repository
- Jira Software project
- Next.js application
- Supabase project
- PostgreSQL database, with the pgvector extension
- Tailwind CSS
- shadcn/ui
- Initial database schema
- Vercel deployment

### Definition of Done

- Development environment configured
- Application deployed successfully
- Repository connected to Jira
- Team ready to begin feature development

---

# Sprint 1 — Authentication, Onboarding & Profiles

## Sprint Goal

Allow users to create an account, complete onboarding, and build a professional profile.

### Stories

- Register Account
- Log In
- Log Out
- Reset Password
- Onboarding: Select Conference Goals, Interests, Networking Preferences (or skip)
- Create Profile
- Edit Profile

`Upload Profile Photo` was planned for this sprint but was not completed.

### Sprint Outcome

Users can register, authenticate, and complete (or skip) onboarding.

---

# Sprint 2 — Conference Discovery & Attendee Browsing

## Sprint Goal

Help users discover conferences and browse attendees.

### Stories

- Browse Conferences (Upcoming / Past)
- View Conference Details
- Join Conference
- Leave Conference
- Browse Attendees
- Search Attendees
- Filter Attendees

### Sprint Outcome

Users can find conferences and see who else is attending them.

---

# Sprint 3 — Recommendations, Connections & Notifications

## Sprint Goal

Surface compatible people and let users act on that in real time.

### Stories

- View Recommendations (profile-similarity match percentage)
- Send Connection Request
- Accept Connection
- Decline Connection
- View Connections
- View Notifications (live delivery)

`View Match Reasons` (itemized reasoning) was planned for this sprint but was not completed; only the match percentage shipped.

### Sprint Outcome

Users can discover people they may want to meet and connect with them, with live notification of the outcome.

---

# Sprint 4 — Conference Crews

## Sprint Goal

Allow attendees to organize into small groups and manage them.

### Stories

- Create Crew
- Request to Join Crew (public) / Invite to Crew (private)
- Approve or Decline Join Requests
- Manage Crew (roles, ownership transfer, visibility)
- Leave Crew
- Delete Crew
- View Crew Details
- Crew Chat
- Live membership and join-request updates

### Sprint Outcome

Users can form and manage crews, and coordinate inside them through real-time chat, without needing to refresh the page.

---

# Sprint 5 — Messaging, Meetups & Release Preparation

## Sprint Goal

Round out communication and prepare the application for release.

### Stories

- Create Meetup
- View Meetups
- View Conversations
- Send and Receive Direct Messages
- Visual identity re-theme (indigo/purple, logo)
- Functional Testing
- Regression Testing
- Bug Fixes
- UI Polish
- Documentation Review

### Sprint Outcome

A functionally complete MVP, still pending a few release steps; see Release Plan below.

---

# Sprint Ceremonies

Each sprint includes the following Scrum ceremonies.

## Sprint Planning

- Select backlog items
- Confirm sprint goal
- Estimate effort
- Identify dependencies

---

## Daily Standup

Daily progress is tracked by answering:

- What did I complete?
- What am I working on next?
- What blockers exist?

---

## Sprint Review

- Demonstrate completed functionality
- Collect stakeholder feedback
- Update backlog priorities

---

## Sprint Retrospective

Reflect on:

- What went well?
- What could improve?
- What should change next sprint?
- How did AI-assisted development improve productivity?

---

# Definition of Ready

A story is ready when:

- Business value is understood.
- Acceptance criteria are complete.
- Dependencies are identified.
- Story size is appropriate for one sprint.
- QA can validate the expected behavior.

---

# Definition of Done

A story is complete when:

- Code has been written and manually verified (automated unit tests are not yet in place).
- Acceptance criteria are satisfied.
- QA verification is complete.
- Documentation has been updated.
- Feature is deployable.
- Code has been merged into the main branch on GitHub.

> As of this revision, several completed stories have not yet reached the last step; the local build is ahead of what is merged. See the README's Known Gaps.

---

# Release Plan

The MVP is functionally complete through Sprint 5, pending the GitHub push described above.

### MVP Features

- User Authentication
- Onboarding
- Professional Profiles
- Conference Discovery (Upcoming / Past)
- Attendee Discovery, Search & Filters
- Profile-Similarity (Embedding-Based) Recommendations
- Connections
- Conference Crews, including Management and Crew Chat
- Meetups
- Direct Messaging
- Live Notifications

---

# Deferred Features

The following capabilities are intentionally excluded from the MVP:

- AI-Generated Itemized Match Reasoning
- Session Planning
- Calendar Integration
- QR Networking
- Travel Coordination
- Server-side API layer (planned once AI features need it)
- Automated testing

Direct Messaging is no longer deferred; it shipped in Sprint 5.

---

# Success Metrics

The MVP will be considered successful if users can:

- Create an account and complete onboarding
- Join a conference
- Discover compatible attendees
- Build professional connections
- Form or join a crew and chat with it
- Message a connection directly
- Schedule a meetup before or during the conference

---

# Project Risks

| Risk | Mitigation |
|------|------------|
| Scope creep | Strict adherence to MVP scope |
| AI-generated code quality | Human review and testing |
| Timeline delays | Re-prioritize backlog |
| Limited user feedback | Continue product discovery during development |
| Local build outpacing the GitHub repository | Push completed work before it accumulates further |

---

# Sprint Retrospective Template

Each sprint concludes with the following reflection.

### Wins

- What went well?

### Challenges

- What obstacles were encountered?

### Lessons Learned

- What did the team learn?

### AI Reflection

- How did AI tools improve development?
- Where was manual intervention required?

### Action Items

- What improvements will be made in the next sprint?

---

# Related Documents

- DOC-013 Jira Backlog Structure
- DOC-015 Development Workflow
- DOC-016 QA Strategy

---

# Key Decisions

- Scrum will be used throughout development.
- Sprint 0 establishes the engineering foundation.
- Messaging, originally planned as excluded, shipped in Sprint 5 once Crews and Connections needed a way to act on live requests.
- Every sprint must produce a working increment.
- AI accelerates development but does not replace engineering judgment.

---

## Revision History

| Version | Date | Author | Summary |
|----------|------|--------|---------|
| 1.0 | July 2026 | Tsadia Mabel | Initial sprint plan |
| 2.0 | July 2026 | Tsadia Mabel | Refined after backlog and architecture planning |
| 2.1 | September 2026 | Tsadia Mabel | Expanded from five to six sprints to match what was actually built; renamed and reordered sprints around Onboarding, Crew Management, and Messaging; corrected Recommendations from rule-based to embedding-based; moved Direct Messaging out of Deferred Features; flagged Upload Profile Photo and itemized match reasoning as not completed; noted the GitHub merge gap in Definition of Done |
