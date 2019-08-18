require('dotenv').config();
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World')
})

const Port = process.env.PORT;
app.listen(Port, ()=> {
    console.log(`server is running on port ${Port}`)
})