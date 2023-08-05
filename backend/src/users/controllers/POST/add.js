const {client} = require("../../../MongoClient/MongoClient")
const bcrypt = require('bcrypt');

const add = async (userData) => {
    try {
        await client.connect();
        const database = client.db(process.env.DATABASE_NAME);
        const collection = database.collection("Users");
        await collection.insertOne(userData);

        return {message: "User added successfully"};
    } catch (error) {
        console.error('Error:', error);
        throw new Error("Failed to add user");
    } finally {
        await client.close();
    }
};

module.exports = add;
