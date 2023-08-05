require('dotenv').config();
const {client} = require("../../../MongoClient/MongoClient")
const bcrypt = require('bcrypt');

const edit = async (username, updatedData, currentPassword) => {
    try {
        await client.connect();
        const database = client.db(process.env.DATABASE_NAME);
        const collection = database.collection("Users");

        const user = await collection.findOne({username});

        if (!user) {
            throw new Error('User not found');
        }

        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatch) {
            throw new Error('Incorrect current password');
        }
        const updateFields = {};

        // If a new password is provided, verify the current password before allowing the edit
        if (updatedData.password) {
            updateFields.password = await bcrypt.hash(updatedData.password, 10);
        }
        if (updatedData.email) {
            updateFields.email = updatedData.email;
        }
        if (updatedData.avatar) {
            updateFields.avatar = updatedData.avatar;
        }
        if (updatedData.name) {
            updateFields.name = updatedData.name;
        }
        if (updatedData.lastName) {
            updateFields.lastName = updatedData.lastName;
        }
        if (updatedData.country) {
            updateFields.country = updatedData.country;
        }

        await collection.updateOne({username}, {$set: updateFields});

        // Fetch the updated user after the edit, excluding the password
        return await collection.findOne({username}, {projection: {password: 0}});
    } catch (error) {
        console.error('Error:', error);
        throw new Error("Failed to edit user");
    } finally {
        await client.close();
    }
};

module.exports = edit
