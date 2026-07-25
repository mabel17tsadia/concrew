# API Design Specification

> **Document ID:** DOC-012  
> **Role:** Software Engineer  
> **Supporting Roles:** Business Analyst, Product Manager, QA Engineer  
> **SDLC Phase:** Solution Design  
> **Status:** Approved  
> **Version:** MVP v1.0

---

# Purpose

This document defines the REST API for the ConCrew MVP.

The API provides communication between the frontend application and backend services while enforcing business rules, authentication, and authorization.

This specification is technology-independent and describes the behavior expected from every endpoint.

---

# API Principles

The API follows several guiding principles.

## Simplicity

Only expose endpoints required for the MVP.

---

## RESTful Design

Resources are represented using predictable REST endpoints.

---

## Consistency

Every endpoint follows consistent request and response patterns.

---

## Security

Protected resources require authenticated access.

---

## Scalability

The API should support future expansion without breaking existing clients.

---

# High-Level API Flow

```text
User
    │
    ▼
Next.js Frontend
    │
 HTTPS Requests
    │
    ▼
REST API
    │
    ▼
Supabase Services
    │
    ▼
PostgreSQL
```

---

# Authentication

Authentication is handled using Supabase Auth.

Authentication flow:

```text
Register

↓

Login

↓

JWT Session

↓

Authenticated Requests

↓

Protected Resources
```

---

# API Resources

The MVP exposes the following resources.

| Resource | Description |
|-----------|-------------|
| Users | User profiles |
| Conferences | Conferences |
| User Conferences | Conference membership |
| Interests | Professional interests |
| Goals | Conference goals |
| Preferences | Networking preferences |
| Recommendations | Compatible attendees |
| Connections | Professional connections |
| Crews | Networking crews |
| Meetups | Crew meetups |
| Notifications | User notifications |

---

# Authentication Endpoints

## Register

**POST**

```text
/api/auth/register
```

Creates a new account.

---

## Login

**POST**

```text
/api/auth/login
```

Authenticates an existing user.

---

## Logout

**POST**

```text
/api/auth/logout
```

Terminates the current session.

---

## Password Reset

**POST**

```text
/api/auth/reset-password
```

Initiates password recovery.

---

# User Endpoints

## Get Current User

**GET**

```text
/api/users/me
```

Returns the authenticated user's profile.

---

## Update Profile

**PATCH**

```text
/api/users/me
```

Updates profile information.

---

## View Public Profile

**GET**

```text
/api/users/{id}
```

Returns public profile information.

Privacy rules apply.

---

# Conference Endpoints

## Browse Conferences

```text
GET /api/conferences
```

---

## Conference Details

```text
GET /api/conferences/{id}
```

---

## Join Conference

```text
POST /api/conferences/{id}/join
```

---

## Leave Conference

```text
DELETE /api/conferences/{id}/leave
```

---

## View Conference Attendees

```text
GET /api/conferences/{id}/attendees
```

---

# Discovery Endpoints

## Browse People

```text
GET /api/conferences/{id}/attendees
```

---

## Search People

```text
GET /api/conferences/{id}/attendees/search
```

Supported parameters:

- name
- company
- school
- city
- jobTitle

---

## Filter People

```text
GET /api/conferences/{id}/attendees/filter
```

Supported filters:

- interests
- goals
- networkingPreferences
- sessions

---

## Recommendations

```text
GET /api/conferences/{id}/recommendations
```

Returns personalized attendee recommendations.

Each recommendation includes:

- User summary
- Compatibility explanation
- Match reasons

---

# Connection Endpoints

## Send Request

```text
POST /api/connections
```

---

## View Connections

```text
GET /api/connections
```

---

## Update Request

```text
PATCH /api/connections/{id}
```

Supported statuses:

- accepted
- declined

---

## Remove Connection

```text
DELETE /api/connections/{id}
```

---

# Crew Endpoints

## Create Crew

```text
POST /api/crews
```

---

## View Crews

```text
GET /api/crews
```

---

## Crew Details

```text
GET /api/crews/{id}
```

---

## Join Crew

```text
POST /api/crews/{id}/join
```

---

## Leave Crew

```text
POST /api/crews/{id}/leave
```

---

## Invite Member

```text
POST /api/crews/{id}/invite
```

---

# Meetup Endpoints

## Create Meetup

```text
POST /api/crews/{id}/meetups
```

---

## View Meetups

```text
GET /api/crews/{id}/meetups
```

---

## Notification Endpoints

## View Notifications

```text
GET /api/notifications
```

---

## Mark Notification Read

```text
PATCH /api/notifications/{id}/read
```

---

## Mark All Read

```text
PATCH /api/notifications/read-all
```

---

# Standard Response Format

Successful responses should return:

```json
{
  "success": true,
  "data": {}
}
```

---

Errors should return:

```json
{
  "success": false,
  "error": {
    "code": "CREW_FULL",
    "message": "The selected crew has reached its maximum capacity."
  }
}
```

---

# Common Error Codes

| Code | Description |
|------|-------------|
| UNAUTHORIZED | Authentication required |
| FORBIDDEN | Insufficient permissions |
| NOT_FOUND | Resource not found |
| VALIDATION_ERROR | Invalid request |
| DUPLICATE_REQUEST | Request already exists |
| CREW_FULL | Maximum members reached |
| ALREADY_MEMBER | User already belongs |
| SERVER_ERROR | Unexpected server error |

---

# Authorization Rules

The API shall enforce:

- Users edit only their own profiles.
- Users join only valid conferences.
- Private crew information is visible only to members.
- Duplicate connection requests are rejected.
- Crew capacity rules are enforced.

---

# API Versioning

Current Version

```text
v1
```

Future versions may introduce:

```text
/api/v2/
```

while maintaining backward compatibility.

---

# Future Endpoints

Future releases may introduce:

- Messaging
- AI Recommendations
- Session Planning
- Calendar Integration
- QR Networking

---

# Related Documents

- DOC-008 Functional Requirements
- DOC-009 Business Rules
- DOC-010 Data Model
- DOC-011 System Architecture

---

# Key Decisions

- REST architecture selected for simplicity.
- Rule-based recommendations remain server-side.
- Messaging excluded from MVP.
- Authentication handled by Supabase.
- Responses follow a consistent format.

---

# API Sequence Diagram (Runtime behavior)

```User
 │
 │ Login
 ▼
Frontend
 │
 │ POST /api/auth/login
 ▼
Supabase Auth
 │
 │ JWT Token
 ▼
Frontend
 │
 │ GET /api/conferences
 ▼
API
 │
 │ Query
 ▼
PostgreSQL
 │
 │ Data
 ▼
Frontend
```
---

## Revision History

| Version | Date | Author | Summary |
|----------|------|--------|---------|
| 1.0 | July 2026 | Tsadia Mabel | Initial API specification |
| 2.0 | July 2026 | Tsadia Mabel | Updated after MVP refinement and architecture review |
