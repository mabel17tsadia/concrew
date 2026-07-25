# Business Rules & Non-Functional Requirements

> **Document ID:** DOC-009  
> **Role:** Business Analyst  
> **Supporting Roles:** Product Manager, Software Engineer, QA Engineer  
> **SDLC Phase:** Requirements Analysis  
> **Status:** Approved  
> **Version:** MVP v2.0

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

### BR-3 Profile Completion

Users must complete their professional profile and conference preferences before attendee recommendations are generated.

Required information includes:

- Job Title
- Company
- City
- At least one professional interest
- At least one conference goal

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

Only administrators may create, edit, or remove conferences.

---

# Attendee Discovery Rules

### BR-8 Recommendation Eligibility

Recommendations are generated only after conference preferences have been completed.

---

### BR-9 Compatibility Factors

Recommendations may consider:

- Professional interests
- Conference goals
- Networking preferences
- Company
- School
- City
- Planned sessions
- Years of experience

---

### BR-10 Recommendation Transparency

Every recommendation must explain why it was generated.

Example:

- Shared AI interests
- Same conference
- Similar networking goals
- First-time attendee

---

# Connection Rules

### BR-11 Duplicate Requests

Users shall not send duplicate connection requests.

---

### BR-12 Connection Approval

Connections become active only after recipient approval.

---

### BR-13 Blocking

Blocked users may not send connection requests.

---

# Crew Rules

### BR-14 Crew Ownership

The creator of a crew automatically becomes its organizer.

---

### BR-15 Crew Size

Conference crews shall contain a maximum of **5 members**, including the organizer.

This value may change following user research.

---

### BR-16 Crew Membership

Users may participate in multiple crews for the same conference.

This assumption will be validated during usability testing.

---

### BR-17 Join Requests

Private crews require organizer approval.

---

### BR-18 Leaving a Crew

Members may leave at any time.

If the organizer leaves:

- Ownership transfers to another member, or
- The crew is dissolved.

---

# Meetup Rules

### BR-19 Meetup Creation

Only crew organizers may create official crew meetups.

---

### BR-20 Meetup Visibility

Meetup details are visible only to crew members.

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

ConCrew exists to improve conferences—not become the primary destination.

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

## Scalability

### NFR-17

The system should support thousands of users across multiple conferences without significant performance degradation.

---

## Maintainability

### NFR-18

The application shall use a modular architecture to support future enhancements.

---

# Assumptions

The MVP assumes:

- Users already possess conference tickets.
- Conferences are administered by platform administrators.
- Most users access the application using mobile devices.
- Users are willing to provide professional profile information.
- Recommendations are initially rule-based.

---

# Constraints

The MVP is intentionally limited to:

- Mobile-first responsive web application
- Secure authentication
- Rule-based recommendations
- Small conference crews
- Networking before and during conferences

---

# Future Considerations

The following questions remain under evaluation.

- What is the ideal crew size?
- Should users be limited to one crew?
- When should messaging be introduced?
- Which compatibility factors matter most?
- Should organizers receive moderation tools?
- How much information should be visible before connecting?

---

# Traceability

This document supports:

- Functional Requirements Specification (DOC-008)
- User Stories (DOC-003)
- Data Model (DOC-010)
- QA Strategy (DOC-016)

---

# Key Decisions

- Conference Preferences drive recommendations.
- Discovery is prioritized over messaging.
- Small crews are central to the product experience.
- Rule-based recommendations are sufficient for MVP validation.

---

## Revision History

| Version | Date | Author | Summary |
|----------|------|--------|---------|
| 1.0 | July 2026 | Tsadia Mabel | Initial document |
| 2.0 | July 2026 | Tsadia Mabel | Updated after product refinement and engineering planning |
