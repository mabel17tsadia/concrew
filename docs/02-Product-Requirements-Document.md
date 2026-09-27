# Product Requirements Document (PRD)

> **Document ID:** DOC-002  
> **Role:** Product Manager  
> **SDLC Phase:** Product Discovery & Planning  
> **Status:** Draft  
> **Version:** MVP v1.1

---

# Product Overview

## Product

**ConCrew**

---

## Purpose

ConCrew is a conference networking platform that helps attendees discover compatible people **before attending professional conferences**.

Instead of relying on chance encounters, attendees receive personalized recommendations based on shared interests, professional backgrounds, conference goals, and networking preferences.

The platform encourages attendees to form small conference crews that make networking more natural, collaborative, and meaningful.

---

# Business Objective

The primary objective of the MVP is to validate the following hypothesis.

> **Conference attendees will have a more valuable conference experience if they can discover compatible people before arriving at the event.**

The MVP intentionally focuses on validating attendee discovery before investing in advanced networking capabilities.

---

# Product Goals

The MVP should help users:

- Discover compatible attendees.
- Build confidence before arriving at conferences.
- Reduce the uncertainty of networking.
- Form meaningful conference crews.
- Continue conversations beyond conference sessions.

---

# Target Audience

## Primary Users

Professionals who regularly attend conferences, including:

- Software Engineers
- AI Engineers
- Product Managers
- Startup Founders
- Designers
- Researchers
- Students

---

## Secondary Users

- First-time conference attendees
- Solo travelers
- University groups
- Professional organizations
- Coworkers attending the same conference

---

# User Personas

## Persona 1 — Alex

**Occupation**

Software Engineer

### Goals

- Meet other engineers
- Discuss technical sessions
- Build professional relationships

### Pain Points

- Doesn't know anyone attending.
- Feels uncomfortable approaching strangers.
- Leaves conferences without meaningful networking.

---

## Persona 2 — Maya

**Occupation**

Computer Science Student

### Goals

- Meet professionals.
- Learn about internships and careers.
- Build confidence networking.

### Pain Points

- Intimidated by experienced attendees.
- Unsure who would be interested in talking.
- Doesn't know where networking begins.

---

## Persona 3 — David

**Occupation**

Startup Founder

### Goals

- Meet potential collaborators.
- Network with investors.
- Connect with customers.

### Pain Points

- Limited time.
- Wants quality introductions instead of random conversations.

---

# User Journey

## Before the Conference

Users should be able to:

- Create an account.
- Complete their compatibility profile (Conference Goals, Interests, Networking Preferences).
- Join a conference.
- Receive attendee recommendations.
- Browse attendee profiles.
- Send connection requests.
- Form or join a conference crew.

---

## During the Conference

Users should be able to:

- Meet their crew.
- Message their crew and individual connections directly.
- Attend sessions together.
- Continue discussions after presentations.
- Coordinate coffee, lunch, or networking meetups.

---

## After the Conference

Users should be able to:

- Maintain professional relationships.
- Continue conversations.
- Attend future conferences with previous connections.

---

# Functional Requirements

## Authentication

The platform shall allow users to:

- Register
- Login
- Logout
- Reset Password

---

## Onboarding

Immediately after registration, users shall be able to:

- Select one or more Conference Goals
- Select one or more Interests
- Select one or more Networking Preferences
- Skip onboarding and complete it later from their profile

This step is shown once per account; existing users are not required to complete it retroactively.

---

## User Profiles

Users shall be able to:

- Upload a profile photo
- Add a biography
- Specify company
- Specify school
- Specify city
- Add professional interests
- Select conference goals
- Define networking preferences
- Add LinkedIn
- Add GitHub

---

## Conference Discovery

Users shall be able to:

- Browse conferences, split into Upcoming and Past
- View conference information
- Join conferences
- Leave conferences
- See how many people they'd likely match with are attending a given conference

---

## Attendee Discovery

Users shall be able to:

- Browse attendees
- Search attendees
- Filter attendees (by school, city, company, job title, interests, and networking preferences)
- View attendee profiles
- Receive personalized recommendations, ranked by profile-similarity matching

---

## Connections

