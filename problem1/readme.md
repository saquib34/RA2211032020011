# Problem 1

## Tools Used

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **Axios**: Promise-based HTTP client for the browser and Node.js.

## Instructions

1. Ensure you have Node.js installed on your machine.
2. Navigate to the directory containing `server.js`:
   ```sh
   cd .\problem1
   ```
3. Since `node_modules` and `package-lock.json` are included, you can skip the installation step. If you need to reinstall the dependencies, you can run:
   ```sh
   npm install
   ```
4. Start the server:
   ```sh
   node server.js
   ```
5. The server should now be running. You can check its functionality by navigating to `http://localhost:9876` in your web browser or using tools like Postman to make requests to the available endpoints.

## Available Endpoints

### `GET /numbers/:type`

Fetch numbers of the specified type (`p`, `f`, `e`, `r`), update the sliding window, and calculate the average.

- **Path Parameters:**
  - `type` - The type of numbers to fetch. Valid values are `p` (prime), `f` (Fibonacci), `e` (even), `r` (random).
- **Response:**
  ```json
  {
    "windowPrevState": [1, 2, 3],
    "windowCurrState": [1, 2, 3, 5],
    "numbers": [5],
    "avg": 2.75
  }
  ```

### Example Requests

- Fetch prime numbers:
  ```sh
  GET /numbers/p
  ```

- Fetch Fibonacci numbers:
  ```sh
  GET /numbers/f
  ```

- Fetch even numbers:
  ```sh
  GET /numbers/e
  ```

- Fetch random numbers:
  ```sh
  GET /numbers/r
  ```
