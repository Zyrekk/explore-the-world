const express = require('express');
const multer = require('multer');
const cors = require('cors'); // Import the cors middleware

const app = express();
app.use(cors())
app.use(express.json());

// Create a storage engine for multer to handle the file uploads
const storage = multer.memoryStorage(); // Store the uploaded image in memory as a buffer

// Create the multer middleware using the storage engine
const upload = multer({storage});

// Import the userEndpoints router
const usersRoutes = require('./src/users/userEndpoints');

// Pass the 'upload' middleware to the userEndpoints router
app.use('/users', upload.single('avatar'), usersRoutes);

app.listen(5000, '192.168.1.106', () => {
    console.log("server started on port 5000");
});
