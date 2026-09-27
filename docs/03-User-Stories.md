# User Stories & Acceptance Criteria

> **Document ID:** DOC-003  
> **Role:** Business Analyst  
> **SDLC Phase:** Requirements Analysis  
> **Status:** Approved  
> **Version:** MVP v2.1

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
- Successful registration sends a confirmation email; after confirming and logging in for the first time, the user is taken to the Onboarding wizard rather than directly to profile creation.

---

## Story: User Login

**As a** registered user

**I want** to log into my account

**So that** I can access my conferences and profile.

### Acceptance Criteria

- User enters valid credentials.
- Invalid credentials display an error.
- Successful login redirects to the dashboard, unless onboarding hasn't been completed yet (see Onboarding story), in which case the user is redirected there first.

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

## Story: Onboarding (Compatibility Profile)

**As a** newly registered user

**I want** to be asked about my conference goals, interests, and networking style right after signing up

**So that** ConCrew can start recommending relevant people and conferences immediately.

### Acceptance Criteria

- Shown once, immediately after a new user's first login.
- User selects any number of Conference Goals, Interests, and Networking Preferences across a short, multi-step wizard.
- User can skip the wizard; skipping still marks onboarding as complete so they aren't shown it again.
- Existing accounts created before this feature are not forced through it retroactively.
- Selections are saved to the user's profile and immediately available to Attendee Discovery filters and Conference recommendation reasoning.

---

## Story: Create Profile

**As a** conference attendee

**I want** to create my professional profile

**So that** other attendees can learn about me.

### Acceptance Criteria

Users can provide:

- Profile picture *(not yet implemented — see Known Gaps in the README)*
- Biography
- Job title
- Company
- School
- City
- LinkedIn
- GitHub

Profile is successfully saved.

---

## Story: Edit Profile

**As a** conference attendee

**I want** to update my profile

**So that** my information remains current.

### Acceptance Criteria

Users can edit:

- Biography
- Company
- School
- City
- Job title
- LinkedIn
- GitHub
- Conference Goals, Interests, and Networking Preferences (the same fields set during Onboarding)

---

# Epic: Conference Discovery

---

## Story: Browse Conferences

**As a** user

**I want** to browse conferences, split into Upcoming and Past

**So that** I can find events I plan to attend and look back on ones I've already been to.

### Acceptance Criteria

Users can:

- View an Upcoming tab and a Past tab, each with a count
- View conference details
- Search conferences by name or location
- Filter by category and month
- See a note on a conference card when one or more people they'd likely match with are already attending

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

Filters currently include:

- Company
- School
- City
- Job title
- Interests
- Networking preferences

Filtering by Conference Goals, Skills, or Years of Experience is not yet implemented.

---

## Story: View Recommended People

**As a** conference attendee

**I want** personalized attendee recommendations

**So that** I can quickly discover compatible people.

### Acceptance Criteria

- Recommendations are ranked using profile-similarity matching (embeddings), shown as a match percentage on each card.
- A user must save their profile at least once to be included in matching.
- Itemized "why you matched" reasoning (e.g., "same company," "shared interest") is not yet shown; only the overall match percentage is currently displayed.

---

## Story: View Attendee Profile

**As a** conference attendee

**I want** to view another attendee's profile

**So that** I can decide whether to connect.

### Acceptance Criteria

Profiles display:

- Biography
- Professional information
- Conferences shared with the viewer
- Crews shared with the viewer ("Mutual Crew")
- Connect / Message actions

---

## Story: Save Attendees

**As a** conference attendee

**I want** to save interesting attendees

**So that** I can revisit them later.

### Acceptance Criteria

- Not yet implemented. Kept in the backlog; connecting with someone is currently the only way to keep track of them.

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
- Recipient receives a live notification and can accept or decline directly from it.
- Sender receives a live notification when their request is accepted.

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
- Visibility set (public or private).
- Organizer becomes first member, with the "owner" role.

---

## Story: Join Crew

**As a** conference attendee

**I want** to request to join a public crew, or accept an invitation to a private one

**So that** I can become part of a networking group.

### Acceptance Criteria

