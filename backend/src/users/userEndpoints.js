require('dotenv').config();
const express = require('express');
const router = express.Router();
const {client } = require('../MongoClient/MongoClient');


router.get('/all', (req, res) => {
    async function run() {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            await client.connect();
            const database = client.db(process.env.DATABASE_NAME); // Replace 'YOUR_DATABASE_NAME' with the actual name of your database
            const collection = database.collection("Users");
            const documents = await collection.find().toArray();
            res.json(documents)
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    run().catch(console.dir);
});

router.post('/add', async (req, res) => {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        const database = client.db(process.env.DATABASE_NAME);
        const collection = database.collection("Users");

        // Data for the new user
        const newUser = {
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            name: '',
            lastName: '',
            nationality: '',
        };

        // Insert the new user to the database
        await collection.insertOne(newUser);

        // Response message
        res.status(201).json({ message: "User added successfully" });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Failed to add user" });
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});

module.exports = router;
