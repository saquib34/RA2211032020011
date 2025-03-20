const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;

// Test Server API Endpoints
const API_ENDPOINTS = {
    p: "http://20.244.56.144/test/primes",
    f: "http://20.244.56.144/test/fibo",
    e: "http://20.244.56.144/test/even",
    r: "http://20.244.56.144/test/rand"
};

// Sliding window 
let windowNumbers = [];

// Bearer token 
const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNDc2ODUyLCJpYXQiOjE3NDI0NzY1NTIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjhhMTc1ZTQ3LWZjMjktNGFkMC04NzRjLTk0N2M4ZjEyMjAyNyIsInN1YiI6Im1kNzA4MkBzcm1pc3QuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiQWZmb3JkIE1lZGljYWxzIiwiY2xpZW50SUQiOiI4YTE3NWU0Ny1mYzI5LTRhZDAtODc0Yy05NDdjOGYxMjIwMjciLCJjbGllbnRTZWNyZXQiOiJqd05Ndk1SRU9vRE1RYnJ6Iiwib3duZXJOYW1lIjoiTW9oYW1tYWQgU2FxdWliIERhaXlhbiIsIm93bmVyRW1haWwiOiJtZDcwODJAc3JtaXN0LmVkdS5pbiIsInJvbGxObyI6IlJBMjIxMTAzMjAyMDAxMSJ9.TjG9tvln741ozYhhhmJqIYVF4f_crnHxgN7myO8y7ZQ";

// Function to fetch numbers from the test server
const fetchNumbers = async (type) => {
    try {
        const response = await axios.get(API_ENDPOINTS[type], {
            headers: {
                Authorization: `Bearer ${BEARER_TOKEN}`
            },
            
            timeout: 5000
        });
        return response.data.numbers || [];
    } catch (error) {
        console.error(`Error fetching ${type} numbers:`, error.message);
        return [];
    }
};


const updateWindow = (newNumbers) => {
    try {
        const prevState = [...windowNumbers];
        
        // Add unique numbers to the window
        newNumbers.forEach((num) => {
            if (!windowNumbers.includes(num)) {
                windowNumbers.push(num);
            }
        });
        
        // Limit stored numbers to window size
        // If window size is exceeded, remove oldest numbers
        if (windowNumbers.length > WINDOW_SIZE) {
            windowNumbers = windowNumbers.slice(windowNumbers.length - WINDOW_SIZE);
        }
        
        return prevState;
    } catch (error) {
        console.error("Error updating window:", error.message);
        return [];
    }
};

// Function to calculate average of numbers in the window
const calculateAverage = () => {
    if (windowNumbers.length === 0) return 0;
    const sum = windowNumbers.reduce((acc, num) => acc + num, 0);
    return parseFloat((sum / windowNumbers.length).toFixed(2)); // Round to 2 decimal places
};w

// API Endpoint that handles the number requests
app.get("/numbers/:type", async (req, res) => {
    const { type } = req.params;
    
    // Validating... the number type parameter
    if (!API_ENDPOINTS[type]) {
        return res.status(400).json({ error: "Invalid number type" });
    }
    
    try {
        // Fetching... numbers from the test server
        const newNumbers = await fetchNumbers(type);
        
        // Updating... the sliding window and get previous state
        const prevState = updateWindow(newNumbers);
        
        // Calculating the average
        const avg = calculateAverage();
        
        // Sending the response......
        res.json({
            windowPrevState: prevState,
            windowCurrState: windowNumbers,
            numbers: newNumbers,
            avg: avg
        });
    } catch (error) {
        res.status(500).json({ 
            error: "Internal server error",
            message: error.message
        });
    }
});

// Starting the server
app.listen(PORT, () => {
    console.log(`Average Calculator Microservice running on http://localhost:${PORT}`);
});