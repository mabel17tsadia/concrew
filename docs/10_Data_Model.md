# Data Model

> **Document ID:** DOC-010  
> **Role:** Business Analyst  
> **Supporting Roles:** Product Manager, Software Architect, Software Engineer  
> **SDLC Phase:** Solution Design  
> **Status:** Approved  
> **Version:** MVP v2.1

---

# Purpose

This document defines the conceptual data model for the ConCrew MVP.

The purpose of the model is to identify the core business entities, their attributes, and their relationships.

This document is independent of any database technology and serves as the foundation for:

- Database Design
- API Design
- System Architecture
- Backend Development

> **Note on this revision:** the original model treated Interests, Conference Goals, and Networking Preferences as separate lookup entities joined to the user through their own association tables. The system as built instead stores each of these as an array directly on the profile. This revision reflects that, along with Messaging, Crew Chat, Crew Invitations, and the profile-similarity embedding, none of which existed in the prior version of this document.

---

# Overview

ConCrew revolves around one central concept:

> **Helping conference attendees discover compatible people before attending conferences.**

The platform manages users, conferences, professional profiles, recommendations, connections, crews, meetups, messaging, and notifications.

---

# Business Entities

---

# User / Profile

## Description

Represents a registered attendee. Authentication identity and profile data are both tracked, but the profile is what the rest of the app reads and writes.

### Core Attributes

| Attribute | Description |
|------------|-------------|
| User ID | Unique identifier |
| Email | Login email |
| Password Hash | Secure password (managed by the authentication provider) |
| Biography | Short introduction |
| Job Title | Current role |
| Company | Employer |
| School | University |
| City | Location |
| LinkedIn | LinkedIn profile |
| GitHub | GitHub profile |
| Conference Goals | Array of selected goals, set during Onboarding, editable afterward |
| Interests | Array of selected interests, set during Onboarding, editable afterward |
| Networking Preferences | Array of selected networking styles, set during Onboarding, editable afterward |
| Onboarding Completed | Whether the user has finished or skipped the Onboarding wizard |
| Profile Embedding | A vector representation of the profile, generated once a profile is saved, used to rank recommendations by similarity |
| Date Joined | Registration date |

Profile Photo and Years of Experience are not currently collected.

---

# Conference

## Description

Represents an event available on the platform.

### Attributes

- Conference ID
- Name
- Description
- Category
- Location
- Start Date
- End Date
- Website
- Banner Image
- Status (for example, published)

---

# Conference Attendee

## Description

Represents attendance at a conference.

### Purpose

Allows:

- One user → Many conferences
- One conference → Many attendees

---

### Attributes

- Conference Attendee ID
- User ID
- Conference ID
- Join Date

---

# Connection

Represents a professional relationship between two attendees.

### Attributes

- Connection ID
- Sender User ID
- Receiver User ID
- Status
- Created Date
- Accepted Date

### Status Values

- Pending
- Accepted
- Declined

Blocking is not currently implemented; there is no "Blocked" status.

---

# Crew

Represents a small networking group tied to a conference.

### Attributes

- Crew ID
- Conference ID
- Crew Name
- Description
- Visibility (public or private)
- Created Date

A target size of 3 to 5 members is a design guideline; there is no "Maximum Members" field enforced by the system.

---

# Crew Member

Represents membership within a crew.

### Attributes

- Crew Member ID
- Crew ID
- User ID
- Role (owner, admin, or member)
- Joined Date

Exactly one member holds the owner role at a time; ownership can be transferred.

---

# Crew Join Request

Represents a public-crew membership request awaiting approval.

### Attributes

- Join Request ID
- Crew ID
- User ID
- Status (pending, approved, or declined)
- Created Date

---

# Crew Invitation

Represents an invitation to a private crew.

### Attributes

- Invitation ID
- Crew ID
- Invited User ID
- Invited By (User ID)
- Status (pending, accepted, declined, or revoked)
- Created Date

---

# Meetup

Represents an in-person gathering organized by a crew.

### Attributes

- Meetup ID
- Crew ID
- Created By (User ID)
- Title
- Description
- Location
- Start Time
- End Time

