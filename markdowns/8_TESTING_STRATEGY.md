# OpsMind Enterprise — Testing & Validation Strategy

> **Document Owner:** Aryan Thakur — Lead Engineer  
> **Project:** OpsMind Enterprise AIOps Platform  
> **Document Type:** Testing & Quality Assurance Strategy  
> **Status:** Enforced  
> **Version:** 1.0.0  
> **Last Updated:** November 2026  
> **Target Audience:** Developers, QA Engineers, DevOps Engineers, and AI Coding Assistants

---

## 1. Purpose & Quality Objectives

This document defines the testing methodology, validation procedures, quality gates, and release-readiness requirements for the OpsMind Enterprise AIOps Platform.

The objective is to ensure that every application release maintains functional correctness, security, performance, reliability, and compatibility with existing features.

### 1.1 Quality Objectives

- Prevent regressions across existing application functionality.
- Validate frontend and backend behavior.
- Ensure authentication and authorization work correctly.
- Verify database operations and tenant isolation.
- Validate cloud integrations and operational workflows.
- Detect security vulnerabilities before production deployment.
- Establish repeatable performance testing.
- Maintain a production availability objective of 99.9%.

**Reliability Note:** The 99.9% availability objective must be measured through production monitoring and defined service-level indicators. Passing automated tests alone does not establish this availability.

---

## 2. Testing Pyramid

OpsMind follows the Testing Pyramid to establish fast feedback loops and cost-effective test coverage.

```text
                 /\
                /  \
               / E2E \
              / PLAYWRIGHT \
             /------------\
            / INTEGRATION  \
           / PYTEST + TESTCLIENT \
          /--------------------\
         /      UNIT TESTS      \
        /   PYTEST + VITEST      \
       /________________________\
```

### 2.1 Testing Distribution

| Test Layer | Target Distribution | Characteristics |
|---|---:|---|
| Unit Tests | 70% | Fast, isolated, low execution cost |
| Integration Tests | 20% | Validate interactions between components |
| E2E Tests | 10% | Validate complete user journeys |

These percentages are planning guidelines, not mandatory pass/fail ratios for individual test suites.

### 2.2 Testing Principles

- Unit tests should cover the majority of application logic.
- Integration tests should validate important service boundaries.
- E2E tests should focus on critical user journeys.
- Tests must be deterministic and repeatable.
- Avoid unnecessary dependencies between tests.
- Use isolated test data and environments.
- Never use production credentials or destructive production operations during automated testing.

---

## 3. Test Types & Approved Tools

### 3.1 Frontend Unit Testing

**Tool:** Vitest

**Scope:**
- React component behavior.
- Custom React Hooks.
- Utility functions.
- Input validation.
- UI state transitions.
- Error and loading states.

**Example Test Case:**

Validate that the `formatDate()` utility returns the expected formatted date for valid input.

**Command:**

```bash
npm run test
```

**Additional Requirements:**

- Test components independently where practical.
- Test user interactions.
- Validate conditional rendering.
- Cover important edge cases.
- Avoid tests that depend on implementation details rather than observable behavior.

**Dependency Note:** Vitest is a separate testing dependency; it is not included automatically with Vite. Its installation and version must follow the project's dependency approval process.

### 3.2 Backend Unit & Integration Testing

**Tools:**
- Pytest
- FastAPI TestClient

**Scope:**
- API endpoint behavior.
- Database CRUD operations.
- JWT authentication and validation.
- Pydantic request validation.
- Business logic.
- Authorization and RBAC.
- Tenant isolation.
- Error handling.

**Example Test Case:**

Verify that:

```text
POST /api/v1/incidents
```

returns HTTP `201 Created` when a valid incident is submitted and that the record is persisted correctly.

**Command:**

```bash
pytest
```

**Additional Requirements:**

- Use isolated test databases.
- Validate expected HTTP status codes.
- Test invalid request payloads.
- Test unauthorized and forbidden requests.
- Verify database rollback behavior.
- Test both successful and failed operations.

### 3.3 End-to-End Testing

**Tool:** Playwright