Users shall be able to:

- Send connection requests
- Accept requests
- Decline requests
- View connections
- Receive a notification when a request is sent to them or accepted

---

## Conference Crews

Users shall be able to:

- Create crews
- Browse and request to join public crews
- Be invited to private crews
- Leave crews (with confirmation)
- View crew members, including role (owner, admin, member)
- Manage a crew: approve or decline join requests, invite people, change member roles, transfer ownership, change visibility
- Delete a crew (owner only, with confirmation)
- Chat with crew members in a dedicated, real-time crew chat
- Schedule and view crew meetups

---

## Messaging

Users shall be able to:

- See a list of their active conversations
- Send and receive direct messages in real time
- Send and receive crew messages in real time, scoped to crew members only

---

## Notifications

Users shall be able to:

- See a live count of unread notifications
- Receive a notification for: a connection request, a connection acceptance, a crew join request, a crew invitation
- Accept or decline a request directly from the notification
- Have notifications update live, without needing to refresh the page

---

# Non-Functional Requirements

The platform should:

- Support mobile-first usage.
- Load quickly.
- Protect user privacy.
- Provide secure authentication.
- Scale across multiple conferences.
- Remain highly available during conference periods.
- Reflect changes to shared data (membership, requests, notifications) live, without requiring a manual refresh.

---

# MVP Scope

## Included

- Authentication
- Onboarding (Compatibility Profile)
- User Profiles
- Conference Browsing (Upcoming / Past)
- Conference Membership
- Browse People
- Recommendations (profile-similarity based)
- Search & Filters
- Connection Requests
- Conference Crews (including chat and meetups)
- Direct Messaging
- Live Notifications

---

## Excluded

The following features are intentionally postponed:

- Ticket Purchasing
- Hotel Booking
- Video Calls
- Job Boards
- Payment Processing
- Conference Management (conferences are currently added by an administrator, not created by users)

---

# Assumptions

The MVP assumes:

- Users already possess conference tickets.
- Conferences are managed by administrators.
- Users are willing to share professional information.
- Users value networking before arriving.

---

# Risks

| Risk | Mitigation |
|------|------------|
| Low user adoption | Launch with a single conference first. |
| Fake profiles | Email verification and moderation. |
| Low engagement | Focus on recommendations and small crews. |
| Scope creep | Strict MVP prioritization. |

---

# Success Metrics

The MVP will be considered successful if users can successfully discover and interact with compatible attendees.

## Adoption

- 100+ registered users
- Multiple conferences available
- Returning users

---

## Engagement

- Users complete onboarding
- Users join conferences
- Users browse recommendations
- Users send connection requests
- Users create crews
- Users send messages

---

## User Value

Success is demonstrated when users report:

- Meeting at least one meaningful connection.
- Feeling more confident attending conferences.
- Returning for future conferences.
- Recommending ConCrew to others.

---

# Open Questions

The following questions remain under investigation.

- What factors create the best attendee recommendations?
- What is the ideal crew size?
- Should users belong to multiple crews?
- How much profile information should be public?
- Should profiles require LinkedIn verification?

---

# Future Enhancements

Potential future releases may include:

- Further matching refinements, combining stated interests with bio-embedding similarity
- Session planning
- Calendar integration
- QR networking
- Badge scanning
- Mentor matching
- Travel coordination
- Conference reviews
- Reputation system

---

# Summary

The ConCrew MVP focuses on solving one specific problem exceptionally well.

> **Help conference attendees discover compatible people before arriving at a conference.**

Once this hypothesis has been validated, additional networking and collaboration features can be introduced through future releases.

---

## Revision History

| Version | Date | Author | Summary |
|----------|------|--------|---------|
| 1.0 | July 2026 | Tsadia Mabel | Initial Product Requirements Document |
| 2.0 | July 2026 | Tsadia Mabel | Refined after product discovery and MVP prioritization |
| 3.0 | September 2026 | Tsadia Mabel | Moved Direct Messaging, Crew Chat, and Live Notifications from Excluded/Future into MVP Scope now that they are built; added Onboarding, Messaging, and Notifications requirement sections; removed the resolved "when should messaging be introduced" open question |
