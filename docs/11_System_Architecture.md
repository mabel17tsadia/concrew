# System Architecture & Technology Stack

> **Document ID:** DOC-011  
> **Role:** Software Engineer / Software Architect  
> **Supporting Roles:** Product Manager, Business Analyst, QA Engineer  
> **SDLC Phase:** Solution Design  
> **Status:** Approved  
> **Version:** MVP v2.0

---

# Purpose

This document defines the overall architecture of the ConCrew MVP.

It describes:

- System architecture
- Engineering principles
- Technology choices
- Component responsibilities
- Development workflow
- Deployment strategy

This document serves as the technical blueprint for implementation.

---

# Architecture Philosophy

ConCrew follows one simple engineering philosophy:

> **Keep the architecture simple until the product proves it needs to become more complex.**

The MVP is intentionally designed as a **modular monolith**.

Rather than introducing distributed systems or microservices, the application prioritizes:

- Simplicity
- Fast iteration
- Maintainability
- Developer productivity

---

# High-Level System Architecture

```text
                        User
                          │
                          ▼
               Next.js Web Application
                          │
         ┌────────────────┼────────────────┐
         │                │                │
         ▼                ▼                ▼
 Authentication   Business Logic   Recommendation Engine
         │                │                │
         └────────────────┼────────────────┘
                          │
                          ▼
                   Supabase Backend
                          │
          ┌───────────────┴──────────────┐
          ▼                              ▼
    Supabase Auth                 PostgreSQL Database
```

---

# Architecture Layers

The application consists of four logical layers.

---

## 1. Presentation Layer

Responsible for:

- Rendering UI
- Navigation
- Forms
- User interaction
- Responsive layouts

Technology

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

---

## 2. Business Logic Layer

Responsible for implementing business rules.

Examples:

- Recommendation logic
- Crew rules
- Conference rules
- Validation
- Authorization

---

## 3. Service Layer

Responsible for communication between the application and backend services.

Examples:

- Authentication
- Database access
- Notifications
- API requests

---

## 4. Data Layer

Responsible for persistent storage.

Technology

- PostgreSQL
- Supabase

Stores:

- Users
- Conferences
- Preferences
- Interests
- Connections
- Crews
- Meetups
- Notifications

---

# Technology Stack

## Frontend

| Technology | Purpose |
|------------|---------|
| Next.js | Full-stack React framework |
| React | Component architecture |
| TypeScript | Static typing |
| Tailwind CSS | Utility-first styling |
| shadcn/ui | Accessible UI components |

---

## Backend

| Technology | Purpose |
|------------|---------|
| Supabase | Backend platform |
| PostgreSQL | Relational database |
| Supabase Auth | Authentication |
| Row-Level Security | Authorization |

---

## Infrastructure

| Technology | Purpose |
|------------|---------|
| Vercel | Frontend hosting |
| GitHub | Version control |
| Jira | Agile planning |

---

## AI-Assisted Development

| Tool | Purpose |
|------|---------|
| Claude Code | Feature implementation |
| Codex | Code generation & debugging |
| ChatGPT | Product planning & documentation |

---

# Architecture Decisions

---

## ADR-001

### Use a Modular Monolith

Decision

The MVP will be implemented as a modular monolithic application.

Reason

- Easier to build
- Easier to deploy
- Easier to debug
- Appropriate for a solo developer
- Faster iteration

---

## ADR-002

### Use Next.js

Decision

Use Next.js as the primary application framework.

Reason

- Server-side rendering
- API Routes
- Excellent React ecosystem
- Easy deployment on Vercel

---

## ADR-003

### Use Supabase

Decision

Supabase provides authentication and database services.

Reason

- Rapid MVP development
- PostgreSQL
- Authentication built-in
- Row-Level Security
- Easy deployment

---

## ADR-004

### Rule-Based Recommendations

Decision

Recommendations will use deterministic business rules.

Reason

The objective of the MVP is validating compatibility—not building AI.

Recommendation inputs include:

- Interests
- Goals
- Company
- School
- Networking preferences
- Conference attendance

---

## ADR-005

### Mobile First

Decision

Design the platform primarily for mobile devices.

Reason

Conference attendees primarily use phones while moving between sessions.

---

# Engineering Principles

Every implementation decision should support these principles.

---

## Simplicity

Prefer readable code over clever code.

---

## Reusability

Components should be reusable wherever practical.

---

## Separation of Concerns

Presentation, business logic, and data access should remain independent.

---

## Security

Protect user data from the beginning.

---

## Iterative Development

Build the smallest feature that delivers value.

---

# Component Responsibilities

## Authentication Service

Responsibilities

- Register
- Login
- Logout
- Password Reset
- Session Management

---

## Conference Service

Responsibilities

- Browse Conferences
- Join Conferences
- Leave Conferences

---

## Discovery Service

Responsibilities

- Browse People
- Search
- Filters
- Recommendations
- Compatibility explanations

---

## Crew Service

Responsibilities

- Create Crew
- Join Crew
- Leave Crew
- View Crew
- Schedule Meetups

---

## Notification Service

Responsibilities

Notify users of:

- Connection Requests
- Crew Invitations
- Meetups
- Conference reminders

---

# Development Workflow

Every Jira Story follows the same engineering workflow.

```text
Jira Story
      │
      ▼
Design Solution
      │
      ▼
Claude Code / Codex
      │
      ▼
Developer Review
      │
      ▼
Local Testing
      │
      ▼
Git Commit
      │
      ▼
Pull Request
      │
      ▼
QA Verification
      │
      ▼
Merge
      │
      ▼
Deployment
```

---

# Sprint-Based Development

## Sprint 0

Engineering Foundation

Deliverables

- GitHub Repository
- Next.js
- Tailwind
- shadcn/ui
- Supabase
- Vercel
- Initial Folder Structure

---

## Sprint 1

Authentication

Professional Profile

Conference Preferences

---

## Sprint 2

Conference Discovery

Browse People

Search

Filters

---

## Sprint 3

Recommendations

Connections

Conference Crews

---

## Sprint 4

Meetups

Testing

Deployment

---

# Folder Structure

```text
src/

├── app/
├── components/
├── features/
├── hooks/
├── lib/
├── services/
├── styles/
├── types/
├── utils/
```

---

# Security Considerations

The system shall:

- Never store plain-text passwords.
- Use HTTPS for all communication.
- Validate all user input.
- Restrict access using Row-Level Security.
- Protect private profile information.

---

# Scalability Strategy

The MVP should support:

- Multiple conferences
- Thousands of attendees
- Conference-specific traffic spikes

Future architecture should support:

- AI recommendations
- Messaging
- Session planning
- Cross-conference communities

---

# Future Architecture

As ConCrew grows, future services may include:

- Recommendation Service
- Messaging Service
- Search Service
- Notification Service

These services are intentionally postponed until the modular monolith reaches its scaling limits.

---

# Related Documents

- DOC-008 Functional Requirements
- DOC-009 Business Rules
- DOC-010 Data Model
- DOC-012 API Design

---

# Key Decisions

- Build a modular monolith.
- Keep recommendations rule-based.
- Mobile-first architecture.
- AI accelerates development but does not replace engineering judgment.
- Optimize for maintainability over complexity.

---

## Revision History

| Version | Date | Author | Summary |
|----------|------|--------|---------|
| 1.0 | July 2026 | Tsadia Mabel | Initial architecture |
| 2.0 | July 2026 | Tsadia Mabel | Refined after engineering planning and Sprint 0 preparation |
