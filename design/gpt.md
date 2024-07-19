For a microservice architecture with two backend servers, you can organize the architecture in a way that ensures clear separation of concerns, scalability, and maintainability. Here’s an example of how you can structure your e-commerce app with two backend servers: one using Node.js with Postgres and the other using Python FastAPI with WebSocket.

### Architecture Overview

1. **Node.js Backend (API Server)**
    - **Tech Stack**: Node.js, Express.js, PostgreSQL
    - **Responsibilities**:
        - Handle user authentication and authorization
        - Manage product listings, orders, and payments
        - Serve public and private APIs for the frontend

2. **Python Backend (Real-time Server)**
    - **Tech Stack**: Python, FastAPI, WebSocket, Redis
    - **Responsibilities**:
        - Handle real-time chat functionality
        - Manage WebSocket connections and events
        - Integrate with Redis for pub/sub messaging

### Microservice Architecture

1. **Frontend (React with Next.js)**
    - Two separate frontends:
        - **Client Site**: For customers to browse products, place orders, and chat with support.
        - **Admin Dashboard**: For admin users to manage products, orders, and monitor chat interactions.

2. **Node.js API Server**
    - **Structure**:
        ```
        /src
        ├── controllers
        │   ├── authController.js
        │   ├── productController.js
        │   └── orderController.js
        ├── models
        │   ├── User.js
        │   ├── Product.js
        │   └── Order.js
        ├── routes
        │   ├── public
        │   │   ├── authRoutes.js
        │   │   └── productRoutes.js
        │   └── private
        │       ├── orderRoutes.js
        │       └── userRoutes.js
        ├── middleware
        │   ├── authMiddleware.js
        │   └── errorMiddleware.js
        ├── config
        │   ├── db.js
        │   └── jwt.js
        ├── app.js
        └── server.js
        ```
    - **Endpoints**:
        - Public endpoints for user registration, login, and product browsing.
        - Private endpoints for order management and user account details.

3. **Python FastAPI Server**
    - **Structure**:
        ```
        /app
        ├── main.py
        ├── models
        │   ├── message.py
        ├── services
        │   ├── chat_service.py
        ├── routers
        │   ├── websocket_router.py
        └── utils
            ├── redis_client.py
        ```
    - **WebSocket Events**:
        - `user-connected`: Store user's socket ID in Redis.
        - `user-disconnected`: Remove user's socket ID from Redis.
        - `send-message`: Handle message creation and broadcast to room.
        - `join-room`: Manage room creation or joining for chat sessions.

### Communication Between Services

1. **REST APIs**: The Node.js server provides RESTful APIs that the frontend (Next.js) consumes. These APIs handle all CRUD operations for products, orders, and users.

2. **WebSockets**: The FastAPI server handles WebSocket connections for real-time communication. This server uses Redis for managing pub/sub messaging, ensuring that messages are delivered in real time.

3. **Message Broker (Redis)**: Redis acts as a message broker to facilitate communication between the two backend services, especially for events like user status updates and chat messages.

### Deployment

- **Containerization**: Use Docker to containerize both backend servers for consistent deployment.
- **Orchestration**: Use Kubernetes or Docker Compose to manage and orchestrate the containers.
- **Load Balancing**: Implement load balancers to distribute incoming traffic across multiple instances of each backend service.
- **Monitoring and Logging**: Use tools like Prometheus and Grafana for monitoring and ELK stack (Elasticsearch, Logstash, Kibana) for logging.

### Example Docker Compose Configuration

```yaml
version: '3.8'
services:
  nodejs-backend:
    build: ./nodejs-backend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - postgres

  fastapi-backend:
    build: ./fastapi-backend
    ports:
      - "8000:8000"
    depends_on:
      - redis

  postgres:
    image: postgres:13
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: ecommerce

  redis:
    image: redis:latest

  frontend:
    build: ./frontend
    ports:
      - "3001:3001"
```

This setup provides a scalable and maintainable microservice architecture for your e-commerce application.