# Business Rules & Non-Functional Requirements

> **Document ID:** DOC-009  
> **Role:** Business Analyst  
> **Supporting Roles:** Product Manager, Software Engineer, QA Engineer  
> **SDLC Phase:** Requirements Analysis  
> **Status:** Approved  
> **Version:** MVP v2.1

---

# Purpose

This document defines the business rules, operational constraints, and quality attributes that govern the ConCrew platform.

Unlike the Functional Requirements Specification (FRS), which defines **what the system does**, this document defines:

- Business policies
- Operational rules
- Product principles
- Performance expectations
- Security requirements
- System quality standards

These rules ensure consistent implementation across Product Management, Engineering, and Quality Assurance.

---

# Business Rules

## User Management

### BR-1 User Registration

Users must register and authenticate before accessing conference networking features.

---

### BR-2 Unique Accounts

Each email address may only be associated with one account.

---

### BR-3 Onboarding Is Not a Hard Gate

A new user is shown the Onboarding wizard (Conference Goals, Interests, Networking Preferences) once, immediately after first login, but may skip it. Skipping still marks onboarding complete. There is no required minimum of fields; a user who skips can still use the platform, though they will not appear in matching until they save a profile.

---

### BR-4 Profile Ownership

Users may edit only their own profile.

---

# Conference Rules

### BR-5 Conference Membership

Users must join a conference before viewing its attendees or participating in conference-specific activities.

---

### BR-6 Multiple Conferences

Users may join multiple conferences simultaneously.

---

### BR-7 Conference Administration

Conferences are currently added directly in the Supabase table editor. There is no administrator role or admin UI in the application yet.

---

# Attendee Discovery Rules

### BR-8 Recommendation Eligibility

Recommendations require the user to have saved a profile at least once, which generates the embedding used for matching. Completing Onboarding is not itself required.

---

### BR-9 Compatibility Factors

Recommendations rank attendees by profile-similarity (embedding) matching computed from saved profile content, not by scoring individual fields such as company, school, or years of experience.

---

### BR-10 Recommendation Transparency

Not currently implemented. Each recommendation shows an overall match percentage; it does not explain which specific factors contributed to that score.

---

# Connection Rules

### BR-11 Duplicate Requests

Users shall not send duplicate connection requests.

---

### BR-12 Connection Approval

Connections become active only after recipient approval.

---

### BR-13 Blocking

Not currently implemented. There is no way to block another user from sending a connection request.

---

# Crew Rules

### BR-14 Crew Ownership

The creator of a crew automatically becomes its owner. An owner may transfer ownership to another member, and may promote members to admin.

---

### BR-15 Crew Size

Not currently enforced by the system. A target range of 3 to 5 members is a design guideline, not a system-enforced cap.

---

### BR-16 Crew Membership

Users may participate in multiple crews for the same conference.

---

### BR-17 Join Requests

Public crews require an owner's or admin's approval of a join request. Private crews are joined only by invitation from an owner or admin; there is no public request-to-join path for a private crew.

---

### BR-18 Leaving a Crew

Members may leave at any time, after confirming in a dialog. An owner cannot leave until ownership has been transferred to another member; there is no automatic dissolution of a crew.

---

### BR-19 Deleting a Crew

Only the owner may delete a crew, after confirming in a dialog. Deleting removes the crew's members, join requests, invitations, and scheduled meetups.

---

# Meetup Rules

### BR-20 Meetup Creation

Only crew owners and admins may create crew meetups.

---

### BR-21 Meetup Visibility

Meetup details are visible only to crew members.

---

# Messaging & Notification Rules

### BR-22 Crew Chat Membership

Only current crew members may view or send messages in that crew's chat.

---

### BR-23 Notification Delivery

Notifications (connection requests, connection acceptances, crew join requests, crew invitations) are delivered live, without a page refresh. Resolving a request from one place (for example, the crew page) removes the corresponding notification everywhere else live.

---

# Product Principles

Every product decision should reinforce the following principles.

---

## PP-1

**Meaningful relationships over large networks.**

Quality of connections is more important than quantity.

---

## PP-2

**Small communities over large crowds.**

Networking should feel comfortable rather than overwhelming.

