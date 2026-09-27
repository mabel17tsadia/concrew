# Project Retrospective & Lessons Learned

> **Document ID:** DOC-018  
> **Primary Role:** Project Team  
> **Contributors:** Product Manager, Business Analyst, Software Engineer, QA Engineer  
> **SDLC Phase:** Project Closure & Continuous Improvement  
> **Status:** Living Document  
> **Version:** MVP v2.0

---

# Purpose

This document captures lessons learned throughout the ConCrew project.

Unlike the previous SDLC documents, which define what should be built, this document reflects on what was actually built, what changed during development, and what was learned along the way.

The retrospective supports continuous improvement by documenting:

- Product insights
- Engineering decisions
- Agile delivery lessons
- QA observations
- AI-assisted development experiences
- Future improvements

> **Note on this revision:** the prior version of this document was a template, with every section marked "_To be completed_." This revision fills it in with what actually happened, based on the completed local build and the documentation rewrite that brought DOC-001 through DOC-017 in line with it. One item remains genuinely open: the local build described throughout this document set has not yet been pushed to GitHub, so this retrospective is written from the perspective of a functionally complete MVP that is not yet fully reflected in the repository. See the README's Known Gaps.

---

# Project Overview

| Item | Value |
|------|-------|
| Project | ConCrew |
| Project Type | Portfolio Software Engineering Project |
| Development Methodology | Agile Scrum |
| Architecture | Modular Monolith |
| Technology Stack | Next.js, TypeScript, Tailwind CSS, Supabase (PostgreSQL, Auth, Realtime, pgvector), Vercel |
| Version | MVP |
| Status | Functionally complete locally; pending push to GitHub |

---

# Original Vision

ConCrew began after attending the AI Engineer World Fair in San Francisco.

While thousands of attendees gathered in one place, finding the right people to connect with still relied heavily on chance.

The original vision was simple:

> Help conference attendees discover compatible people before arriving at an event.

Rather than replacing networking, ConCrew aims to make networking more intentional by helping attendees build meaningful connections before the conference begins.

That vision held up well. Nothing about the finished MVP contradicts it; if anything, the features that ended up mattering most (Crew Chat, live notifications, direct messaging) exist specifically to make the "before you arrive" relationships usable once the conference actually starts, which sharpens the original idea rather than departing from it.

---

# Retrospective Timeline

```text
Sprint 0
      │
      ▼
Sprint 1 Reflection
      │
      ▼
Sprint 2 Reflection
      │
      ▼
Sprint 3 Reflection
      │
      ▼
Sprint 4 Reflection
      │
      ▼
Sprint 5 Reflection
      │
      ▼
Final Project Retrospective
```

---

# Sprint Reflections

## Sprint 0 — Engineering Foundation

**Status**

Complete

### Goals

- Set up engineering environment
- Configure GitHub
- Configure Jira
- Create Supabase project
- Configure deployment
- Build project foundation

### Reflection

This sprint went as planned. Choosing Supabase up front paid off well beyond the original reasoning (fast auth and Postgres access): Realtime and pgvector, both used heavily later, came from the same platform decision, without needing to add separate services for either.

### Lessons Learned

A backend platform choice made for one reason (fast MVP setup) can end up mattering for reasons that were not the deciding factor at the time (Realtime, pgvector). Worth remembering when evaluating platform choices on future projects: look at the whole feature surface, not just the immediate need.

---

## Sprint 1 — Authentication, Onboarding & Profiles

**Status**

Complete

### Sprint Goal

Authentication and professional profiles.

### Reflection

Onboarding was not in the original five-sprint plan; it was added once it became clear that recommendations needed some signal from the user before they had built out a full profile. Building it as a short, skippable wizard rather than a required gate turned out to be the right call: it collects just enough (Conference Goals, Interests, Networking Preferences) without creating a second registration form.

### Lessons Learned

A short, optional onboarding step is easier to justify to users than an additional required form, even though functionally it collects similar information. Framing matters as much as scope.

---

