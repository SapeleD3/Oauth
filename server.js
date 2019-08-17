const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World')
})

const Port = 6536;
app.listen(Port, ()=> {
    console.log(`server is running on port ${Port}`)
})