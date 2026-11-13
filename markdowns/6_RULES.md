# OpsMind Enterprise — Engineering Rules & Development Guidelines

> **Document Owner:** Aryan Thakur — Lead Engineer  
> **Project:** OpsMind Enterprise AIOps Platform  
> **Document:** RULES.md  
> **Status:** Enforced — Strict Mode  
> **Target Audience:** All Developers, Contributors, and AI Coding Assistants  
> **Version:** 1.0  
> **Last Updated:** November 2026

---

## 1. Purpose & Engineering Philosophy

This document establishes mandatory engineering standards for developing, reviewing, testing, securing, and maintaining the OpsMind Enterprise AIOps Platform.

Every developer and AI coding assistant contributing to this repository must follow these guidelines.

The objective is to maintain a codebase that is:

- Secure by design.
- Modular and maintainable.
- Readable and consistent.
- Scalable and testable.
- Reliable in production.
- Easy to extend without unnecessary complexity.

### 1.1 Core Engineering Principles

**DRY — Don't Repeat Yourself**

- Avoid duplicating business logic.
- Extract reusable logic into shared utilities, hooks, services, or components.
- Maintain a single source of truth for shared configuration.
- Do not introduce abstractions for code that does not benefit from reuse.

**KISS — Keep It Simple**

- Prefer straightforward implementations.
- Avoid unnecessary abstractions and excessive dependencies.
- Write code that another engineer can understand quickly.
- Optimize for maintainability before cleverness.

**Security by Design**

- Never trust client-side input.
- Validate and authorize operations on the backend.
- Apply least-privilege access controls.
- Protect sensitive information throughout its lifecycle.
- Treat security as a requirement, not a final development phase.

**Separation of Concerns**

- Keep UI components separate from business logic.
- Keep API routes separate from database operations.
- Keep configuration separate from application code.
- Avoid tightly coupled modules.

**Fail Securely**

- Handle errors without exposing secrets or internal implementation details.
- Reject unauthorized operations by default.
- Avoid silently ignoring security-sensitive failures.

---

## 2. Technology Stack Constraints

The following technology stack is the approved baseline for OpsMind.

| Layer | Approved Technology | Constraint |
|---|---|---|
| Frontend | React 18 | Functional components only |
| Build Tool | Vite | Use the existing project configuration |
| Styling | Tailwind CSS | No additional styling frameworks |
| State Management | React Hooks | Context API when justified |
| Backend | Python 3.11 | Follow Python conventions |
| API Framework | FastAPI | Modular routing |
| Validation | Pydantic | Typed request and response schemas |
| Database | PostgreSQL | Production database |
| Local Database | SQLite | Local development where compatible |
| ORM | SQLAlchemy | Centralized database access |
| Migrations | Alembic | Version-controlled schema changes |
| Authentication | JWT | Secure token lifecycle |
| Password Hashing | bcrypt | Never store plaintext passwords |
| HTTP Client | Axios | Centralized API client |
| Charts | Recharts | Existing charting library |
| Notifications | react-hot-toast | Consistent user feedback |
| Containers | Docker | Reproducible environments |
| Orchestration | Docker Compose | Local multi-service setup |
| Reverse Proxy | Nginx | Routing and deployment configuration |
| Version Control | Git + GitHub | Conventional Commits |
| CI/CD | GitHub Actions | Automated validation and builds |

### Technology Restrictions

- Do not introduce another frontend framework.
- Do not use React class components.
- Do not add Bootstrap, Material UI, or another UI framework.
- Do not introduce a second ORM without explicit architectural approval.
- Do not replace existing project dependencies without evaluating compatibility.
- Do not add packages merely to solve problems that can be handled by existing utilities.

Any change to the approved stack requires review and approval from the Lead Engineer.

---

## 3. Frontend Engineering Rules — React

### 3.1 Component Architecture

- Use functional React components exclusively.
- Use React Hooks for state and lifecycle-related behavior.
- Keep components focused on a single responsibility.
- Extract reusable UI elements into shared components.
- Avoid excessively large components.
- Keep business logic outside presentation components wherever practical.
- Avoid unnecessary prop drilling; use Context API when shared state genuinely requires it.

### 3.2 File Naming Conventions

| File Type | Naming Convention | Example |
|---|---|---|
| React Components | PascalCase | `TopNavbar.jsx` |
| Pages | PascalCase | `Dashboard.jsx` |
| Custom Hooks | camelCase with `use` prefix | `useAuth.js` |
| Utility Files | camelCase | `formatDate.js` |
| API Services | camelCase | `authService.js` |
| Constants | UPPER_SNAKE_CASE for constant identifiers | `API_BASE_URL` |
| CSS Files | Descriptive kebab-case | `animations.css` |

### 3.3 Import Organization

Imports must be grouped consistently:

1. React and React-related imports.
2. External dependencies.
3. Internal components.
4. Internal hooks, utilities, and services.
5. Styles and assets.

Example:

```jsx
import { useEffect, useState } from "react";

import axios from "axios";
import { Activity } from "lucide-react";

import TopNavbar from "../components/TopNavbar";
import { useAuth } from "../hooks/useAuth";
import { formatDate } from "../utils/formatDate";
```

Remove unused imports before committing.

### 3.4 React Hooks

- Follow the Rules of Hooks.
- Never call Hooks conditionally.
- Keep dependency arrays accurate.
- Avoid unnecessary `useEffect` calls.
- Do not use effects to calculate values that can be derived during rendering.
- Clean up subscriptions, event listeners, and timers when required.
- Avoid unnecessary state duplication.

### 3.5 Forms & User Input

- Always call `event.preventDefault()` when handling a standard form submission.
- Validate user input before sending requests.
- Display clear validation messages.
- Disable submission while an operation is in progress when appropriate.
- Prevent accidental duplicate submissions.
- Do not rely on frontend validation as a security control.

### 3.6 API Integration

- Use the centralized API client.
- Avoid duplicating API base URLs across components.
- Wrap asynchronous requests in appropriate error handling.
- Handle loading, success, empty, and error states.
- Display user-friendly notifications through `react-hot-toast`.
- Do not expose backend stack traces or sensitive API responses.
- Avoid hardcoding authentication tokens in application code.

Example:

```jsx
try {
  const response = await apiClient.post("/incidents", payload);

  toast.success("Incident created successfully");

  return response.data;
} catch (error) {
  toast.error("Unable to create incident");
  throw error;
}
```

### 3.7 Styling Rules

- Use Tailwind CSS as the primary styling system.
- Avoid introducing additional CSS frameworks.
- Prefer reusable design tokens and consistent spacing.
- Maintain responsive layouts.
- Ensure accessible color contrast and focus states.
- Avoid unnecessary inline styling.
- Custom CSS is restricted and requires a genuine technical justification, such as complex animations or styles that cannot be reasonably expressed through existing Tailwind utilities.

---

## 4. Backend Engineering Rules — FastAPI

### 4.1 Python Standards

- Use Python 3.11.
- Follow PEP 8 conventions.
- Use descriptive function and variable names.
- Keep functions focused and reasonably small.
- Avoid unnecessary global state.
- Separate routing, business logic, database access, and configuration.

### 4.2 Type Hinting

All application functions must include appropriate type hints for arguments and return values.

Example:

```python
def get_user(user_id: int) -> User:
    ...
```

For asynchronous functions:

```python
async def get_incident(incident_id: UUID) -> IncidentResponse:
    ...
```

Use appropriate types rather than defaulting to `Any`.

### 4.3 Pydantic Validation

- Define Pydantic models for request bodies.
- Define explicit response schemas.
- Validate external input before processing.
- Use appropriate field constraints.
- Reject unexpected or invalid data where required.
- Never accept unrestricted raw dictionaries as substitutes for defined request schemas.

Example:

```python
from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=12)
```

Validation requirements must reflect the application's actual security policy.

### 4.4 API Route Design

- Keep endpoints REST-oriented and predictable.
- Use appropriate HTTP methods.
- Return correct HTTP status codes.
- Use consistent response structures.
- Implement pagination for potentially large collections.
- Apply authentication and authorization dependencies.
- Avoid placing business logic directly inside route handlers.

### 4.5 Database Access

- Use SQLAlchemy for standard database operations.
- Use parameterized queries.
- Never construct SQL statements by concatenating untrusted user input.
- Use transactions for operations requiring atomicity.
- Handle database exceptions appropriately.
- Avoid unnecessary database queries.
- Use migrations for schema changes.
- Verify tenant ownership before accessing tenant-scoped records.

Example using SQLAlchemy:

```python
from sqlalchemy import select

statement = select(User).where(User.id == user_id)

result = await session.execute(statement)
user = result.scalar_one_or_none()
```

### 4.6 Environment Configuration

- Never hardcode secrets.
- Read configuration through centralized settings.
- Use environment variables or an approved secrets manager.
- Validate required configuration during application startup.
- Maintain `.env.example` with placeholder values only.
- Never expose secret values through logs or API responses.

Example:

```python
import os

SECRET_KEY = os.getenv("SECRET_KEY")

if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY is not configured")
```

For larger applications, use a centralized settings module with validated configuration.

### 4.7 Error Handling & Logging

- Use FastAPI exception handling consistently.
- Return meaningful HTTP errors.
- Do not expose internal stack traces to clients.
- Use structured application logging.
- Include request or correlation identifiers where appropriate.
- Redact passwords, tokens, credentials, and sensitive personal information from logs.

---

## 5. Database & Multi-Tenancy Rules

### 5.1 Database Standards