## Sprint 2 — Conference Discovery & Attendee Browsing

**Status**

Complete

### Sprint Goal

Conference discovery and attendee browsing.

### Reflection

The Upcoming/Past tabs on Conferences were not originally planned for this sprint, but came out of a real bug: the original query filtered out conferences with a null end date, silently hiding them. Fixing that properly meant splitting the list client-side instead of relying on a single date filter, which turned into the tabbed view.

### Lessons Learned

Some of the best UI improvements in this project came from fixing a data bug correctly rather than patching around it. Worth treating "why is this filter wrong" as a design question, not just a query fix.

---

## Sprint 3 — Recommendations, Connections & Notifications

**Status**

Complete

### Sprint Goal

Recommendations, connections, and live notifications.

### Reflection

The single biggest divergence from the original plan happened here: recommendations were always meant to be rule-based (see DOC-011 ADR-004 in its original form), but the actual implementation uses pgvector profile embeddings compared through a `match_profiles` function. This was simpler to build than a hand-tuned weighting system across many fields, and it produces a single similarity score directly, at the cost of not yet being able to explain *why* two profiles matched.

Live notifications also turned out to be much more foundational than "Should Have" priority suggested. Once connection requests needed to be actionable without a refresh, notifications stopped being a nice-to-have and became part of making the core discovery loop feel complete.

### Lessons Learned

Do not assume the originally planned technical approach (rule-based scoring) will survive contact with implementation; embeddings were both less work and produced a better result here. Also: a feature's priority label set at planning time (P1, "Should Have") does not always predict how load-bearing it turns out to be once its dependents are built.

---

## Sprint 4 — Conference Crews

**Status**

Complete

### Sprint Goal

Conference crew creation, membership, management, and chat.

### Reflection

This was the hardest sprint, and the source of the three most significant bugs in the project (BUG-001, BUG-002, BUG-004 in DOC-017). The core issue behind all three was the same: Supabase Realtime requires a table to be explicitly added to the `supabase_realtime` publication, which is a project-level setting separate from Row-Level Security or the application code. None of the realtime code was actually wrong; it simply had nothing to subscribe to. Diagnosing that took longer than fixing it once found.

The second real lesson from this sprint was CrewChat's stale membership check (BUG-002): checking membership once on mount is fine for a static page, but not for one where membership can change live, driven by a different component. The fix, passing `isMember` down as a prop and re-running the check when it changes, is a pattern worth reusing anywhere a child component's access depends on state a parent updates live.

### Lessons Learned

When "the code looks right but nothing happens," check the infrastructure-level configuration before re-reading the application code a third time. Also: any check that runs "once, on mount" is a latent bug the moment the thing it is checking can change without the component remounting.

---

## Sprint 5 — Messaging, Meetups, Visual Identity & Release Prep

**Status**

Complete (functionally); GitHub push still pending

### Sprint Goal

Direct messaging, meetup scheduling, the indigo/purple re-theme, and release preparation.

### Reflection

Direct Messaging shipped in this sprint despite being explicitly excluded from the original MVP scope. Once Crew Chat existed, the underlying conversation/message data model already supported one-to-one conversations with almost no extra work, so excluding standalone messaging stopped making sense.

The visual re-theme (teal/terracotta/ivory to indigo/purple, following the new logo) was executed as a single deterministic find-and-replace across the exact hex values used throughout the app, rather than manually editing each file. This was faster and safer than it sounds, precisely because Tailwind's arbitrary-value classes use exact hex strings; a fuzzy or partial match approach would have been much riskier.

### Lessons Learned

A feature deliberately scoped out early can become nearly free once a related feature (Crew Chat) has already built its dependencies. Revisit "excluded" scope decisions when something adjacent ships. Also: a large, mechanical, repository-wide change (a rebrand) is often safer done as a single scripted pass with an exact match set and a verification grep afterward, than as many manual edits.

---

# Product Management Reflection

### Which assumptions were validated?

