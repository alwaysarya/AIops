# OpsMind Enterprise — Technology Stack & Dependency Specification

> **Document Owner:** Aryan Thakur — Lead Engineer  
> **Project:** OpsMind Enterprise AIOps Platform  
> **Document Type:** Technology & Dependency Specification  
> **Status:** Approved & Locked  
> **Version:** 1.0  
> **Last Updated:** November 2026  
> **Target Audience:** Developers, DevOps Engineers, Contributors, and AI Coding Assistants

---

## 1. Purpose & Scope

This document defines the approved technology stack, dependency versions, infrastructure tools, and environment configuration for OpsMind Enterprise.

It establishes a controlled development environment to ensure:

- Technology consistency across the project.
- Predictable dependency management.
- Reduced compatibility issues.
- Secure application configuration.
- Reproducible development and production builds.
- Controlled introduction of third-party packages.

### Dependency Governance Rule

<badge color="success">Strictly Enforced</badge>

**No new dependency, framework, library, or infrastructure tool may be introduced without approval from the Lead Engineer.**

Existing dependencies must not be upgraded, replaced, or removed without evaluating compatibility and documenting the change.

---

## 2. Frontend Technology Stack

**Ecosystem:** React + Vite

The frontend is a React-based Single Page Application (SPA) responsible for the user interface, navigation, infrastructure visualization, and interaction with backend APIs.

| Dependency | Approved Version | Purpose |
|---|---|---|
| React | `^18.2.0` | Core UI library |
| Vite | `^5.0.0` | Frontend development server and build tooling |
| React Router DOM | `^6.20.0` | Client-side routing and protected routes |
| Tailwind CSS | `^3.4.0` | Utility-first styling |
| Axios | `^1.6.0` | HTTP client for backend API communication |
| Recharts | `^2.10.0` | Telemetry charts and visualization |
| Lucide React | `^0.294.0` | Consistent SVG icon library |
| React Hot Toast | `^2.4.1` | Application notifications |
| Simple Icons | `^9.0.0` | Official brand icons for AWS, GCP, and Azure |

### 2.1 Frontend Standards

- React functional components only.
- React Hooks for component state and lifecycle behavior.
- React Router DOM for application navigation.
- Tailwind CSS as the primary styling system.
- Axios through a centralized API client.
- Recharts for supported telemetry visualizations.
- Lucide React for application interface icons.
- React Hot Toast for user-facing notifications.
- Simple Icons for cloud-provider branding.

### 2.2 Frontend Restrictions

- No React class components.
- No Bootstrap or Material UI.
- No additional CSS framework without approval.
- No duplicate HTTP client libraries.
- No unnecessary icon libraries.
- No hardcoded production API endpoints.
- No secrets in frontend environment variables.

**Important:** All `VITE_` environment variables are exposed to the frontend build and must be treated as public configuration.

---

## 3. Backend Technology Stack

**Ecosystem:** Python + FastAPI

The backend provides REST APIs, authentication, business logic, infrastructure integrations, telemetry processing, and database operations.

| Dependency | Approved Version | Purpose |
|---|---|---|
| Python | `3.11.9` | Core backend language |
| FastAPI | `^0.100.0` | Backend API framework |
| Uvicorn | `^0.23.0` | ASGI application server |
| Pydantic | `^2.0.0` | Request validation and data modeling |
| Psycopg2-binary | `^2.9.9` | PostgreSQL database adapter |
| SQLite3 | Python built-in | Local development database |
| Psutil | `^5.9.0` | Host CPU, RAM, and system metrics |
| Boto3 | `^1.28.0` | AWS SDK for Python |

### 3.1 Backend Standards

- FastAPI for API development.
- Pydantic for request and response validation.
- Uvicorn for ASGI application serving.
- SQLAlchemy for application ORM operations.
- Psycopg2 for PostgreSQL connectivity where the synchronous driver is used.
- SQLite3 for compatible local development workflows.
- Psutil for host-level telemetry.
- Boto3 for AWS service integration.

### 3.2 Backend Restrictions

- All application functions must use appropriate type hints.
- Request bodies must use defined validation models.
- Database operations must use parameterized queries or ORM expressions.
- Secrets must be supplied through secure configuration.
- API routes must not contain unnecessary business logic.
- Database access must follow the approved persistence architecture.

**Dependency note:** SQLAlchemy and Alembic are part of the approved architecture. Their exact installed versions must be recorded in the project's dependency lock or pinned requirements.

---

## 4. Security & Authentication Dependencies

These dependencies support authentication, password security, and form-data processing.