- PostgreSQL is the production database.
- SQLite is permitted for local development where functionality is compatible.
- Use SQLAlchemy models for application persistence.
- Use Alembic for schema migrations.
- Store timestamps in UTC.
- Use consistent identifiers and naming conventions.
- Define appropriate foreign-key constraints.
- Add indexes based on actual query patterns.

### 5.2 Multi-Tenant Isolation

Tenant isolation is a mandatory security requirement.

- Every tenant-scoped record must be associated with an organization.
- Derive organization context from the authenticated identity and validated server-side membership.
- Never trust an organization ID supplied only by the client.
- Apply tenant filters to all tenant-scoped database operations.
- Validate ownership for nested resources.
- Consider PostgreSQL Row-Level Security as an additional defense-in-depth control.
- Test cross-tenant access attempts.

### 5.3 Audit Log Integrity

- Audit events must be attributable to an actor or system process.
- Record relevant actions and timestamps.
- Avoid storing secrets in audit metadata.
- Restrict modification and deletion permissions.
- Use append-only database permissions where appropriate.
- Consider external immutable archival for stronger tamper resistance.

An audit-log table must not be described as immutable unless the database permissions and operational controls actually enforce that property.

---

## 6. Git & Version Control Guidelines

### 6.1 Conventional Commits

All commits must follow the Conventional Commits format.

**Format:**

```text
<type>(<scope>): <subject>
```

### Approved Commit Types

| Type | Purpose | Example |
|---|---|---|
| `feat` | New functionality | `feat(auth): add JWT login` |
| `fix` | Bug correction | `fix(ui): resolve navbar overlap` |
| `docs` | Documentation changes | `docs: update README` |
| `style` | Formatting-only changes | `style(ui): format dashboard components` |
| `refactor` | Internal restructuring | `refactor(api): separate incident services` |
| `test` | Test additions or modifications | `test(auth): add login integration tests` |
| `chore` | Maintenance and tooling | `chore: update dependencies` |
| `perf` | Performance improvements | `perf(api): optimize incident queries` |
| `build` | Build system changes | `build: update frontend configuration` |
| `ci` | CI/CD changes | `ci: add backend test workflow` |
| `security` | Security-related changes | `security(auth): strengthen token validation` |

### 6.2 Git Workflow

- Work on appropriately scoped branches.
- Keep commits small and meaningful.
- Avoid unrelated changes in one commit.
- Review the diff before committing.
- Run relevant tests before pushing.
- Never force-push to protected branches without explicit approval.
- Use pull requests for collaborative review where applicable.

### 6.3 Pre-Push Verification

Before every push:

```bash
git status
git diff --check
git diff --cached
git status --short
```

Verify that only intended files are staged.

Run the applicable test and secret-scanning checks before publishing changes.

---

## 7. Security & Zero-Tolerance Rules

The following practices are strictly prohibited.

### 7.1 Secrets & Credentials

**NEVER:**

- Commit `.env` files.
- Commit API keys or access tokens.
- Commit AWS credentials.
- Commit private certificates or private keys.
- Hardcode secrets in frontend or backend source code.
- Print secrets in terminal logs or application logs.
- Return credentials through API responses.

Use:
- `.env.example` with placeholders.
- Git-ignored local environment files.
- IAM roles and temporary cloud credentials where possible.
- An approved secrets-management solution in production.

### 7.2 Password Security

- Never store plaintext passwords.
- Use bcrypt password hashing.
- Never log passwords.
- Never return password hashes through APIs.
- Use secure password verification.
- Apply appropriate password and authentication policies.

### 7.3 Frontend Security

- Do not use `alert()` for application feedback.
- Use `react-hot-toast` for notifications.
- Avoid unsafe HTML rendering.
- Do not place secrets in frontend environment variables.
- Treat frontend authorization as a UX control, not a security boundary.
- Validate permissions on the backend.

### 7.4 Backend Security

- Validate all incoming data.
- Enforce authentication and authorization.
- Protect against SQL injection.
- Apply rate limits to sensitive endpoints where appropriate.
- Configure CORS explicitly.
- Use HTTPS in production.
- Avoid leaking stack traces.
- Apply least-privilege database and cloud permissions.
- Protect against insecure direct object references.
- Use secure cookie and token configurations appropriate to the authentication design.

### 7.5 Prohibited Development Practices

- No `console.log()` statements in production code.
- No unrestricted Python `eval()` or `exec()` for processing user input.
- No hardcoded production credentials.
- No plaintext password storage.
- No unchecked shell-command execution from user input.
- No disabled authentication checks to make testing easier.
- No silent exception suppression.
- No unreviewed security-sensitive dependency additions.

### 7.6 Type Safety

If a project module is migrated to TypeScript:

