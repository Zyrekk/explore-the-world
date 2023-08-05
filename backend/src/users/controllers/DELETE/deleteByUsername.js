require('dotenv').config();
const {client} = require("../../../MongoClient/MongoClient")

const deleteUserByUsername = async (username) => {
    try {
        await client.connect();
        const database = client.db(process.env.DATABASE_NAME);
        const collection = database.collection("Users");

        const filter = {username};

        return await collection.deleteOne(filter);
    } catch (error) {
        console.error('Error:', error);
        throw new Error("Failed to delete the user");
    } finally {
        await client.close();
    }
};

module.exports = deleteUserByUsername;