| Dependency | Approved Version | Purpose |
|---|---|---|
| Passlib[bcrypt] | `^1.7.4` | Password hashing using bcrypt |
| Python-JOSE | `^3.3.0` | JWT creation and verification |
| Python-Multipart | `^0.0.6` | Multipart and form-data parsing |

### 4.1 Authentication Standards

- Passwords must never be stored in plaintext.
- Use bcrypt password hashing.
- Use JWT for the approved authentication workflow.
- Validate token signatures and expiration.
- Apply authentication dependencies to protected endpoints.
- Enforce authorization on the backend.
- Never expose password hashes or authentication secrets through APIs.

### 4.2 Security Dependency Restrictions

- Do not introduce another password hashing library without approval.
- Do not store signing keys in source code.
- Do not log passwords, JWTs, or access tokens.
- Do not disable authentication checks to bypass development errors.
- Review cryptographic and authentication dependency updates carefully.

**Compatibility note:** Verify the installed Passlib, bcrypt, and Python-JOSE versions together. Dependency compatibility and security maintenance must be evaluated before upgrading.

---

## 5. Infrastructure & DevOps Stack

The infrastructure stack supports containerization, database hosting, reverse proxy configuration, and automated CI/CD.

| Tool | Approved Version | Purpose |
|---|---|---|
| Docker | Approved stable release | Application containerization |
| Docker Compose | Compose specification `3.8` in existing configuration | Multi-container application setup |
| Nginx | Alpine-based image | Reverse proxy and frontend static-file serving |
| PostgreSQL | `15-alpine` | Production relational database |
| GitHub Actions | GitHub-hosted workflows | CI/CD automation |

### 5.1 Docker

- Use separate containers for application services.
- Keep frontend, backend, and database configuration isolated.
- Use Docker Compose for local multi-service development.
- Define service health checks.
- Avoid embedding secrets inside Docker images.
- Use persistent volumes for database storage.
- Keep container images reproducible.

### 5.2 Docker Compose

The current project configuration uses Compose file format `3.8`.

**Clarification:** `3.8` is a Compose file-format declaration, not the installed Docker Compose CLI version.

New configurations should follow the supported Compose specification and the project's existing configuration conventions.

### 5.3 Nginx

Nginx is responsible for:

- Serving the production frontend build.
- Reverse-proxying API requests.
- Managing application routing.
- Supporting HTTPS termination in the deployment architecture.
- Applying appropriate response headers.
- Handling configured request-size and timeout limits.

### 5.4 PostgreSQL

- Production database: PostgreSQL 15.
- Local development: SQLite where compatible.
- Use persistent storage.
- Apply version-controlled database migrations.
- Protect database credentials.
- Configure backups and recovery procedures.
- Validate tenant isolation.

### 5.5 CI/CD

GitHub Actions is the approved CI/CD platform.

The intended pipeline includes:

1. Source checkout.
2. Dependency installation.
3. Frontend linting and build.
4. Backend validation and tests.
5. Security and dependency checks.
6. Docker image build.
7. Docker image publishing.
8. Controlled deployment workflow.

---

## 6. Environment Configuration

Environment variables are used to configure authentication, database connectivity, and frontend API communication.

The following template is intended for `.env.example`.

### 6.1 Backend Environment Variables

```env
# ==========================================
# APPLICATION CONFIGURATION
# ==========================================

APP_ENV=development
DEBUG=false

# ==========================================
# AUTHENTICATION
# ==========================================

JWT_SECRET_KEY=replace_with_a_secure_random_secret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# ==========================================
# DATABASE - PRODUCTION
# ==========================================

DATABASE_URL=postgresql://opsmind_user:replace_me@db:5432/opsmind

# ==========================================
# DATABASE - LOCAL DEVELOPMENT
# ==========================================

# DATABASE_URL=sqlite:///./aiops.db
```

### 6.2 Frontend Environment Variables

```env
# ==========================================
# FRONTEND CONFIGURATION
# ==========================================

VITE_API_BASE_URL=http://localhost:8005
```

### 6.3 Environment Variable Rules

- `.env.example` must contain placeholders only.
- Real `.env` files must remain Git-ignored.
- Production secrets must come from an approved secrets manager or secure deployment configuration.
- Do not commit passwords, tokens, private keys, or API credentials.
- Do not expose backend secrets through `VITE_` variables.
- Validate mandatory environment variables during application startup.
- Maintain separate configurations for development, testing, staging, and production.

**Important:** The database credentials in the example are placeholders, not production credentials.

---

## 7. Dependency Versioning & Locking Policy

The versions in this document define approved dependency constraints.