---

## PP-3

**Discovery before communication.**

Help users identify compatible attendees before encouraging conversations.

---

## PP-4

**Real conversations over digital conversations.**

The platform supports in-person networking rather than replacing it.

---

## PP-5

**The conference is the experience.**

ConCrew exists to improve conferences, not become the primary destination.

---

# Non-Functional Requirements

## Performance

### NFR-1

Primary pages shall load within **2 seconds** under normal operating conditions.

---

### NFR-2

Search and filtering shall return results within **1 second**.

---

### NFR-3

Attendee recommendations shall be generated within **3 seconds**.

---

## Availability

### NFR-4

The platform shall maintain **99% availability** during conference periods.

---

## Security

### NFR-5

Passwords shall never be stored in plain text.

---

### NFR-6

All communication shall use HTTPS.

---

### NFR-7

Users shall only access information they are authorized to view.

---

## Privacy

### NFR-8

Users control which profile fields are publicly visible.

---

### NFR-9

Personally identifiable information shall never be shared without user consent.

---

## Accessibility

### NFR-10

The platform should meet **WCAG 2.1 Level AA** guidelines where practical.

---

### NFR-11

Keyboard navigation shall be supported throughout the application.

---

## Usability

### NFR-12

New users should complete onboarding within **5 minutes**.

---

### NFR-13

Users should discover recommended attendees within **three interactions** after logging in.

---

### NFR-14

Navigation shall remain consistent throughout the application.

---

## Reliability

### NFR-15

Duplicate crew memberships shall be prevented.

---

### NFR-16

Temporary network interruptions should not result in data loss.

---

### NFR-17

Live updates (crew membership, join requests, notifications, messages) require the relevant table to be added to Supabase's `supabase_realtime` publication. This is a project-level configuration setting, not something the application code controls on its own.

---

## Scalability

### NFR-18

The system should support thousands of users across multiple conferences without significant performance degradation.

---

## Maintainability

### NFR-19

The application shall use a modular architecture to support future enhancements.

---

# Assumptions

The MVP assumes:

- Users already possess conference tickets.
- Conferences are administered directly through the database, not an admin UI.
- Most users access the application using mobile devices.
- Users are willing to provide professional profile information.
- Recommendations use profile-similarity (embedding-based) matching, not rule scoring.

---

# Constraints

The MVP is intentionally limited to:

- Mobile-first responsive web application
- Secure authentication
- Embedding-based recommendations without itemized reasoning
- Small conference crews, as a guideline rather than an enforced limit
- Networking before and during conferences

---

# Future Considerations

The following questions remain under evaluation.

- What is the ideal crew size, and should it become an enforced limit?
- Should users be limited to one crew?
- Which compatibility factors matter most for itemized match reasoning?
- Should owners and admins receive moderation tools?
- How much information should be visible before connecting?
- Should blocking be added?

---

# Traceability

This document supports:

- Functional Requirements Specification (DOC-008)
- User Stories (DOC-003)
- Data Model (DOC-010)
- QA Strategy (DOC-016)

---

# Key Decisions

- Onboarding, not a required Conference Preferences gate, feeds recommendations; skipping it is allowed.
- Discovery was prioritized first, though messaging and live notifications shipped earlier than planned once crew and connection flows needed them.
- Small crews are central to the product experience, but crew size is not currently enforced.
- Embedding-based recommendations replaced the originally planned rule-based approach.

---

## Revision History

| Version | Date | Author | Summary |
|----------|------|--------|---------|
| 1.0 | July 2026 | Tsadia Mabel | Initial document |
| 2.0 | July 2026 | Tsadia Mabel | Updated after product refinement and engineering planning |
| 2.1 | September 2026 | Tsadia Mabel | Corrected BR-3, BR-8 through BR-10, BR-13, and BR-15 to match what's built (onboarding is skippable, recommendations are embedding-based with no itemized reasoning, blocking and crew-size limits are not implemented); added BR-19 (Delete Crew), BR-22–BR-23 (Crew Chat, Notification Delivery), and NFR-17 (Realtime depends on the Supabase publication setting); removed the resolved "when should messaging be introduced" question; reversed the rule-based-recommendations assumption |
