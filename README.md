# ConCrew
> Find your conference crew before you arrive.

## Overview

ConCrew is a conference networking platform that helps attendees discover compatible people before attending conferences, making it easier to form small groups and coordinate meetups ahead of time.

This project is being developed as a complete Software Development Life Cycle (SDLC) case study using Agile Scrum, Jira, GitHub, and AI-assisted software engineering tools.

> **A note on this revision:** this README describes the app as it has actually been built, verified file by file. As of this revision, the improvements below (onboarding, crew chat, messages, live notifications, the indigo/purple visual identity, and more) exist locally but have not yet been pushed to this repository. Until that push happens, the code under `web/` here will look noticeably earlier-stage than what's described. See [Known Gaps](#known-gaps) for details.

---

## Problem Statement

Professional conferences bring together thousands of like-minded individuals, but meaningful networking often depends on chance encounters.

ConCrew helps attendees:
- Discover compatible people before the conference
- Form small conference crews
- Coordinate meetups
- Build lasting professional relationships

---

## Technology Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend
- Supabase (Auth + PostgreSQL)
- Supabase Realtime, for live updates to crew membership, join requests, and notifications without a page refresh
- pgvector-based profile embeddings, queried through a `match_profiles` RPC, power "Recommended for You" style matching (not a rule-based field-matching score)
- Client currently queries Supabase directly; a small server-side API layer is still planned for AI-related features (see Roadmap)

### Deployment
- Vercel

### AI Tools
- Claude Code
- Codex
- ChatGPT

---

## Current Status

The core flow is built and working end to end:

- [x] **Auth**: register (with live password-strength validation), login, logout, forgot password, reset password
- [x] **Onboarding**: a short post-signup wizard collects Conference Goals, Interests, and Networking Preferences, stored on the profile and used by matching and filtering elsewhere in the app; existing users aren't forced through it retroactively
- [x] **Dashboard**: profile-completion tracker with a missing-fields checklist, plus three live widgets — Recommended People, Your Crews, and Recent Messages
- [x] **Profile**: create and edit your own profile; view someone else's public profile, including a "Shared Conferences" and "Mutual Crew" sidebar
- [x] **Conferences**: browse with Upcoming/Past tabs, search, category and month filters, and a per-card note when people you'd match with are attending
- [x] **People**: "Recommended for You" (embedding-based similarity matching) plus a filterable "Browse All Attendees" view (School, City, Company, Job Title, Interests, Networking Style)
- [x] **Connections**: send, accept, and decline connection requests, with a live notification on both ends
- [x] **Crews**: create, browse, and join public crews; request-to-join for public crews, invitation-only for private ones; a crew detail page with a member-avatar stack, a collapsible "Manage Crew" panel (join requests, invite people, member roles), ownership transfer, visibility toggling, and confirmation modals for leaving or deleting a crew
- [x] **Crew Chat**: a real-time chat panel scoped to each crew, visible only to members, that opens automatically the moment membership is granted (no refresh needed)
- [x] **Meetups**: a sidebar for scheduling and viewing a crew's planned meetups
- [x] **Messages**: a dedicated Messages section with a conversation-list sidebar and real-time 1:1 direct messaging
- [x] **Notifications**: a bell with live delivery (crew join requests, invitations, and connection requests), with inline accept/decline actions
- [x] **Visual identity**: an indigo/purple design system and logo applied consistently across every page, replacing the project's earlier teal/terracotta look

<a id="known-gaps"></a>
Known gaps:
- [ ] **The GitHub repo is behind the local build.** Everything above exists locally; `web/app` in this repo does not yet contain onboarding, crew chat, messages, or notifications code. This needs a push before the repo reflects reality.
- [ ] There is no conference creation UI. Conferences are still added by hand in the Supabase table editor.
- [ ] No server-side API routes exist yet. All reads/writes happen client-side against Supabase.
- [ ] No automated tests.
- [ ] Filters cover School, City, Company, Job Title, Interests, and Networking Style. Skills and Years of Experience, both called out in the original wireframes, are not yet filterable.
- [ ] The onboarding wizard covers Conference Goals, Interests, and Networking Preferences. Optional per-session interest selection, also called out in the original wireframes, was not built.
- [ ] Realtime features (crew membership, join requests, notifications) depend on the relevant tables being added to Supabase's `supabase_realtime` publication. This is a project-level setting, not something the app code can turn on by itself — see `enable_realtime.sql`.

---

## Roadmap

### Now
- Push the local build described above to this repository, so the repo, the docs, and the running app all agree
- AI conference sourcing: a server-side job that searches the web, extracts structured conference data with an AI model, and lands it in a review queue for approval before publishing

### Next
- Small backend API layer to support AI features (only what's needed there, not a full REST surface yet)
- Skills and Years of Experience as additional People filters
- Optional per-session interest selection during onboarding

### Later
- Automated scheduling for conference sourcing
- Testing (unit + E2E)
- Further matching refinements (combining stated interests with bio embeddings)
- Calendar integration

---

## Status

In Development

---

## Author

Tsadia Mabel