E2E testing validates complete application workflows through a real browser environment.

**Command:**

```bash
npx playwright test
```

#### Critical User Journeys

**Flow 1 — Authentication**

1. User opens the public landing page `/`.
2. User navigates to `/auth`.
3. User enters valid credentials.
4. Frontend submits the authentication request.
5. Backend validates the credentials.
6. User is redirected to `/dashboard`.

**Expected Result:** An authenticated user can access protected application routes.

**Flow 2 — Incident Management**

1. User opens the dashboard.
2. User navigates to Incident Management.
3. User creates a new incident.
4. Backend validates and persists the incident.
5. Frontend refreshes or updates the incident list.

**Expected Result:** The created incident appears with the correct details and severity.

**Flow 3 — AI Copilot**

1. User navigates to `/ai-copilot`.
2. User enters a message.
3. Frontend submits the request.
4. Backend processes the request through the configured AI service.
5. Frontend displays the returned response.

**Expected Result:** The configured service returns a valid response or a clearly handled error.

**Important:** If the AI Copilot is operating in demo or mock mode, tests must explicitly identify that mode. A simulated response must not be treated as proof of real LLM integration.

### 3.4 Security Testing

**Tools:**
- GitHub CodeQL
- Dependabot

**Scope:**

- Static application security analysis.
- Identification of potentially unsafe code patterns.
- Dependency vulnerability monitoring.
- Detection of insecure API usage.
- Review of authentication and authorization logic.
- Validation of secret-handling practices.

**Required Checks:**

- [ ] CodeQL workflow executes successfully.
- [ ] Dependency vulnerability alerts are reviewed.
- [ ] No known critical vulnerability remains unaddressed without an approved exception.
- [ ] Secrets are not exposed in source code or logs.
- [ ] Authentication and authorization tests pass.
- [ ] Cross-tenant access attempts are rejected.

### 3.5 Load & Performance Testing

**Tool:** k6

**Objective:** Evaluate backend behavior under simulated concurrent workloads.

**Initial Test Target:** Up to 1,000 concurrent virtual users.

**Primary Endpoint:**

```text
/metrics
```

**Metrics to Measure:**

- Request latency.
- Throughput.
- Error rate.
- CPU utilization.
- Memory consumption.
- Database connection utilization.
- Application resource consumption.

**Validation Requirements:**

- [ ] Define workload scenarios.
- [ ] Define virtual-user ramp-up.
- [ ] Define test duration.
- [ ] Define acceptable latency thresholds.
- [ ] Record throughput and error rates.
- [ ] Identify resource bottlenecks.
- [ ] Document test environment and results.

**Important:** 1,000 concurrent virtual users is a test target, not a verified system capacity. Performance claims must be supported by reproducible test results.

---

## 4. Manual Smoke Testing Checklist

Manual smoke testing must be performed before every production release.

The responsible developer or QA engineer must validate the critical application workflows.

### 4.1 Authentication Validation

- [ ] Can a new user register with a valid email address?
- [ ] Does the backend hash passwords correctly before storage?
- [ ] Does invalid login display an appropriate error notification?
- [ ] Are protected routes redirected to `/auth` when the user is unauthenticated?
- [ ] Does an expired authentication token receive appropriate handling?
- [ ] Are unauthorized operations rejected by the backend?
- [ ] Does role-based access behave correctly?

### 4.2 UI/UX Validation

- [ ] Does the splash screen fade out smoothly after the configured 2.5-second progress interval?
- [ ] Does the dashboard render correctly on desktop?
- [ ] Does the sidebar collapse appropriately on mobile?
- [ ] Are responsive layouts working correctly?
- [ ] Do Recharts telemetry visualizations update without unexpected flickering?
- [ ] Are loading and error states displayed properly?
- [ ] Are keyboard navigation and focus states functional?

### 4.3 Core Functionality Validation

