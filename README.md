**Table of Contents**

- [Products API](#products-api)
  - [Prerequisites](#prerequisites)
  - [Project Setup](#project-setup)
  - [Database Setup](#database-setup)
  - [Environment Variables](#environment-variables)
  - [Implementing the Endpoints](#implementing-the-endpoints)
  - [Running the Server](#running-the-server)
  - [API Endpoints](#api-endpoints)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Products API
This is a RESTful API developed using Express.js and Prisma with PostgreSQL to manage a collection of products. The API allows clients to perform CRUD (Create, Read, Update, Delete) operations on the products stored in a PostgreSQL database.

## Prerequisites
- Node.js and npm installed on your machine.
- PostgreSQL installed and running on your machine.

## Project Setup
1. Initialize a new Node.js project:
   ```bash
   npm init -y
   ```
2. Install the necessary dependencies:
   ```bash
   npm install express @prisma/client
   ```
3. Install development dependencies for Prisma and nodemon for automatic server restarts during development:
   ```bash
   npm install -D prisma nodemon
   ```
4. Set up PostgreSQL:
   - Ensure PostgreSQL is installed and running on your machine.
   - Create a new database for this project.

## Database Setup
1. Initialize Prisma in your project:
   ```bash
   npx prisma init
   ```
2. Update the `DATABASE_URL` in the `.env` file with your PostgreSQL credentials:
   ```env
   DATABASE_URL="postgresql://your_postgres_username:your_postgres_password@localhost:5432/your_database_name?schema=public"
   ```
3. Define the `Product` model in `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   generator client {
     provider = "prisma-client-js"
   }

   model Product {
     id                Int     @id @default(autoincrement())
     productThumbnail  String
     productTitle      String
     productDescription String?
     productCost       Float
     onOffer           Boolean
   }
   ```
4. Run the Prisma migration to create the `Product` table in the database:
   ```bash
   npx prisma migrate dev --name initial-migration
   ```
5. Generate the Prisma client:
   ```bash
   npx prisma generate
   ```

## Environment Variables
Ensure your `.env` file contains the following:
```env
DATABASE_URL="postgresql://your_postgres_username:your_postgres_password@localhost:5432/your_database_name?schema=public"
```
Replace `your_postgres_username`, `your_postgres_password`, and `your_database_name` with your actual PostgreSQL credentials and database name.

## Implementing the Endpoints
Create a file named `index.js` and add the following code to set up the server and implement the endpoints:
```javascript
import express from "express";
import productRouter from "./routes/products.routes.js"

import { config } from "dotenv";


const app = express();
app.use(express.json())
app.use("/products",productRouter)
config()

app.listen(8080,()=> {
  console.log("App running on port 8080")
}) 
```

create and export a `products.route.js` contaning the API endpoints eg:
```javascript
router.get("/", async (req, res) => {
  try{
    const products = await prisma.products.findMany()
    res.status(200).json(products)
  }
  catch(err){
    res.status(500).json({success:false, message:err.message})
  }
});
```
Above is a **get all products** API Endpoint

## Running the Server
Start the server using the following command:
```bash
npm run dev
```

## API Endpoints
- Get All Products: `GET /products`
- Get a Single Product: `GET /products/:id`
- Create a Product: `POST /products`
- Update a Product: `PUT /products/:id`
- Delete a Product: `DELETE /products/:id`

This README now includes the setup and configuration steps necessary for integrating Prisma into your Products API project.