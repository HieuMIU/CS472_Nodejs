const express = require('express');
const path = require('path');

const options = {
    "caseSensitive": false,
    "strict": false
}

const router = express.Router(options);

//Sample Data
var productList = [{name: "PC",price: 1099, quantity: 5},
                {name: "Tablet",price: 399, quantity: 15},
                {name: "Macbook",price: 1299, quantity: 3},
                {name: "Laptop",price: 799, quantity: 7}]

//get view product list
router.get('/products', (req, res, next) => {
    res.sendFile(path.join(__dirname, "..", 'public', 'views', 'product.html'));
})

//get view product detail
router.get('/products/:name', (req, res, next) => {
    console.log(req.params.name);
    if(productList.findIndex(o => o.name == req.params.name) < 0){
        let error = new Error("Product not found");
        error.status = 404;
        return next(error);
    }
    res.sendFile(path.join(__dirname, "..", 'public', 'views', 'product-detail.html'));
})

//get view add product 
router.get('/products-add', (req, res, next) => {
    res.sendFile(path.join(__dirname, "..", 'public', 'views', 'product-add.html'));
})

//get all product
router.get('/get-all-products', (req, res, next) => {
    var content = `<tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>`;
    const tableRows = productList.map(product => `
    <tr>
        <td><a href ="/products/${product.name}">${product.name}</a></td>
        <td>${product.price}</td>
        <td>${product.quantity}</td>
    </tr>
    `).join('');
    res.status(200).send(content.concat(tableRows));
})

//get product by name
router.get('/products/detail/:name', (req, res, next) => {
    var product = productList.find(o => o.name == req.params.name)
    if(product == null){
        let error = new Error("Product not found");
        error.status = 404;
        return next(error);
    }
    res.json(product);
})

//update product
router.put('/products', express.json(), (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const quantity = req.body.quantity;
    
    var product = productList.find(o => o.name == name)
    if(product == null){
        let error = new Error("Product not found");
        error.status = 404;
        return next(error);
    }
    
    product.price = price;
    product.quantity = quantity;
    res.json({ success: true });
})

//add new product 
router.post('/products', express.json(), (req, res, next) => {
    const name = req.body.name;

    var product = productList.find(o => o.name == name)
    if(product){
        let error = new Error("Product existed");
        error.status = 500;
        return next(error);
    }
    productList.push(req.body);
    res.json({ success: true });
})

//delete product
router.delete('/products', express.json(), (req, res, next) => {
    const name = req.body.name;

    var index = productList.findIndex(o => o.name == name);
    if(index < 0){
        let error = new Error("Product not found");
        error.status = 404;
        return next(error);
    }
    productList.splice(index, 1);
    res.json({ success: true });
})

module.exports = router;