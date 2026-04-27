# Task Management System (Oristo Assessment)

## 👨‍💻 Author
**Yash Maheshwari**

---

# 1. Overview

This project is a Task Management Application that allows users to manage tasks efficiently.
It supports full CRUD operations (Create, Read, Update, Delete) along with search and filtering capabilities.
The system is designed using a modern full-stack architecture, where:
- The backend exposes REST APIs
- The frontend consumes APIs to provide an interactive user experience
- The database stores task and user-related information with proper relationships


# 2. Explanation of DB Design

### 2.1 ER Diagram

```
Users (ApplicationUser)
─────────────────────────────
Id               (PK, VARCHAR)
UserName         VARCHAR(256) NOT_NULL
Email            VARCHAR(256) NOT_NULL
PasswordHash     VARCHAR      NOT_NULL
RefreshTokenHash VARCHAR      NULL
CreatedOn        DATETIME2

        │ 1                    │ 1
        │                      │
        ▼ *                    ▼ *

Tasks
──────────────────────────────────
Id               (PK, INT, IDENTITY)
Title            VARCHAR(200)   NOT NULL
Description      VARCHAR(2000)  NULL
IsCompleted      BOOL           
DueDate          DATETIME2      NULL
Status           INT            (0-2)
Remarks          VARCHAR(1000)  NULL
CreatedOn        DATETIME2
UpdatedOn        DATETIME2
CreatedBy        (FK → AspNetUsers.Id)
UpdatedBy        (FK → AspNetUsers.Id)
```

### 2.2 Data Dictionary


| Column | Type | Nullable | Notes |
|---|---|---|---|
| Id | INT IDENTITY | No | PK |
| Title | VARCHAR(200) | No | Required |
| Description | VARCHAR(2000) | Yes | |
| IsCompleted | Bool | No | Set if a task is Completed |
| DueDate | DATETIME2 | Yes | Optional deadline |
| Status | INT | No | 0=Pending, 1=InProgress, 2=Completed |
| Remarks | VARCHAR(1000) | Yes | Extra notes |
| CreatedOn | DATETIME2 | No | Set on insert, UTC |
| UpdatedOn | DATETIME2 | No | Updated on every save |
| CreatedById | VARCHAR(450) | No | FK to Users |
| UpdatedById | VARCHAR(450) | No | FK to Users |

### 2.3 Indexing Used

### 2.4 Approach Used

Code First approach (Entity Framework) has been used, because of the following reasons:
- Schema evolves with code changes
- Migrations are version-controlled
- Faster development and maintainability
- Reduces dependency on manual database scripts


# 3. Structure of the Application

### 3.1 Architecture Used

The application follows a Single Page Application (SPA) with API binding.
- Backend provides REST APIs
- Frontend consumes APIs dynamically
- Clear separation between UI and business logic

Reasons:
- Better scalability
- Improved user experience
- Backend can be reused for other clients (mobile apps, etc.)

# 4. Frontend Structure

A web-based frontend is used, because of the following reasons:
- Easy to develop and deploy
- Provides responsive and interactive UI
- Seamless API integration
- Suitable for assignment requirements

# 5. Build and Install

### 5.1 Dependencies
- .NET 10 SDK
- Node.js (v18 or above)
- Docker & Docker Compose
- SQL Server (via Docker)

### 5.2 Build Instructions

#### 5.2.1 Docker Setup

```
cd Docker
docker compose up --build
```

### 5.3 Run Instructions

#### 5.3.1 Backend

```
cd backend
dotnet ef migrations add InitialCreate
```

#### 5.3.2 Frontend
```
cd frontend
npm install
npm start
```

#### 5.3.3 General Documentation
- The application uses JWT-based authentication
- Database schema is managed using EF Core migrations
- Environment variables are managed via .env file
- Some credentials are included in docker-compose.yml for ease of setup
- Designed with clean separation of concerns between layers


## Features:
- User Authentication (JWT based)
- Create, Read, Update, Delete (CRUD) Tasks
- Task attributes include:
  - Title
  - Description
  - Due Date
  - Status (Pending / InProgress / Completed)
  - Remarks
  - Created / Updated timestamps
  - Created By / Updated By tracking
- Search and Filter functionality
- Role-based extensible architecture (future scope)

## Things to consider

- I've created a .env file in Docker, but still sharing password in docker-compose file, so that it runs in your system