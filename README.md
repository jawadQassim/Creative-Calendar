# Cineverse

A movie discovery application built with React, Vite and TypeScript, with multilingual UI support. This repository keeps its original name, `Creative-Calendar`; the application lives in `artifacts/cineverse`.

## Technology

- React and Vite for the web application.
- TypeScript throughout the workspace.
- Tailwind CSS and Radix UI components.
- TanStack Query for client data fetching.
- i18next and react-i18next for localization.
- pnpm for workspace package management.

## Repository structure

| Path | Purpose |
| --- | --- |
| `artifacts/cineverse` | Movie application frontend |
| `artifacts/api-server` | API server package |
| `artifacts/mockup-sandbox` | UI sandbox |
| `lib` | Shared workspace libraries |
| `scripts` | Workspace scripts |

## Development commands

Install Node.js and pnpm, then run these commands from the repository root:

```sh
pnpm install
pnpm --filter @workspace/cineverse dev
```

Use the URL printed by Vite. The repository requires pnpm; its preinstall script rejects other package managers. API configuration and any required external service credentials must be set up separately before testing data-dependent features.

## Quality checks and builds

```sh
# Check the frontend
pnpm --filter @workspace/cineverse typecheck

# Check all configured workspace packages
pnpm run typecheck

# Type-check and build the workspace
pnpm run build
```

These commands reflect the committed package scripts. A successful local or production run has not yet been verified as part of the documentation review.

## Project history

The commit history includes contributions from Jawad Qassim and Replit Agent. See the repository history for attribution and implementation changes.

## بالعربية

Cineverse مشروع لاستكشاف الأفلام، بواجهة مبنية باستخدام React وVite وTypeScript ودعم تعدد اللغات. اسم المستودع الحالي هو Creative-Calendar، بينما ملفات التطبيق موجودة داخل `artifacts/cineverse`.
