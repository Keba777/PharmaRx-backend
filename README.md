# PharmaRx Backend - Online Pharmacy Platform

## Project Overview
The PharmaRx Backend is a crucial component of the PharmaRx platform, responsible for handling user authentication, order management, prescription uploads, and more. Built using TypeScript, Node.js, Express, and MongoDB, the backend provides APIs for communication with the mobile and frontend apps.

## Features:
- User Authentication & Registration (JWT, email verification)
- Prescription Upload & Order Management
- Real-time Notifications
- API Routes for managing medications and users

## Running the Backend with Docker

### Prerequisites:
- Docker and Docker Compose installed

### Steps to run the backend:

1. Clone the repository:
   ```
   git clone https://github.com/Keba777/PharmaRx-backend.git
2. Build the Docker containers:
   ```
   npm run docker:build
3. Start the Docker containers:
   ```
   npm run docker:up
4. To stop the containers:
   ```
   npm run docker:down
6. To view logs:
   ```
   npm run docker:logs