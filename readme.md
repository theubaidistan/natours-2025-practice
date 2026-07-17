# 🏞️ Natours Application

> Built using modern technologies: **Node.js, Express, MongoDB, Mongoose** and friends 😁

A full-featured tour booking platform — browse tours, leave reviews, book trips with Stripe, upload photos, receive emails, and manage everything through a secure, production-hardened REST API.

![Natours Course](https://img-c.udemycdn.com/course/480x270/1672410_9ff1_5.jpg)

🔗 **Live Demo:** [natours-2025-practice.vercel.app](https://natours-2025-practice.vercel.app/)

---

## 🛠️ Tech Stack

### Core

![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.21.2-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-6.17.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-8.17.0-880000?style=for-the-badge&logo=mongoose&logoColor=white)

### Views

![Pug](https://img.shields.io/badge/Pug-3.0.3-A86454?style=for-the-badge&logo=pug&logoColor=white)
![Parcel](https://img.shields.io/badge/Parcel-1.12.5-E5B21B?style=for-the-badge&logo=parcel&logoColor=black)
![Babel](https://img.shields.io/badge/Babel-Polyfill-F9DC3E?style=for-the-badge&logo=babel&logoColor=black)

### Auth & Security

![JWT](https://img.shields.io/badge/JWT-9.0.2-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![bcryptjs](https://img.shields.io/badge/bcryptjs-3.0.2-338033?style=for-the-badge&logo=letsencrypt&logoColor=white)
![Helmet](https://img.shields.io/badge/Helmet-8.1.0-49C5B6?style=for-the-badge&logo=shield&logoColor=white)
![express--mongo--sanitize](https://img.shields.io/badge/mongo--sanitize-2.2.0-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![xss--clean](https://img.shields.io/badge/xss--clean-0.1.4-FF4088?style=for-the-badge)
![hpp](https://img.shields.io/badge/hpp-0.2.3-purple?style=for-the-badge)
![express--rate--limit](https://img.shields.io/badge/rate--limit-8.0.1-orange?style=for-the-badge)
![validator](https://img.shields.io/badge/validator-13.15.15-4B8BBE?style=for-the-badge)

### Payments & Media

![Stripe](https://img.shields.io/badge/Stripe-18.4.0-008CDD?style=for-the-badge&logo=stripe&logoColor=white)
![Sharp](https://img.shields.io/badge/Sharp-0.34.3-99CC00?style=for-the-badge&logo=sharp&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-2.0.2-FF6C37?style=for-the-badge)
![Nodemailer](https://img.shields.io/badge/Nodemailer-7.0.5-22B573?style=for-the-badge&logo=gmail&logoColor=white)

### Utilities & Middleware

![CORS](https://img.shields.io/badge/CORS-2.8.5-4285F4?style=for-the-badge)
![Compression](https://img.shields.io/badge/Compression-1.8.1-6DB33F?style=for-the-badge)
![Morgan](https://img.shields.io/badge/Morgan-1.10.0-lightgrey?style=for-the-badge)
![Axios](https://img.shields.io/badge/Axios-1.11.0-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![dotenv](https://img.shields.io/badge/dotenv-17.2.0-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black)

### Dev Tooling

![ESLint](https://img.shields.io/badge/ESLint-8.57.1-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-3.6.2-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![Nodemon](https://img.shields.io/badge/Nodemon-3.1.10-76D04B?style=for-the-badge&logo=nodemon&logoColor=white)
![cross--env](https://img.shields.io/badge/cross--env-7.0.3-yellow?style=for-the-badge)
![ndb](https://img.shields.io/badge/ndb-1.1.5-blue?style=for-the-badge)

---

## ✨ Features

- 🔐 **Authentication & Authorization** — JWT-based signup/login, password reset via email, role-based access control (`user`, `guide`, `lead-guide`, `admin`)
- 🗺️ **Tours** — full CRUD, geospatial queries (`2dsphere` index) for `startLocation` and tours-within-radius/distance, aggregation pipeline stats
- ⭐ **Reviews & Ratings** — one review per user per tour (compound unique index), automatic average rating recalculation via static methods + query middleware
- 💳 **Bookings & Payments** — Stripe Checkout integration, booking creation on successful payment
- 🖼️ **Image Uploads** — Multer + Sharp for tour images, user photos, and multi-image resizing
- ✉️ **Email** — Nodemailer for account emails and password resets
- 🛡️ **Security Hardening** — Helmet, rate limiting, data sanitization (NoSQL injection & XSS), parameter pollution protection, CORS
- 🖥️ **Server-side Rendered Views** — Pug templates for the browsable frontend, bundled with Parcel

---

## 🗂️ Data Model (ERD)

```mermaid
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
```

**Relationship notes:**

- A **Tour** can have many **Reviews** (virtual populate — not stored on the Tour document) and many **Bookings**.
- A **User** can write many **Reviews** and make many **Bookings**.
- A **Review** requires exactly one `tour` and one `user`, enforced with a compound unique index (`{ tour: 1, user: 1 }`) to prevent duplicate reviews.
- A **Tour**'s `guides` field references multiple **Users** (embedded array of ObjectIds, auto-populated via query middleware, excluding `__v` and `passwordChangedAt`).
- **Booking** documents auto-populate both `user` and `tour` (name only) on find.

---

## 🚀 Getting Started

### Prerequisites

- Node.js `^22`
- A MongoDB connection string (local or Atlas)

### Installation

```bash
git clone https://github.com/theubaidistan/natours.git
cd natours
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=3000
DATABASE=<your-mongodb-connection-string>
DATABASE_PASSWORD=<your-db-password>

JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

EMAIL_USERNAME=<mailtrap-or-smtp-username>
EMAIL_PASSWORD=<smtp-password>
EMAIL_HOST=<smtp-host>
EMAIL_PORT=<smtp-port>

STRIPE_SECRET_KEY=<your-stripe-secret-key>
STRIPE_WEBHOOK_SECRET=<your-stripe-webhook-secret>
```

### Available Scripts

| Command              | Description                                |
| -------------------- | ------------------------------------------ |
| `npm run dev`        | Start server with nodemon (development)    |
| `npm run start:dev`  | Start in development mode with `cross-env` |
| `npm run start:prod` | Start in production mode                   |
| `npm run debug`      | Debug with `ndb`                           |
| `npm run watch:js`   | Watch & bundle frontend JS with Parcel     |
| `npm run build:js`   | Production build of frontend JS bundle     |
| `npm run import`     | Import seed/dev data into the database     |
| `npm run delete`     | Delete all data from the database          |
| `npm run lint`       | Lint and auto-fix with ESLint              |

---

## 📁 Project Structure (Models)

```
models/
├── tourModel.js     # Tours: geospatial data, virtual populate, slug generation
├── userModel.js     # Users: password hashing, reset tokens, soft-delete filter
├── reviewModel.js   # Reviews: rating aggregation, unique per tour/user
└── bookingModel.js  # Bookings: Stripe-linked tour purchases
```

---

## 📄 License

ISC