That attendees benefit from discovering compatible people before a conference, and that small crews plus live coordination (chat, notifications) are what make that discovery actually useful once the conference starts, rather than a static list of matches nobody acts on.

### Which assumptions proved incorrect?

That rule-based recommendation scoring would be the right MVP approach. Embedding-based similarity replaced it, at the cost of losing itemized "why you matched" reasoning, which is now the single most requested-feeling gap in the product (see DOC-017's Known Untested Risk Areas and DOC-004's Release 4).

That messaging and live notifications could wait for a later release. Both turned out to be necessary for the crew and connection features to feel finished, not optional additions.

### Which feature created the most value?

Crew Chat combined with live membership updates. It is the point where "discover compatible people" turns into "actually coordinate with them," which is the whole premise of the product.

### Which feature added the least value, relative to its cost?

Hard to say definitively without real user data, since the MVP has not yet had outside users. The most likely candidate is the Meetup Scheduling sidebar, which is functionally simple but has not yet been tested against how people actually plan to meet up at a conference in practice.

### If rebuilding today, what would be prioritized differently?

Realtime enablement (the `supabase_realtime` publication) would be checked and turned on for every relevant table at the start of Sprint 1, rather than discovered as a bug during Sprint 4. It cost real debugging time across three separate features that all had the same root cause.

---

# Business Analysis Reflection

### Were the requirements complete?

No, and that gap is well documented now: the original PRD and FRS both described Direct Messaging and itemized match reasoning as excluded or partially built, when the real implementation diverged from both. The September 2026 documentation rewrite (DOC-002 through DOC-017) exists specifically to close that gap.

### Which requirements changed?

Recommendations moved from rule-based to embedding-based. Messaging moved from excluded to included. Crew management grew substantially beyond the original "create, join, leave, view" scope to include approve/decline, invite, role changes, ownership transfer, and visibility control.

### Which user stories required refinement?

"View Recommended People" and "Filter Attendees" both needed correction to remove claims about features that were never built (itemized reasoning, Conference Goals as a filter). "Save Attendees" needed to be marked not implemented rather than quietly dropped.

### Which documents proved most useful?

The Data Model (DOC-010) and Functional Requirements (DOC-008), once corrected, gave the clearest single reference for what actually exists versus what was originally planned. The API Design document (DOC-012) was the most surprising to write, since it required being explicit that none of its endpoints are actually implemented; the app talks to Supabase directly.

### What documentation could be improved?

The original documents were written ahead of implementation and never revisited as the build diverged from the plan. The lesson carried into this revision was to timestamp and flag every claim that might go stale (a match percentage vs. itemized reasoning, a realtime dependency, a not-yet-enforced business rule) rather than stating it as settled fact.

---

# Software Engineering Reflection

### Which architectural decisions worked well?

The modular monolith, and querying Supabase directly from the client instead of building a server-side API layer early. Both kept a solo developer's iteration speed high, at the acknowledged cost of needing an API layer eventually for the planned AI conference-sourcing feature.

### Which technologies accelerated development?

Supabase Realtime and pgvector, once correctly configured, did more with less code than a hand-rolled polling or WebSocket system and a hand-tuned recommendation algorithm would have. Tailwind's arbitrary-value hex classes made the entire re-theme scriptable instead of manual.

### Which technical challenges consumed the most time?

Diagnosing that Realtime updates were not just "buggy" but entirely unconfigured at the publication level. The symptom (stale UI after a refresh-free action) looked identical across three unrelated features (crew membership, notifications, and, before the fix, would have affected messages too), and each one had to be independently reported and diagnosed before the shared root cause became clear.

### What would be redesigned?

The membership-check pattern in CrewChat, generalized: any component whose access depends on state owned by a realtime-updated parent should receive that state as a prop and react to it, rather than checking once on its own. This should be a documented pattern (see DOC-015) rather than something discovered per-component.

### Which engineering skills improved the most?

Diagnosing "silently not working" realtime and subscription bugs, where the code is correct but a platform-level configuration step was missed. This is a class of bug that unit tests would not have caught, since the client-side subscription code itself was correct.

