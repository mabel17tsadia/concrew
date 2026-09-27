# Quality Assurance Strategy

> **Document ID:** DOC-016  
> **Primary Role:** QA Engineer  
> **Supporting Roles:** Software Engineer, Product Manager  
> **SDLC Phase:** Testing  
> **Status:** Approved  
> **Version:** MVP v2.1

---

# Purpose

This document defines the Quality Assurance (QA) strategy for the ConCrew MVP.

The objective is to ensure that every feature satisfies its functional requirements, business rules, usability expectations, and quality standards before release.

Quality is treated as a continuous activity integrated throughout the Software Development Life Cycle (SDLC), rather than a phase performed only at the end of development.

> **Note on this revision:** the testing levels and roles below describe the intended strategy. As of this revision, testing has actually been manual and functional, done by the same person across every role described here; automated unit, integration, and end-to-end testing have not yet been implemented. See DOC-017 Test Cases for what has actually been exercised.

---

# Quality Objectives

The QA strategy aims to:

- Verify functional requirements.
- Validate Jira acceptance criteria.
- Detect defects early.
- Prevent regressions.
- Ensure a consistent user experience.
- Build confidence before production deployment.

---

# Quality Principles

The project follows several quality principles.

## Test Early

Testing begins during feature development.

---

## Test Continuously

Every completed story is tested before the next story begins.

---

## Test from the User's Perspective

Testing reflects realistic user behavior rather than ideal scenarios.

---

## Automate Repetitive Testing

Automated tests would reduce manual effort and improve consistency once introduced; none exist yet.

---

## Track Every Defect

Every confirmed defect is documented and resolved. A dedicated Jira defect workflow is planned; today, defects have been tracked directly against the story or through direct testing feedback (see DOC-017 Test Cases).

---

# Testing Strategy

Testing is intended at multiple levels, though only some are in practice today.

| Testing Level | Purpose | Status |
|---------------|---------|--------|
| Unit Testing | Verify individual functions and components | Not yet implemented |
| Integration Testing | Verify interactions between application components | Not yet implemented |
| End-to-End Testing | Validate complete user journeys | Not yet implemented |
| Manual Testing | Evaluate usability and user experience | In practice |
| Regression Testing | Ensure existing functionality remains stable | Manual, in practice |
| Acceptance Testing | Verify stories satisfy business requirements | Manual, in practice |
| Smoke Testing | Verify application readiness before deployment | Manual, in practice |

```text
Software Development
        │
        ▼
Manual Verification (Developer)
        │
        ▼
Functional Testing (QA role)
        │
        ▼
Acceptance Testing (Product Owner role)
        │
        ▼
Regression Testing (QA role)
        │
        ▼
Smoke Testing
        │
        ▼
Production Release
```

---

# Testing Responsibilities

On a solo project, one person performs all of the following roles.

## Software Engineer

Responsible for:

- Manual local verification
- Fixing identified defects
- Supporting integration testing (once automated tests exist)

---

## QA Engineer

Responsible for:

- Functional testing
- Regression testing
- Acceptance testing
- Defect reporting
- Release readiness assessment

---

## Product Owner

Responsible for:

- Acceptance validation
- Business requirement verification
- Final release approval

---

# Functional Testing

Every implemented feature is validated against the Functional Requirements Specification.

Core MVP features include:

- Authentication
- Onboarding
- User Profiles
- Conference Discovery (Upcoming / Past)
- Attendee Discovery, Search & Filters
- Recommendations (profile-similarity match percentage)
- Connections
- Conference Crews, including Crew Management and Crew Chat
- Meetups
- Direct Messaging
- Live Notifications

---

# Non-Functional Testing

The QA process also evaluates system quality attributes.

## Performance

Verify:

- Page load time
- Search responsiveness
- Recommendation performance

---

## Security

Verify:

- Authentication
- Authorization
- Session handling
- Input validation

---

## Realtime Behavior

Verify:

- Crew membership and join-request updates appear live, without a refresh
- Notifications and messages arrive live
- The relevant tables remain enabled in the `supabase_realtime` publication

---

## Accessibility

