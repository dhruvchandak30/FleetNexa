# Fleet Nexa - On-Demand Logistics Platform

Fleet Nexa is an on-demand logistics platform designed to efficiently connect users with drivers for goods transportation services. It leverages a microservice architecture to provide real-time tracking, dynamic pricing, and scalable fleet management. The system ensures high throughput, scalability, and low-latency performance using technologies like WebSocket, Redis, Kafka, and PostgreSQL.

## Features

- **User Booking System**: Users can book transportation services, and drivers can accept requests.
- **Real-Time Location Tracking**: Continuous updates for both users and drivers using WebSockets.
- **Dynamic Pricing**: Cost is calculated based on factors such as distance, vehicle type, and time.
- **Admin Management**: Manage the fleet, bookings, drivers, and availability from the admin panel.
- **Scheduled Bookings**: Users can make bookings for future dates and times.
- **Driver Ratings**: Users can rate drivers after deliveries, contributing to quality control.

## System Architecture

- **Microservice Architecture**: Independent services for core functionalities like booking, tracking, and admin.
- **Real-Time Location Storage**: Redis stores live GPS data for fast retrieval and low-latency updates.
- **Kafka**: Manages communication between services using an event-driven approach.
- **Sharding and Scaling**: PostgreSQL sharding by user email ensures high performance and scalability.

## Tech Stack

- **Next.js**: Frontend framework for server-side rendering.
- **TypeScript**: Provides type safety and scalability.
- **Node.js**: Backend framework for handling multiple concurrent requests.
- **PostgreSQL**: Primary database for storing users, bookings, and drivers.
- **Redis**: Used for caching and live location tracking.
- **Kafka**: Event-driven messaging between services.
- **Supabase**: Simplifies database operations and user authentication.

## How to Start the Project

Fleet Nexa uses Docker for containerization of its services. To get started, follow these steps:

### Prerequisites

- Ensure you have **Docker** and **Docker Compose** installed on your machine.

### Steps to Start

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/fleetnexa.git
   cd fleetnexa
   ```

2. Run the following command to start all services using `docker-compose`:

   ```bash
   docker-compose up --build
   ```

   This will build and start the following services:
   
   - **Client**: Accessible at `http://localhost:3000`
   - **Admin Service**: Accessible at `http://localhost:5001`
   - **Booking Service**: Accessible at `http://localhost:5000`

3. You can stop the services with:

   ```bash
   docker-compose down
   ```

### Environment Variables

Each microservice runs in development mode by default, and the following environment variables are set in the `docker-compose.yml` file:

- `NODE_ENV=development`

### Running Individual Services

If you need to run a specific service, navigate to the service directory and use Docker Compose:

```bash
cd client  # or admin-service, booking-service
docker-compose up --build
```

## Scaling

The system is designed to scale using:
- **Horizontal scaling**: Scale individual services based on demand.
- **Database sharding**: Distributes data across PostgreSQL shards.
- **Redis caching**: For frequently accessed data like live locations.

For detailed monitoring, consider using **Prometheus** and set up necessary **alerts** to handle traffic surges and failures.

---

This README provides a concise overview of the project and steps to get started. For more detailed information, refer to individual service documentation or the project wiki.