- [ ] Can a user create incidents with severity levels P0–P4?
- [ ] Are incident records displayed correctly?
- [ ] Can users download the incident CSV export?
- [ ] Does the AI Copilot handle a system-health query?
- [ ] Does the Copilot clearly handle unavailable or simulated services?
- [ ] Does the Cloud Connector form reject empty required fields?
- [ ] Are invalid cloud credentials handled safely?
- [ ] Are audit events recorded for supported operations?
- [ ] Are organization-scoped records isolated correctly?

### 4.4 Infrastructure Validation

- [ ] Does the frontend container start successfully?
- [ ] Does the backend container start successfully?
- [ ] Does PostgreSQL pass its health check?
- [ ] Can the backend establish a database connection?
- [ ] Does Nginx route frontend and API requests correctly?
- [ ] Are environment variables configured correctly?
- [ ] Are persistent database volumes functioning?
- [ ] Are application logs free of exposed secrets?

---

## 5. CI/CD Testing Gates

The GitHub Actions workflow is responsible for enforcing automated quality checks.

**Workflow Location:**

```text
.github/workflows/ci.yml
```

### 5.1 Pull Request Validation

On every pull request targeting the protected integration branch:

1. Checkout source code.
2. Install frontend dependencies.
3. Run frontend linting and tests.
4. Execute the frontend production build.
5. Install backend dependencies.
6. Run backend tests.
7. Generate backend coverage results.
8. Execute configured security checks.

**Merge Requirements:**

- Required CI checks must pass.
- Required review approvals must be obtained.
- No unresolved blocking security issue may remain.
- The pull request must satisfy repository branch protection rules.

A failing required status check must prevent merging when branch protection is configured to enforce it.

### 5.2 Merge to Main

After approved changes are merged:

1. Build frontend production assets.
2. Build backend Docker image.
3. Validate Docker image build success.
4. Tag images with an appropriate version or commit identifier.
5. Publish images to the configured registry.
6. Execute deployment only through the approved release workflow.

If a required build or release gate fails, the deployment must be halted.

### 5.3 Backend Coverage Requirement

<badge color="success">Minimum 70%</badge>

The backend must maintain at least 70% automated test coverage.

Coverage requirements:

- Measure coverage using the approved coverage tooling.
- Generate reports during CI.
- Enforce the threshold through the pipeline.
- Investigate decreases in coverage.
- Prioritize security-sensitive and business-critical modules.

**Coverage Note:** Coverage percentage alone does not establish test quality. Tests must validate meaningful behavior and failure scenarios.

---

## 6. Bug Reporting & Defect Management

Every discovered defect must be documented and tracked through GitHub Issues.

### 6.1 Bug Reporting Workflow

1. Create a GitHub Issue.
2. Apply the `bug` label.
3. Provide a clear issue title.
4. Include steps to reproduce.
5. Document expected behavior.
6. Document actual behavior.
7. Attach relevant screenshots or sanitized logs.
8. Record the affected environment and application version.
9. Assign the issue to the responsible engineer.
10. Validate the fix before closing the issue.

### 6.2 Bug Severity Classification

| Severity | Description | Example |
|---|---|---|
| Critical | Major security issue or complete service failure | Authentication bypass, production outage |
| High | Important functionality unavailable | Incident creation completely failing |
| Medium | Partial functionality failure | CSV export formatting issue |
| Low | Minor UI or usability defect | Incorrect icon alignment |

### 6.3 Bug Resolution Requirements

A bug may be closed only when:

- The root cause is understood.
- A corrective change is implemented.
- Relevant tests pass.
- Regression risk is evaluated.
- The fix is validated in the target environment.
- Documentation is updated when necessary.

---

## 7. Test Data & Environment Management

Testing must use controlled environments and isolated test data.

### Environment Standards

| Environment | Purpose |
|---|---|
| Local Development | Developer-level validation |
| Automated Test | Unit and integration test execution |
| Staging | Release-candidate validation |
| Production | Live application operations |

### Data Protection Rules

- Do not use real production secrets in test environments.
- Avoid exposing personal or confidential information in test fixtures.
- Use synthetic or appropriately anonymized test data.
- Reset test databases where required.
- Avoid destructive test operations against production systems.
- Keep cloud testing permissions restricted.

