const express = require('express');
const app = express();
const envVars = require('dotenv').config().parsed;

const auth = require('./routes/auth');
const users = require('./routes/users');
const customers = require('./router/customers');

if(!envVars.jwtPrivateKey) {
    console.error('FATAL: jwtPrivateKey is not Provided');
    process.exit(1);
}


app.use(express.json())
app.use(express.urlencoded({extended:false}));


app.use('/auth',auth)
app.use('/users',users);
app.user('/customers',customers);