A caret range such as `^18.2.0` permits compatible updates within the package's declared version range. It does not guarantee that every developer installs the same resolved package version.

### 7.1 Frontend Version Control

- Maintain `package.json`.
- Commit the applicable package lockfile.
- Use the project's approved package manager consistently.
- Use reproducible installation commands in CI/CD.
- Review dependency changes before merging.

### 7.2 Backend Version Control

- Maintain `requirements.txt` or the approved Python dependency manifest.
- Record exact resolved versions in the deployment lock or pinned requirements.
- Validate dependency compatibility.
- Keep development-only dependencies separate where practical.
- Reproduce the same dependency environment in CI/CD.

### 7.3 Upgrade Approval

Any dependency upgrade must include:

1. Reason for the upgrade.
2. Current and proposed versions.
3. Compatibility assessment.
4. Security impact assessment.
5. Relevant test results.
6. Rollback considerations.

No automatic major-version upgrade should be introduced without approval.

---

## 8. Dependency Security & Maintenance

All third-party dependencies must be evaluated for security and maintenance risks.

### Required Practices

- Review security advisories.
- Remove unused dependencies.
- Avoid abandoned packages where practical.
- Evaluate transitive dependencies.
- Review license compatibility.
- Monitor known vulnerabilities.
- Test upgrades before production deployment.
- Keep dependency manifests and lockfiles synchronized.

### Prohibited Practices

- Installing unapproved packages.
- Using arbitrary external scripts in production builds.
- Committing downloaded dependencies unnecessarily.
- Ignoring critical security advisories.
- Replacing approved dependencies without review.
- Upgrading packages solely to obtain an unrelated feature.

---

## 9. Approved Dependency Addition Process

A new dependency may only be introduced when existing approved tools cannot reasonably satisfy the requirement.

### Approval Requirements

| Requirement | Description |
|---|---|
| Technical Justification | Explain why the dependency is required |
| Existing Alternatives | Evaluate whether an approved dependency already solves the problem |
| Security Review | Assess vulnerabilities and maintenance |
| Compatibility | Verify Python, Node.js, and framework compatibility |
| License Review | Confirm acceptable licensing |
| Testing | Validate integration and regression behavior |
| Approval | Obtain Lead Engineer approval |

The dependency must be documented and its lockfile changes reviewed before merging.

---

## 10. Production Configuration Standards

Development configuration must not be reused blindly in production.

### Production Requirements

- Use secure environment configuration.
- Disable debug mode.
- Use HTTPS.
- Protect database access.
- Configure secure authentication settings.
- Use appropriate CORS origins.
- Configure service health checks.
- Use persistent database storage.
- Configure backups and recovery.
- Use pinned or otherwise reproducible container image references.
- Monitor dependency vulnerabilities.
- Avoid floating `latest` image tags for production releases.

---

## 11. Approved Technology Stack Summary

| Layer | Approved Technology |
|---|---|
| Frontend Framework | React 18 |
| Frontend Tooling | Vite 5 |
| Routing | React Router DOM 6 |
| Styling | Tailwind CSS 3 |
| HTTP Client | Axios |
| Visualization | Recharts |
| Icons | Lucide React, Simple Icons |
| Notifications | React Hot Toast |
| Backend Language | Python 3.11 |
| Backend Framework | FastAPI |
| ASGI Server | Uvicorn |
| Validation | Pydantic 2 |
| ORM | SQLAlchemy |
| Migrations | Alembic |
| PostgreSQL Driver | Psycopg2 |
| Local Database | SQLite3 |
| Authentication | Python-JOSE |
| Password Hashing | Passlib[bcrypt] |
| System Monitoring | Psutil |
| Cloud Integration | Boto3 |
| Containerization | Docker |
| Container Management | Docker Compose |
| Reverse Proxy | Nginx |
| Production Database | PostgreSQL 15 |
| CI/CD | GitHub Actions |
| Version Control | Git and GitHub |

---

## 12. Final Technology Governance Statement

OpsMind Enterprise follows a controlled technology strategy.

The approved stack must remain consistent across development, testing, staging, and production environments.

All dependency additions, removals, replacements, and significant version upgrades require explicit approval from the Lead Engineer.

**Engineering Principle:**

> Use the right tools. Minimize dependency risk. Keep environments reproducible. Build for long-term maintainability.

---

**Document Owner:** Aryan Thakur — Lead Engineer  
**Project:** OpsMind Enterprise AIOps Platform  
**Document:** TECH_STACK.md  
**Status:** Approved & Locked  
**Review Cycle:** Whenever an approved technology or dependency changes