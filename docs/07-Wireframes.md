# Low-Fidelity Wireframes
# Wireframe Overview

The following low-fidelity wireframes illustrate the primary user experience for the ConCrew MVP.

![ConCrew Wireframe Overview](images/concrew-wireframe-overview.png)

> **Document ID:** DOC-007  
> **Role:** Product Manager & UX Designer  
> **SDLC Phase:** UX Design  
> **Status:** Approved  
> **Version:** MVP v2.0

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
Create Professional Profile
        ↓
Complete Conference Preferences
        ↓
Browse Conferences
        ↓
Join Conference
        ↓
Browse People
        ↓
Receive Recommendations
        ↓
View Compatibility Reasons
        ↓
Connect
        ↓
Create / Join Crew
        ↓
Meet During Conference
        ↓
Maintain Professional Relationships
```

---

# Screen Overview

---

## Screen 1 — Landing Page

### Purpose

Introduce ConCrew and clearly communicate the product value.

### Primary Actions

- Sign Up
- Log In
- Learn More

---

## Screen 2 — Authentication

### Purpose

Allow users to securely access the platform.

### Primary Actions

- Register
- Login
- Reset Password

---

## Screen 3 — Conference Preferences

### Purpose

Collect information that helps personalize attendee recommendations.

### Sections

#### Professional Information

- Job Title
- Company
- School
- City
- Years of Experience

---

#### Conference Goals

Examples:

- Learn
- Network
- Find a Job
- Recruit
- Find Collaborators
- Meet New People

---

#### Technical Interests

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

#### Session Interests (Optional)

Users may select sessions they intend to attend.

---

> These preferences power the recommendation engine.

---

## Screen 4 — Dashboard

### Purpose

Provide a personalized overview of the user's conference activity.

### Components

- Upcoming Conferences
- Recommended People
- Active Crew
- Pending Invitations
- Quick Actions

---

## Screen 5 — Conferences

### Purpose

Allow users to discover and join conferences.

### Features

- Browse Conferences
- Search Conferences
- View Conference Details
- Join Conference
- Leave Conference

---

## Screen 6 — Browse People

### Purpose

Help attendees discover compatible people.

The top of the page displays personalized recommendations before the full attendee list.

Each recommendation explains why the user was matched.

Example

**Sarah**

- AI Engineer
- Interested in AI Agents
- First-Time Attendee
- Attending the Same Conference

Actions:

- View Profile
- Save
- Connect

---

## Screen 7 — Search & Filters

### Purpose

Allow users to refine attendee discovery.

### Professional Filters

- Company
- School
- City
- Job Title

---

### Technical Filters

- Interests
- Skills
- Years of Experience

---

### Conference Filters

- Conference Goals
- Sessions

---

### Networking Filters

- Coffee Chats
- Lunch Groups
- Workshop Discussions
- First-Time Attendees

---

## Screen 8 — User Profile

### Purpose

Provide enough information for attendees to determine compatibility.

### Profile Sections

- Biography
- Professional Information
- Interests
- Conference Goals
- Current Conferences
- Crew Membership
- Shared Interests
- Compatibility Reasons

---

## Screen 9 — Messages *(Future MVP+)*

### Purpose

Support conversations after connections have been established.

Typical conversations include:

- Planning meetups
- Discussing sessions
- Introducing crew members
- Coordinating conference activities

---

## Screen 10 — Conference Crews

### Purpose

Help attendees form small networking communities.

### Features

- Create Crew
- Join Crew
- Invite Members
- Leave Crew
- View Crew Information

### Recommended Crew Size

**3–5 members**

This encourages active participation while keeping conversations manageable.

---

## Screen 11 — Crew Details

Displays:

- Members
- Upcoming Meetups
- Shared Interests
- Shared Sessions
- Crew Chat *(Future)*
- Invitations

---

## Screen 12 — Meetup Planner

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

Notify users when:

- A connection request is received.
- A crew invitation is received.
- A meetup is scheduled.
- A recommendation changes.
- A conference is approaching.

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
- Compatibility explanations build trust.
- Small crews encourage stronger relationships.
- Navigation remains consistent across the application.
- Discovery is prioritized over messaging.
- The platform supports both pre-conference planning and in-person networking.

---

# Open Questions

The following UX questions remain under consideration.

- Should users join multiple crews?
- Should crews be public, private, or invite-only?
- What is the ideal crew size?
- Should messaging require an accepted connection?
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
