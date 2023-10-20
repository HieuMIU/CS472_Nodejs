const express = require("express");
const path = require("path");

const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const app = express();

app.use(express.static("./public"));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});

app.get('/error', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'error.html'));
});

//Routes
app.use(userRouter);
app.use(productRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
  
    const status = err.status || 500;
    
    res.status(status).sendFile(path.join(__dirname, 'public', 'views', '404error.html'));
  });

app.listen(process.env.PORT, () => {
    console.log("Server is running on " + process.env.PORT);
});