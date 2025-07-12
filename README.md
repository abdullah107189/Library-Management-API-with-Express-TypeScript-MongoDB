# 📚 Library Management API

A complete Library Management System built with **Express.js**, **TypeScript**, and **MongoDB (Mongoose)**.

---

## ✨ Features

✅ Book CRUD with proper validation  
✅ Borrow logic with static methods & Mongoose middleware  
✅ Aggregation summary of borrowed books  
✅ Generic error response format  
✅ Clean folder structure  
✅ Ready for deployment

---

## 🚀 Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB & Mongoose
- Postman / Thunder Client for testing

---

## ⚙️ Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/library-management-api.git
   cd library-management-api

2. **Install dependencies** 
   ```bash 
   npm install
  
3. **Add .env file** 
   ```bash 
   MONGODB_URI=your_mongodb_connection_uri
   PORT=5000
 
4. **Run the server** 
   ```bash 
   npm run dev

## 🌍 Live Link [Vercel](https://library-management-omega-one.vercel.app/) https://library-management-omega-one.vercel.app

## 📚 Books Method

| Method | Endpoint             | Description                              |
| ------ | -------------------- | ---------------------------------------- |
| POST   | `/api/books`         | Create new book                          |
| GET    | `/api/books`         | Get all books (with filter, sort, limit) |
| GET    | `/api/books/:bookId` | Get book by ID                           |
| PATCH  | `/api/books/:bookId` | Update book                              |
| DELETE | `/api/books/:bookId` | Delete book                              |

### 🗂️ Sample Book Response

```json 
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
} 
```

## 🔄 Borrow Method

| Method | Endpoint      | Description                  |
| ------ | ------------- | ---------------------------- |
| POST   | `/api/borrow` | Borrow a book (with logic)   |
| GET    | `/api/borrow` | Borrow summary (aggregation) |


## 📌 Business Logic

- Check available copies before borrowing

- Deduct copies & update available field

- Uses static method + post-save middleware

### 📊 Borrow Summary Response
```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