Verify:

- Keyboard navigation
- Visible focus indicators
- Color contrast
- Screen reader compatibility where practical

---

## Responsive Design

Verify functionality across:

- Mobile devices
- Tablets
- Desktop browsers

---

# Test Environments

| Environment | Purpose |
|-------------|---------|
| Development | Local development and developer testing |
| Testing | QA verification |
| Production | Final post-deployment validation |

---

# Defect Management

Every confirmed defect is tracked.

## Severity Levels

| Severity | Description |
|----------|-------------|
| Critical | Application unusable |
| High | Major functionality unavailable |
| Medium | Feature behaves incorrectly |
| Low | Cosmetic or minor usability issue |

---

## Priority Levels

| Priority | Description |
|----------|-------------|
| P1 | Immediate fix required |
| P2 | Required before release |
| P3 | Fix as capacity allows |
| P4 | Future improvement |

---

# Release Readiness Criteria

The MVP is ready for release when:

- All P1 defects are resolved.
- All P2 defects are resolved.
- MVP acceptance criteria are satisfied.
- Smoke testing passes.
- Critical end-to-end user journeys succeed.
- Documentation is complete.
- The local build has been pushed to GitHub, so the deployed and documented product match.
- Product Owner approves the release.

---

# QA Deliverables

The QA process produces the following artifacts.

- Test Plan
- Test Cases
- Bug Reports
- Regression Test Results
- Sprint QA Reports
- Release Readiness Report

---

# Testing Workflow

```text
Jira Story
      │
      ▼
Development Complete
      │
      ▼
Functional Testing
      │
      ▼
Defect Found?
      │
 ┌────┴────┐
 │         │
Yes        No
 │         │
 ▼         ▼
Create Bug Acceptance Testing
 │         │
 ▼         ▼
Fix Issue Regression Testing
 │         │
 └────┬────┘
      ▼
 Release Ready
```

---

# AI-Assisted Quality Assurance

AI tools may assist with:

- Test case generation
- Edge case discovery
- Automated test creation (planned, not yet built)
- Playwright test generation (planned, not yet built)
- Failure analysis

AI has already been used during this project to diagnose real defects, for example tracing the crew-realtime and notification-bell bugs back to tables missing from the `supabase_realtime` publication.

Engineering and QA remain responsible for:

- Reviewing generated tests
- Verifying correctness
- Confirming business requirements
- Making release decisions

---

# Quality Metrics

The following metrics are monitored throughout development.

| Metric | Purpose |
|---------|---------|
| Story Acceptance Rate | Measures successful feature delivery |
| Test Pass Rate | Measures testing success (currently based on manual testing) |
| Bugs Found per Sprint | Measures product quality |
| Bugs Resolved per Sprint | Measures defect resolution |
| Regression Failures | Measures system stability |
| Sprint Completion Rate | Measures delivery consistency |

---

# Related Documents

- DOC-008 Functional Requirements
- DOC-013 Jira Backlog Structure
- DOC-014 Sprint Planning & Release Plan
- DOC-015 Engineering Workflow
- DOC-017 Test Cases & Bug Log

---

# Key Decisions

- Quality is everyone's responsibility.
- Testing is integrated into every sprint.
- Automated testing is the target, not yet the practice; testing so far has been manual and functional.
- Defects are tracked against their story until a dedicated defect workflow is introduced.
- AI supports, but does not replace, QA judgment, and has already helped diagnose real production-style defects during development.

---

## Revision History

| Version | Date | Author | Summary |
|----------|------|--------|---------|
| 1.0 | July 2026 | Tsadia Mabel | Initial QA strategy |
| 2.0 | July 2026 | Tsadia Mabel | Refined to align with sprint-based delivery and engineering workflow |
| 2.1 | September 2026 | Tsadia Mabel | Marked which testing levels are actually in practice versus still planned; corrected the Core MVP Features list to include Onboarding, Crew Management, Crew Chat, and Messaging; added a Realtime Behavior non-functional testing section; added the GitHub push to Release Readiness Criteria; reversed the "automated testing is used" decision to reflect current manual-only testing |
