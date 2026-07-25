# Data Model

> **Document ID:** DOC-010  
> **Role:** Business Analyst  
> **Supporting Roles:** Product Manager, Software Architect, Software Engineer  
> **SDLC Phase:** Solution Design  
> **Status:** Approved  
> **Version:** MVP v2.0

---

# Purpose

This document defines the conceptual data model for the ConCrew MVP.

The purpose of the model is to identify the core business entities, their attributes, and their relationships.

This document is independent of any database technology and serves as the foundation for:

- Database Design
- API Design
- System Architecture
- Backend Development

---

# Overview

ConCrew revolves around one central concept:

> **Helping conference attendees discover compatible people before attending conferences.**

The platform manages users, conferences, professional profiles, recommendations, connections, crews, and meetups.

---

# Business Entities

---

# User

## Description

Represents a registered attendee.

### Core Attributes

| Attribute | Description |
|------------|-------------|
| User ID | Unique identifier |
| First Name | User's first name |
| Last Name | User's last name |
| Email | Login email |
| Password Hash | Secure password |
| Profile Photo | User image |
| Biography | Short introduction |
| Job Title | Current role |
| Company | Employer |
| School | University |
| City | Location |
| Years of Experience | Professional experience |
| LinkedIn | LinkedIn profile |
| GitHub | GitHub profile |
| Date Joined | Registration date |
| Account Status | Active / Suspended |

---

# Conference

## Description

Represents an event available on the platform.

### Attributes

- Conference ID
- Name
- Description
- Location
- Start Date
- End Date
- Website
- Banner Image
- Status

---

# User Conference

## Description

Represents attendance at a conference.

### Purpose

Allows:

- One user → Many conferences
- One conference → Many attendees

---

### Attributes

- User Conference ID
- User ID
- Conference ID
- Join Date
- Attendance Status

---

# Interest

Represents professional interests.

Examples

- Artificial Intelligence
- Cloud Computing
- Product Management
- Cybersecurity
- Robotics

---

### Attributes

- Interest ID
- Name
- Category

---

# User Interest

Associates users with multiple interests.

---

# Conference Goal

Represents why someone is attending a conference.

Examples

- Learn
- Network
- Recruit
- Find a Job
- Meet Founders

---

### Attributes

- Goal ID
- Goal Name

---

# User Goal

Associates users with one or more conference goals.

---

# Networking Preference

Represents preferred networking style.

Examples

- Coffee Chats
- Lunch Groups
- Workshop Discussions
- One-on-One Conversations
- First-Time Attendee

---

### Attributes

- Preference ID
- Name

---

# User Preference

Stores networking preferences selected during onboarding.

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
- Blocked

---

# Crew

Represents a small networking group.

### Attributes

- Crew ID
- Conference ID
- Organizer ID
- Crew Name
- Description
- Visibility
- Maximum Members
- Created Date

---

# Crew Member

Represents membership within a crew.

### Attributes

- Crew Member ID
- Crew ID
- User ID
- Membership Status
- Joined Date

---

# Meetup

Represents an in-person gathering organized by a crew.

### Attributes

- Meetup ID
- Crew ID
- Organizer ID
- Title
- Description
- Location
- Start Time
- End Time

---

# Notification

Represents platform notifications.

### Attributes

- Notification ID
- User ID
- Notification Type
- Title
- Description
- Read Status
- Created Date

---

# Entity Relationships

| Relationship | Type |
|--------------|------|
| User ↔ Conference | Many-to-Many |
| User ↔ Interest | Many-to-Many |
| User ↔ Conference Goal | Many-to-Many |
| User ↔ Networking Preference | Many-to-Many |
| User ↔ Connection | Many-to-Many |
| Conference ↔ Crew | One-to-Many |
| Crew ↔ Crew Member | One-to-Many |
| Crew ↔ Meetup | One-to-Many |
| User ↔ Notification | One-to-Many |

---

# Conceptual Entity Relationship Diagram

```text
User
│
├── User Conference ───── Conference
│
├── User Interest ─────── Interest
│
├── User Goal ─────────── Conference Goal
│
├── User Preference ───── Networking Preference
│
├── Connection ────────── User
│
├── Crew Member ───────── Crew ───── Meetup
│
└── Notification
```

---

# Data Integrity Rules

The following business rules ensure data consistency.

- Email addresses must be unique.
- Users cannot send duplicate connection requests.
- Users cannot join the same crew twice.
- Crew membership cannot exceed the configured maximum.
- Every crew has exactly one organizer.
- Every meetup belongs to one crew.
- Users must join a conference before joining one of its crews.
- Users can only browse attendees within conferences they have joined.

---

# Future Enhancements

Future releases may introduce additional entities.

Examples include:

- Session
- Session Attendance
- Speaker
- Company
- Travel Group
- Mentor Program
- AI Recommendation
- QR Badge
- Reputation Score

---

# Key Design Decisions

- Messaging has been intentionally excluded from the MVP.
- Recommendations are generated using profile information rather than AI.
- User interests, conference goals, and networking preferences are treated as independent entities to support flexible matching.
- The conceptual model remains independent of PostgreSQL or Supabase implementation.

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
