const {client} = require("../../../MongoClient/MongoClient")
const bcrypt = require('bcrypt');

const add = async (userData) => {
    try {
        await client.connect();
        const database = client.db(process.env.DATABASE_NAME);
        const collection = database.collection("Users");

        const newUser = {
            username: userData.username,
            password: await bcrypt.hash(userData.password, 10),
            email: userData.email,
            avatar: userData.avatar || null,
            name: userData.name || '',
            lastName: userData.lastName || '',
            country: JSON.parse(userData.country) || null
        };

        await collection.insertOne(newUser);

        return {message: "User added successfully"};
    } catch (error) {
        console.error('Error:', error);
        throw new Error("Failed to add user");
    } finally {
        await client.close();
    }
};

module.exports = add;
