require('dotenv').config();
const {client} = require("../../../MongoClient/MongoClient")

const getByUsername = async (username) => {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        const database = client.db(process.env.DATABASE_NAME);
        const collection = database.collection("Users");


        // Create a filter object based on the provided parameters
        const filter = {username};

        // Find the user in the database by the filter
        return await collection.findOne(filter);
    } catch (error) {
        console.error('Error:', error);
        throw new Error("Failed to get user");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
};

module.exports = getByUsername;
