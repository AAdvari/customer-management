const express = require('express');
const router = express.Router(); 
const User = require('../models/user');
const Customer = require('../models/customer');
const auth = require('../middleware/auth');

router.post('/',auth, (req,res)=>{
    const user = User.users.find( user => req.user.email=== user.email );
    const customer = new Customer(
        req.body.fName,
        req.body.lName,
        req.body.nID,
        req.body.phone
    )

    const {error} = customer.validateCustomer();
    if(error){
        return res.status(400).send(err.details[0].message);
    }

    const existedCustomer = user.fetchAllCustomers().find(customer => customer.nID === req.body.nID )
    if(existedCustomer)
        return res.status(400).send('Customer with given national id already exists');

    user.addCustomer(customer);

    console.log(user.fetchAllCustomers())
    res.send(customer);
})


router.get('/',auth, (req,res)=>{
    const user = User.users.find( user => req.user.email=== user.email );

    const search = req.query.search; 
    if(!search)
        return res.send(user.fetchAllCustomers());
    return res.send(user.searchCustomer(search));
})

router.delete('/:nID', auth , (req,res)=>{
    const user = User.users.find( user => req.user.email === user.email );
    user.customers = user.fetchAllCustomers().filter(customer => customer.nID !== req.params.nID);
    res.send(user.customers);
})


router.put('/:nID', auth , (req,res)=>{
    const user = User.users.find( user => req.user.email === user.email );
    const editedCustomer = new Customer(
        req.body.fName,
        req.body.lName,
        req.body.nID,
        req.body.phone
    );
    const {error} = editedCustomer.validateCustomer();
    if(error) {
        return res.status(400).send(error.details[0].message)
    } 

    user.fetchAllCustomers().map(customer => {
        if(customer.nID === req.params.nID){
            customer.fName=editedCustomer.fName;
            customer.lName=editedCustomer.lName;
            customer.phone=editedCustomer.phone;
            customer.nID=editedCustomer.nID;
        }  
    });

    res.send(user.fetchAllCustomers());
})

module.exports = router;