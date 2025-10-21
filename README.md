# ✈️ Airplane Booking Management Service
Welcome to the Airplane Booking Management Service! This is a robust RESTful API built with Node.js and Express that manages airplane, airport, city, and flight data, forming the backend for a simple flight booking system. It uses Sequelize as the ORM for database interactions.

## ✨ Features

This service provides comprehensive CRUD operations and business logic for managing key entities in a flight booking system:

### Airplane, City, and Airport Management
- Complete CRUD functionality for these entities.
- Associate airports with specific cities.

### Flight Management
- Create flight details, linking to airplanes.
- Specify departure and arrival airports by their unique codes.

### Advanced Filtering & Search
- Retrieve flights based on dynamic criteria:
  - Origin-destination pairs (trips)
  - Price range
  - Available seats (travellers)
  - Departure date

### Concurrency-Safe Seat Updates
- Reliable seat inventory management using:
  - Sequelize Transactions
  - Row-level locking (`FOR UPDATE`) in the repository layer
- Ensures thread safety during booking/cancellation operations.

### Layered Architecture
- Organized using the **Controller-Service-Repository** pattern.
- Improves maintainability, testability, and separation of concerns.

### Robust Error Handling
- Centralized error management using `AppError`.
- Standardized JSON responses (`SuccessResponse` / `ErrorResponse`) for consistent API output.

### Request Validation
- Dedicated middleware for validating incoming request data.
- Checks required fields and data types.

### Logging
- Implemented using **Winston** for structured application logging.

## 🛠️ Tech Stack

| Component       | Technology       | Description                                           |
|:-----------------|:-----------------|:-------------------------------------------------------|
| **Backend**         | Node.js, Express.js | Core framework for the API.                           |
| **Database ORM**    | Sequelize        | Promise-based ORM for MySQL.                          |
| **Database Driver** | mysql2           | Required driver for Sequelize to connect to MySQL.   |
| **Logging**         | Winston          | For structured and flexible application logging.     |
| **Configuration**   | dotenv           | For managing environment variables (.env).           |
| **Containerization**| Docker           | Setup file provided for easy deployment via containers. |

## Directory Structure

```text
└── src/
    ├── config/           # Server, logger, and database configurations.
    ├── controllers/      # Request handlers that call the business logic (services).
    ├── middlewares/      # Request validation logic for endpoints.
    ├── migrations/       # Sequelize files to manage database schema changes.
    ├── models/           # Sequelize model definitions (Airplane, Airport, City, Flight, Seat) and associations.
    ├── repositories/     # Data Access Layer (DAL); logic for raw database interaction (CRUD operations, including row locking).
    ├── routes/           # Defines API endpoint structure and directs traffic to controllers.
    ├── seeders/          # Initial data for populating the database.
    ├── services/         # Business Logic Layer (BLL); handles application logic, validation, and orchestrates repository calls.
    └── utils/            # Shared utilities (Enums, custom AppError, helper functions, and response formats).
```
## 🚀 Getting Started

Follow these steps to get your development environment up and running.

### Prerequisites

- Node.js (LTS version recommended)  
- MySQL Database instance  
- npm or yarn  

---

### Installation and Setup

**1. Clone the repository:**

```bash
git clone https://github.com/manishbobburi/airplane-service.git
cd airplane-service
```
**2\. Install dependencies:**