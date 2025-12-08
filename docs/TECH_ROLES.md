# ⚙️ TECHNICAL RULES & GUIDELINES

## 🏗️ BACKEND (C# .NET 8)
* **Architecture:** Clean Architecture (Onion).
    * `Core` (Entities, Interfaces) -> Bağımsız.
    * `Data` (EF Core, Migrations) -> Core'a bağımlı.
    * `API` (Controllers) -> Service'e bağımlı.
* **Database:** PostgreSQL 15 (Docker).
    * **Kritik:** Volume mapping (`postgres_data`) olmadan container çalıştırılamaz.
* **Naming:** `PascalCase` for public members, `_camelCase` for private fields.

## 🎨 FRONTEND (React + Vite)
* **Language:** TypeScript.
* **Styling:** TailwindCSS.
* **Structure:** Feature-based folder structure (components, hooks, services).
* **State:** Context API (veya Zustand).