# Test Cases & Bug Log

> **Document ID:** DOC-017  
> **Primary Role:** QA Engineer  
> **Supporting Roles:** Software Engineer, Product Manager  
> **SDLC Phase:** Testing & Validation  
> **Status:** Living Document  
> **Version:** MVP v2.0

---

# Purpose

This document records the test cases executed for the ConCrew MVP and tracks defects discovered during development.

It provides traceability between business requirements, functional requirements, implementation, and validation to ensure every MVP feature is verified before release.

---

# Test Strategy

Every functional requirement should have one or more associated test cases.

Each test case verifies:

- Functional behavior
- Acceptance criteria
- Expected user experience
- Error handling
- Business rules

---

# Test Case Status

| Status | Description |
|---------|-------------|
| Not Started | Test has not been executed |
| Passed | Test completed successfully |
| Failed | Expected result not achieved |
| Blocked | Cannot execute due to dependency |

---

# Test Case Template

| Field | Description |
|---------|-------------|
| Test Case ID | Unique identifier |
| Feature | Feature under test |
| Requirement | Functional Requirement reference |
| Preconditions | Required setup |
| Test Steps | Actions performed |
| Expected Result | Expected system behavior |
| Actual Result | Actual outcome |
| Status | Current execution status |

---

# Functional Test Cases

## TC-001 — User Registration

| Field | Value |
|--------|-------|
| Requirement | FR-1.1 |
| Feature | User Registration |
| Preconditions | User is not authenticated |
| Steps | Open Register → Enter valid details → Submit |
| Expected Result | Account successfully created |
| Actual Result | — |
| Status | Not Started |

---

## TC-002 — User Login

| Field | Value |
|--------|-------|
| Requirement | FR-1.3 |
| Feature | Login |
| Preconditions | Existing account |
| Steps | Enter credentials → Login |
| Expected Result | Dashboard loads successfully |
| Actual Result | — |
| Status | Not Started |

---

## TC-003 — Join Conference

| Field | Value |
|--------|-------|
| Requirement | FR-3.2 |
| Feature | Conference Membership |
| Preconditions | User authenticated |
| Steps | Browse conferences → Join conference |
| Expected Result | Conference appears in user's joined conferences |
| Actual Result | — |
| Status | Not Started |

---

## TC-004 — Browse Recommendations

| Field | Value |
|--------|-------|
| Requirement | FR-4.4 |
| Feature | Recommendations |
| Preconditions | User completed conference preferences and joined a conference |
| Steps | Open Browse People |
| Expected Result | Recommended attendees displayed with match reasons |
| Actual Result | — |
| Status | Not Started |

---

## TC-005 — Send Connection Request

| Field | Value |
|--------|-------|
| Requirement | FR-5.1 |
| Feature | Connections |
| Preconditions | Recommendation displayed |
| Steps | Open profile → Select Connect |
| Expected Result | Connection request successfully created |
| Actual Result | — |
| Status | Not Started |

---

## TC-006 — Create Crew

| Field | Value |
|--------|-------|
| Requirement | FR-6.1 |
| Feature | Crews |
| Preconditions | User joined conference |
| Steps | Create crew → Complete form → Submit |
| Expected Result | Crew successfully created |
| Actual Result | — |
| Status | Not Started |

---

## TC-007 — Join Crew

| Field | Value |
|--------|-------|
| Requirement | FR-6.2 |
| Feature | Crew Membership |
| Preconditions | Crew available |
| Steps | Request to join crew |
| Expected Result | Membership request submitted |
| Actual Result | — |
| Status | Not Started |

---

## TC-008 — Leave Crew

| Field | Value |
|--------|-------|
| Requirement | FR-6.2 |
| Feature | Crew Membership |
| Preconditions | User belongs to a crew |
| Steps | Select Leave Crew |
| Expected Result | User removed from crew |
| Actual Result | — |
| Status | Not Started |

---

## TC-009 — Create Meetup

