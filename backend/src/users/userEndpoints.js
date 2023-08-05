require('dotenv').config();
const express = require('express');
const router = express.Router();
const {client} = require('../MongoClient/MongoClient');

const getByEmail = require('./controllers/GET/getByEmail');
const getByUsername = require("./controllers/GET/getByUsername");
const deleteUserByUsername = require("./controllers/DELETE/deleteByUsername");
const add = require("./controllers/POST/add");
const login = require("./controllers/POST/login");
const editUser = require("./controllers/PUT/edit");


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
router.get('/getByUsername/:username', async (req, res) => {
    try {
        const username = req.params.username;

        const user = await getByUsername(username);

        if (!user) {
            return res.status(404).json({error: "User not found"});
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({error: "Failed to get user"});
    }
});
router.get('/getByEmail/:email', async (req, res) => {
    try {
        const email = req.params.email;

        const user = await getByEmail(email);

        if (!user) {
            return res.status(404).json({error: "User not found"});
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({error: "Failed to get user"});
    }
});
router.post('/add', async (req, res) => {
    try {
        const userData = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            avatar: req.file ? req.file.buffer : null,
            name: req.body.name || '',
            lastName: req.body.lastName || '',
            country: req.body.country ? JSON.parse(req.body.country) : null,
        };
        const result = await add(userData);

        res.status(201).json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({error: "Failed to add user"});
    }
});
router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await login(email, password);

        res.status(200).json(user);
    } catch (error) {
        console.error('Error:', error);
        if (error.message === 'User not found') {
            res.status(404).json({error: 'User not found'});
        } else if (error.message === 'Incorrect password') {
            res.status(401).json({error: 'Incorrect password'});
        } else {
            res.status(500).json({error: 'Login failed'});
        }
    }
});
router.put('/edit', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.currentPassword;
        const updatedData = {
            password: req.body.password,
            email: req.body.email,
            avatar: req.file ? req.file.buffer : null,
            name: req.body.name,
            lastName: req.body.lastName,
            country: req.body.country ? JSON.parse(req.body.country) : null,
        };
        console.log(updatedData)

        const modifiedCount = await editUser(username, updatedData, password); // Pass the current password

        res.status(200).json(modifiedCount);
    } catch (error) {
        console.error('Error:', error);
        if (error.message === 'Incorrect current password') {
            res.status(401).json({error: 'Incorrect current password'});
        } else {
            res.status(500).json({error: "Failed to edit user"});
        }
    }
});
router.delete('/deleteByUsername/:username', async (req, res) => {
    try {
        const username = req.params.username;

        const result = await deleteUserByUsername(username);

        if (result.deletedCount === 0) {
            return res.status(404).json({error: "User not found"});
        }

        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({error: "Failed to delete the user"});
    }
});

module.exports = router;