- Public crews: join request submitted, an owner or admin approves or declines it.
- Private crews: join only by invitation from an owner or admin.
- Approving a request or accepting an invitation updates the requester's membership live, without a refresh.

---

## Story: Manage Crew

**As a** crew owner or admin

**I want** to manage membership and settings

**So that** I can keep the crew organized and appropriately sized.

### Acceptance Criteria

- Approve or decline join requests.
- Invite eligible conference attendees who aren't already members.
- Revoke a pending invitation.
- Promote a member to admin, or remove admin status.
- Remove a member from the crew.
- Transfer ownership to another member.
- Change crew visibility between public and private.
- New join requests and membership changes appear live to anyone viewing the crew, without a refresh.

---

## Story: Leave Crew

**As a** crew member

**I want** to leave a crew

**So that** I can leave at any time.

### Acceptance Criteria

- A confirmation dialog is shown before leaving.
- Membership removed successfully upon confirmation.
- The crew's owner cannot leave until ownership is transferred to someone else.

---

## Story: Delete Crew

**As a** crew owner

**I want** to delete a crew I created

**So that** I can remove it if it's no longer needed.

### Acceptance Criteria

- A confirmation dialog is shown before deleting.
- Deleting removes the crew, its members, join requests, invitations, and scheduled meetups.

---

## Story: View Crew

**As a** crew member

**I want** to view my crew

**So that** I know who I'm networking with.

### Acceptance Criteria

Display:

- Members, with an avatar stack and total count
- Description
- Conference
- Upcoming meetups
- Crew chat

---

## Story: Crew Chat

**As a** crew member

**I want** to chat with my crew in real time

**So that** we can coordinate without leaving the platform.

### Acceptance Criteria

- Only current members can view or send messages.
- Messages appear for all members in real time.
- If someone's membership is granted while they're on the crew page (a join request gets approved), the chat opens automatically without needing a refresh.

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

# Epic: Messaging

---

## Story: Direct Messages

**As a** user

**I want** to message a connection directly

**So that** I can coordinate one-on-one without waiting to meet in person.

### Acceptance Criteria

- A Messages section lists all active conversations with a preview of the last message.
- Opening a conversation shows the full message history.
- New messages arrive in real time, without a refresh, and switching between conversations doesn't flash stale content.

---

# Epic: Notifications

---

## Story: Live Notifications

**As a** user

**I want** to be notified the moment something needs my attention

**So that** I don't have to keep checking pages manually.

### Acceptance Criteria

- A bell icon shows an unread count.
- New notifications (connection requests, connection acceptances, crew join requests, crew invitations) appear live, without a refresh.
- Connection and crew requests can be accepted or declined directly from the notification.
- A notification resolved elsewhere (e.g., approved from the crew page instead of the bell) disappears from the bell live.

---

# MVP Priorities

## Must Have

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
- Crews (including chat)
- Messaging
- Notifications

---

## Should Have

- Meetup Scheduling

---

## Future Releases

- Itemized "why you matched" recommendation reasoning
- Save/bookmark attendees
- Skills and Years of Experience as filters
- QR Networking
- Calendar Integration
- Session Planning

---

# Key Decisions

- Recommendations are prioritized before manual browsing.
- Conference Preferences (Goals, Interests, Networking style), collected during Onboarding, drive attendee recommendations and filtering.
- Small conference crews are preferred over large communities.
- Recommendations use profile-similarity (embedding-based) matching rather than exact-field rule scoring.
- Messaging and live notifications, originally deferred, were brought into the MVP once the crew and connection flows needed a way to act on requests without constant manual refreshing.

---

## Revision History

| Version | Date | Author | Summary |
|----------|------|--------|---------|
| 1.0 | July 2026 | Tsadia Mabel | Initial user stories |
| 2.0 | July 2026 | Tsadia Mabel | Updated to align with Jira backlog, refined user journey, and MVP priorities |
| 2.1 | September 2026 | Tsadia Mabel | Added Onboarding, Manage Crew, Delete Crew, Crew Chat, Messaging, and Notifications stories; corrected Recommendations, Filters, and Save Attendees acceptance criteria to match what's actually built; reversed the "messaging excluded" and "rule-based recommendations" decisions, both superseded |