---

# AI-Assisted Development Reflection

### AI Tools Used

- ChatGPT
- Claude Code
- Codex

### How did AI improve development?

Feature implementation across the full stack, from the onboarding wizard to the realtime subscriptions to the deterministic re-theme script, moved quickly because AI tools could generate a first pass to review and adjust rather than starting from a blank file every time. The realtime bug diagnoses (BUG-001 through BUG-004) were also reached through AI-assisted debugging of real screenshots and reported symptoms, rather than requiring the developer to independently trace through Supabase's publication configuration from scratch.

### Where did AI struggle?

AI tools cannot see the real, deployed application; every fix in this project depended on being shown the actual current source of a file before it was safe to modify, and on real screenshots to confirm a fix worked. Guessing at code that had not been shared would have risked breaking working Supabase logic, so no file was changed without first reading its real, current content.

### Which generated code required manual correction?

The image-cropping script for the new logo needed a fix after an initial naive bounding-box threshold let a single stray anti-aliasing pixel skew the crop; switching to a percentage-of-max threshold fixed it. This is a small example of a broader pattern: AI-generated code that looks reasonable can still have an edge case that only shows up once you actually look at the output.

### What engineering work could not be delegated to AI?

Deciding to re-theme the entire app rather than only recolor the logo, and deciding to keep messaging out of the original MVP scope and later bring it back in, were product judgment calls that needed a human decision, even though AI tools implemented both once decided.

### What did you learn about AI-assisted software engineering?

The highest-value use of AI in this project was not generating new code from scratch, but diagnosing why existing, seemingly-correct code was not working (the realtime publication issue is the clearest example) and keeping a large, multi-file document set honest against a codebase that kept changing underneath it.

---

# Quality Assurance Reflection

### Did the testing strategy work?

Only partially, and this retrospective is a fair place to say so plainly: through Sprint 5, testing was manual, ad hoc, and driven by the developer's own use of the app plus a handful of user-reported screenshots, not a systematic pass through documented test cases. DOC-017's v2.2 revision, written after this MVP was functionally complete, is the first time a comprehensive test suite (76 cases across Happy Path, Negative, Boundary, Security, and Edge Case categories) has existed for this project; most of those cases have not been executed yet.

### Which defects were the most difficult?

The Realtime publication issue (BUG-004), because the client-side code for every affected feature was correct, which made it look like each individual feature (crew membership, notifications) had an unrelated, isolated bug, rather than one shared, non-code cause.

### Which regression issues appeared?

None have been formally tracked, since regression testing has not yet been systematized; this is itself a finding, and DOC-016 and DOC-017 have both been updated to say so honestly rather than claim a regression suite that does not exist.

### What QA improvements would be made next time?

Write the Security and Boundary test cases (duplicate/malformed input, authorization bypass attempts, injection attempts) at the same time a feature is built, not months later during a documentation pass. Several of the cases added in DOC-017 v2.2, such as verifying Row-Level Security actually blocks a cross-user profile edit, should have existed since the feature was first built.

---

# Agile Reflection

### Was sprint planning realistic?

The original five-sprint plan undercounted what Crews and Messaging would actually take; the delivered plan expanded to six sprints, with Crews getting its own dedicated sprint once management, invitations, and chat were all added to its scope.

### Were estimates accurate?

Roughly, at the epic level, once Onboarding, Crew Management, and Messaging were added as their own scoped items rather than treated as small extensions of Profile and Crews respectively.

### Which sprint was most successful?

Sprint 3 (Recommendations, Connections & Notifications), because the embedding-based approach worked cleanly on the first real implementation and needed no significant rework afterward.

### Which sprint was most challenging?

Sprint 4 (Conference Crews), for the reasons covered in the Sprint 4 reflection above: three related but individually confusing realtime bugs, all from one root cause.

### What process improvements should be made?

Verify infrastructure-level configuration (in this case, the Realtime publication) as part of Sprint 0's Definition of Done, rather than discovering it is missing partway through a later feature that depends on it.

