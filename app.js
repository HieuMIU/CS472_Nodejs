const express = require('express');
const studentRouter = require('./router/studentRouter');

const app = express();

app.use(express.json());

app.use('/students', studentRouter);

app.use((err, req, res, next) => {
    res.status(500).json({message: "Something went wrong:" + err.message});
})

var port = process.env.PORT;
app.listen(port,() => {
    console.log("Server is running on port " + port);
});