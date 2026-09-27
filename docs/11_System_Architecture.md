# System Architecture & Technology Stack

> **Document ID:** DOC-011  
> **Role:** Software Engineer / Software Architect  
> **Supporting Roles:** Product Manager, Business Analyst, QA Engineer  
> **SDLC Phase:** Solution Design  
> **Status:** Approved  
> **Version:** MVP v2.1

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
    ┌──────────┬──────────┼──────────┬──────────┐
    ▼          ▼          ▼          ▼          ▼
Auth      Business   Recommendation  Messaging  Realtime
          Logic         Matching     & Notify   Subscriptions
    │          │          │          │          │
    └──────────┴──────────┼──────────┴──────────┘
                          │
                          ▼
                   Supabase Backend
                          │
       ┌──────────────────┼──────────────────┐
       ▼                  ▼                  ▼
 Supabase Auth   PostgreSQL + pgvector   Supabase Realtime
```

The client queries Supabase directly from the browser; there is no server-side API layer yet (see ADR-002 and Future Architecture).

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

- Recommendation ranking (client-side, over the results of the `match_profiles` RPC)
- Crew rules (roles, visibility, ownership transfer)
- Conference rules
- Validation
- Authorization

---

## 3. Service Layer

Responsible for communication between the application and backend services.

Examples:

- Authentication
- Database access
- Realtime subscriptions (crew membership, join requests, notifications, messages)
- The `match_profiles` recommendation RPC

---

## 4. Data Layer

Responsible for persistent storage.

Technology

- PostgreSQL, with the pgvector extension for profile embeddings
- Supabase

Stores:

- Users / Profiles (including Conference Goals, Interests, Networking Preferences, and profile embeddings)
- Conferences
- Connections
- Crews, Crew Members, Crew Join Requests, Crew Invitations
- Meetups
- Conversations and Messages
- Notifications

---

# Technology Stack

## Frontend

| Technology | Purpose |
|------------|---------|
| Next.js | React framework (App Router) |
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
| pgvector | Stores profile embeddings and powers similarity-based recommendations |
| Supabase Auth | Authentication |
| Supabase Realtime | Live updates for crew membership, join requests, notifications, and messages |
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

- Excellent React ecosystem
- Easy deployment on Vercel
- App Router conventions for pages and layouts

As built, the app does not use Next.js API Routes; the client queries Supabase directly from every page. A small server-side API layer is planned to support upcoming AI features (see Future Architecture), not for the current CRUD flows.

---

## ADR-003

### Use Supabase

Decision

Supabase provides authentication, database, and realtime services.

Reason

- Rapid MVP development
- PostgreSQL, with the pgvector extension available for embeddings
- Authentication built-in
- Row-Level Security
- Realtime subscriptions over `postgres_changes`, once a table is added to the `supabase_realtime` publication
- Easy deployment

---

## ADR-004

### Profile-Similarity (Embedding) Recommendations

Decision

Recommendations use a pgvector embedding of each profile, compared through a `match_profiles` database function, rather than deterministic rule scoring.

Reason

Rule-based scoring was the original plan, but comparing whole-profile embeddings proved simpler to implement than maintaining a hand-tuned weighting across many fields, and produces a single similarity score directly.

Recommendation inputs come from whatever is saved on the profile, including:

- Biography
- Interests
- Conference Goals
- Networking Preferences
- Company, School, Job Title

The embedding is regenerated when a profile is saved. Itemized "why you matched" reasoning is not yet produced; only the resulting similarity score is shown.

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
- Login (redirects to Onboarding if incomplete)
- Logout
- Password Reset
- Session Management

---

## Onboarding Service

Responsibilities

- Present the Conference Goals, Interests, and Networking Preferences wizard once per account
- Allow skipping while still marking onboarding complete

---

## Conference Service

Responsibilities

- Browse Conferences (Upcoming / Past tabs)
- Join Conferences
- Leave Conferences

---

## Discovery Service

Responsibilities

- Browse People
- Search
- Filters
- Recommendations (match percentage only; itemized reasoning not yet built)

---

## Crew Service

Responsibilities

- Create Crew
- Join Crew (request or invitation)
- Manage Crew (approve/decline, invite, roles, ownership transfer, visibility)
- Leave Crew / Delete Crew
- View Crew
- Crew Chat
- Schedule Meetups

---

## Messaging Service

Responsibilities

- List a user's conversations with a latest-message preview
- Send and receive direct messages in real time
- Serve as the same underlying mechanism Crew Chat uses, scoped to crew membership

---

## Notification Service

Responsibilities

Notify users of, live and without a refresh:

- Connection requests
- Connection acceptances
- Crew join requests
- Crew invitations

Meetup reminders and conference reminders are not yet implemented.

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

> As of this revision, the local build has run ahead of this workflow: the features described throughout this document exist locally but have not yet been pushed through Git Commit / Pull Request / Merge to the GitHub repository. See the README's Known Gaps.

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

Onboarding

Professional Profile

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

Conference Crews (including Crew Chat)

Live Notifications

---

## Sprint 4

Direct Messaging

Meetups

Visual identity (indigo/purple re-theme)

Bug fixes (Realtime enablement, stale membership checks)

---

# Folder Structure

The application follows Next.js App Router conventions at the project root, without a `src/` wrapper:

```text
web/
├── app/            (routes: dashboard, onboarding, conferences, people,
│                    crews/[id], messages, profile, etc.)
├── components/     (layout, crew, and other shared components)
├── lib/            (Supabase client and shared helpers)
└── public/         (static assets, including the logo)
```

A dedicated `features/`, `services/`, or `hooks/` folder was planned but has not been introduced; shared logic currently lives alongside the pages and components that use it.

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

AI-based recommendations and messaging are already part of the MVP rather than future work. Future architecture should still support:

- Session planning
- Cross-conference communities
- A server-side API layer for upcoming AI features (conference sourcing, richer matching)

---

# Future Architecture

As ConCrew grows, future services may include:

- A small server-side API layer, scoped to AI features rather than a full REST surface
- Search Service (as attendee and conference volume grows)
- Itemized match-reasoning service, building on the existing embedding-based recommendations

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
- Use profile-similarity (embedding-based) recommendations rather than rule-based scoring.
- Mobile-first architecture.
- AI accelerates development but does not replace engineering judgment.
- Optimize for maintainability over complexity.
- Keep the client talking to Supabase directly for now; introduce a server-side API layer only when AI features need one.

---

## Revision History

| Version | Date | Author | Summary |
|----------|------|--------|---------|
| 1.0 | July 2026 | Tsadia Mabel | Initial architecture |
| 2.0 | July 2026 | Tsadia Mabel | Refined after engineering planning and Sprint 0 preparation |
| 2.1 | September 2026 | Tsadia Mabel | Corrected ADR-004 from rule-based to embedding-based (pgvector) recommendations; corrected ADR-002 to note there are no Next.js API Routes yet; added pgvector and Supabase Realtime to the stack; added Onboarding and Messaging Services and updated Crew and Notification Service responsibilities to match what shipped; corrected the folder structure to the real App Router layout; flagged the repo-versus-local-build gap in Development Workflow |
