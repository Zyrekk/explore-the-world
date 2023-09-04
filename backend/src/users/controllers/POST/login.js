require('dotenv').config();
const {client} = require("../../../MongoClient/MongoClient")
const bcrypt = require('bcrypt');

const login = async (email, password) => {
    try {
        await client.connect();
        const database = client.db(process.env.DATABASE_NAME);
        const collection = database.collection("Users");

        const user = await collection.findOne({email});

        if (!user) {
            throw new Error('User not found');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Incorrect password');
        }

        // Exclude the password field from the returned user object
        const userWithoutPassword = {...user};
        delete userWithoutPassword.password;

        return userWithoutPassword;
    } finally {
        await client.close();
    }
};

module.exports = login;