---

# Biggest Challenges

| Challenge | Solution | Lesson Learned |
|-----------|----------|----------------|
| Supabase Realtime silently not delivering updates for crew membership, join requests, or notifications | Diagnosed that the affected tables were never added to the `supabase_realtime` publication; added `enable_realtime.sql` to enable them | Check platform-level configuration before assuming application code is at fault when something "just doesn't update" |
| CrewChat stuck on a stale one-time membership check after a live membership update | Passed `isMember` down as a prop from the parent and made it a dependency of the effect that checks membership | Any check-once-on-mount pattern is a latent bug once the underlying state can change live from elsewhere |
| Documentation (PRD, User Stories, FRS, Data Model, and others) drifting out of sync with the real, evolving build | A full documentation rewrite pass across all 18 docs, correcting each claim against the real source code and flagging what is genuinely not yet built | Treat documentation as something that goes stale the moment implementation diverges from plan, and revisit it deliberately, not only when someone happens to notice a discrepancy |
| The GitHub repository falling behind the local build | Not yet solved; explicitly flagged in the README and throughout this document set as a known gap | A solo project with no PR review pressure has no natural forcing function to push regularly; this needs a deliberate habit, not a process that assumes a team will notice |

---

# Biggest Wins

- Diagnosing and fixing three related realtime bugs down to a single, well-understood root cause (the `supabase_realtime` publication), rather than patching each symptom separately.
- Delivering a functionally complete MVP that exceeds the original five-sprint scope: Onboarding, full Crew Management, Crew Chat, Direct Messaging, and Live Notifications all shipped, none of which were guaranteed MVP features in the original plan.
- Executing a full visual re-theme (teal/terracotta/ivory to indigo/purple, plus a new logo) as a single deterministic, verifiable script across 18 files, rather than risking manual, inconsistent edits.
- Bringing 18 documents that had drifted from the real build back into alignment with it, including being honest about the things that are not yet built rather than letting the documentation overstate the product.

---

# Project Metrics

## Product Metrics

| Metric | Value |
|---------|------|
| Registered Users | Not yet measured; no external users onboarded |
| Conferences Added | Not yet measured |
| Connections Created | Not yet measured |
| Crews Formed | Not yet measured |
| Meetups Scheduled | Not yet measured |

These remain genuinely unmeasured rather than estimated, since the MVP has not yet been used by anyone outside development.

---

## Engineering Metrics

| Metric | Value |
|---------|------|
| Sprints Completed | 6 of 6 (functionally; GitHub push pending) |
| Documentation Files Rewritten | 17 of 18 (all except DOC-001 Product Vision and DOC-005 Product Discovery, both reviewed and found still accurate) |
| Bugs Found and Fixed | 4 (BUG-001 through BUG-004, all Closed) |
| Test Cases Written | 76 (DOC-017 v2.2) |
| Test Cases Executed | 6 of 76 |
| Git Commits Pushed to GitHub | Behind the local build; exact count not yet reconciled |

---

# User Feedback

No external user testing has occurred yet; this MVP has been built and verified by its sole developer to date.

## Positive Feedback

Not yet available.

---

## Critical Feedback

Not yet available.

---

## Unexpected Feedback

Not yet available.

---

# Future Roadmap

Based on the MVP, future releases may include:

### Priority 1

- Push the local build to GitHub so the repository matches the running app
- Execute the remaining 70 test cases in DOC-017, prioritizing the Security and Boundary categories

### Priority 2

- Itemized "why you matched" recommendation reasoning
- Skills and Years of Experience as People filters
- A small server-side API layer to support upcoming AI features

### Priority 3

- Session planning
- Calendar integration

### Future Vision

- QR networking
- Mentor matching
- Cross-conference networking
- Travel coordination

---

# Career Reflection

This project strengthened experience across multiple software engineering disciplines.

## Product Management