| Field | Value |
|--------|-------|
| Requirement | FR-7.1 |
| Feature | Meetups |
| Preconditions | User is crew organizer |
| Steps | Create meetup |
| Expected Result | Meetup successfully scheduled |
| Actual Result | — |
| Status | Not Started |

---

# Requirement Traceability Matrix

| Requirement | Test Case |
|-------------|-----------|
| FR-1.1 | TC-001 |
| FR-1.3 | TC-002 |
| FR-3.2 | TC-003 |
| FR-4.4 | TC-004 |
| FR-5.1 | TC-005 |
| FR-6.1 | TC-006 |
| FR-6.2 | TC-007, TC-008 |
| FR-7.1 | TC-009 |

```Functional Requirements
          │
          ▼
      Test Cases
          │
          ▼
   Test Execution
          │
          ▼
      Bug Reports
          │
          ▼
      Bug Fixes
          │
          ▼
    Regression Tests
          │
          ▼
    Release Approval
```
---

# Bug Management

Every confirmed defect is tracked in Jira and summarized below.

---

## Bug Status

| Status |
|---------|
| Open |
| In Progress |
| Ready for Testing |
| Closed |
| Deferred |

---

## Bug Severity

| Severity | Description |
|-----------|-------------|
| Critical | Application unusable |
| High | Major feature unavailable |
| Medium | Feature partially functional |
| Low | Cosmetic or minor issue |

---

## Bug Priority

| Priority | Description |
|----------|-------------|
| P1 | Immediate fix |
| P2 | Required before release |
| P3 | Scheduled improvement |
| P4 | Future enhancement |

---

# Bug Report Template

| Field | Description |
|---------|-------------|
| Bug ID | Unique identifier |
| Title | Brief summary |
| Environment | Development / Testing / Production |
| Build Version | Version tested |
| Severity | Critical / High / Medium / Low |
| Priority | P1–P4 |
| Preconditions | Required setup |
| Steps to Reproduce | Reproduction steps |
| Expected Result | Expected behavior |
| Actual Result | Observed behavior |
| Root Cause | Investigation summary |
| Resolution | Fix implemented |
| Status | Current lifecycle |

---

# Bug Log

| Bug ID | Title | Severity | Priority | Status |
|---------|-------|----------|----------|--------|
| BUG-001 | Unable to join crew after invitation acceptance | High | P1 | Open |
| BUG-002 | Profile image upload fails | Medium | P2 | Open |
| BUG-003 | Duplicate connection request allowed | High | P1 | Open |
| BUG-004 | Recommendation list not refreshing | Medium | P2 | Open |
| BUG-005 | Conference search ignores selected filters | Low | P3 | Open |

---

# QA Metrics

The following metrics are monitored during development.

| Metric | Target |
|----------|---------|
| Test Cases Executed | 100% |
| Test Pass Rate | ≥95% |
| Critical Defects | 0 |
| High Priority Defects | 0 before release |
| Regression Failures | 0 |
| Story Acceptance Rate | 100% |

---

# Release Readiness Checklist

The MVP is ready for release when:

- All planned test cases have been executed.
- All Critical defects are resolved.
- All High priority defects are resolved.
- Smoke testing passes.
- Regression testing passes.
- Documentation is complete.
- Product Owner approves the release.

---

# Related Documents

- DOC-008 Functional Requirements
- DOC-013 Jira Backlog Structure
- DOC-014 Sprint Planning & Release Plan
- DOC-015 Engineering Workflow
- DOC-016 Quality Assurance Strategy

---

# Key Decisions

- Every functional requirement must be traceable to at least one test case.
- Every confirmed defect is tracked in Jira.
- Release decisions are based on objective quality metrics.
- QA documentation is updated throughout the project lifecycle.

---

## Revision History

| Version | Date | Author | Summary |
|----------|------|--------|---------|
| 1.0 | July 2026 | Tsadia Mabel | Initial test cases and bug log |
| 2.0 | July 2026 | Tsadia Mabel | Added traceability matrix, QA metrics, and release readiness checklist |
