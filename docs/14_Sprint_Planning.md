# Sprint Planning & Release Plan

> **Document ID:** DOC-014  
> **Primary Role:** Scrum Master / Product Owner  
> **Supporting Roles:** Software Engineer, QA Engineer  
> **SDLC Phase:** Planning & Execution  
> **Status:** Approved  
> **Version:** MVP v2.0

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

---

# Delivery Strategy

The ConCrew MVP will be delivered over **five sprints**:

- Sprint 0 – Project Foundation
- Sprint 1 – User Onboarding
- Sprint 2 – Conference Discovery
- Sprint 3 – Connections & Crews
- Sprint 4 – Release Preparation

Each sprint concludes with working software that can be demonstrated and evaluated.

---

# Sprint Timeline

| Sprint | Duration | Goal |
|---------|----------|------|
| Sprint 0 | 1 Week | Engineering Foundation |
| Sprint 1 | 2 Weeks | Authentication & Profiles |
| Sprint 2 | 2 Weeks | Conference Discovery |
| Sprint 3 | 2 Weeks | Connections & Crews |
| Sprint 4 | 2 Weeks | QA & Release |

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
- PostgreSQL database
- Tailwind CSS
- shadcn/ui
- Initial database schema
- Vercel deployment
- CI/CD pipeline

### Definition of Done

- Development environment configured
- Application deployed successfully
- Repository connected to Jira
- Team ready to begin feature development

---

# Sprint 1 — Authentication & Profiles

## Sprint Goal

Allow users to create an account and build a professional profile.

### Stories

- Register Account
- Log In
- Log Out
- Reset Password
- Create Profile
- Edit Profile
- Upload Profile Photo
- Conference Preferences
- Select Interests
- Select Goals
- Select Networking Preferences

### Sprint Outcome

Users can register, authenticate, and complete onboarding.

---

# Sprint 2 — Conference Discovery

## Sprint Goal

Help users discover conferences and compatible attendees.

### Stories

- Browse Conferences
- View Conference Details
- Join Conference
- Leave Conference
- Browse Attendees
- Search Attendees
- Filter Attendees
- View Recommendations
- View Match Reasons

### Sprint Outcome

Users can discover people they may want to meet before attending a conference.

---

# Sprint 3 — Connections & Crews

## Sprint Goal

Allow attendees to form meaningful groups before the conference.

### Stories

- Send Connection Request
- Accept Connection
- Decline Connection
- View Connections
- Create Crew
- Join Crew
- Leave Crew
- View Crew Details
- Create Meetup
- View Notifications

### Sprint Outcome

Users can build connections, organize into crews, and coordinate meetups.

---

# Sprint 4 — QA & Release

## Sprint Goal

Prepare the application for production deployment.

### Stories

- Functional Testing
- Regression Testing
- Accessibility Review
- Performance Optimization
- UI Polish
- Documentation Review
- Bug Fixes
- Production Deployment
- Portfolio Preparation

### Sprint Outcome

A production-ready MVP is deployed.

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

- Code has been merged.
- Acceptance criteria are satisfied.
- Unit tests pass.
- QA verification is complete.
- Documentation has been updated.
- Feature is deployable.

---

# Release Plan

The MVP will be released after Sprint 4.

### MVP Features

- User Authentication
- Professional Profiles
- Conference Preferences
- Conference Discovery
- Attendee Discovery
- Rule-Based Recommendations
- Connections
- Conference Crews
- Meetups
- Notifications

---

# Deferred Features

The following capabilities are intentionally excluded from the MVP:

- Direct Messaging
- AI Recommendations
- Session Planning
- Calendar Integration
- QR Networking
- Travel Coordination

---

# Success Metrics

The MVP will be considered successful if users can:

- Create an account
- Join a conference
- Discover compatible attendees
- Build professional connections
- Form or join a crew
- Schedule a meetup before or during the conference

---

# Project Risks

| Risk | Mitigation |
|------|------------|
| Scope creep | Strict adherence to MVP scope |
| AI-generated code quality | Human review and testing |
| Timeline delays | Re-prioritize backlog |
| Limited user feedback | Continue product discovery during development |

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
- Messaging is excluded from the MVP.
- Every sprint must produce a working increment.
- AI accelerates development but does not replace engineering judgment.

---

## Revision History

| Version | Date | Author | Summary |
|----------|------|--------|---------|
| 1.0 | July 2026 | Tsadia Mabel | Initial sprint plan |
| 2.0 | July 2026 | Tsadia Mabel | Refined after backlog and architecture planning |
