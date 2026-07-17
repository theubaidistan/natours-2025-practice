# 🏞️ Natours Application

Built using modern technologies: **Node.js, Express, MongoDB, Mongoose** and friends 😁

A full-featured tour booking platform — browse tours, leave reviews, book trips with Stripe, and manage everything through a secure REST API.

![Natours Course](https://img-c.udemycdn.com/course/480x270/1672410_9ff1_5.jpg)

🔗 **Live Demo:** [natours-2025-practice.vercel.app](https://natours-2025-practice.vercel.app/)

---

## 🛠️ Built With

![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.21.2-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-6.17.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-8.17.0-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-9.0.2-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-18.4.0-008CDD?style=for-the-badge&logo=stripe&logoColor=white)
![Pug](https://img.shields.io/badge/Pug-3.0.3-A86454?style=for-the-badge&logo=pug&logoColor=white)
![Sharp](https://img.shields.io/badge/Sharp-0.34.3-99CC00?style=for-the-badge&logo=sharp&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-8.57.1-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-3.6.2-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)

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

- A **Tour** can have many **Reviews** (virtual populate) and many **Bookings**.
- A **User** can write many **Reviews** and make many **Bookings**.
- A **Review** requires exactly one `tour` and one `user` (compound unique index prevents duplicate reviews per user/tour).
- A **Tour**'s `guides` field references multiple **Users** (embedded array of ObjectIds, populated on find).

---

## 📄 License

ISC