---

# Conversation

Represents a messaging thread, either a one-to-one direct conversation or a crew's chat.

### Attributes

- Conversation ID
- Type (direct or crew)
- Crew ID (present only for a crew conversation)
- Created Date

---

# Conversation Participant

Associates users with a conversation.

### Attributes

- Conversation Participant ID
- Conversation ID
- User ID

A direct conversation has exactly two participants; a crew conversation's participants track that crew's members.

---

# Message

Represents a single message within a conversation.

### Attributes

- Message ID
- Conversation ID
- Sender User ID
- Content
- Created Date

---

# Notification

Represents a live platform notification.

### Attributes

- Notification ID
- User ID
- Notification Type (connection request, connection accepted, crew join request, or crew invitation)
- Title
- Description
- Read Status
- Created Date

---

# Entity Relationships

| Relationship | Type |
|--------------|------|
| User ↔ Conference | Many-to-Many (through Conference Attendee) |
| User ↔ Connection | Many-to-Many |
| Conference ↔ Crew | One-to-Many |
| Crew ↔ Crew Member | One-to-Many |
| Crew ↔ Crew Join Request | One-to-Many |
| Crew ↔ Crew Invitation | One-to-Many |
| Crew ↔ Meetup | One-to-Many |
| Crew ↔ Conversation | One-to-One (for a crew conversation) |
| User ↔ Conversation | Many-to-Many (through Conversation Participant) |
| Conversation ↔ Message | One-to-Many |
| User ↔ Notification | One-to-Many |

---

# Conceptual Entity Relationship Diagram

```text
User / Profile
│
├── Conference Attendee ─── Conference ─── Crew ─┬─ Crew Member
│                                                 ├─ Crew Join Request
│                                                 ├─ Crew Invitation
│                                                 ├─ Meetup
│                                                 └─ Conversation (crew) ── Message
│
├── Connection ────────── User
│
├── Conversation Participant ── Conversation (direct) ── Message
│
└── Notification
```

---

# Data Integrity Rules

The following business rules ensure data consistency.

- Email addresses must be unique.
- Users cannot send duplicate connection requests.
- Users cannot join the same crew twice.
- Crew membership size is not currently capped by the system.
- Every crew has exactly one owner at a time.
- Every meetup belongs to one crew.
- Users must join a conference before joining one of its crews.
- Users can only browse attendees within conferences they have joined.
- Only current crew members may read or write that crew's conversation.
- A profile must be saved at least once, generating an embedding, before it is eligible for recommendations.

---

# Future Enhancements

Future releases may introduce additional entities.

Examples include:

- Session
- Session Attendance
- Speaker
- Blocked User
- Travel Group
- Mentor Program
- Match Reasoning (itemized factors behind a recommendation's score)
- QR Badge
- Reputation Score

---

# Key Design Decisions

- Interests, Conference Goals, and Networking Preferences are stored as arrays on the profile rather than as separate lookup entities, since the matching approach compares whole profiles rather than scoring individual shared fields.
- Recommendations are generated from a profile-similarity embedding, not from AI-generated itemized reasoning or rule-based field scoring.
- Messaging (direct and crew) was originally excluded from the MVP but was added once crew and connection flows needed a way for users to act on live requests.
- The conceptual model remains independent of PostgreSQL or Supabase implementation, though the embedding column depends on a vector-capable database (pgvector).

---

# Related Documents

- Functional Requirements Specification
- Business Rules
- System Architecture
- API Design

---

## Revision History

| Version | Date | Author | Summary |
|----------|------|--------|---------|
| 1.0 | July 2026 | Tsadia Mabel | Initial conceptual data model |
| 2.0 | July 2026 | Tsadia Mabel | Refined after MVP scope definition and engineering planning |
| 2.1 | September 2026 | Tsadia Mabel | Replaced the separate Interest/Conference Goal/Networking Preference entities with array attributes on the profile; added a Profile Embedding attribute; added Crew Join Request, Crew Invitation, Conversation, Conversation Participant, and Message entities; corrected Crew and Connection to match the built role and status model; reversed the "messaging excluded" and "recommendations without AI" decisions |
