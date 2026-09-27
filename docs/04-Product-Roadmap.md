# Product Roadmap & Release Strategy

> **Document ID:** DOC-004  
> **Role:** Product Manager  
> **SDLC Phase:** Product Planning  
> **Status:** Approved  
> **Version:** MVP v2.1

---

# Purpose

This roadmap outlines the planned evolution of ConCrew from an initial Minimum Viable Product (MVP) into a mature conference networking platform.

Rather than delivering every possible feature at once, development follows an incremental strategy that validates the highest-risk assumptions first before investing in more advanced functionality.

> **Note on this revision:** while discovery was sequenced first as planned, several features originally scoped for Release 2 and Release 3 (Crew Chat, Direct Messaging, Live Notifications, Meetup Scheduling) turned out to be needed earlier than expected, since the crew and connection flows were not usable without a way to act on requests live. They were pulled forward into the MVP rather than held for a later release. This document reflects what actually shipped; see [Known Gaps](../README.md#known-gaps) in the README for what has not.

---

# Product Strategy

The ConCrew roadmap follows one guiding principle:

> **Help attendees discover the right people before helping them communicate.**

Many networking platforms focus on communication.

ConCrew focuses first on **discovery**.

If users cannot discover compatible people, messaging and other networking features provide little value.

The MVP therefore prioritizes:

- Attendee discovery
- Compatibility recommendations
- Small conference crews

In practice, the tools attendees need to act on a discovery (accepting a connection, approving a join request, chatting with a crew) turned out to be part of making discovery itself feel worthwhile, so they shipped alongside it rather than after it.

---

# Product Evolution

```text
Conference Discovery
        ↓
Attendee Discovery
        ↓
Conference Crews (+ live coordination: chat, messaging, notifications)
        ↓
Long-Term Professional Networking
        ↓
AI-Powered Networking
```

---

# Release 1 — Minimum Viable Product (Shipped)

## Objective

Validate that attendees receive value from discovering compatible people before conferences.

---

## Core Capabilities

### User Accounts

- Registration
- Login
- Logout
- Password Reset

---

### Onboarding

- A short post-signup wizard collecting Conference Goals, Interests, and Networking Preferences
- Skippable, but marks the account as onboarded either way
- Existing accounts are not forced through it retroactively

---

### User Profiles

- Professional Profile
- Conference Goals, Interests, and Networking Preferences (set during Onboarding, editable afterward)

---

### Conference Discovery

- Browse Conferences, split into Upcoming and Past
- Join Conferences
- A note on conference cards when people the user would likely match with are attending

---

### Attendee Discovery

- Browse People
- Search
- Filters (School, City, Company, Job Title, Interests, Networking Style)
- Recommendations, ranked by profile-similarity (embedding) matching

Itemized compatibility reasoning ("same company," "shared interest") was originally planned for this release but is not yet built; only an overall match percentage is shown today. See Release 4.

---

### Networking

- Connection Requests, with live notifications on both ends
- View Connections

---

### Conference Crews

- Create Crew (public or private)
- Join Crew (request-to-join for public crews, invitation for private ones)
- Manage Crew (approve or decline requests, invite people, change roles, transfer ownership, change visibility)
- Leave Crew, with confirmation
- Delete Crew, with confirmation
- View Crew
- Crew Chat, a real-time chat scoped to members, originally planned for Release 3

---

### Communication (pulled forward from later releases)

- Direct Messaging, one-to-one, real-time
- Live Notifications, with inline accept and decline actions
- Meetup Scheduling, for a crew's planned get-togethers

---

## Success Metrics

The MVP is considered successful when users:

- Complete onboarding.
- Join conferences.
- Browse recommended attendees.
- Send connection requests.
- Create conference crews.
- Return before the conference begins.

---

# Release 2 — Conference Collaboration

## Objective

Support collaboration during conferences.

---

## Features

Meetup Scheduling and Crew Chat, originally scoped here, shipped as part of the MVP instead (see Release 1). What remains for this release:

- Richer Crew Dashboard (activity summary across a member's crews)
- Lunch Planning and Coffee Chat templates for meetups
- Group Activities

---

## Success Metrics

- Meetups scheduled.
- Crew participation increases.
- Active crews during conferences.

---

# Release 3 — Professional Networking

## Objective

Extend networking beyond the conference.

---

## Features

Direct Messaging and Live Notifications, originally scoped here, shipped as part of the MVP instead (see Release 1). What remains for this release:

- Persistent conversation history beyond the current session
- Shared Connections (mutual-connection visibility)
- Future Conference Planning
- Networking Timeline

---

## Success Metrics

- Returning users.
- Continued conversations.
- Repeat conference attendance.

---

# Release 4 — Intelligent Networking

## Objective

Improve attendee recommendations through AI.

---

## Planned Features

- Itemized "why you matched" compatibility reasoning, combining stated interests with embedding similarity
- Personalized Introductions
- Session Recommendations
- Icebreaker Suggestions
- Networking Insights

---

# Prioritization Framework

Every feature is evaluated using three questions.

---

## Question 1

**Does this feature help users discover compatible people?**

If yes:

Highest Priority

---

## Question 2

**Does this feature help users experience conferences together?**

If yes:

Medium Priority

---

## Question 3

**Does this feature improve networking after conferences?**

If yes:

Future Release

---

# Sprint Roadmap

The MVP was delivered through iterative Scrum sprints.

---

## Sprint 0

### Goal

Prepare the engineering environment.

Deliverables

- GitHub Repository
- Next.js Project
- Supabase Setup
- Tailwind CSS
- shadcn/ui
- Vercel Deployment
- Initial Folder Structure

---

## Sprint 1

### Goal

Authentication & User Profiles

Deliverables

- Registration
- Login
- Logout
- Reset Password
- Onboarding (Conference Goals, Interests, Networking Preferences)
- Create Profile

---

## Sprint 2

### Goal

Conference Discovery

Deliverables

- Browse Conferences (Upcoming / Past)
- Join Conferences
- Browse People
- Search
- Filters

---

## Sprint 3

### Goal

Attendee Discovery

Deliverables

- Recommendations (profile-similarity matching)
- Connection Requests
- View Connections
- Live Notifications

---

## Sprint 4

### Goal

Conference Crews

Deliverables

- Create Crew
- Join Crew (request/invite)
- Manage Crew
- Leave Crew / Delete Crew
- View Crew
- Crew Chat

---

## Sprint 5

### Goal

Messaging, Meetups & Visual Identity

Deliverables

- Direct Messaging
- Meetup Scheduling
- Indigo/purple visual identity and logo
- Bug fixes (realtime enablement, stale membership checks)

---

# Current Backlog Priority

## P0 — Must Have (Shipped)

- Authentication
- Onboarding
- User Profiles
- Browse Conferences
- Join Conferences
- Browse People
- Search
- Filters
- Recommendations
- Connection Requests
- Conference Crews (including Crew Chat)
- Direct Messaging
- Live Notifications
- Meetup Scheduling

---

## P1 — Should Have

- Push the local build to GitHub so the repository matches the running app
- A small backend API layer to support upcoming AI features

---

## P2 — Future

- Itemized "why you matched" compatibility reasoning
- Skills and Years of Experience as People filters
- Calendar Integration
- QR Networking

---

## P3 — Long-Term Vision

- AI Networking Assistant
- Mentor Matching
- Travel Coordination
- Alumni Communities
- Startup Founder Matching

---

# Product Milestones

| Milestone | Outcome |
|------------|---------|
| Phase 1 | Validate attendee discovery |
| Phase 2 | Validate conference crews |
| Phase 3 | Support conference collaboration |
| Phase 4 | Enable long-term networking |
| Phase 5 | Introduce AI-powered networking |

---

# Key Decisions

- Discovery is prioritized over messaging, though messaging shipped earlier than planned once crew and connection flows needed a way to act on live requests.
- Small crews are preferred over large communities.
- Recommendations use profile-similarity (embedding-based) matching; a rule-based approach was considered but not built.
- Crew Chat, Direct Messaging, Live Notifications, and Meetup Scheduling moved into the MVP from later releases.
- Each sprint delivers working software.

---

## Revision History

| Version | Date | Author | Summary |
|----------|------|--------|---------|
| 1.0 | July 2026 | Tsadia Mabel | Initial roadmap |
| 2.0 | July 2026 | Tsadia Mabel | Updated after Jira planning and sprint definition |
| 2.1 | September 2026 | Tsadia Mabel | Reflected Crew Chat, Direct Messaging, Live Notifications, and Meetup Scheduling shipping as part of the MVP instead of later releases; corrected recommendations from rule-based to embedding-based; flagged itemized match reasoning as still future work; updated Sprint Roadmap and Backlog Priority to match what was actually delivered |
