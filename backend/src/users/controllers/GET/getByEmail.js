require('dotenv').config();
const {client} = require("../../../MongoClient/MongoClient")

const getByEmail = async (email) => {
    try {
        await client.connect();
        const database = client.db(process.env.DATABASE_NAME);
        const collection = database.collection("Users");

        const filter = {email};

        return await collection.findOne(filter);
    } catch (error) {
        console.error('Error:', error);
        throw new Error("Failed to get user");
    } finally {
        await client.close();
    }
};

module.exports = getByEmail;
