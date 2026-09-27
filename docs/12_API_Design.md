# API Design Specification

> **Document ID:** DOC-012  
> **Role:** Software Engineer  
> **Supporting Roles:** Business Analyst, Product Manager, QA Engineer  
> **SDLC Phase:** Solution Design  
> **Status:** Approved (Target Design, Not Yet Implemented)  
> **Version:** MVP v2.1

---

# Purpose

This document defines the REST API for the ConCrew MVP.

The API provides communication between the frontend application and backend services while enforcing business rules, authentication, and authorization.

This specification is technology-independent and describes the behavior expected from every endpoint.

> **Note on this revision:** as of this revision, none of the REST endpoints below have been built. The application queries Supabase's PostgreSQL tables directly from the client, using Supabase's auto-generated data API and a small number of database functions (`match_profiles` for recommendations, `get_or_create_crew_conversation` for crew chat), secured by Row-Level Security rather than by a custom API layer. This document remains the target design for the server-side API layer described in the Roadmap and System Architecture documents (planned once AI features need server-side logic), and has been updated to describe the right endpoints for what the product actually does today, even though none of them exist yet.

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
REST API (planned)
    │
    ▼
Supabase Services
    │
    ▼
PostgreSQL
```

Today, the "REST API" box above does not exist; the frontend calls Supabase directly in its place.

---

# Authentication

Authentication is handled using Supabase Auth.

Authentication flow:

```text
Register

↓

Login (redirects to Onboarding if incomplete)

↓

JWT Session

↓

Authenticated Requests

↓

