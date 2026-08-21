# ConCrew
> Find your conference crew before you arrive.

## Overview

ConCrew is a conference networking platform that helps attendees discover compatible people before attending conferences, making it easier to form small groups and coordinate meetups ahead of time.

This project is being developed as a complete Software Development Life Cycle (SDLC) case study using Agile Scrum, Jira, GitHub, and AI-assisted software engineering tools.

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
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend
- Supabase (Auth + PostgreSQL)
- Client currently queries Supabase directly; a small server-side API layer is being introduced for AI-related features (see Roadmap)

### Deployment
- Vercel

### AI Tools
- Claude Code
- Codex
- ChatGPT

---

## Current Status

The core manual flow is built and working end to end:

- [x] Auth: register, login, logout, forgot password, reset password
- [x] Dashboard with onboarding nudges (profile completion, missing fields)
- [x] Profile creation and editing
- [x] Browse conferences and view conference details
- [x] Join a conference
- [x] Browse people and see rule-based match recommendations (shared conference, school, company, city, job title)
- [x] Send and view connections
- [x] Create, browse, and join crews
- [x] Crew detail page: member roles, join requests, invitations, ownership transfer, visibility

Known gaps against the original data model:
- [ ] Interests, Conference Goals, and Networking Preferences are not yet implemented as onboarding fields or database tables. Matching currently relies only on profile fields.
- [ ] There is no conference creation UI. Conferences are currently added by hand in the Supabase table editor.
- [ ] No server-side API routes exist yet. All reads/writes happen client-side against Supabase.
- [ ] No automated tests.

---

## Roadmap

### Now
- AI conference sourcing: a server-side job that searches the web, extracts structured conference data with an AI model, and lands it in a review queue for approval before publishing
- Small backend API layer to support the above (only what's needed for AI features, not a full REST surface yet)

### Next
- AI-assisted matching: move from exact-field rule scoring toward similarity-based matching using bios and stated interests
- Interests / Goals / Networking Preferences onboarding

### Later
- Automated scheduling for conference sourcing
- Testing (unit + E2E)
- Messaging, session planning, calendar integration (deferred from MVP scope)

---

## Status

In Development

---

## Author

Tsadia Mabel

