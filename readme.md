

This project contains two main problems, each implemented as a separate microservice. The solutions are organized into two folders: `problem1` and `problem2`.

## Project Structure

- `problem1/`: Contains the implementation for Problem 1.
- `problem2/`: Contains the implementation for Problem 2.

## Problem 1

### Description

Problem 1 involves creating a microservice that fetches numbers from a test server, updates a sliding window of numbers, and calculates the average of the numbers in the window.

### Tools Used

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **Axios**: Promise-based HTTP client for the browser and Node.js.

### Setup Instructions

1. Navigate to the `problem1` directory:
   ```sh
   cd .\problem1
   ```
2. Since `node_modules` and `package-lock.json` are included, you can skip the installation step. If you need to reinstall the dependencies, you can run:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   node server.js
   ```
4. The server will run at `http://localhost:9876`.

For more details, refer to the [Problem 1 Readme](./problem1/readme.md).

## Problem 2

### Description

Problem 2 involves creating a React-based social media analytics frontend that delivers real-time insights into user activity and posts.

### Tools Used

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **Axios**: Promise-based HTTP client for the browser and Node.js.

### Setup Instructions

1. Navigate to the `problem2` directory:
   ```sh
   cd .\problem2
   ```
2. Since `node_modules` and `package-lock.json` are included, you can skip the installation step. If you need to reinstall the dependencies, you can run:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   node server.js
   ```
4. The server will run at `http://localhost:3000`.

For more details, refer to the [Problem 2 Readme](./problem2/readme.md).
