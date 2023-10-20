const express = require('express');
const path = require('path');

const options = {
    "caseSensitive": false,
    "strict": false
}

const router = express.Router(options);

//sample data
var userList = [{username: "hieu",password: "tgh123",isActive: true},
                {username: "bob",password: "bob123",isActive: false},
                {username: "anna",password: "anna123",isActive: true}]

//get view user list
router.get('/users', (req, res, next) => {
    res.sendFile(path.join(__dirname, "..", 'public', 'views', 'user.html'));
})

//get view user detail
router.get('/users/:username', (req, res, next) => {
    console.log(req.params.username);
    if(userList.findIndex(o => o.username == req.params.username) < 0){
        let error = new Error("User not found");
        error.status = 404;
        return next(error);
    }
    res.sendFile(path.join(__dirname, "..", 'public', 'views', 'user-detail.html'));
})

//get view add user
router.get('/users-add', (req, res, next) => {
    res.sendFile(path.join(__dirname, "..", 'public', 'views', 'user-add.html'));
})

//get all user and convert into inner html of table tag
router.get('/get-all-users', (req, res, next) => {
    var content = `<tr>
                        <th>UserName</th>
                        <th>Password</th>
                        <th>Active</th>
                    </tr>`;
    const tableRows = userList.map(user => `
    <tr>
        <td><a href ="/users/${user.username}">${user.username}</a></td>
        <td>${user.password}</td>
        <td>${user.isActive}</td>
    </tr>
    `).join('');
    res.status(200).send(content.concat(tableRows));
})

//get user detail
router.get('/users/detail/:username', (req, res, next) => {
    var user = userList.find(o => o.username == req.params.username)
    if(user == null){
        let error = new Error("User not found");
        error.status = 404;
        return next(error);
    }
    res.json(user);
})

//update user
router.put('/users', express.json(), (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const isActive = req.body.isActive;
    
    var user = userList.find(o => o.username == username)
    if(user == null){
        let error = new Error("User not found");
        error.status = 404;
        return next(error);
    }
    
    user.password = password;
    user.isActive = isActive;
    res.json({ success: true });
})
//add new user
router.post('/users', express.json(), (req, res, next) => {
    const username = req.body.username;

    var user = userList.find(o => o.username == username)
    if(user){
        let error = new Error("User existed");
        error.status = 500;
        return next(error);
    }
    userList.push(req.body);
    res.sendFile(path.join(__dirname, "..", 'public', 'views', 'users.html'));
})
//delete user
router.delete('/users', express.json(), (req, res, next) => {
    const username = req.body.username;

    var index = userList.findIndex(o => o.username == username);
    if(index < 0){
        let error = new Error("User not found");
        error.status = 404;
        return next(error);
    }
    userList.splice(index, 1);
    res.json({ success: true });
})

module.exports = router;