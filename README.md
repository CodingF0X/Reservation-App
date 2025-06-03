<p align="center">
  <a href="" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">

# Draftr - A Property reservation system

</p>

## Summary

Draftr Reservation System is a distributed microservices application built to handle property listings, user accounts, and reservations end-to-end. It consists of three main contexts (microservice groups): <br/>

1. Eureka Server: A Spring Boot–based service registry that all other services use to find each other.

2. API Gateway: A NestJS gateway that routes incoming HTTP requests to the appropriate microservice, enforces authentication and circuit breaker pattern.

3. Draftr Microservices: A set of NestJS Microservices and that is: <br/>

- Auth
- Property-Category
- Reservations
- Payments
- Notifications

<br/>

each running independently and communicating over TCP and HTTP protocols.

**The primary goal of this application is to demonstrate key microservices and cloud-native concepts << [Please refer to the technical discussin](https://github.com/CodingF0X/Reservation-App/wiki/Technical-Discussions) >>, such as:**

- Service Discovery architectural pattern with Netflix Eureka

- API Gateway architectural pattern

- Circuit breaker pattern

- Synchronous, decoupled microservices using TCP for inter-service calls

- Clean, layered architecture and SOLID principles.

- JWT-based authentication and role-based authorization with Passport on top of Nest.js

- Separation of concerns: each context owns its own data and responsibilities

- Event-driven notifications for asynchronous workflows (email confirmations)

- Scalable containerization via Docker and Docker Compose

<br/>

## Installation
### Quick Start

1. Clone the repository:
    ```sh
    git clone https://github.com/CodingF0X/Reservation-App.git
    ```
4.  run the app:
    ```bash
    docker-compose up
    ```

## Usage 
After spinning up the docker images. Head to http://localhost:3009/api-docs where the API documention exists.
Under each route, you will find details such as what is the body or the param needed to perform the respective API operation as well as the structure of the expected result.

### Usage flow
1. Register
2. Login using the details you registered with.
3. Test the rest of the API ops. 
- example:
  - Create a property.
  - Then create a reservation
  - Get reservations. you will find the one reserved with the Property _id and user_id.

## Within the scope of this project and for testing purposes:
### Exist the Nestjs app and the Grafana Tools under the following URLS :
- API Gateway: http://localhost:3009/
- Microservices
    - Auth service: http://localhost:3001/
    - Reservations service: http://localhost:3002/
    - Payments service: http://localhost:3003/
    - Notifications service: http://localhost:3004/
    - Property-Catalog service: http://localhost:3006/
- Swagger: http://localhost:3009/api-docs
- Prometheus: http://localhost:9090/
- Grafana: http://localhost:3000/

## Application Functionality

At a high level, Draftr lets users register, browse available properties, and make reservations. Administrators can also manage properties and reservations. Behind the scenes, multiple microservices take part in each operation: <br/>

1. **User Management (Auth Service)**

- New users can register with email and password.

- Registered users can log in, receiving a JWT token stored in the HTTP headers.

- Authenticated users can log out, invalidating their session token.

- Role-based guards : certain routes are accessed with certain permissions.

<br/>

2. **Property Management (Property-Category Service)**

- Both regular users and admins can add, update, view, or list properties in the system.

- When a user or admin requests a list of properties or a single property by ID, the API Gateway forwards that request to this service.

- Only admins are allowed to permanently delete a property.

<br/>

3. **Reservations (Reservations Service)**

- Once a user is logged in, they can request to book a property by its ID.

- The Reservations service first asks the Property-Category service (over TCP) whether the property is still available for the chosen dates.

- If the property is available, Reservations calls the Payments service (again over TCP) to charge the user’s credit card via Stripe.

- If the payment succeeds, Reservations saves the new reservation record to its own database.

- After saving, Reservations emits a TCP event to the Notifications service, which sends a confirmation email to the user.

- Users and admins can also update or view reservations; only admins can delete a reservation entirely.

<br/>

4. **Payment Processing (Payments Service)**

- Receives a payment request from Reservations, processes the charge with Stripe, and returns success or failure.

- Does not store credit card details or any related data; simply confirms whether the payment went through.

5. **Notifications (Notifications Service)**

- Listens for “reservation created” events emitted by the Reservations service.

- Sends an email notification to the user who made the reservation, containing details like property name, dates, and payment confirmation.

<br/>

[Link to Functional Requirements](https://github.com/CodingF0X/Reservation-App/wiki/Function-Requirements)

## Architectural Design
![Solution Architecture](https://github.com/user-attachments/assets/41f18043-5f08-4579-a8e9-a5c190aaba06)
## Implementation

### Technologies Used

- NestJS
- MongoDB/Mongoose
- Springboot
- Docker
- Grafana
  - Prmetheus
  - Loki
