const express = require('express')
const app = express()
app.use(express.json());

const usersRoutes = require('./src/users/userEndpoints');

app.use('/users', usersRoutes);

app.listen(5000, () => {
    console.log("server started on port 5000")
})