- Avoid `any`.
- Prefer explicit interfaces and types.
- Use `unknown` when the input type is genuinely unknown.
- Validate untrusted data at runtime.
- Do not bypass type checking with unnecessary type assertions.

---

## 8. Testing & Quality Assurance

Testing is mandatory for production-facing changes.

### 8.1 Frontend Testing

- Validate critical component behavior.
- Test form validation.
- Test loading and error states.
- Test authentication-dependent navigation.
- Verify responsive behavior.
- Test important user interactions.

### 8.2 Backend Testing

- Write unit tests for business logic.
- Write integration tests for API endpoints.
- Validate Pydantic request and response schemas.
- Test authentication and authorization.
- Test database transactions.
- Test tenant isolation.
- Test error-handling paths.

### 8.3 End-to-End Testing

Use Playwright for critical application journeys.

Initial required workflow:

```text
Login
  |
  v
Dashboard
  |
  v
Incident Management
  |
  v
Incident Details
```

Additional workflows should cover:
- Invalid authentication.
- Session expiration.
- Restricted roles.
- Organization isolation.
- Failed API requests.

### 8.4 Performance Testing

Use k6 for load testing.

Measure:
- Request latency.
- Throughput.
- Error rate.
- CPU utilization.
- Memory consumption.
- Database connection usage.

Performance claims must be supported by documented test results and reproducible test conditions.

---

## 9. AI Coding Assistant Rules

All AI coding assistants working on OpsMind must follow these additional restrictions.

### 9.1 Before Modifying Code

- Inspect the existing project structure.
- Read the relevant source files.
- Understand existing dependencies and conventions.
- Identify related components and API contracts.
- Avoid assuming that a feature is missing without checking.

### 9.2 While Modifying Code

- Modify only files relevant to the requested task.
- Preserve existing working functionality.
- Follow the approved technology stack.
- Avoid unnecessary package installation.
- Avoid replacing complete files when a targeted change is sufficient.
- Never introduce mock data as verified production data.
- Do not silently remove existing functionality.
- Keep code consistent with the current architecture.

### 9.3 After Modifying Code

- Explain which files changed.
- Summarize the implementation.
- Provide commands to run relevant tests.
- Report known limitations.
- Identify any required environment configuration.
- Never claim a test passed unless it was actually executed successfully.
- Never claim a deployment or Git push succeeded unless it was verified.

### 9.4 AI Assistant Security Restrictions

AI coding assistants must never:

- Request or reproduce real production secrets unnecessarily.
- Commit credentials or confidential information.
- Disable security controls to bypass errors.
- Generate fake compliance or security certifications.
- Present simulated functionality as a real integration.
- Execute destructive commands without explaining their impact and obtaining appropriate confirmation.

---

## 10. Code Review Standards

Every production-facing change should be reviewed against the following criteria:

| Review Area | Required Standard |
|---|---|
| Correctness | Implements the requested behavior |
| Readability | Clear naming and understandable logic |
| Architecture | Respects existing module boundaries |
| Security | No introduced security vulnerabilities |
| Performance | No unnecessary expensive operations |
| Validation | Correct input and output validation |
| Error Handling | Failures handled predictably |
| Testing | Relevant tests included and passing |
| Documentation | Required documentation updated |
| Compatibility | Existing functionality remains intact |

Security-sensitive changes require additional scrutiny.

---

## 11. Definition of Done

A task is considered complete only when all applicable requirements are satisfied.

- [ ] Implementation is complete.
- [ ] Code follows the approved architecture.
- [ ] No unused imports or unnecessary debugging statements remain.
- [ ] Required input validation is implemented.
- [ ] Error handling is implemented.
- [ ] Relevant tests pass.
- [ ] Security implications are reviewed.
- [ ] Documentation is updated.
- [ ] No secrets or confidential files are staged.
- [ ] Changes are reviewed.
- [ ] The feature is validated in the intended environment.

---

## 12. Enforcement & Exceptions

These rules apply to all code, configuration, infrastructure, documentation, and automated contributions to OpsMind.

Exceptions require explicit approval from the Lead Engineer.

Any exception must:
1. Explain the technical reason.
2. Identify the affected files or modules.
3. Document security and operational implications.
4. Define the duration or scope of the exception.
5. Include an appropriate follow-up action where necessary.

Security-related restrictions cannot be bypassed merely for convenience or development speed.

---

## 13. Final Engineering Commitment

OpsMind Enterprise is developed with a commitment to engineering quality, security, reliability, and maintainability.

Every contribution must strengthen the platform rather than introduce unnecessary technical debt.

**Engineering Principle:**

> Build deliberately. Validate continuously. Secure by default. Ship with confidence.

---

**Document Owner:** Aryan Thakur — Lead Engineer  
**Project:** OpsMind Enterprise AIOps Platform  
**Document:** RULES.md  
**Status:** Enforced — Strict Mode  
**Review Cycle:** As required or when engineering standards change