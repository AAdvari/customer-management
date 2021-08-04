const bcrypt = require('bcrypt');
const User = require('../models/user');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
    const user = new User(
        req.body.name, 
        req.body.email, 
        req.body.password
    );
    const {error} = user.validate();

    if(error)
        return res.status(400).send(error.details[0].message);
    
    let existedUser = User.users.find(user => user.email === req.body.email);
    if(existedUser) return res.status(400).send('User Already Registered');

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    user.saveUser();
    

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(user);
})

module.exports = router; 