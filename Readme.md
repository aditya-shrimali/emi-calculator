# EMI Calculator

This project is an EMI (Equated Monthly Installment) calculator API built with Node.js, Express, and PostgreSQL.

## Prerequisites

- Node.js (v14 or later)
- npm (comes with Node.js)
- PostgreSQL (v12 or later)

## Setup

1. Clone the repository:

   ```
   git clone https://github.com/aditya-shrimali/emi-calculator.git
   cd emi-calculator
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up the database:

   - Create a PostgreSQL database named `emi_db`
   - Create a user named `emiuser` with password `emipassword`
   - Grant all privileges on `emi_db` to `emiuser`

4. Create the `Loans` table (SQL Script):

   - Connect to your PostgreSQL database and run the following SQL script:
     ```sql
     CREATE TABLE "Loans" (
       id SERIAL PRIMARY KEY,
       loan_amount DECIMAL(10, 2) NOT NULL,
       interest_rate DECIMAL(5, 2) NOT NULL,
       loan_tenure_months INTEGER NOT NULL,
       emi DECIMAL(10, 2) NOT NULL,
       prepayment_amount DECIMAL(10, 2),
       remaining_balance DECIMAL(10, 2) NOT NULL,
       "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
       "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
     );
     ```

5. Set up environment variables:
   - Create a `.env` file in the project root with the following content:
     ```
     DB_USERNAME=emiuser
     DB_PASSWORD=emipassword
     DB_NAME=emi_db
     DB_HOST=localhost
     DB_PORT=5432
     PORT=3000
     ```

## Running the Project

1. Start the server:

   ```
   npm start
   ```

2. The API will be available at `http://localhost:3000`

## API Endpoints

- POST `/api/calculate-emi`: Calculate EMI

  - Request body example:
    ```json
    {
      "loan_amount": 100000,
      "interest_rate": 7.5,
      "loan_tenure_months": 36,
      "prepayment_amount": 10000
    }
    ```

- GET `/api/emis`: Get all EMI records
- GET `/api/emi/:id`: Get a specific EMI record by ID

## Testing

You can use tools like Postman or cURL to test the API endpoints.

Example cURL command to calculate EMI:
