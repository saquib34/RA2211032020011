const express = require('express');
const axios = require('axios');
const app = express();
const port = 9876;
const BASE_URL = 'http://20.244.56.144/test';
const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNDc2ODUyLCJpYXQiOjE3NDI0NzY1NTIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjhhMTc1ZTQ3LWZjMjktNGFkMC04NzRjLTk0N2M4ZjEyMjAyNyIsInN1YiI6Im1kNzA4MkBzcm1pc3QuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiQWZmb3JkIE1lZGljYWxzIiwiY2xpZW50SUQiOiI4YTE3NWU0Ny1mYzI5LTRhZDAtODc0Yy05NDdjOGYxMjIwMjciLCJjbGllbnRTZWNyZXQiOiJqd05Ndk1SRU9vRE1RYnJ6Iiwib3duZXJOYW1lIjoiTW9oYW1tYWQgU2FxdWliIERhaXlhbiIsIm93bmVyRW1haWwiOiJtZDcwODJAc3JtaXN0LmVkdS5pbiIsInJvbGxObyI6IlJBMjIxMTAzMjAyMDAxMSJ9.TjG9tvln741ozYhhhmJqIYVF4f_crnHxgN7myO8y7ZQ";

// Fetch users
async function getUsers() {
  const response = await axios.get(`${BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    }
  });
  return response.data;
}

// Fetch posts for a user
async function getUserPosts(userId) {
  const response = await axios.get(`${BASE_URL}/users/${userId}/posts`, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    }
  });
  return response.data;
}

// Fetch comments for a post
async function getPostComments(postId) {
  const response = await axios.get(`${BASE_URL}/posts/${postId}/comments`, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    }
  });
  return response.data;
}

// Top Users API
app.get('/users', async (req, res) => {
  try {
    const users = await getUsers();
    const postCounts = await Promise.all(users.map(async (user) => {
      const posts = await getUserPosts(user.id);
      return { user: user.name, postCount: posts.length };
    }));

    const topUsers = postCounts.sort((a, b) => b.postCount - a.postCount).slice(0, 5);
    res.json(topUsers);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Top/Latest Posts API
app.get('/posts', async (req, res) => {
  try {
    const type = req.query.type;
    if (!['popular', 'latest'].includes(type)) {
      return res.status(400).send('Invalid type parameter');
    }

    const users = await getUsers();
    let allPosts = [];
    for (const user of users) {
      const posts = await getUserPosts(user.id);
      allPosts = allPosts.concat(posts);
    }

    if (type === 'popular') {
      const commentCounts = await Promise.all(allPosts.map(async (post) => {
        const comments = await getPostComments(post.id);
        return { post, commentCount: comments.length };
      }));

      const maxComments = Math.max(...commentCounts.map(c => c.commentCount));
      const popularPosts = commentCounts.filter(c => c.commentCount === maxComments).map(c => c.post);
      res.json(popularPosts);
    } else {
      const latestPosts = allPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 5);
      res.json(latestPosts);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => console.log(`Microservice for the media  running at http://localhost:${port}`));
