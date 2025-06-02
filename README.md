<p align="center">
  <a href="" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Functionality

### Functional requirements
Requirement 1 \
Unique Identifier: FR-001 \
Name: User Registration \
Short Description: The system must allow a new user to register by providing a \ valid email, password, and any required profile information.
Priority: High \
Actors/Roles: Unauthenticated User \

Requirement 2  \
Unique Identifier: FR-002 \
Name: User Login \
Short Description: The system must allow a registered user to log in by validating  \credentials and issuing a JWT-based session token. \
Priority: High \
Actors/Roles: Registered User \

Requirement 3 \
Unique Identifier: FR-003 \
Name: User Logout \
Short Description: The system must allow an authenticated user to log out, invalidating their session token. \
Priority: Medium \
Actors/Roles: Authenticated User \

Requirement 4 \
Unique Identifier: FR-004 \
Name: Create Reservation \
Short Description: The system must allow an authenticated user or an admin to create a new reservation for a property, specifying property ID, dates, and any additional metadata. \
Priority: High \
Actors/Roles: Authenticated User, Admin \

Requirement 5 \
Unique Identifier: FR-005 \
Name: Update Reservation \
Short Description: The system must allow an authenticated user or an admin to update an existing reservation (e.g., modify dates or details). \
Priority: High \
Actors/Roles: Authenticated User, Admin \

Requirement 6 \
Unique Identifier: FR-006 \
Name: Find Reservation by ID \
Short Description: The system must allow an authenticated user or an admin to retrieve the details of a specific reservation using its unique identifier. \
Priority: High \
Actors/Roles: Authenticated User, Admin \

Requirement 7 \
Unique Identifier: FR-007 \
Name: List All Reservations \
Short Description: The system must allow an authenticated user or an admin to retrieve a paginated list of all reservations.
Priority: High \
Actors/Roles: Authenticated User, Admin \

Requirement 8 \
Unique Identifier: FR-008 \
Name: Delete Reservation \
Short Description: The system must allow only an admin to delete a reservation record permanently. \
Priority: High \
Actors/Roles: Admin \

Requirement 9 \
Unique Identifier: FR-009 \
Name: Create Property \
Short Description: The system must allow an authenticated user or an admin to add a new property to the catalog by specifying name, description, and other relevant attributes. \
Priority: High \
Actors/Roles: Authenticated User, Admin \

Requirement 10 \
Unique Identifier: FR-010 \
Name: Update Property \
Short Description: The system must allow an authenticated user or an admin to update details of an existing property (e.g., price, description, availability). \
Priority: High \
Actors/Roles: Authenticated User, Admin \

Requirement 11 \
Unique Identifier: FR-011 \
Name: Find Property by ID \
Short Description: The system must allow an authenticated user or an admin to retrieve property details using its unique identifier. \
Priority: High \
Actors/Roles: Authenticated User, Admin \

Requirement 12 \
Unique Identifier: FR-012 \
Name: List All Properties \
Short Description: The system must allow an authenticated user or an admin to retrieve list of all properties. \
Priority: High \
Actors/Roles: Authenticated User, Admin \

Requirement 13 \
Unique Identifier: FR-013 \
Name: Delete Property \
Short Description: The system must allow an authenticated user or an admin to remove a property from the catalog permanently. \
Priority: Medium \
Actors/Roles: Authenticated User, Admin \

Requirement 14 \
Unique Identifier: FR-014 \
Name: Check Property Availability \
Short Description: When a user initiates a reservation, the system must query the Property-Category microservice over TCP to verify that the selected property ID is available for the requested dates. \
Priority: High \
Actors/Roles: Authenticated User, Reservation Service \

Requirement 15 \
Unique Identifier: FR-015 \
Name: Process Payment \
Short Description: If availability is confirmed, the system must invoke the Payments microservice (over TCP) to process the user’s payment via Stripe. \
Priority: High \
Actors/Roles: Reservation Service, Payments Service \

Requirement 16 \
Unique Identifier: FR-016 \
Name: Save Reservation on Successful Payment \
Short Description: Upon receiving a successful payment response from the Payments microservice, the system must persist the reservation record to the database. \
Priority: High \
Actors/Roles: Reservation Service, Database \

Requirement 17 \
Unique Identifier: FR-017 \
Name: Send Reservation Notification \
Short Description: After saving the reservation, the system must emit a TCP event to the Notifications microservice so that an email confirmation is sent to the user who booked. \
Priority: Medium \
Actors/Roles: Reservation Service, Notifications Service

Requirement 18 \
Unique Identifier: FR-018 \
Name: Route Protection \
Short Description: The API Gateway must enforce JWT-based authentication on all protected endpoints, rejecting unauthenticated requests with an appropriate HTTP 401 response. \
Priority: High \
Actors/Roles: API Gateway, Authenticated User \

Requirement 19 \
Unique Identifier: FR-019 \
Name: Role-Based Route Protection \
Short Description: The system must enforce role-based authorization to ensure that only users with the “Admin” role can access or perform high‐privilege actions (e.g., deleting reservations), returning HTTP 403 for unauthorized roles. \
Priority: High \
Actors/Roles: Authenticated User, Admin \

Requirement 20 \
Unique Identifier: FR-020 \
Name: JWT Authentication via Passport \
Short Description: The system must integrate Passport (NestJS) to issue JWT tokens on successful login, store them in HTTP headers (Authorization: Bearer <token>), and validate them on each request. \
Priority: High \
Actors/Roles: Authentication Service, Authenticated User \