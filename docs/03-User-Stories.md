# User Stories & Acceptance Criteria

> **Document ID:** DOC-003  
> **Role:** Business Analyst  
> **SDLC Phase:** Requirements Analysis  
> **Status:** Approved  
> **Version:** MVP v2.0

---

# Purpose

This document defines the user stories for the ConCrew Minimum Viable Product (MVP).

Each story represents a piece of user value that can be independently planned, developed, tested, and delivered. These stories form the foundation of the Jira backlog and sprint planning.

---

# Epic: Authentication & User Profiles

---

## Story: User Registration

**As a** conference attendee

**I want** to create an account

**So that** I can access the ConCrew platform.

### Acceptance Criteria

- User registers with email and password.
- Email must be unique.
- Password meets security requirements.
- Successful registration redirects to profile creation.

---

## Story: User Login

**As a** registered user

**I want** to log into my account

**So that** I can access my conferences and profile.

### Acceptance Criteria

- User enters valid credentials.
- Invalid credentials display an error.
- Successful login redirects to the dashboard.

---

## Story: User Logout

**As a** logged-in user

**I want** to securely log out

**So that** my account remains protected.

### Acceptance Criteria

- User session ends successfully.
- User is redirected to the login page.

---

## Story: Reset Password

**As a** registered user

**I want** to reset my password

**So that** I can regain access to my account.

### Acceptance Criteria

- Password reset email is sent.
- User creates a new password.
- User logs in successfully with the new password.

---

## Story: Create Profile

**As a** conference attendee

**I want** to create my professional profile

**So that** other attendees can learn about me.

### Acceptance Criteria

Users can provide:

- Profile picture
- Biography
- Job title
- Company
- School
- City
- LinkedIn
- GitHub

Profile is successfully saved.

---

## Story: Conference Preferences

**As a** conference attendee

**I want** to tell ConCrew about my conference preferences

**So that** I receive relevant attendee recommendations.

### Acceptance Criteria

Users can specify:

- Professional interests
- Conference goals
- Networking preferences
- Industry
- Years of experience
- First-time attendee status

---

## Story: Edit Profile

**As a** conference attendee

**I want** to update my profile

**So that** my information remains current.

### Acceptance Criteria

Users can edit:

- Biography
- Profile picture
- Company
- School
- City
- Job title
- LinkedIn
- GitHub

---

# Epic: Conference Discovery

---

## Story: Browse Conferences

**As a** user

**I want** to browse conferences

**So that** I can find events I plan to attend.

### Acceptance Criteria

Users can:

- View conference list
- View conference details
- Search conferences

---

## Story: Join Conference

**As a** user

**I want** to join a conference

**So that** I can participate in its networking community.

### Acceptance Criteria

- User joins conference.
- Conference appears on dashboard.
- User can leave conference.

---

# Epic: Attendee Discovery

---

## Story: Browse People

**As a** conference attendee

**I want** to browse attendees

**So that** I can explore who is attending.

### Acceptance Criteria

- Attendees display in a list.
- User can view attendee profiles.

---

## Story: Search Attendees

**As a** conference attendee

**I want** to search attendees

**So that** I can quickly find specific people.

### Acceptance Criteria

Users can search by:

- Name
- Company
- School
- Job title

---

## Story: Filter Attendees

**As a** conference attendee

**I want** to filter attendees

**So that** I can discover people who match my interests.

### Acceptance Criteria

Filters include:

- Company
- School
- City
- Interests
- Conference goals
- Networking preferences

---

## Story: View Recommended People

**As a** conference attendee

**I want** personalized attendee recommendations

**So that** I can quickly discover compatible people.

### Acceptance Criteria

Recommendations explain why users were matched.

Examples:

- Shared interests
- Same company
- Same school
- Similar conference goals
- Similar networking preferences

---

## Story: View Attendee Profile

**As a** conference attendee

**I want** to view another attendee's profile

**So that** I can decide whether to connect.

### Acceptance Criteria

Profiles display:

- Biography
- Professional information
- Interests
- Conference goals
- Compatibility reasons

---

## Story: Save Attendees

**As a** conference attendee

**I want** to save interesting attendees

**So that** I can revisit them later.

### Acceptance Criteria

- User saves attendee.
- Saved attendees appear in a dedicated list.
- User removes saved attendees.

---

# Epic: Connections

---

## Story: Send Connection Request

**As a** conference attendee

**I want** to send a connection request

**So that** I can network before the conference.

### Acceptance Criteria

- Request sent successfully.
- Duplicate requests prevented.
- Recipient accepts or declines.

---

## Story: View Connections

**As a** user

**I want** to view my professional connections

**So that** I can manage my network.

### Acceptance Criteria

- Accepted connections display in a dedicated list.

---

# Epic: Conference Crews

---

## Story: Create Crew

**As a** conference attendee

**I want** to create a conference crew

**So that** I can experience the conference with compatible people.

### Acceptance Criteria

- Crew name entered.
- Description added.
- Organizer becomes first member.

---

## Story: Join Crew

**As a** conference attendee

**I want** to request to join a crew

**So that** I can become part of a networking group.

### Acceptance Criteria

- Join request submitted.
- Organizer approves request.

---

## Story: Leave Crew

**As a** crew member

**I want** to leave a crew

**So that** I can leave at any time.

### Acceptance Criteria

- Membership removed successfully.

---

## Story: View Crew

**As a** crew member

**I want** to view my crew

**So that** I know who I'm networking with.

### Acceptance Criteria

Display:

- Members
- Description
- Conference
- Upcoming meetups

---

# Epic: Meetups

---

## Story: Schedule Meetup

**As a** crew organizer

**I want** to schedule a meetup

**So that** everyone knows where and when to meet.

### Acceptance Criteria

Meetups include:

- Title
- Time
- Location
- Description

---

# MVP Priorities

## Must Have

- Authentication
- User Profiles
- Conference Preferences
- Browse Conferences
- Join Conferences
- Browse People
- Search
- Filters
- Recommendations
- Connection Requests
- Crews

---

## Should Have

- Meetup Scheduling
- Notifications

---

## Future Releases

- AI Recommendations
- Messaging
- QR Networking
- Calendar Integration
- Session Planning

---

# Key Decisions

- Recommendations are prioritized before manual browsing.
- Conference Preferences drive attendee recommendations.
- Small conference crews are preferred over large communities.
- Messaging is intentionally excluded from the MVP.
- Recommendations will initially be rule-based rather than AI-powered.

---

## Revision History

| Version | Date | Author | Summary |
|----------|------|--------|---------|
| 1.0 | July 2026 | Tsadia Mabel | Initial user stories |
| 2.0 | July 2026 | Tsadia Mabel | Updated to align with Jira backlog, refined user journey, and MVP priorities |
