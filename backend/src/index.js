require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(process.env.DATABASE_URL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const database = client.db("ETW"); // Replace 'YOUR_DATABASE_NAME' with the actual name of your database
        const collection = database.collection("Users");
        const documents = await collection.find().toArray();

        console.log(documents);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
