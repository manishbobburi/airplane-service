# Airplane Booking Management Service
Welcome to the Airplane Booking Management Service! This is a robust RESTful API built with Node.js and Express that manages airplane, airport, city, and flight data, forming the backend for a simple flight booking system. It uses Sequelize as the ORM for database interactions.

## Tech Stack

| Component       | Technology       | Description                                           |
|:-----------------|:-----------------|:-------------------------------------------------------|
| **Backend**         | Node.js, Express.js | Core framework for the API.                           |
| **Database ORM**    | Sequelize        | Promise-based ORM for MySQL.                          |
| **Configuration**   | dotenv           | For managing environment variables (.env).           |
| **Containerization**| Docker           | Setup file provided for easy deployment via containers. |

## Directory Structure

```
└── src/
    ├── config/
    ├── controllers/
    ├── middlewares/
    ├── migrations/
    ├── models/
    ├── repositories/
    ├── routes/
    ├── seeders/
    ├── services/
    └── utils/
```
## Getting Started

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
**2. Install dependencies:**

```bash
npm install
```
**3. Configure Environment Variables:** Create a .env file in the root directory to configure your database connection and server port.

```bash
# .env example
PORT=3000

# Database Credentials
DB_USERNAME=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_NAME=FlightsDB
DB_DIALECT=mysql
```
**4. Set Up the Database:**

Make sure your database server (MySQL) is running before running migrations.

Run the following commands in your project root:

```bash
# Create the database
npx sequelize-cli db:create

# Run all migrations
npx sequelize-cli db:migrate

# (Optional) Seed the database with sample data
npx sequelize-cli db:seed:all
```
**4. Start the server:**

```bash
npm run dev
# Server will start on the configured PORT (default 3000)
# Output: Server started running on PORT: 3000
```
### Running with Docker
**1. Build teh Docker Image:**

```bash
docker build -t airplane-service .
```

**2. Run the Container:**
```bash
# Example command (adjust database connection details)
docker run -d -p 3000:3000 --name airplane-app airplane-service
```
## API Endpoints
The API is versioned under `/api/v1`.

| Entity   | Method | Endpoint                     | Description                          | Middleware               |
|----------|--------|------------------------------|--------------------------------------|--------------------------|
| **City** |        |                              |                                      |                          |
|          | `POST`   | `/api/v1/cities`           | Create a new city.                   | validateCityName         |
|          | `DELETE` | `/api/v1/cities/:id`       | Delete a city by ID.                 |                          |
|          | `PATCH`  | `/api/v1/cities/:id`       | Update a city name.                  | validateCityName         |    
| **Airplane** |          |                          |                                      |                          |
|              | `POST`   | `/api/v1/airplanes`       | Create a new airplane.               | validateCreateAirplane   |
|              | `GET`    | `/api/v1/airplanes`       | Get all airplanes.                   |                          |
|              | `GET`    | `/api/v1/airplanes/:id`   | Get a specific airplane.             |                          |
|              | `DELETE` | `/api/v1/airplanes/:id`   | Delete an airplane.                  |                          |
|              | `PATCH`  | `/api/v1/airplanes/:id`   | Update an airplane.                  |                          |
| **Airport** |        |                              |                                      |                          |
|             | `POST`   | `/api/v1/airports`        | Create a new airport.                | validateCreateAirport    |
|             | `GET`    | `/api/v1/airports`        | Get all airports (with city details).|                          |
|             | `GET`    | `/api/v1/airports/:id`    | Get a specific airport.              |                          |
|             | `DELETE` | `/api/v1/airports/:id`    | Delete an airport.                   |                          |
|             | `PATCH`  | `/api/v1/airports/:id`    | Update an airport.                   |                          |
| **Flight** |         |                              |                                      |                          |
|            | `POST`   | `/api/v1/flights`         | Create a new flight.                 | validateCreateRequest    |
|            | `GET`    | `/api/v1/flights`         | Search and filter flights.           |                          |
|            | `GET`    | `/api/v1/flights/:id`     | Get a specific flight (with details).|                         |
|            | `PATCH`  | `/api/v1/flights/:id/seats` | Update remaining seats for a flight.| validateUpdateSeatRequest|

## Contributing
Feel free to open issues or pull requests to improve the service!  

**1. Fork the repository.**  
**2. Create your feature branch:**  
   ```bash
   git checkout -b feature/AmazingFeature
   ```
**3. Commit your changes:**
  ```bash
  git commit -m "Add some AmazingFeature"
  ```
**4. Push to the branch:**
```bash
git push origin feature/AmazingFeature
```
**5. Open a Pull Request.**
