# DivvyMate -  Daily Expense Sharing Application


## Introduction

DivvyMate is a backend system designed for a Daily Expense Sharing Application. It allows users to create and manage expenses, split them among participants using three methods (equal, exact amounts, or percentage), and generate downloadable balance sheets. The system uses a microservices architecture to ensure scalability, modularity, and maintainability.







## Features

- **User Management**: Users can register, update, and manage their profile (name, email, mobile number).
- **Expense Management**: Users can add expenses and split them equally, by exact amounts, or by percentage.
- **Balance Sheet**: Users can view and download balance sheets that show individual and overall expenses.
- **Event-Driven Architecture**: Real-time handling of expense events via Kafka.
- **Cache**: Redis is used to cache frequently accessed data, improving response times.
- **Reverse Proxy**: Nginx is used for routing requests between services.



## Tech Stack

### Core Technologies:

- **Node.js**: JavaScript runtime for building backend microservices.
- **Express.js**: Web framework for building APIs (REST and GraphQL).
- **GraphQL**: For flexible and efficient querying of user and expense data.
- **PostgreSQL**: Relational database to store structured data (users, expenses, balance sheets).
- **Sequelize**: ORM for interacting with the PostgreSQL database.
- **Redis**: In-memory caching for session management and frequently accessed data.
- **Kafka**: Message broker for real-time event handling in the expense service.
- **Docker**: Containerization platform for running the entire system in isolated environments.
- **Nginx**: Reverse proxy to route HTTP requests to the appropriate microservices.



### Libraries and Frameworks:



- **Jest/Mocha**: Testing frameworks for unit and integration tests.
- **dotenv**: To manage environment variables across the services.
- **Kafka-node**: Kafka client for producing and consuming events.
- **Apollo Server**: GraphQL server implementation for each service.



## Prerequisites


Before you start, make sure you have the following installed:

- **Git**
- **Docker (and Docker Compose)**
- **Node.js**
- **PostgreSQL**
- **Redis**


## Cloning the Repository

To clone the repository and set up the project:


```bash
git clone https://github.com/your-username/DivvyMate.git
cd DivvyMate
```




### Installation and Setup


- **Environment Variables**:
  - Each service contains its own `.env` file. Copy the `.env.example` files from each microservice directory and configure the required environment variables.
  - Global environment variables (e.g., database connection strings, Redis, Kafka) are in the root `.env` file.
  - Example `.env` for `user-service`:






```bash
DB_URI=postgresql://user:password@localhost:5432/divvymate
REDIS_URL=redis://localhost:6379
KAFKA_BROKER=kafka:9092
```



- **Docker Setup**: Run the following command to start the entire system using Docker Compose:


```bash
docker-compose up --build
```


- This command will:
  - Build Docker images for the microservices (`user-service`, `expense-service`, `balance-sheet-service`).
  - Start the PostgreSQL, Redis, Kafka, and Nginx services.
  - Orchestrate the services to run together in an isolated environment.

- **Accessing the Application**: The application can be accessed at `http://localhost:8080` through Nginx, which routes requests to the respective services:
  - **User service**: `http://localhost:8080/user`
  - **Expense service**: `http://localhost:8080/expense`
  - **Balance sheet service**: `http://localhost:8080/balance-sheet`




## API Documentation

### User Endpoints:
- **POST** `/user`: Create a new user.
- **GET** `/user/{id}`: Retrieve user details by ID.

### Expense Endpoints:
- **POST** `/expense`: Add a new expense and split it (equal, exact, percentage).
- **GET** `/expense/user/{id}`: Retrieve individual user's expenses.
- **GET** `/expense/overall`: Retrieve overall expenses for all users.

### Balance Sheet Endpoints:
- **GET** `/balance-sheet/{userId}`: Generate a balance sheet for the user.
- **GET** `/balance-sheet/download/{userId}`: Download the balance sheet as a PDF.


## Testing

### Unit Testing:
Run the unit tests for individual microservices:

```bash
npm run test
```
### Integration Testing:
For integration testing, which verifies the interaction between multiple microservices:

```bash
npm run test:integration
```


### Dockerized Testing:
To run all tests inside Docker containers:

```bash
docker-compose -f docker-compose.test.yml up --build
```


## Tools and Their Purposes

- **Node.js**: Provides the runtime for the backend microservices.
- **Express.js**: Web framework for building RESTful APIs and integrating GraphQL.
- **GraphQL**: Flexible querying mechanism for data, used in combination with REST APIs.
- **PostgreSQL**: Relational database to store structured data, including users and expenses.
- **Redis**: Caching layer for improving performance, particularly with session data and frequently accessed queries.
- **Kafka**: Used for message brokering, enabling real-time events for expense management.
- **Docker**: Containerization of the application, ensuring consistent deployment and isolated environments.
- **Docker Compose**: Tool to orchestrate and run multi-container Docker applications, making it easier to manage services together.
- **Nginx**: Used for load balancing and routing traffic to various microservices.
- **Sequelize**: ORM for interacting with PostgreSQL, simplifying database interactions and migrations.

## Project Structure


Each microservice is structured with separate concerns like routes, models, controllers, and services. This modular design makes the project scalable and easy to maintain.

