# Social Media Analytics Frontend

This project is a React-based social media analytics frontend that delivers real-time insights into user activity and posts.

## Tools Used

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **Axios**: Promise-based HTTP client for the browser and Node.js.

## Setup Instructions

1. Clone the repository and navigate into the project directory:
   ```sh
   cd problem2
   ```
2. Since `node_modules` and `package-lock.json` are included, you can skip the installation step. If you need to reinstall the dependencies, you can run:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   node server.js
   ```
4. Access the app in your browser at:
   ```
   http://localhost:9876
   ```

## Available Endpoints

### 1. Get Top Users
`GET /users`

Fetch the top 5 users with the most posts.

- **Response:**
  ```json
  [
    { "user": "User1", "postCount": 10 },
    { "user": "User2", "postCount": 8 },
    { "user": "User3", "postCount": 7 },
    { "user": "User4", "postCount": 5 },
    { "user": "User5", "postCount": 4 }
  ]
  ```

### 2. Get Popular Posts
`GET /posts?type=popular`

Fetch the most popular posts based on the number of comments.

- **Query Parameters:**
  - `type=popular` - Fetch the most popular posts.
- **Response:**
  ```json
  [
    { "id": 1, "title": "Popular Post 1", "timestamp": "2023-10-01T12:00:00Z" },
    { "id": 2, "title": "Popular Post 2", "timestamp": "2023-10-02T12:00:00Z" }
  ]
  ```

### 3. Get Latest Posts
`GET /posts?type=latest`

Fetch the latest 5 posts.

- **Query Parameters:**
  - `type=latest` - Fetch the latest posts.
- **Response:**
  ```json
  [
    { "id": 1, "title": "Latest Post 1", "timestamp": "2023-10-05T12:00:00Z" },
    { "id": 2, "title": "Latest Post 2", "timestamp": "2023-10-04T12:00:00Z" },
    { "id": 3, "title": "Latest Post 3", "timestamp": "2023-10-03T12:00:00Z" },
    { "id": 4, "title": "Latest Post 4", "timestamp": "2023-10-02T12:00:00Z" },
    { "id": 5, "title": "Latest Post 5", "timestamp": "2023-10-01T12:00:00Z" }
  ]
  ```


