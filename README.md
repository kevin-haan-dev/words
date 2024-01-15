# WORDS.

This is a microservice project using event-driven design. It collects data via a WordPress API, processes it to count the words for each post, and sends it to the Frontend via a WebSocket Server.

## Start

1. **Run:** `docker compose up`
2. **Visit:** [127.0.0.1](http://127.0.0.1)

## Structure

This project uses Docker for containerization.

### CollectorService

- **Description:**
  - Collects data from WordPress API
- **Language:**
  - Scala
- **Frameworks & Libraries:**
  - Akka
  - SLF4J
- **Directory:**
  - Backend/CollectorService

### ProcessorService

- **Description:**
  - Processes the collected data to count words
- **Language:**
  - Node.js
- **Frameworks & Libraries:**
  - Winston
  - JSDOM
  - Jest
- **Directory:**
  - Backend/ProcessorService

### WebSocketService

- **Description:**
  - Sends processed data to the Frontend
- **Language:**
  - Node.js
- **Frameworks & Libraries:**

  - Node.js
  - Winston
  - ws
  - Jest

- **Directory:**
  - Backend/WebSocketService

### Frontend

- **Description:**
  - Displays the word counts from posts
- **Language:**
  - React
- **Frameworks & Libraries:**
  - Framer Motion
  - React Toastify
- **Directory:**
  - Frontend

### Message Broker

- **Description:**
  - Allows for communication between Backend services
- **Tool:**
  - RabbitMQ
- **Directory:** -

### NGINX

- **Description:**
  - Reverse Proxy between Frontend and Backend
- **Directory:**
  - NGINX
# words
