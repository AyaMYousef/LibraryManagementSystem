
# Library Management System

A Node.js and Express-based backend for managing books, users, and transactions in a library. Features include secure user authentication, role-based access control, 
and workflows for book borrowing and return.


LibraryManagementSystem/
├── src/
│   ├── Modules/
│   │   ├── User/                         # User-related functionality
│   │   │   └── Services/                  # User services (register, login, profile)
│   │   ├── Book/                         # Book management
│   │   │   ├── Controllers/               # Add, update, delete, search, borrow, return
│   │   │   └── Services/                   # Book model & Joi validation
│   │   └── Transaction/                   # Borrow/return tracking
│   │       └── Controllers/
│
├── DB/
│   └── Models/                            # Mongoose models
│       ├── user.model.js
│       ├── book.model.js
│       └── transaction.model.js
│
├── utils/
│   └── tokens.utils.js                    # JWT generation & verification
│
├── index.js                               # App entry point (Express, routes, DB connection)
├── .env.example                           # Environment variable configuration
└── package.json                           # Project dependencies & scripts


---

# Library Management System

A Node.js and Express-based backend for managing books, users, and transactions in a library. Features include secure user authentication, role-based access control, and book borrowing/return workflows.

## Features

* **User Management** – Registration, login, JWT-based authentication
* **Role-Based Access** – Only admins can add, update, or delete books
* **Book Management** – CRUD operations with joi validation
* **Borrow & Return Flow** – Proper tracking via transaction schema
* **Search & Pagination** – Flexible querying with sorting and filtering

---

## File Structure

```
├── src/  
│   ├── Modules/  
│   │   ├── User/  
│   │   │   └── Services (register, login, profile)  
│   │   ├── Book/  
│   │   │   ├── Controllers (add, update, delete, search, borrow, return)  
│   │   │   └── Services (Book model + Joi validation)  
│   │   └── Transaction/  
│   │       └── Controllers (tracking borrow and return)  
├── DB/  
│   └── Models/  
│       ├── user.model.js  
│       ├── book.model.js  
│       └── transaction.model.js  
├── utils/  
│   └── tokens.utils.js (JWT generation/verification)  
├── index.js (App entry point: Express setup, routes, DB connection)  
├── .env.example (Explains required environment variables)  
└── package.json  
```

---

## Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/AyaMYousef/LibraryManagementSystem.git
cd LibraryManagementSystem
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file based on `.env.example` with values such as:

```
MONGO_URI=mongodb://localhost:27017/LibraryManagementSystem
JWT_ACCESS_SECRET=yourAccessSecret
JWT_REFRESH_SECRET=yourRefreshSecret
JWT_EXPIRES_IN=
HASHED=
```

### 4. Start MongoDB & Run the App

```bash
npm run dev  # or node index.js
```

---

## API Overview

| Endpoint              | Method | Access     | Description                                             |
| --------------------- | ------ | ---------- | ------------------------------------------------------- |
| `/api/users/register` | POST   | Public     | Sign up a new user                                      |
| `/api/users/login`    | POST   | Public     | Login and receive JWT tokens                            |
| `/api/users/profile`  | GET    | Auth       | Get user profile without password                       |
| `/books/add`          | POST   | Admin only | Create a new book entry                                 |
| `/books/update/:id`   | PUT    | Admin only | Update a book’s details                                 |
| `/books/delete/:id`   | DELETE | Admin only | Remove a book from catalog                              |   |
| `/books/borrow`       | POST   | Auth       | Borrow a book (creates transaction and decrements copy) |
| `/books/return`       | POST   | Auth       | Return a book (updates transaction and increments copy) |

---

## Postman Usage

1. **Register** → `POST /api/users/register`
2. **Login** → `POST /api/users/login` → copy access token
3. **Use Token** → Add header: `Authorization: Bearer <token>` for protected routes
4. **Test Endpoints** in order: Add/search/borrow/return/delete

---

