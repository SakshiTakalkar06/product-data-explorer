# Product Data Explorer

A full-stack product management application that allows users to create, view, update, and delete products through a responsive web interface.

## 🚀 Features

* Add new products
* View all products
* Edit existing products
* Delete products
* Product count dashboard
* Form validation
* Success and error messages
* Delete confirmation
* Responsive user interface
* PostgreSQL database integration
* REST API architecture

## 🛠️ Tech Stack

### Frontend

* React.js
* Axios
* CSS

### Backend

* NestJS
* TypeScript
* REST API

### Database

* PostgreSQL
* Prisma ORM

## 🏗️ Project Architecture

```text
React Frontend
      ↓
    Axios
      ↓
NestJS REST API
      ↓
   Prisma ORM
      ↓
 PostgreSQL
```

## 📌 API Endpoints

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| GET    | `/products`     | Get all products    |
| GET    | `/products/:id` | Get a product by ID |
| POST   | `/products`     | Create a product    |
| PATCH  | `/products/:id` | Update a product    |
| DELETE | `/products/:id` | Delete a product    |

## ▶️ Running the Project

### Backend

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Configure the PostgreSQL connection in `.env`:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/postgres?schema=public"
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Start the NestJS server:

```bash
npm run start:dev
```

Backend:

```text
http://localhost:3000
```

### Frontend

Open another terminal and navigate to the frontend:

```bash
cd backend/product-frontend
```

Install dependencies:

```bash
npm install
```

Start React:

```bash
npm start
```

Frontend:

```text
http://localhost:3001
```

## 🧪 CRUD Operations

The application demonstrates complete CRUD functionality:

* **Create** — Add a new product
* **Read** — Display products from PostgreSQL
* **Update** — Edit product details
* **Delete** — Remove products from the database

## 🎯 Project Objective

The objective of this project was to build a complete full-stack CRUD application and demonstrate integration between a React frontend, NestJS backend, Prisma ORM, and PostgreSQL database.

## 👩‍💻 Author

Sakshi Takalkar
