# Backend Architecture & Troubleshooting Log (MVP 1)

**Date:** 09.12.2025
**Role:** Kerem (Backend)
**Task:** Backend Setup & API Implementation (CR-8, CR-9)

## 1. Circular Dependency (JSON Serialization)
*   **Issue:** The bidirectional relationship between `Profession` and `RoadmapStep` entities caused a `System.Text.Json.JsonException: A possible object cycle was detected` error during API response serialization.
*   **Resolution (DTO Pattern):**
    *   Instead of returning raw Entity classes directly, I implemented the **DTO (Data Transfer Object)** pattern.
    *   Created `ProfessionDto` in `CareerPath.Core`.
    *   Updated `ProfessionService` to manually map Entity -> DTO. This ensures only necessary data is sent and breaks the infinite reference loop.

## 2. Layer Dependency Violation
*   **Issue:** `ProfessionService` was initially placed in the `CareerPath.Core` project but needed to reference `AppDbContext` (which is in `CareerPath.Data`). This violated Clean Architecture rules (Core should not depend on Data).
*   **Resolution:**
    *   Moved `ProfessionService` implementation to `CareerPath.Data` (specifically `src/CareerPath.Data/Services`).
    *   Kept the `IProfessionService` interface in `CareerPath.Core` to maintain loose coupling.
    *   Registered the service in `Program.cs` accordingly.

## 3. CORS Policy
*   **Issue:** Frontend (running on localhost:517x) was blocked from accessing Backend (localhost:5038).
*   **Resolution:**
    *   Added standard CORS policy "AllowAll" (AllowAnyOrigin, AllowAnyMethod, AllowAnyHeader) in `Program.cs`.

## 4. Database Seeding
*   **Implementation:** Created a `DataSeeder` class that checks if the database is empty on startup and populates it with initial "Backend Developer" and "Frontend Developer" roadmaps.
