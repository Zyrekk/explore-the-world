require('dotenv').config();
const express = require('express');
const router = express.Router();
const {client} = require('../MongoClient/MongoClient');


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

router.get('/get/:username', async (req, res) => {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        const database = client.db(process.env.DATABASE_NAME);
        const collection = database.collection("Users");

        const username = req.params.username;
        const email = req.query.email;
        const nationality = req.query.nationality;

        // Create a filter object based on the provided parameters
        const filter = {username};
        if (email) filter.email = email;
        if (nationality) filter.nationality = nationality;

        // Find the user in the database by the filter
        const user = await collection.findOne(filter);

        if (!user) {
            return res.status(404).json({error: "User not found"});
        }

        // Response message
        res.status(200).json(user);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({error: "Failed to get user"});
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});

router.get('/getByEmail/:email', async (req, res) => {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        const database = client.db(process.env.DATABASE_NAME);
        const collection = database.collection("Users");

        const email = req.params.email;
        console.log(email)

        // Create a filter object based on the provided parameters
        const filter = {email};


        // Find the user in the database by the filter
        const user = await collection.findOne(filter);

        if (!user) {
            return res.status(404).json({error: "User not found"});
        }

        // Response message
        res.status(200).json(user);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({error: "Failed to get user"});
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});

router.delete('/deleteByUsername/:username', async (req, res) => {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        const database = client.db(process.env.DATABASE_NAME);
        const collection = database.collection("Users");

        const username = req.params.username;
        const filter = {username: username};

        const result = await collection.deleteOne(filter);
        if (result.deletedCount === 0) {
            return res.status(404).json({error: "User not found"});
        }
        res.status(200).json({message: "User deleted successfully"});

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({error: "Failed to delete the user"});
    } finally {
        await client.close();
    }
});


router.post('/add', async (req, res) => {
    try {
        await client.connect();
        const database = client.db(process.env.DATABASE_NAME);
        const collection = database.collection("Users");
        // Data for the new user
        const newUser = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            avatar: req.file ? req.file.buffer : null, // Store the file buffer in the 'avatar' field if a file was uploaded
            name: req.body.name || '',
            lastName: req.body.lastName || '',
            nationality: req.body.nationality || '',
        };

        // Insert the new user to the database
        await collection.insertOne(newUser);

        // Response message
        res.status(201).json({message: "User added successfully"});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({error: "Failed to add user"});
    } finally {
        // Ensure the MongoDB client is closed when you finish/error
        await client.close();
    }
});

module.exports = router;
