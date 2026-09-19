# Natours 2025 Practice


<p align="center">
  <img src="https://i.ytimg.com/vi/3unYpFZO4EE/maxresdefault.jpg" alt="Natours 2025 Practice project preview" width="100%" />
</p>
<!--
  TODO: add a banner screenshot to the repo (for example docs/images/banner.png)
  and uncomment the block below. Avoid hotlinking external images such as
  YouTube thumbnails, because they can change or disappear.

<p align="center">
  <img src="docs/images/banner.png" alt="Natours 2025 Practice project preview" width="100%" />
</p>
-->

Natours 2025 Practice is a full-stack tour booking platform built with Node.js, Express, MongoDB, Mongoose, Pug, and browser-side JavaScript. It combines server-rendered pages with a REST API for tours, users, reviews, bookings, authentication, payments, image handling, and geospatial tour discovery.

> **Status:** Practice and portfolio project with a live Vercel deployment configuration.

- **Live demo:** [natours-2025-practice.vercel.app](https://natours-2025-practice.vercel.app/)
- **Repository:** [github.com/theubaidistan/natours-2025-practice](https://github.com/theubaidistan/natours-2025-practice)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Folder Structure](#folder-structure)
- [Application Flow](#application-flow)
- [Authentication and Authorization](#authentication-and-authorization)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Deployment](#deployment)
- [API Usage Examples](#api-usage-examples)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)
- [Learning Outcomes](#learning-outcomes)
- [Author](#author)
- [License](#license)

## Overview

Natours models a production-style tour marketplace. Visitors can browse server-rendered tours, inspect tour locations and reviews, create an account, update their profile, book a tour through Stripe Checkout, and review their booking history.

The project demonstrates a layered Node.js and Express application that combines:

- RESTful JSON endpoints for tours, users, reviews, and bookings.
- Pug server-side rendering for the public site and authenticated account pages.
- MongoDB access through Mongoose models, virtual relationships, indexes, aggregation, and geospatial queries.
- JWT authentication delivered through an HTTP-only cookie, with Bearer-token support for API clients.
- Role-based authorization for users, guides, lead guides, and administrators.
- Stripe Checkout sessions and a signed webhook that creates bookings after payment completion.
- MapLibre GL with a MapTiler style for tour locations.
- Nodemailer email delivery for welcome and password-reset messages.
- Multer and Sharp for tour image processing, plus Cloudinary for user profile images.
- Security and reliability middleware including Helmet, CORS, rate limiting, compression, request sanitization, and parameter-pollution protection.

## Features

| Feature | Description |
| --- | --- |
| 🔐 Authentication | Signup, login, logout, password changes, and password reset by email. |
| 🛂 Authorization | Role checks for user, guide, lead-guide, and admin accounts. |
| 🗺️ Tour catalog | Server-rendered tour overview and detail pages with images, guides, dates, pricing, ratings, and descriptions. |
| 🧭 Tour API | CRUD operations, filtering, sorting, field limiting, pagination, statistics, monthly plans, and geospatial queries (`2dsphere` index for tours-within-radius and distance lookups). |
| ⭐ Reviews and ratings | Authenticated users can submit reviews; reviews are limited to one per user and tour by a compound unique index, and tour averages are recalculated automatically. |
| 💳 Booking flow | Authenticated users can start Stripe Checkout; the Stripe webhook persists a booking after a completed checkout session. |
| 💰 Payments | Stripe server SDK and browser Stripe.js integration. |
| 📍 Maps | MapLibre GL renders tour locations from GeoJSON-style coordinates and MapTiler map tiles. |
| 👤 User profiles | Users can update their name, email, password, and profile photo. Deleting an account deactivates it. |
| 🖼️ Image handling | Tour images are processed with Multer and Sharp; profile photos are uploaded to Cloudinary. |
| ✉️ Email | Welcome and password-reset emails are rendered from Pug templates and sent through Nodemailer. |
| 🛡️ Security middleware | CORS, Helmet, rate limiting, Mongo query sanitization, XSS sanitization, HPP, cookies, and compression are configured in the Express app. |
| 🖥️ Server-side rendering | Pug templates provide the overview, tour, authentication, account, billing, review, and error pages, bundled with Parcel. |

## Tech Stack

### Badges

#### Core

![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.21.2-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB Driver](https://img.shields.io/badge/MongoDB_Driver-6.18.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-8.17.0-880000?style=for-the-badge&logo=mongoose&logoColor=white)

#### Views and Maps

![Pug](https://img.shields.io/badge/Pug-3.0.3-A86454?style=for-the-badge&logo=pug&logoColor=white)
![Parcel](https://img.shields.io/badge/Parcel-1.12.5-E5B21B?style=for-the-badge&logo=parcel&logoColor=black)
![Babel](https://img.shields.io/badge/Babel-Polyfill-F9DC3E?style=for-the-badge&logo=babel&logoColor=black)
![MapLibre GL](https://img.shields.io/badge/MapLibre_GL-3.6.2-396CB2?style=for-the-badge&logo=maplibre&logoColor=white)
![MapTiler](https://img.shields.io/badge/MapTiler-Tiles-2E5BFF?style=for-the-badge)

#### Auth and Security

![JWT](https://img.shields.io/badge/JWT-9.0.2-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![bcryptjs](https://img.shields.io/badge/bcryptjs-3.0.2-338033?style=for-the-badge&logo=letsencrypt&logoColor=white)
![Helmet](https://img.shields.io/badge/Helmet-8.1.0-49C5B6?style=for-the-badge&logo=shield&logoColor=white)
![express--mongo--sanitize](https://img.shields.io/badge/mongo--sanitize-2.2.0-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![xss--clean](https://img.shields.io/badge/xss--clean-0.1.4-FF4088?style=for-the-badge)
![hpp](https://img.shields.io/badge/hpp-0.2.3-purple?style=for-the-badge)
![express--rate--limit](https://img.shields.io/badge/rate--limit-8.0.1-orange?style=for-the-badge)
![validator](https://img.shields.io/badge/validator-13.15.15-4B8BBE?style=for-the-badge)

#### Payments and Media

![Stripe](https://img.shields.io/badge/Stripe-18.4.0-008CDD?style=for-the-badge&logo=stripe&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-2.10.0-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Sharp](https://img.shields.io/badge/Sharp-0.34.3-99CC00?style=for-the-badge&logo=sharp&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-2.0.2-FF6C37?style=for-the-badge)
![Nodemailer](https://img.shields.io/badge/Nodemailer-7.0.5-22B573?style=for-the-badge&logo=gmail&logoColor=white)

#### Utilities and Middleware

![CORS](https://img.shields.io/badge/CORS-2.8.5-4285F4?style=for-the-badge)
![Compression](https://img.shields.io/badge/Compression-1.8.1-6DB33F?style=for-the-badge)
![Morgan](https://img.shields.io/badge/Morgan-1.10.0-lightgrey?style=for-the-badge)
![Axios](https://img.shields.io/badge/Axios-1.11.0-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![dotenv](https://img.shields.io/badge/dotenv-17.2.0-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black)

#### Dev Tooling

![ESLint](https://img.shields.io/badge/ESLint-8.57.1-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-3.6.2-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![Nodemon](https://img.shields.io/badge/Nodemon-3.1.10-76D04B?style=for-the-badge&logo=nodemon&logoColor=white)
![cross--env](https://img.shields.io/badge/cross--env-7.0.3-yellow?style=for-the-badge)
![ndb](https://img.shields.io/badge/ndb-1.1.5-blue?style=for-the-badge)

### Details

Versions below are taken from package.json, package-lock.json, and the Node.js engine configuration. The MongoDB server version is not pinned by this repository.

| Technology | Purpose | Version or configuration |
| --- | --- | --- |
| Node.js | Runtime and server platform | 22.x required by package.json |
| Express.js | HTTP framework and routing | 4.21.2 installed in the lockfile |
| MongoDB | Application database | Server version configured outside the repository; MongoDB driver 6.18.0 in the lockfile |
| Mongoose | MongoDB ODM, schemas, middleware, and queries | 8.17.0 |
| Pug | Server-side view templates and email templates | 3.0.3 |
| JavaScript | Server and browser application language | CommonJS on the server and browser modules bundled with Parcel |
| Stripe | Checkout sessions, payments, and webhooks | stripe 18.4.0; @stripe/stripe-js 7.8.0 |
| MapLibre GL | Browser map rendering | 3.6.2 |
| MapTiler | Map tile and style provider | External service configured by map style URL |
| Cloudinary | User profile image storage | 2.10.0 |
| Nodemailer | Welcome and password-reset email delivery | 7.0.5 |
| Multer | Multipart image uploads | 2.0.2 |
| Sharp | Tour image resizing and conversion | 0.34.3 |
| JSON Web Token | Authentication token signing and verification | 9.0.2 |
| bcryptjs | Password hashing and verification | 3.0.2 |
| Parcel | Browser JavaScript and CSS bundling | 1.12.5 |
| Vercel | Deployment target | vercel.json uses configuration format 2 |

## Project Architecture

The application follows an MVC-style structure. Express routes select a controller, controllers coordinate request logic and models, Mongoose models handle persistence, and Pug views render HTML for browser-facing routes.

~~~mermaid
flowchart TD
    Browser[Client browser]
    Views[Pug views and public assets]
    Express[Express application in app.js]
    ViewRoutes[View routes]
    ApiRoutes[API routes]
    Middleware[Security, parsing, auth, and role middleware]
    Controllers[Controllers and handler factory]
    Models[Mongoose models]
    Mongo[(MongoDB)]
    Stripe[Stripe Checkout and webhook]
    Email[SendGrid or SMTP via Nodemailer]
    Cloudinary[Cloudinary profile images]
    Maps[MapTiler tiles through MapLibre GL]

    Browser --> Views
    Browser --> Express
    Express --> ViewRoutes
    Express --> ApiRoutes
    ViewRoutes --> Middleware
    ApiRoutes --> Middleware
    Middleware --> Controllers
    Controllers --> Models
    Models --> Mongo
    Controllers --> Stripe
    Controllers --> Email
    Controllers --> Cloudinary
    Browser --> Maps
~~~

Responsibilities are divided as follows:

| Layer | Responsibility |
| --- | --- |
| Routes | Mount view, tour, user, review, and booking endpoints and compose middleware. |
| Controllers | Implement authentication, view rendering, booking, review, tour, user, and error-handling behavior. |
| Handler factory | Provides reusable create, read, update, and delete operations for Mongoose models. |
| Models | Define User, Tour, Review, and Booking schemas, indexes, relationships, and Mongoose middleware. |
| Views | Render the browser UI and email templates with Pug. |
| Utilities | Provide API query features, operational errors, async handling, email delivery, and Cloudinary configuration. |
| Middleware | Parse requests, manage cookies, protect routes, restrict roles, sanitize input, limit traffic, and apply security headers. |
| Configuration | config.env supplies runtime settings; server.js loads it with dotenv. |
| Public assets | CSS, browser source modules, generated bundles, logos, icons, user images, and tour images. |
| Deployment adapter | api/index.js exports the Express app for the Vercel configuration. |

## Folder Structure

~~~text
natours-2025-practice/
|-- api/
|   +-- index.js                 # Vercel entry point that exports the app
|-- controllers/
|   |-- authController.js        # Signup, login, JWT protection, roles, password reset
|   |-- bookingController.js     # Stripe Checkout, webhook, and booking handlers
|   |-- errorController.js       # Development and production error responses
|   |-- handlerFactory.js        # Reusable CRUD controller functions
|   |-- reviewController.js      # Review creation and nested tour review helpers
|   |-- tourController.js        # Tour CRUD, stats, plans, and geospatial queries
|   |-- userController.js        # Profile updates and user administration
|   +-- viewsController.js       # Pug page rendering and account pages
|-- dev-data/
|   |-- data/                    # Importable development data and import script
|   |-- backup/                  # Backup seed data and import script
|   |-- img/                     # Development image fixtures
|   +-- templates/               # Older development Pug templates
|-- models/
|   |-- bookingModel.js
|   |-- reviewModel.js
|   |-- tourModel.js
|   +-- userModel.js
|-- public/
|   |-- css/style.css            # Main stylesheet
|   |-- img/                     # Logos, icons, tour images, and user images
|   |-- js/                      # Browser modules and generated bundles
|   |-- overview.html            # Static HTML asset
|   |-- tour.html                # Static HTML asset
|   +-- robots.txt
|-- routes/
|   |-- bookingRoutes.js
|   |-- reviewRoutes.js
|   |-- tourRoutes.js
|   |-- userRoutes.js
|   +-- viewRoutes.js
|-- utils/
|   |-- apiFeatures.js           # Filtering, sorting, field limiting, pagination
|   |-- appError.js              # Operational application errors
|   |-- catchAsync.js            # Async controller error forwarding
|   |-- cloudinary.js            # Cloudinary configuration
|   +-- email.js                 # Nodemailer transport and Pug email rendering
|-- views/
|   |-- *.pug                    # Server-rendered application pages
|   +-- email/                   # Welcome and password-reset email templates
|-- app.js                       # Express configuration and route mounting
|-- server.js                    # Local startup, dotenv loading, and MongoDB connection
|-- config.env.example           # Safe environment-variable template
|-- package.json                 # Dependencies and npm scripts
|-- package-lock.json            # Locked dependency versions
|-- vercel.json                  # Vercel build and routing configuration
+-- README.md                    # Project documentation
~~~

Important directories and files:

| Path | Purpose |
| --- | --- |
| controllers/ | Request handling, authentication, page rendering, payment, and business logic. |
| models/ | Mongoose schemas and database middleware. |
| routes/ | API and rendered-page route definitions. |
| views/ | Pug templates for the web UI and emails. |
| public/ | Static frontend assets, source modules, generated bundles, and images. |
| utils/ | Shared query, error, async, email, and Cloudinary helpers. |
| dev-data/ | Seed data, import scripts, backup data, and development fixtures. |
| app.js | Express application setup, middleware, route mounting, and error handling. |
| server.js | Loads config.env, connects to MongoDB, and starts the local server. |
| api/index.js | Exports the application for the Vercel deployment entry point. |
| vercel.json | Declares the Vercel builder and routes. |

## Application Flow

A typical API or rendered-page request moves through the application as follows:

~~~text
HTTP request
    |
    v
Express global middleware
(CORS, static files, Helmet, rate limit, parsers, cookies, sanitizers)
    |
    v
Mounted router
(view, tour, user, review, or booking)
    |
    v
Authentication and role middleware when required
    |
    v
Controller or reusable handler factory
    |
    v
Mongoose model and MongoDB query
    |
    v
Pug HTML response or JSON response
    |
    v
Client browser
~~~

The Stripe webhook is a special case: POST /webhook-checkout receives the raw request body before the normal JSON parser so Stripe can verify the stripe-signature header. A successful checkout.session.completed event creates a Booking document.

## Authentication and Authorization

### Authentication mechanism

- **Signup:** POST /api/v1/users/signup creates a user, sends a welcome email, signs a JWT, and returns the token in the JSON response and an HTTP-only jwt cookie.
- **Login:** POST /api/v1/users/login verifies the email and password, then issues a JWT in the same way.
- **Logout:** GET /api/v1/users/logout clears the jwt cookie and disables response caching.
- **Protected requests:** authController.protect accepts a Bearer token from the Authorization header or the jwt cookie.
- **Password handling:** Passwords are hashed with bcryptjs before save. A password change updates passwordChangedAt, which invalidates older JWTs.
- **Password reset:** POST /api/v1/users/forgotPassword creates a hashed reset token that expires after 10 minutes and emails the reset URL. PATCH /api/v1/users/resetPassword/:token sets the new password and issues a fresh JWT.
- **Rendered pages:** isLoggedIn performs optional cookie authentication so public pages can adapt to a logged-in user without failing anonymous requests.

### Authorization

The User model supports these roles:

| Role | Access pattern in the application |
| --- | --- |
| user | Standard authenticated account; can submit reviews and use account and booking flows. |
| guide | Can access the monthly tour plan endpoint. |
| lead-guide | Can access the monthly plan and manage tours and bookings. |
| admin | Full administrative access to users, tours, reviews, and bookings according to route restrictions. |

Protected routes call protect first, then use restrictTo(...) where a role is required. Deleting a user account sets active to false; user queries exclude inactive accounts through model middleware.

## API Endpoints

The API base path is /api/v1. Most successful responses use a { status, data } envelope and list endpoints also include a results count.

### Tour endpoints

| Method | Endpoint | Authentication | Role | Purpose |
| --- | --- | --- | --- | --- |
| GET | /api/v1/tours | Public | - | List tours with filtering, sorting, field selection, and pagination. |
| GET | /api/v1/tours/top-5-cheap | Public | - | Return the top five tours sorted by rating and price through a controller alias. |
| GET | /api/v1/tours/tour-stats | Public | - | Return aggregated statistics for highly rated tours grouped by difficulty. |
| GET | /api/v1/tours/monthly-plan/:year | Required | admin, lead-guide, or guide | Return the monthly tour-start plan for a year. |
| GET | /api/v1/tours/tours-within/:distance/center/:latlng/unit/:unit | Public | - | Find tours within a radius of a latitude/longitude pair. |
| GET | /api/v1/tours/distances/:latlng/unit/:unit | Public | - | Return distances from a coordinate to tours using $geoNear. |
| GET | /api/v1/tours/:id | Public | - | Return one tour and its populated reviews. |
| POST | /api/v1/tours | Required | admin or lead-guide | Create a tour. |
| PATCH | /api/v1/tours/:id | Required | admin or lead-guide | Update a tour and process uploaded tour images when supplied. |
| DELETE | /api/v1/tours/:id | Required | admin or lead-guide | Delete a tour. |

The list endpoint supports the query features implemented in utils/apiFeatures.js, including expressions such as ?difficulty=easy&duration[gte]=5&sort=-price&page=1&limit=10.

### Review endpoints

All review routes require authentication. Nested routes infer the current tour and user when creating a review.

| Method | Endpoint | Authentication | Role | Purpose |
| --- | --- | --- | --- | --- |
| GET | /api/v1/reviews | Required | Any authenticated user | List reviews. |
| POST | /api/v1/reviews | Required | user | Create a review; tour and user are supplied in the request context or body. |
| GET | /api/v1/reviews/:id | Required | Any authenticated user | Return one review. |
| PATCH | /api/v1/reviews/:id | Required | user or admin | Update a review. |
| DELETE | /api/v1/reviews/:id | Required | user or admin | Delete a review. |
| GET | /api/v1/tours/:tourId/reviews | Required | Any authenticated user | List reviews belonging to a tour. |
| POST | /api/v1/tours/:tourId/reviews | Required | user | Create a review associated with :tourId. |
| GET | /api/v1/tours/:tourId/reviews/:id | Required | Any authenticated user | Return one nested tour review. |
| PATCH | /api/v1/tours/:tourId/reviews/:id | Required | user or admin | Update a nested tour review. |
| DELETE | /api/v1/tours/:tourId/reviews/:id | Required | user or admin | Delete a nested tour review. |

### User and authentication endpoints

| Method | Endpoint | Authentication | Role | Purpose |
| --- | --- | --- | --- | --- |
| POST | /api/v1/users/signup | Public | - | Create an account and issue a JWT. |
| POST | /api/v1/users/login | Public | - | Authenticate with email and password. |
| GET | /api/v1/users/logout | Public | - | Clear the authentication cookie. |
| POST | /api/v1/users/forgotPassword | Public | - | Send a password-reset email. |
| PATCH | /api/v1/users/resetPassword/:token | Public | - | Set a new password using a valid reset token. |
| PATCH | /api/v1/users/updateMyPassword | Required | Any authenticated user | Change the current user's password. |
| GET | /api/v1/users/me | Required | Any authenticated user | Return the current user's profile. |
| PATCH | /api/v1/users/updateMe | Required | Any authenticated user | Update the current user's name, email, or profile photo. |
| DELETE | /api/v1/users/deleteMe | Required | Any authenticated user | Deactivate the current account. |
| GET | /api/v1/users | Required | admin | List users. |
| POST | /api/v1/users | Required | admin | Defined route that intentionally returns a message directing clients to /signup. |
| GET | /api/v1/users/:id | Required | admin | Return one user. |
| PATCH | /api/v1/users/:id | Required | admin | Update a user. |
| DELETE | /api/v1/users/:id | Required | admin | Delete a user. |

### Booking and payment endpoints

| Method | Endpoint | Authentication | Role | Purpose |
| --- | --- | --- | --- | --- |
| GET | /api/v1/bookings/checkout-session/:tourId | Required | Any authenticated user | Create a Stripe Checkout session for a tour. |
| GET | /api/v1/bookings | Required | admin or lead-guide | List bookings. |
| POST | /api/v1/bookings | Required | admin or lead-guide | Create a booking document directly. |
| GET | /api/v1/bookings/:id | Required | admin or lead-guide | Return one booking. |
| PATCH | /api/v1/bookings/:id | Required | admin or lead-guide | Update a booking. |
| DELETE | /api/v1/bookings/:id | Required | admin or lead-guide | Delete a booking. |
| POST | /webhook-checkout | Stripe signature | Stripe webhook | Verify checkout.session.completed events and create a booking. |

### Web/application routes

| Method | Endpoint | Authentication | Purpose |
| --- | --- | --- | --- |
| GET | / | Optional | Render the tour overview. |
| GET | /tour/:slug | Optional | Render a tour detail page with locations and reviews. |
| GET | /login | Optional | Render the login form. |
| GET | /signup | Optional | Render the signup form. |
| GET | /me | Required | Render the account settings page. |
| GET | /my-tours | Required | Render tours associated with the current user's bookings. |
| GET | /billing | Required | Render booking and billing history. |
| GET | /my-reviews | Required | Render reviews created by the current user. |
| POST | /submit-user-data | Required | Update the current user's name and email from the account page. |
| GET | /img/*, /css/*, /js/*, /robots.txt, /overview.html, /tour.html | Public | Static files are served from the public/ directory. |

## Database

The application uses four Mongoose models:

| Model | Purpose | Important behavior |
| --- | --- | --- |
| User | Accounts, roles, credentials, profile images, and password-reset state. | Email is unique and validated; passwords are bcrypt-hashed; inactive users are excluded from normal queries. |
| Tour | Tour content, pricing, dates, guides, images, ratings, and locations. | Includes a 2dsphere index, a virtual reviews relationship, a slug generated from the name, and guide population. |
| Review | User ratings and written feedback for tours. | Uses a unique { tour, user } index and recalculates the parent tour's average rating after changes. |
| Booking | A user's purchase of a tour. | References both User and Tour, stores the paid price, and is created by the Stripe webhook after checkout completion. |

### Entity Relationship Diagram

~~~mermaid
erDiagram
    USER ||--o{ REVIEW : writes
    TOUR ||--o{ REVIEW : receives
    USER ||--o{ BOOKING : makes
    TOUR ||--o{ BOOKING : "booked in"
    USER }o--o{ TOUR : guides

    USER {
        ObjectId _id
        string name
        string email
        string photo
        string role
        string password
        date passwordChangedAt
        string passwordResetToken
        date passwordResetExpires
        boolean active
    }

    TOUR {
        ObjectId _id
        string name
        string slug
        number duration
        number maxGroupSize
        string difficulty
        number ratingsAverage
        number ratingsQuantity
        number price
        number priceDiscount
        string summary
        string description
        string imageCover
        array images
        date createdAt
        array startDates
        boolean secretTour
        object startLocation
        array locations
        array guides "ref: User"
    }

    REVIEW {
        ObjectId _id
        string review
        number rating
        date createdAt
        ObjectId tour "ref: Tour"
        ObjectId user "ref: User"
    }

    BOOKING {
        ObjectId _id
        ObjectId tour "ref: Tour"
        ObjectId user "ref: User"
        number price
        date createdAt
        boolean paid
    }
~~~

### Relationships

- A Tour references multiple guide Users through the guides array.
- Reviews reference one User and one Tour; the Tour exposes reviews through virtual populate.
- Bookings reference one User and one Tour and store the price captured for the booking.
- Tour startLocation and locations use coordinate arrays for map display and geospatial queries.

## Installation

### Prerequisites

- Node.js 22.x.
- npm.
- A MongoDB database, either local or hosted.
- Credentials for the integrations you plan to use: Stripe, email delivery, Cloudinary, and MapTiler.

### Setup

~~~bash
git clone https://github.com/theubaidistan/natours-2025-practice.git
cd natours-2025-practice
npm install
~~~

The application loads config.env explicitly. Copy the safe template and fill in your own values:

~~~bash
cp config.env.example config.env
~~~

On PowerShell, use:

~~~powershell
Copy-Item config.env.example config.env
~~~

Never commit config.env or any real credentials. The repository's .gitignore excludes it.

## Environment Variables

All names below are present in config.env.example. Some are only needed for a specific integration or fallback transport.

| Variable | Purpose |
| --- | --- |
| NODE_ENV | Selects development or production behavior, logging, error output, and email transport. |
| PORT | Local HTTP port; the server falls back to 3000. |
| DATABASE | MongoDB connection string containing the PASSWORD placeholder. |
| DATABASE_LOCAL | Legacy/local connection variable retained in the template; the active server connection uses DATABASE. |
| DATABASE_PASSWORD | Value substituted into the DATABASE connection string. |
| JWT_SECRET | Secret used to sign and verify JWTs. |
| JWT_EXPIRES_IN | JWT lifetime passed to jsonwebtoken. |
| JWT_COOKIE_EXPIRES_IN | Authentication cookie lifetime in days. |
| EMAIL_FROM | Sender address used by the email helper. |
| SENDGRID_USERNAME | SendGrid transport username used in development and production. |
| SENDGRID_PASSWORD | SendGrid transport password or API credential. |
| EMAIL_USERNAME | SMTP fallback username. |
| EMAIL_PASSWORD | SMTP fallback password. |
| EMAIL_HOST | SMTP fallback host. |
| EMAIL_PORT | SMTP fallback port. |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name for profile photo uploads. |
| CLOUDINARY_API_KEY | Cloudinary API key. |
| CLOUDINARY_API_SECRET | Cloudinary API secret. |
| MAPTILER_KEY | MapTiler configuration placeholder included in the environment template. |
| STRIPE_SECRET_KEY | Server-side Stripe SDK credential for Checkout and webhooks. |
| STRIPE_PUBLIC_KEY | Publishable Stripe key placeholder for browser-side configuration. |
| STRIPE_WEBHOOK_SECRET | Secret used to verify Stripe webhook signatures. |

Safe local template:

~~~env
NODE_ENV=development
PORT=3000
DATABASE=your_mongodb_connection_string_with_PASSWORD_placeholder
DATABASE_LOCAL=your_local_mongodb_connection_string
DATABASE_PASSWORD=your_database_password

JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

EMAIL_FROM=you@example.com
SENDGRID_USERNAME=your_sendgrid_username
SENDGRID_PASSWORD=your_sendgrid_credential
EMAIL_USERNAME=your_smtp_username
EMAIL_PASSWORD=your_smtp_password
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

MAPTILER_KEY=your_maptiler_key

STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_PUBLIC_KEY=pk_test_your_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
~~~

Do not paste real API keys, passwords, database credentials, or webhook secrets into the README, issue tracker, or source control.

## Running the Project

Available npm scripts from package.json:

| Command | Description |
| --- | --- |
| npm start | Start the server with Node.js. |
| npm run dev | Start the server with Nodemon for development. |
| npm run start:dev | Start with NODE_ENV=development and Nodemon through cross-env. |
| npm run start:prod | Start with NODE_ENV=production. |
| npm run debug | Start the server with ndb. |
| npm run watch:js | Watch and rebuild the browser bundle with Parcel. |
| npm run build:js | Build the browser JavaScript bundle for production. |
| npm run import | Import the development seed data from dev-data/data. |
| npm run delete | Delete the development data from the configured database; use with caution. |
| npm run lint | Run ESLint with auto-fix enabled. |
| npm test | Placeholder script; no automated test suite is configured and the command exits with an error. |

For a normal local development session:

~~~bash
npm run dev
~~~

The local server listens on http://localhost:3000 unless PORT is set. The browser bundle can be rebuilt separately when client-side source modules change:

~~~bash
npm run watch:js
~~~

## Deployment

The repository includes a Vercel configuration:

- vercel.json declares the Vercel configuration format 2.
- api/index.js exports the application for the @vercel/node builder.
- All incoming paths are routed to the Vercel entry point.
- The live deployment is available at [natours-2025-practice.vercel.app](https://natours-2025-practice.vercel.app/).

Before deploying, configure the required environment variables in the Vercel project settings rather than uploading config.env. In particular:

1. Provide a reachable MongoDB connection and allow the deployment network to connect to it.
2. Configure JWT, email, Cloudinary, and Stripe values for the selected environment.
3. Configure a Stripe webhook endpoint at https://natours-2025-practice.vercel.app/webhook-checkout and set STRIPE_WEBHOOK_SECRET to the matching signing secret.
4. Confirm that the deployment can serve static assets from public/ and render the Pug views.
5. Keep external service keys in deployment configuration and review client-exposed map and payment configuration before using the application in a production environment.

## API Usage Examples

The following examples use the deployed API. Replace the host with http://localhost:3000 for local development.

List tours:

~~~bash
curl "https://natours-2025-practice.vercel.app/api/v1/tours"
~~~

Filter, sort, and paginate tours:

~~~bash
curl "https://natours-2025-practice.vercel.app/api/v1/tours?difficulty=easy&duration[gte]=5&sort=-price&page=1&limit=10"
~~~

Read aggregated tour statistics:

~~~bash
curl "https://natours-2025-practice.vercel.app/api/v1/tours/tour-stats"
~~~

Create a session for a tour after authenticating with a cookie or Bearer token:

~~~bash
curl --request GET \
  --url "https://natours-2025-practice.vercel.app/api/v1/bookings/checkout-session/TOUR_ID" \
  --header "Authorization: Bearer YOUR_JWT"
~~~

The API expects real MongoDB IDs and valid credentials for protected operations. Do not place real tokens or payment credentials in shell history that is shared with others.

## Screenshots

Screenshots will be added here. In the meantime, try the [live demo](https://natours-2025-practice.vercel.app/).

<!--
  TODO: commit screenshots to docs/images/ and uncomment the table below.

| Home / Tour Overview | Tour Details |
| --- | --- |
| ![Tour overview](docs/images/overview.png) | ![Tour details](docs/images/tour-details.png) |

| Login | Account Settings |
| --- | --- |
| ![Login page](docs/images/login.png) | ![Account settings](docs/images/account.png) |
-->

## Future Improvements

- Add an automated test suite and CI checks for controllers, models, routes, and critical payment flows.
- Add review ownership and booking-eligibility checks before allowing a review to be submitted.
- Build administrative web pages for managing tours, users, reviews, and bookings.
- Improve booking idempotency, webhook retry handling, and payment reconciliation.
- Centralize browser-side map and payment configuration.
- Add richer search, filtering, and sorting controls to the rendered tour catalog.
- Add structured logging, monitoring, and clearer operational documentation.
- Improve API documentation with formal request and response schemas.

## Learning Outcomes

This project demonstrates:

- REST API design with Express routers and reusable CRUD controller factories.
- MVC-style separation between routes, controllers, models, views, and utilities.
- Mongoose schema design, validation, indexes, virtual populate, query middleware, and aggregation pipelines.
- MongoDB geospatial indexes and queries for nearby-tour discovery.
- JWT authentication with HTTP-only cookies and Bearer-token support.
- Password hashing, password-change invalidation, and time-limited password-reset tokens.
- Role-based authorization and protected resource design.
- Server-side rendering with Pug and browser-side JavaScript bundling with Parcel.
- Stripe Checkout sessions and signed webhook processing.
- Email templating and delivery with Pug and Nodemailer.
- Multipart image uploads, Sharp processing, and Cloudinary storage.
- Express security middleware, input sanitization, request rate limiting, and error handling.
- Vercel deployment configuration for an Express application.

---

## 📚 API Documentation

Interactive Postman collections covering the Natours REST API — every endpoint, request/response shape, and auth flow, ready to explore or fork.

### 🧱 [Express: Let's Start Building the Natours API](https://documenter.getpostman.com/view/45895052/2sBYB1N8gY)

A build-along collection that walks through standing up the Natours API from scratch with Express and Node.js. Covers structuring a RESTful API, wiring up routers and controllers, and assembling a scalable backend step by step — useful as a reference for the project's route/controller architecture.

### 🗺️ [Natours — Explore Amazing Adventure Tours & Travel](https://documenter.getpostman.com/view/45895052/2sB3BBrCag)

The full API reference for the live Natours platform: browsing tours and destinations, viewing tour details, prices and ratings, managing reviews, and completing bookings. Use this collection to try out real requests against the tours, users, reviews, and bookings endpoints described in the data model above.

---

## Author

**Muhammad Ubaid**

- GitHub: [theubaidistan](https://github.com/theubaidistan)
- Portfolio: [mac-os-portfolio-2026.vercel.app](https://mac-os-portfolio-2026.vercel.app/)

## License

This project is licensed under the [ISC License](https://opensource.org/license/isc-license-txt/), as specified in package.json.