---

## 8. Regression Testing Strategy

Regression testing ensures that new changes do not break existing functionality.

### Required Regression Areas

- Authentication and session management.
- Protected route navigation.
- Dashboard telemetry.
- Incident creation and listing.
- CSV export.
- Organization switching.
- Role-based access.
- Audit log recording.
- Cloud connector validation.
- Database persistence.
- Nginx routing and Docker service communication.

Regression tests must be updated whenever existing application behavior changes.

---

## 9. Production Release Validation

Before a release is approved, the engineering team must validate the following areas.

| Category | Validation Requirement |
|---|---|
| Frontend | Tests, linting, responsive UI, production build |
| Backend | Unit tests, API integration tests, validation |
| Authentication | JWT lifecycle, password hashing, authorization |
| Database | Migrations, persistence, rollback, tenant isolation |
| Security | SAST, dependency scanning, secret protection |
| Infrastructure | Docker builds, health checks, Nginx routing |
| Performance | k6 test results and bottleneck analysis |
| E2E | Critical user journeys |
| Documentation | Updated setup and release instructions |
| Recovery | Backup and rollback procedures |

### Release Decision

A release must not proceed when:

- Critical automated tests fail.
- A blocking security issue remains unresolved.
- Database migrations are unvalidated.
- Critical user journeys are broken.
- Required infrastructure services are unhealthy.
- The deployment or rollback process is not sufficiently validated.

Approved exceptions must be documented with explicit risk acceptance.

---

## 10. Test Execution Commands

The following commands represent the intended project test entry points. They must be configured in the corresponding package scripts and project tooling.

### Frontend

```bash
# Run frontend tests
npm run test

# Build production assets
npm run build
```

### Backend

```bash
# Execute backend test suite
pytest

# Generate coverage report
pytest --cov
```

### E2E

```bash
# Execute Playwright tests
npx playwright test
```

### Load Testing

```bash
# Execute k6 workload
k6 run load-test.js
```

### Infrastructure

```bash
# Validate Docker Compose configuration
docker compose config

# Start application services
docker compose up --build -d

# Inspect running containers
docker compose ps

# Inspect application logs
docker compose logs
```

---

## 11. Testing Governance & Responsibilities

| Role | Responsibility |
|---|---|
| Lead Engineer | Approves testing standards and release gates |
| Frontend Developer | Maintains frontend unit and integration tests |
| Backend Developer | Maintains backend tests and API validation |
| QA Engineer | Validates user workflows and regression scenarios |
| DevOps Engineer | Maintains CI/CD, infrastructure, and deployment validation |
| AI Coding Assistant | Follows testing requirements and reports actual test results |

All contributors are responsible for testing the code they introduce or modify.

---

## 12. Definition of Test Completion

A testing task is considered complete only when the applicable requirements are satisfied.

- [ ] Relevant tests have been implemented.
- [ ] Tests execute successfully.
- [ ] Expected and failure scenarios are covered.
- [ ] Regression impact has been evaluated.
- [ ] Security implications have been reviewed.
- [ ] Coverage requirements are satisfied.
- [ ] Test results are documented.
- [ ] Known limitations are recorded.
- [ ] Required CI checks pass.

Never report a test as passed unless it has actually executed successfully.

---

## 13. Final Quality Commitment

OpsMind Enterprise follows a continuous testing and validation approach.

Every change must be validated at the appropriate level before it becomes part of a production release.

The engineering team is committed to:

- Preventing regressions.
- Maintaining secure application behavior.
- Validating infrastructure integrations.
- Monitoring production reliability.
- Automating repeatable quality checks.
- Continuously improving test coverage.

**Engineering Principle:**

> Test early. Validate continuously. Prevent regressions. Release responsibly.

---

**Document Owner:** Aryan Thakur — Lead Engineer  
**Project:** OpsMind Enterprise AIOps Platform  
**Document:** TESTING_STRATEGY.md  
**Version:** 1.0.0  
**Status:** Enforced  
**Review Cycle:** Every sprint and before major releases