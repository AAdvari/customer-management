const express = require('express');
const router = express.Router(); 
const User = require('../models/user');


router.post('/',auth, (req,res)=>{
    const user = User.users.find( user => req.user.email=== user.email );
    const customer = new Customer(
        req.body.fName,
        req.body.lName,
        req.body.nID,
        req.body.phone
    )

    const {err} = user.addCustomer(customer);
    if(err){
        return res.status(400).send(err.details[0].message);
    }

    if(user.fetchAllCustomers.contains(customer))
        return res.status(400).send('Customer Already exists');

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
    res.send(custumers);
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
        if(customer.nID === req.params.nID)
            return newCustomer
        return customer;
    });

    res.send(user.fetchAllCustomers());
})