```bash
DivvyMate/
├── services/                                   # Contains all backend microservices
│   ├── user-service/                           # Microservice for user management
│   │   ├── Dockerfile                          # Defines Docker image for user-service
│   │   ├── src/                                # Source code for the user service
│   │   │   ├── config/
│   │   │   │   └── config.js                   # Configuration for environment variables (DB, Redis, Kafka, etc.)
│   │   │   ├── controllers/
│   │   │   │   └── userController.js           # Handles requests for creating, updating, and retrieving user data
│   │   │   ├── graphql/
│   │   │   │   ├── userSchema.js               # GraphQL schema definitions for user-related queries and mutations
│   │   │   │   └── userResolver.js             # GraphQL resolvers implementing logic for user operations
│   │   │   ├── models/
│   │   │   │   └── userModel.js                # Sequelize/Postgres model defining the structure of user data
│   │   │   ├── routes/
│   │   │   │   └── userRoutes.js               # Defines Express.js routes for user-related REST API endpoints
│   │   │   ├── services/
│   │   │   │   └── userService.js              # Service layer with business logic for user management
│   │   │   └── app.js                          # Main entry point for the user-service, sets up Express server, GraphQL
│   │   └── package.json                        # Lists Node.js dependencies for the user-service
│   │   └── .env                                # Environment variables specific to the user-service

│   ├── expense-service/                        # Microservice for expense management
│   │   ├── Dockerfile                          # Defines Docker image for expense-service
│   │   ├── src/
│   │   │   ├── config/
│   │   │   │   └── config.js                   # Configuration for environment variables (DB, Redis, Kafka, etc.)
│   │   │   ├── controllers/
│   │   │   │   └── expenseController.js        # Handles requests for creating, updating, and retrieving expenses
│   │   │   ├── graphql/
│   │   │   │   ├── expenseSchema.js            # GraphQL schema definitions for expense-related queries and mutations
│   │   │   │   └── expenseResolver.js          # GraphQL resolvers implementing logic for expense operations
│   │   │   ├── models/
│   │   │   │   └── expenseModel.js             # Sequelize/Postgres model defining the structure of expense data
│   │   │   ├── routes/
│   │   │   │   └── expenseRoutes.js            # Defines Express.js routes for expense-related REST API endpoints
│   │   │   ├── services/
│   │   │   │   └── expenseService.js           # Service layer with business logic for managing expenses
│   │   │   └── app.js                          # Main entry point for the expense-service, sets up Express server, GraphQL
│   │   └── package.json                        # Lists Node.js dependencies for the expense-service
│   │   └── .env                                # Environment variables specific to the expense-service

│   ├── balance-sheet-service/                  # Microservice for balance sheet generation and management
│   │   ├── Dockerfile                          # Defines Docker image for balance-sheet-service
│   │   ├── src/
│   │   │   ├── config/
│   │   │   │   └── config.js                   # Configuration for environment variables (DB, Redis, Kafka, etc.)
│   │   │   ├── controllers/
│   │   │   │   └── balanceSheetController.js   # Handles requests for generating and retrieving balance sheets
│   │   │   ├── graphql/
│   │   │   │   ├── balanceSheetSchema.js       # GraphQL schema definitions for balance sheet queries
│   │   │   │   └── balanceSheetResolver.js     # GraphQL resolvers implementing logic for balance sheet operations
│   │   │   ├── models/
│   │   │   │   └── balanceSheetModel.js        # Sequelize/Postgres model defining the structure of balance sheet data
│   │   │   ├── services/
│   │   │   │   └── balanceSheetService.js      # Service layer with business logic for balance sheet management
│   │   │   └── app.js                          # Main entry point for the balance-sheet-service, sets up Express server, GraphQL
│   │   └── package.json                        # Lists Node.js dependencies for the balance-sheet-service
│   │   └── .env                                # Environment variables specific to the balance-sheet-service

├── kafka/                                      # Kafka setup for event-driven architecture
│   ├── topics/
│   │   └── expenseTopic.js                     # Kafka topic configuration for expense-related events
│   ├── producers/
│   │   └── expenseProducer.js                  # Kafka producer responsible for sending events related to expenses
│   ├── consumers/
│   │   └── expenseConsumer.js                  # Kafka consumer responsible for receiving and processing expense events

├── nginx/                                      # Nginx reverse proxy configuration
│   ├── default.conf                            # Nginx configuration for routing traffic between services
│   └── nginx.Dockerfile                        # Dockerfile to containerize Nginx for reverse proxy

├── postgres/                                   # PostgreSQL setup for the relational database
│   └── init.sql                                # SQL script for initializing the database schema (tables for users, expenses, etc.)

├── redis/                                      # Redis configuration for caching
│   └── redis.conf                              # Configuration file for Redis, such as persistence, memory management, and networking

├── docker-compose.yml                          # Docker Compose file to orchestrate all services (Node.js microservices, Nginx, PostgreSQL, Redis, Kafka)
├── README.md                                   # Documentation for the project (setup instructions, architecture, etc.)
└── .env                                        # Global environment variables shared across services (e.g., database URL, Kafka broker, etc.)

```

## Conclusion

Thank you for exploring the DivvyMate project! This application demonstrates my ability to design and implement a scalable microservices architecture for managing daily expenses. By integrating technologies like Node.js, Kafka, Redis, PostgreSQL, and Docker, the project offers an efficient solution for real-time expense tracking and balance sheet management. I welcome any feedback or questions regarding the design, implementation, and technology choices made throughout the development of this project.




