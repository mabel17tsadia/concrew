# Functional Requirements Specification (FRS)

> **Document ID:** DOC-008  
> **Role:** Business Analyst  
> **Supporting Roles:** Product Manager, Software Engineer, QA Engineer  
> **SDLC Phase:** Requirements Analysis  
> **Status:** Approved  
> **Version:** MVP v2.0

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
- Join conferences
- Discover compatible attendees
- Build conference crews
- Coordinate meetups

The document intentionally excludes technical implementation details.

---

# User Roles

## Conference Attendee

The primary user of the platform.

Capabilities:

- Register
- Login
- Manage profile
- Join conferences
- Browse attendees
- Search attendees
- Receive recommendations
- Connect with attendees
- Create and join crews

---

## Crew Organizer

A conference attendee who owns a crew.

Additional capabilities:

- Invite members
- Approve join requests
- Schedule meetups

---

## Administrator

Responsible for platform management.

Capabilities:

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

The system shall authenticate registered users.

---

## FR-1.4 User Logout

The system shall securely terminate authenticated sessions.

---

## FR-1.5 Password Reset

The system shall allow users to reset forgotten passwords.

---

# Module 2 — User Profile

## FR-2.1 Create Profile

The system shall allow users to create a professional profile.

The profile shall include:

- Profile Photo
- Biography
- Company
- School
- City
- Job Title
- Years of Experience
- LinkedIn
- GitHub

---

## FR-2.2 Edit Profile

The system shall allow users to modify profile information.

---

## FR-2.3 Conference Preferences

The system shall allow users to specify conference preferences.

Supported preferences include:

### Professional Interests

- AI
- Cloud
- Cybersecurity
- Product
- Data Science

---

### Conference Goals

- Learn
- Network
- Find a Job
- Recruit
- Meet Collaborators

---

### Networking Preferences

- Coffee Chats
- Lunch Groups
- Workshop Discussions
- One-on-One Conversations
- First-Time Attendee

---

# Module 3 — Conference Discovery

## FR-3.1 Browse Conferences

The system shall display conferences.

Each conference shall display:

- Name
- Description
- Dates
- Location

---

## FR-3.2 Join Conference

The system shall allow users to join conferences.

---

## FR-3.3 Leave Conference

The system shall allow users to leave conferences.

---

## FR-3.4 View Conference Details

The system shall display conference information.

---

# Module 4 — Attendee Discovery

## FR-4.1 Browse People

The system shall display attendees belonging to joined conferences.

---

## FR-4.2 Search People

Users shall search attendees by:

- Name
- Company
- School
- Job Title

---

## FR-4.3 Filter People

The system shall support filtering by:

Professional

- Company
- School
- City
- Job Title

Conference

- Goals
- Interests
- Networking Preferences

---

## FR-4.4 Recommendations

The system shall recommend compatible attendees.

Recommendations may consider:

- Shared interests
- Conference goals
- Networking preferences
- School
- Company
- City
- Planned sessions

---

## FR-4.5 Compatibility Explanation

Every recommendation shall explain why it was generated.

Example:

- Shared AI interests
- Same conference
- Similar networking goals
- First-time attendee

---

## FR-4.6 Save Attendees

Users shall save attendees for future review.

---

# Module 5 — Connections

## FR-5.1 Send Connection Request

Users shall send connection requests.

---

## FR-5.2 Accept Request

Recipients shall accept requests.

---

## FR-5.3 Decline Request

Recipients shall decline requests.

---

## FR-5.4 View Connections

Users shall view accepted professional connections.

---

## FR-5.5 Prevent Duplicate Requests

The system shall prevent duplicate requests.

---

# Module 6 — Conference Crews

## FR-6.1 Create Crew

Users shall create conference crews.

---

## FR-6.2 Join Crew

Users shall request crew membership.

---

## FR-6.3 Leave Crew

Users shall leave crews.

---

## FR-6.4 View Crew

The system shall display:

- Members
- Description
- Conference
- Upcoming Meetups

---

## FR-6.5 Crew Capacity

The system shall enforce the configured crew size.

Default MVP size:

**3–5 members**

---

# Module 7 — Meetups

## FR-7.1 Schedule Meetup

Crew organizers shall schedule meetups.

Meetups include:

- Title
- Time
- Location
- Description

---

## FR-7.2 View Meetups

Crew members shall view upcoming meetups.

---

# Module 8 — Notifications

The system shall notify users when:

- Connection request received
- Request accepted
- Crew invitation received
- Meetup scheduled
- Conference approaching

---

# Business Rules

| ID | Rule |
|----|------|
| BR-1 | Users must authenticate before joining conferences. |
| BR-2 | Users only browse attendees for joined conferences. |
| BR-3 | Recommendations require completed conference preferences. |
| BR-4 | Duplicate connection requests are prohibited. |
| BR-5 | Crew membership is limited by configured capacity. |
| BR-6 | Users may leave crews at any time. |
| BR-7 | Only organizers approve crew membership. |

---

# Error Handling

The system shall display meaningful error messages for:

- Failed authentication
- Registration errors
- Duplicate accounts
- Conference join failures
- Crew capacity reached
- Missing required fields
- Network connectivity issues

---

# Assumptions

- Users already possess conference tickets.
- Administrators manage conferences.
- Users provide accurate profile information.
- Recommendations use rule-based matching.

---

# Out of Scope

The MVP excludes:

- AI-generated introductions
- Direct messaging
- Video conferencing
- Ticket purchasing
- Travel booking
- QR networking
- Calendar synchronization
- Mentor matching

---

# Requirement Traceability

| User Story | Functional Requirements |
|------------|-------------------------|
| User Registration | FR-1.1–FR-1.5 |
| Create Profile | FR-2.1–FR-2.3 |
| Conference Discovery | FR-3.1–FR-3.4 |
| Browse People | FR-4.1–FR-4.6 |
| Connections | FR-5.1–FR-5.5 |
| Conference Crews | FR-6.1–FR-6.5 |
| Meetups | FR-7.1–FR-7.2 |
| Notifications | FR-8.1 |

---

# Key Decisions

- Conference Preferences drive recommendations.
- Recommendations are rule-based in the MVP.
- Messaging is excluded from the MVP.
- Small conference crews are prioritized over large communities.

---

## Revision History

| Version | Date | Author | Summary |
|----------|------|--------|---------|
| 1.0 | July 2026 | Tsadia Mabel | Initial FRS |
| 2.0 | July 2026 | Tsadia Mabel | Updated after Jira planning and refined MVP scope |
