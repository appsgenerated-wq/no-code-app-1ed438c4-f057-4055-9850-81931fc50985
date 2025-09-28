# BankApp - A Manifest-Powered Banking Application

This is a full-stack digital banking application built with React and Manifest. It provides a secure environment for users to manage their bank accounts and view their transaction history.

## Features

- **Secure User Authentication**: Users can sign up and log in securely. Powered by Manifest's `authenticable` feature.
- **Account Management**: Users can view their checking and savings accounts, including current balances.
- **Transaction History**: A clear, chronological list of all transactions for each account.
- **Log New Transactions**: A simple interface to create new transactions like deposits, withdrawals, or transfers.
- **Role-Based Access Control**: Strict policies ensure users can only access their own financial data. An admin role is available for administrative tasks via the Manifest Admin Panel.
- **Admin Panel**: A complete backend interface at `/admin` for managing users, accounts, and all data.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Manifest
- **API Communication**: Manifest SDK

## Getting Started

### Prerequisites

- Node.js and npm
- A running Manifest backend instance

### Setup

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Configure Environment**: Ensure the `BACKEND_URL` in `src/constants.js` points to your Manifest backend instance.
4.  **Run the application**:
    ```bash
    npm run dev
    ```

### Default Credentials

- **Admin/Demo User**: `admin@manifest.build`
- **Password**: `admin`