# Low-Fidelity Wireframes
# Wireframe Overview

The following low-fidelity wireframes illustrate the primary user experience for the ConCrew MVP.

![ConCrew Wireframe Overview](images/concrew-wireframe-overview.png)

> **Document ID:** DOC-007  
> **Role:** Product Manager & UX Designer  
> **SDLC Phase:** UX Design  
> **Status:** Approved  
> **Version:** MVP v2.1

---

# Purpose

This document defines the low-fidelity user interface for the ConCrew MVP.

The objective of these wireframes is **not** to create the final visual design, but to validate:

- User flows
- Screen hierarchy
- Navigation
- Feature placement
- Information architecture

These wireframes serve as the blueprint for future UI implementation.

> **Note on this revision:** each screen below now says whether it shipped as designed, shipped with changes, or is still a future screen. The wireframes themselves were not redrawn; this is a status check against the built app.

---

# Design Principles

Every interface should support the following principles.

## Mobile First

Conference attendees will primarily use ConCrew on mobile devices while traveling between sessions.

---

## Simplicity

Users should never feel overwhelmed.

Interfaces should minimize unnecessary actions and focus on one primary objective per screen.

---

## Discovery Before Networking

The application should help users discover compatible people before encouraging them to start conversations.

---

## Small Communities

The experience should encourage meaningful networking through small conference crews rather than massive public communities.

---

## Minimal Navigation

Important actions should require as few interactions as possible.

---

# Primary User Flow

The intended user journey is shown below.

```text
Landing Page
        ↓
Create Account
        ↓
Onboarding (Conference Goals, Interests, Networking Preferences)
        ↓
Create Professional Profile
        ↓
Browse Conferences
        ↓
Join Conference
        ↓
Browse People
        ↓
Receive Recommendations
        ↓
Connect
        ↓
Create / Join Crew
        ↓
Meet During Conference (Crew Chat, Messaging)
        ↓
Maintain Professional Relationships
```

---

# Screen Overview

---

## Screen 1 — Landing Page

**Status: Shipped as designed**

### Purpose

Introduce ConCrew and clearly communicate the product value.

### Primary Actions

- Sign Up
- Log In
- Learn More

---

## Screen 2 — Authentication

**Status: Shipped as designed**

### Purpose

Allow users to securely access the platform.

### Primary Actions

- Register
- Login
- Reset Password

---

## Screen 3 — Onboarding (originally "Conference Preferences")

**Status: Shipped with changes.** This screen shipped as a short post-signup wizard rather than a single form, and collects fewer fields than originally planned. Professional Information (Job Title, Company, School, City, Years of Experience) is collected separately on the profile, not here. Session Interests was not built.

### Purpose

Collect information that helps personalize attendee recommendations.

### Sections

#### Conference Goals

Examples:

- Learn
- Network
- Find a Job
- Recruit
- Find Collaborators
- Meet New People

---

#### Interests

Examples:

- Artificial Intelligence
- Machine Learning
- Cloud Computing
- Cybersecurity
- Product Management
- Data Science

---

#### Networking Preferences

Examples:

- Coffee Chats
- Lunch Groups
- Workshop Discussions
- One-on-One Conversations
- Small Groups
- First-Time Attendee

---

> These preferences power the recommendation engine and the People page filters. The wizard can be skipped; skipping still marks it complete so the user isn't shown it again.

---

## Screen 4 — Dashboard

**Status: Shipped with changes.** "Active Crew" and "Pending Invitations" became a combined "Your Crews" widget; "Quick Actions" was replaced with "Recent Messages" and "Recommended People" widgets.

### Purpose

Provide a personalized overview of the user's conference activity.

### Components

- Upcoming Conferences (profile-completion checklist if incomplete)
- Recommended People
- Your Crews
- Recent Messages

---

## Screen 5 — Conferences

**Status: Shipped with changes.** Added Upcoming/Past tabs and per-card match-based reasoning, neither of which was in the original wireframe.

### Purpose

Allow users to discover and join conferences.

### Features

- Browse Conferences, split into Upcoming and Past tabs
- Search Conferences
- Filter by category and month
- View Conference Details
- Join Conference
- Leave Conference
- See a note when people the user would likely match with are attending

---

## Screen 6 — Browse People

**Status: Shipped with changes.** Recommendations show a match percentage, not an itemized reason. "Save" was not built.

### Purpose

Help attendees discover compatible people.

The top of the page displays personalized recommendations before the full attendee list.

Example

**Sarah**

- AI Engineer
- 92% match

Actions:

- View Profile
- Connect

---

## Screen 7 — Search & Filters

**Status: Shipped with changes.** Skills, Years of Experience, Conference Goals, and Sessions filters were not built. Interests and Networking Preferences were added, which were not in the original wireframe's filter groups.

### Purpose

Allow users to refine attendee discovery.

### Implemented Filters

- Company
- School
- City
- Job Title
- Interests
- Networking Preferences

---

### Not Yet Implemented

- Skills
- Years of Experience
- Conference Goals
- Sessions

---

## Screen 8 — User Profile

**Status: Shipped with changes.** "Compatibility Reasons" was not built; profiles show shared conferences and mutual crew instead.

### Purpose

Provide enough information for attendees to determine compatibility.

### Profile Sections

- Biography
- Professional Information
- Interests
- Conference Goals
- Shared Conferences
- Mutual Crew

---

## Screen 9 — Messages

**Status: Shipped.** This screen was originally tagged "Future MVP+" but shipped as part of the MVP, with real-time delivery.

### Purpose

Support conversations after connections have been established.

Typical conversations include:

- Planning meetups
- Discussing sessions
- Introducing crew members
- Coordinating conference activities

### Implementation Notes

- A conversation-list sidebar shows a preview of the latest message.
- Messages arrive live, without a refresh.

---

## Screen 10 — Conference Crews

**Status: Shipped with additions.** Manage Crew (approve/decline requests, invite, change roles, transfer ownership, change visibility) and Delete Crew were added beyond the original wireframe.

### Purpose

Help attendees form small networking communities.

### Features

- Create Crew
- Join Crew (request-to-join for public crews, invitation for private ones)
- Manage Crew
- Leave Crew (with confirmation)
- Delete Crew (owner only, with confirmation)
- View Crew Information

### Recommended Crew Size

**3–5 members**

This encourages active participation while keeping conversations manageable.

---

## Screen 11 — Crew Details

**Status: Shipped with changes.** Crew Chat shipped (the "Future" tag no longer applies). "Shared Sessions" was not built.

Displays:

- Members, with an avatar stack
- Upcoming Meetups
- Shared Interests
- Crew Chat
- Invitations

---

## Screen 12 — Meetup Planner

**Status: Shipped as designed.**

### Purpose

Coordinate informal gatherings.

Examples:

- Coffee
- Lunch
- Dinner
- Session Discussions
- Expo Walks
- Networking Events

---

## Screen 13 — Notifications

**Status: Shipped with changes.** Meetup-scheduled, recommendation-changed, and conference-approaching notifications were not built.

Notify users when:

- A connection request is received.
- A connection request is accepted.
- A crew join request is received.
- A crew invitation is received.

---

# Future Screens

Future releases may introduce:

- AI Networking Assistant
- Conference Maps
- QR Networking
- Calendar Integration
- Mentor Matching
- Travel Coordination
- Alumni Communities

---

# Design Decisions

Several important UX decisions were made during wireframing.

- Users complete onboarding before receiving recommendations.
- Browse People displays recommendations first.
- A match percentage builds trust; itemized compatibility explanations were deferred.
- Small crews encourage stronger relationships.
- Navigation remains consistent across the application.
- Discovery was prioritized first, though messaging and live notifications shipped earlier than planned once crew and connection flows needed them.
- The platform supports both pre-conference planning and in-person networking.

---

# Open Questions

The following UX questions remain under consideration.

- Should users join multiple crews?
- What is the ideal crew size?
- Should recommendations update continuously?
- Should conference organizers create official crews?

---

# Related Artifacts

- Product Vision
- PRD
- User Journey Map
- Functional Requirements
- Wireframe Images

---

## Revision History

| Version | Date | Author | Summary |
|----------|------|--------|---------|
| 1.0 | July 2026 | Tsadia Mabel | Initial wireframe specification |
| 2.0 | July 2026 | Tsadia Mabel | Updated after UX refinement and product discovery |
| 2.1 | September 2026 | Tsadia Mabel | Marked each screen's build status against the shipped app; removed the "Future MVP+" tag from Messages and "Future" tag from Crew Chat, both now shipped; corrected Screen 3, 6, 7, 8, and 13 to match what was actually built; removed already-answered Open Questions about crew visibility and messaging gating |