Protected Resources
```

---

# API Resources

The MVP is designed around the following resources.

| Resource | Description |
|-----------|-------------|
| Users / Profiles | User profiles, including Conference Goals, Interests, and Networking Preferences |
| Conferences | Conferences |
| Conference Attendees | Conference membership |
| Recommendations | Compatible attendees, ranked by profile-similarity |
| Connections | Professional connections |
| Crews | Networking crews |
| Crew Members | Crew membership and roles |
| Crew Join Requests | Pending public-crew join requests |
| Crew Invitations | Pending private-crew invitations |
| Meetups | Crew meetups |
| Conversations / Messages | Direct and crew messaging |
| Notifications | User notifications |

Interests, Goals, and Networking Preferences are not separate resources; they are fields on the Profile resource (see Data Model).

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

# User / Profile Endpoints

## Get Current User

**GET**

```text
/api/users/me
```

Returns the authenticated user's profile, including onboarding status.

---

## Complete Onboarding

**PATCH**

```text
/api/users/me/onboarding
```

Sets Conference Goals, Interests, Networking Preferences, and marks onboarding complete. Also used to record a skip.

---

## Update Profile

**PATCH**

```text
/api/users/me
```

Updates profile information. Triggers regeneration of the profile embedding used for recommendations.

---

## View Public Profile

**GET**

```text
/api/users/{id}
```

Returns public profile information, including shared conferences and mutual crews with the requester.

Privacy rules apply.

---

# Conference Endpoints

## Browse Conferences

```text
GET /api/conferences
```

Supports an `upcoming` or `past` filter.

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
- jobTitle

---

## Filter People

```text
GET /api/conferences/{id}/attendees/filter
```

Supported filters:

- company
- school
- city
- jobTitle
- interests
- networkingPreferences

Filtering by Conference Goals, Skills, or Years of Experience is not yet supported by the underlying feature.

---

## Recommendations

```text
GET /api/people/recommendations
```

Returns personalized attendee recommendations, ranked by profile-similarity matching.

Each recommendation includes:

- User summary
- Match percentage

Itemized compatibility reasoning is not yet part of the underlying feature and is not returned.

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

## Join Crew (public)

```text
POST /api/crews/{id}/join-requests
```

Submits a join request for a public crew.

---

## Respond to Join Request

```text
PATCH /api/crews/{id}/join-requests/{requestId}
```

Owner or admin only. Supported statuses: `approved`, `declined`.

---

## Invite Member (private crew)

```text
POST /api/crews/{id}/invitations
```

Owner or admin only.

---

## Revoke Invitation

```text
DELETE /api/crews/{id}/invitations/{invitationId}
```

---

## Update Member Role

```text
PATCH /api/crews/{id}/members/{userId}
```

Owner only. Used to promote to admin, demote, or transfer ownership.

---

## Remove Member

```text
DELETE /api/crews/{id}/members/{userId}
```

Owner or admin only.

---

## Leave Crew

```text
POST /api/crews/{id}/leave
```

Rejected for the current owner until ownership has been transferred.

---

## Update Crew (visibility, description)

```text
PATCH /api/crews/{id}
```

Owner or admin only.

---

## Delete Crew

```text
DELETE /api/crews/{id}
```

Owner only.

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

# Messaging Endpoints

## View Conversations

```text
GET /api/conversations
```

Returns direct conversations with a preview of the latest message.

---

## Get or Create Crew Conversation

```text
GET /api/crews/{id}/conversation
```

Returns the crew's chat conversation, creating it on first access. Restricted to current crew members.

---

## View Messages

```text
GET /api/conversations/{id}/messages
```

---

## Send Message

```text
POST /api/conversations/{id}/messages
```

---

# Notification Endpoints

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

# Realtime Behavior

None of the endpoints above push updates on their own. In the current implementation, and in this target design, live updates for crew membership, join requests, notifications, and messages are delivered through Supabase Realtime subscriptions over `postgres_changes`, not by polling these endpoints. A table must be added to the `supabase_realtime` publication for its changes to be delivered this way; this is a project-level setting, not something the API or its clients configure per request.

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
    "code": "DUPLICATE_REQUEST",
    "message": "A connection request already exists for this user."
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
| ALREADY_MEMBER | User already belongs |
| NOT_A_MEMBER | Action requires crew membership |
| SERVER_ERROR | Unexpected server error |

`CREW_FULL` has been removed: crew capacity is not currently enforced.

---

# Authorization Rules

The API shall enforce:

- Users edit only their own profiles.
- Users join only valid conferences.
- Private crew information, including its chat, is visible only to members.
- Duplicate connection requests are rejected.
- Only an owner or admin manages crew membership and settings.
- Only an owner deletes a crew or transfers ownership.

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

- Itemized "why you matched" recommendation reasoning
- AI conference sourcing and review-queue endpoints
- Session Planning
- Calendar Integration
- QR Networking

Messaging is not listed here since it is already part of the product, just not yet served through a formal REST layer.

---

# Related Documents

- DOC-008 Functional Requirements
- DOC-009 Business Rules
- DOC-010 Data Model
- DOC-011 System Architecture

---

# Key Decisions

- REST architecture selected for simplicity, as the target design once a server-side layer is introduced.
- Recommendations use profile-similarity (embedding-based) matching, computed by a database function rather than application code.
- Messaging is part of the MVP, implemented today directly against Supabase tables rather than through this API design.
- Authentication handled by Supabase.
- Responses follow a consistent format.
- Live updates are delivered through Supabase Realtime, not through endpoint polling.

---

# API Sequence Diagram (Runtime behavior)

```text
User
 │
 │ Login
 ▼
Frontend
 │
 │ Supabase Auth sign-in (no /api/auth/login exists yet)
 ▼
Supabase Auth
 │
 │ JWT Token
 ▼
Frontend
 │
 │ Supabase client query (no GET /api/conferences exists yet)
 ▼
PostgreSQL (via Supabase)
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
| 2.1 | September 2026 | Tsadia Mabel | Flagged that no REST endpoints have been built; the client queries Supabase directly. Removed Interest/Goal/Preference as separate resources; corrected Recommendations to match-percentage only; added Crew Join Request, Crew Invitation, Messaging, and crew-management endpoints; removed CREW_FULL; reversed the rule-based and messaging-excluded decisions; updated the sequence diagram and Future Endpoints to match reality |