Practiced saying no to scope, and then explicitly reversing that decision (Direct Messaging) once evidence from building adjacent features showed the original call no longer made sense. That reversal, done deliberately and documented, is as much a product management skill as the original scoping decision was.

---

## Business Analysis

Learned to treat requirements documents as living artifacts that need a deliberate reconciliation pass against the real codebase, not as write-once specifications. The gap between the original PRD and the shipped product was large enough that it required a full-document rewrite rather than a few edits.

---

## Software Engineering

Learned to diagnose a class of bug that is invisible to code review: correct client code with a missing platform-level configuration step. Also practiced a pattern for components whose access depends on live-updated parent state (pass it down, react to it), which is broadly reusable beyond this project.

---

## Quality Assurance

Learned the difference between a test case that only proves a feature works when used correctly, and one that proves it fails safely when used incorrectly. Most of this project's early testing was the former; DOC-017 v2.2 is the first attempt at the latter, and most of it has not been executed yet.

---

## AI-Assisted Development

Learned that AI tools are most valuable in this kind of project not for generating new features from a blank page, but for diagnosing why existing code that looks correct is not behaving correctly, and for keeping a large, interlinked set of documents honest as the underlying product changes.

---

# Final Reflection

If I could return to the first day of this project, what advice would I give myself?

Turn on Supabase Realtime for every table you expect to need it for, on day one, even before you have built the feature that depends on it. It would have saved real debugging time across three separate features later. And revisit your documentation against the real code every few sprints, not only when a full rewrite becomes unavoidable; smaller, more frequent corrections would have been easier than the single large reconciliation pass this document set required.

---

# Closing Thoughts

ConCrew began as a simple observation during the AI Engineer World Fair:

> Meeting the right people at a conference shouldn't be left entirely to chance.

Over the course of this project, that observation evolved into a complete software engineering case study covering product discovery, requirements analysis, software design, Agile planning, implementation, quality assurance, and AI-assisted development.

The MVP that exists today goes beyond what was originally scoped (Onboarding, full Crew Management, Crew Chat, Direct Messaging, and Live Notifications all shipped) and it also exists with clearly documented gaps rather than an inflated description of its state: the GitHub repository still needs to catch up to the local build, itemized match reasoning is not yet built, and most of the newly written test suite still needs to be executed.

Regardless of where ConCrew goes next, this project represents an important milestone in developing the skills required to take a product from an idea to a working software solution using modern engineering practices, including the practice of documenting what is actually true rather than what was originally planned.

---

# Related Documents

- DOC-001 Product Vision
- DOC-002 Product Requirements Document
- DOC-011 System Architecture & Technology Stack
- DOC-014 Sprint Planning & Release Plan
- DOC-015 Engineering Workflow & Development Standards
- DOC-016 Quality Assurance Strategy
- DOC-017 Test Cases & Bug Log

---

# Portfolio Outcomes

This project demonstrates practical experience in:

- Product Management
- Business Analysis
- Agile Scrum
- Software Architecture
- Full-Stack Software Engineering
- Quality Assurance
- AI-Assisted Development
- Technical Documentation
- GitHub Workflow
- Jira Project Management

---

### Key Deliverables

- Product Vision
- PRD
- User Stories
- Product Roadmap
- Product Discovery
- User Journey Map
- Wireframes
- Functional Requirements
- Business Rules
- Data Model
- System Architecture
- API Design
- Jira Backlog
- Sprint Planning
- Engineering Workflow
- QA Strategy
- Test Cases & Bug Log
- Working MVP

---

# Revision History

| Version | Date | Author | Summary |
|----------|------|--------|---------|
| 1.0 | July 2026 | Tsadia Mabel | Initial retrospective template created before development |
| 2.0 | September 2026 | Tsadia Mabel | Filled in every section with the actual project history: sprint-by-sprint reflections, the four real bugs and their root causes, the rule-based-to-embedding-based and messaging-excluded-to-included scope reversals, honest (not yet measured) product metrics, and an honest assessment that most of the newly written test suite has not yet been executed and the GitHub repository has not yet caught up to the local build |
