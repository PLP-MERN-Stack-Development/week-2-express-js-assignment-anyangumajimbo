
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19847920&assignment_repo_type=AssignmentRepo)

# 📦 Express.js RESTful API Assignment – Final Submission

This project implements a complete RESTful API using **Express.js** with support for routing, middleware, validation, error handling, and advanced features like search, filtering, pagination, and statistics.

---

## ✅ Assignment Objectives

1. Set up an Express.js server
2. Create full CRUD RESTful API for a product resource
3. Implement middleware: logging, authentication, and validation
4. Add global error handling
5. Add search, filtering, pagination, and statistics support

---

## 🛠️ Getting Started

### 📦 Installation

```bash
git clone https://github.com/PLP-MERN-Stack-Development/week-2-express-js-assignment-anyangumajimbo.git
cd week-2-express-js-assignment-anyangumajimbo
npm install
npm start


> Server will run on [http://localhost:3000](http://localhost:3000)

---

## 🔐 Authentication

All routes require an API key:

| Header Key | Value  |
| ---------- | ------ |
| x-api-key  | 123456 |

---

## 📁 Files Included

* `server.js` – Complete Express API with routes and middleware
* `.env.example` – Required environment variable keys
* `README.md` – Documentation and examples
* `Week2-Assignment.md` – Provided assignment instructions

---

## 🔗 API Endpoints

### `GET /api/products`

Returns a list of products. Supports:

* `?category=electronics`
* `?search=laptop`
* `?page=1&limit=2`

---

### `GET /api/products/:id`

Returns a single product by its ID.

---

### `POST /api/products`

Creates a new product.

#### Request body:

```json
{
  "name": "Bluetooth Speaker",
  "description": "Portable speaker with bass",
  "price": 75,
  "category": "electronics",
  "inStock": true
}
```

---

### `PUT /api/products/:id`

Updates a product by ID.

---

### `DELETE /api/products/:id`

Deletes a product by ID.

---

### `GET /api/products/stats`

Returns product count by category.

#### Sample response:

```json
{
  "electronics": 2,
  "kitchen": 1
}
```

---

## 🧰 Middleware Features

* **Logger** – Logs method, path, and timestamp
* **Authentication** – Requires valid `x-api-key`
* **Validation** – Checks required product fields
* **Error Handling** – Global error response middleware

---

## 🌱 Environment Variables

Add a `.env` file like this:

```
PORT=3000
API_KEY=your_api_key_here
```

(You can use `.env.example` as a reference.)

---

## 🧪 Testing

You can test the API using:

* Postman
* Insomnia
* curl

#### Example:

```bash
curl -H "x-api-key: 123456" http://localhost:3000/api/products
```

---

## 📚 Resources

* [Express.js Documentation](https://expressjs.com/)
* [RESTful API Best Practices](https://restfulapi.net/)
* [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

---

## 👤 Author

* **Anyangu Mukhutsi Majimbo**
* PLP MERN Stack Development Program
* Week 2 Express.js Assignment

````

