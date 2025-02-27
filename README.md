

# Boi Bajar Project - Backend

Welcome to the **Boi Bajar Project Backend**! This is the backend of a book management and e-commerce platform built with **Node.js**, **Express**, and **MongoDB**. It provides APIs for user authentication, product management, and order processing.

---

## **Features**

### **User Authentication**
- Secure registration and login with JWT-based authentication.
- Passwords are securely hashed using **bcrypt**.
- Role-based access control (user and admin roles).

### **Product Management**
- CRUD operations for products.
- Search and filter functionality by title, author, category, and price range.

### **Order Management**
- Place orders with payment integration using **ShurjoPay**.
- Ensure ordered quantity does not exceed product stock.

### **Error Handling**
- User-friendly error messages for invalid inputs or failed operations.

---

## **Technologies Used**

- **Node.js**: Runtime environment for JavaScript.
- **Express**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM for MongoDB.
- **JWT**: For secure authentication.
- **ShurjoPay**: Payment gateway integration.
- **Cloudinary**: For image upload and management.


## **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/IshtyMahin/Boi_Bajar_Backend.git 
   cd Boi_Bajar_Backend


2. Install dependencies:
   ```bash
   npm install

3. Start the development server:
    ```bash
      npm run dev

4. The server will start on http://localhost:5000.

## **Scripts**
npm run dev: Start the development server with ts-node-dev.

npm run build: Compile TypeScript to JavaScript

## **Environment Variables**
Create a .env file in the root directory and add the following variables:

```
NODE_ENV=production
PORT=5000
DATABASE_URL=URL
BCRYPT_SALT_ROUNDS=12

SP_ENDPOINT=https://sandbox.shurjopayment.com
SP_USERNAME=sp_sandbox
SP_PASSWORD=pyyk97hu&6u6
SP_PREFIX=SP
SP_RETURN_URL=URL
DB_FILE=./shurjopay-tx.db