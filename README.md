# 📚 Library Management System

A Node.js + Express REST API for managing a library system.  
Supports **user authentication (JWT)**, **book management**, **borrowing & returning**, and **search with pagination**.

---

## 🚀 Features

- **User Authentication**  
  - Register new users  
  - Login and receive JWT  
  - Protected routes for authenticated users only  

- **Book Management**  
  - Add, update, delete books  
  - Search books by title or author (partial match)  
  - Pagination support for search results  

- **Borrow & Return System**  
  - Borrow a book (if available)  
  - Return a borrowed book  
  - Transaction history tracking  

- **Security**  
  - JWT-based authentication  
  - Environment variables for sensitive data  

---

## 📂 Project Structure

```

├── src/
│   ├── Modules/
│   │   ├── User/
│   │   │   └── Services/              # User-related logic (register, login, profile)
│   │   ├── Book/
│   │   │   ├── Controllers/           # Add, update, delete, search, borrow, return
│   │   │   └── Services/              # Book model + Joi validation
│   │   └── Transaction/
│   │       └── Controllers/           # Track borrowing and returning
│
├── DB/
│   └── Models/
│       ├── user.model.js              # User schema
│       ├── book.model.js              # Book schema
│       └── transaction.model.js       # Transaction schema
│
├── utils/
│   └── tokens.utils.js                # JWT generation/verification
│
├── index.js                           # App entry point (Express setup, routes, DB connection)
├── .env.example                       # Required environment variables
└── package.json                       # Project metadata and dependencies

````

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/AyaMYousef/LibraryManagementSystem.git

# Navigate into the project
cd LibraryManagementSystem

# Install dependencies
npm install
````

---

## 🔑 Environment Variables

Create a `.env` file in the root directory using `.env.example` as a reference:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## ▶️ Run the App

```bash
# Start the server
npm start

# Start with nodemon (for development)
npm run dev
```

Server will run at: **`http://localhost:8000`**

---

## 📌 API Endpoints

### **Auth Routes**

| Method | Endpoint              | Description           |
| ------ | --------------------- | --------------------- |
| POST   | `/api/users/register` | Register a new user   |
| POST   | `/api/users/login`    | Login & get JWT token |

### **Book Routes** (Protected)

| Method | Endpoint                                       | Description                  |
| ------ | ---------------------------------------------- | ---------------------------- |
| POST   | `/api/books`                                   | Add a new book               |
| GET    | `/api/books`                                   | Get all books                | |
| PUT    | `/api/books/:id`                               | Update book                  |
| DELETE | `/api/books/:id`                               | Delete book                  |

### **Transaction Routes** (Protected)

| Method | Endpoint                | Description              |
| ------ | ----------------------- | ------------------------ |
| POST   | `/api/books/:id/borrow` | Borrow a book            |
| POST   | `/api/books/:id/return` | Return a book            |
| GET    | `/api/transactions`     | View transaction history |

---

## 🧪 Testing with Postman

1. Import the provided Postman collection (if available)
2. Register a user → Login → Copy JWT token
3. Use JWT token in **Authorization → Bearer Token** for protected routes

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JSON Web Tokens (JWT)
* **Validation:** Joi
* **Dev Tools:** Nodemon, Postman

---


