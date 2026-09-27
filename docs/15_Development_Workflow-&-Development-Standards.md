# Engineering Workflow & Development Standards

> **Document ID:** DOC-015  
> **Primary Role:** Software Engineer  
> **Supporting Roles:** Product Manager, Business Analyst, QA Engineer  
> **SDLC Phase:** Development  
> **Status:** Approved  
> **Version:** MVP v2.1

---

# Purpose

This document defines the engineering workflow, development standards, Git strategy, AI-assisted development practices, and coding conventions used throughout the ConCrew project.

The objective is to ensure every feature is developed using a consistent, maintainable, and repeatable engineering process.

> **Note on this revision:** this version corrects the Project Structure section to match the folders actually used, and flags that the "Jira and GitHub remain synchronized" success criterion is not currently true. See the README's Known Gaps.

---

# Engineering Principles

Development follows five core principles.

## Deliver Value Incrementally

Each sprint should produce working software that delivers measurable user value.

---

## Keep It Simple

Prefer clear, maintainable solutions over unnecessary complexity.

---

## Build for Quality

Every feature should satisfy its acceptance criteria before completion.

---

## Document Along the Way

Documentation evolves with the software.

---

## AI Assists Engineering

AI accelerates development but never replaces engineering judgment.

---

# Engineering Workflow

Every Jira story follows the same workflow.

```text
Jira Story
      │
      ▼
Technical Design
      │
      ▼
AI-Assisted Implementation
      │
      ▼
Developer Review
      │
      ▼
Testing
      │
      ▼
Pull Request
      │
      ▼
Merge
      │
      ▼
Deployment
```

---

# Story Development Lifecycle

Every story progresses through the following steps.

## Step 1 — Understand the Story

Review:

- Story description
- Acceptance criteria
- Dependencies
- Related documentation

---

## Step 2 — Design the Solution

Determine:

- Components affected
- Database changes
- Business rules
- Existing reusable code

A server-side API layer does not exist yet, so "API endpoints" is not part of this step for most stories; see DOC-012 API Design for the target design.

---

## Step 3 — Implement the Feature

Use AI tools to accelerate implementation while following project standards.

Examples:

- Scaffold components
- Generate Supabase queries and RPC calls
- Create database migrations
- Build reusable UI components

---

## Step 4 — Review the Code

Every implementation must be:

- Understood
- Refactored if necessary
- Verified against requirements
- Checked for security concerns

No code is merged simply because it was AI-generated.

---

## Step 5 — Test the Feature

Verify:

- Acceptance criteria
- Error handling
- Edge cases
- Mobile responsiveness
- Accessibility
- Live/realtime behavior, where applicable (crew membership, join requests, notifications, messages)

---

## Step 6 — Commit Changes

Use meaningful Conventional Commits.

Examples

```text
feat(auth): add user registration

feat(onboarding): add compatibility wizard

feat(conference): join conference

feat(discovery): attendee recommendations

feat(crew): add crew chat

feat(realtime): enable supabase_realtime publication for crew tables

fix(crew-chat): retry membership check when isMember updates

refactor(api): simplify recommendation service
```

---

## Step 7 — Create Pull Request

Before requesting review:

- Rebase if necessary
- Resolve conflicts
- Confirm build succeeds

---

## Step 8 — Merge & Deploy

After approval:

- Merge into the main branch
- Verify deployment
- Update Jira
- Update documentation

---

# AI-Assisted Development

AI is used as an engineering assistant throughout the project.

## ChatGPT

Primary Responsibilities

- Product discussions
- Documentation
- User story refinement
- Architecture discussions
- Debugging assistance

---

## Claude Code

Primary Responsibilities

- Feature implementation
- Component generation
- Database implementation
- Refactoring
- Technical recommendations

---

## Codex

Primary Responsibilities

- Code generation
- Unit tests
- Refactoring
- Boilerplate
- Debugging

---

# AI Usage Guidelines

Developers remain responsible for:

- Understanding generated code
- Reviewing security
- Validating business rules
- Writing maintainable software
- Testing every implementation

AI-generated code must never bypass review.

---

# Git Workflow

The project uses a lightweight Git workflow.

```text
main
 │
 ├── feature/authentication
 ├── feature/onboarding
 ├── feature/profile
 ├── feature/conferences
 ├── feature/discovery
 ├── feature/connections
 ├── feature/crews
 ├── feature/messaging
 ├── feature/notifications
 └── feature/meetups
```

For a solo project, feature branches merge directly into `main` after testing. A long-lived `develop` branch is intentionally omitted to keep the workflow simple.

---

# Branch Naming

```text
feature/<feature-name>

bugfix/<bug-name>

hotfix/<issue>

refactor/<component>
```

---

# Pull Request Checklist

Before merging:

- Acceptance criteria complete
- Code reviewed
- No TypeScript errors
- No linting errors
- Responsive UI verified
- Documentation updated
- Jira story updated

Automated tests are not yet part of this checklist; testing is currently manual (see DOC-016 QA Strategy).

---

# Coding Standards

## General

- Use TypeScript throughout the project.
- Write readable code.
- Keep functions small.
- Avoid duplication.
- Prefer composition over inheritance.

---

## Components

Components should:

- Have one responsibility.
- Be reusable.
- Separate UI from business logic.

---

## Naming

Use descriptive names.

Examples

```text
ConferenceCard

CrewChat

CrewCard

ProfileForm

ConferenceList
```

Avoid generic names.

```text
Data

Thing

Item

TestComponent
```

---

## Functions

Functions should:

- Perform one task.
- Be predictable.
- Minimize side effects.
- Be easy to test.

---

# Project Structure

The project follows Next.js App Router conventions at the project root, without a `src/` wrapper:

```text
web/

├── app/
├── components/
├── lib/
└── public/
```

`features/`, `services/`, `hooks/`, `styles/`, `types/`, and `utils/` folders were planned but have not been introduced as separate top-level folders; shared logic currently lives alongside the pages and components that use it.

---

# Folder Responsibilities

| Folder | Purpose |
|----------|---------|
| app | Routes and layouts |
| components | Shared UI components, organized by area (for example, `layout/`, `crew/`) |
| lib | Supabase client and shared helpers |
| public | Static assets, including the logo |

---

# Environment Strategy

The project uses three environments.

| Environment | Purpose |
|-------------|---------|
| Development | Local development |
| Testing | QA verification |
| Production | Public deployment |

---

# Documentation Workflow

Every completed feature updates:

- Jira Story
- Sprint Board
- Technical Documentation
- Development Journal

Updating the GitHub Repository is part of this workflow, but has fallen behind for the features described throughout this document set; they exist locally and are documented as built, but have not all been pushed. See the README's Known Gaps.

---

# Development Journal Template

Each work session records:

- Date
- Sprint
- Jira Story
- Goal
- Work Completed
- AI Tools Used
- Challenges
- Lessons Learned
- Next Steps

---

# Engineering Success Criteria

Engineering is considered successful when:

- Acceptance criteria are satisfied.
- Code meets project standards.
- AI-generated code has been reviewed.
- Manual testing has passed (automated tests are not yet in place).
- Documentation is current.
- Jira and GitHub remain synchronized. *(Currently not true; the local build is ahead of the pushed repository.)*

---

# Related Documents

- DOC-011 System Architecture
- DOC-012 API Design
- DOC-013 Jira Backlog Structure
- DOC-014 Sprint Planning & Release Plan
- DOC-016 QA Strategy

---

# Key Decisions

- AI augments, but does not replace, software engineering.
- Every feature follows the same development workflow.
- Feature branches isolate work before merging.
- Documentation is maintained throughout development, though the GitHub push step is currently lagging.
- Engineering quality is prioritized over development speed.

---

## Revision History

| Version | Date | Author | Summary |
|----------|------|--------|---------|
| 1.0 | July 2026 | Tsadia Mabel | Initial engineering workflow |
| 2.0 | July 2026 | Tsadia Mabel | Refined after architecture, sprint planning, and AI-assisted development decisions |
| 2.1 | September 2026 | Tsadia Mabel | Removed a duplicated Engineering Workflow section; corrected Project Structure and Folder Responsibilities to the real App Router layout; removed "API endpoints" from Step 2 since no server-side API layer exists yet; flagged that automated tests are not part of the PR checklist yet; flagged that GitHub is currently behind the local build in the Documentation Workflow and Engineering Success Criteria sections |
