const Joi = require('joi');
const jwt = require('jsonwebtoken');
const envVars = require('dotenv').config().parsed;
const Customer = require('./Customer');

module.exports = class User{
    constructor(name,email,password){
        this.name=name;
        this.email=email;
        this.password=password;
        this.customers=[];
    }

    static users = []; 
    static userSchema = Joi.object({
        name: Joi.string()
            .min(5)
            .max(50)
            .required(),
        email: Joi.string()
            .min(5)
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(5)
            .max(255)
            .required(),
        customers: Joi.any()
    })

    saveUser(){
        const {error} = User.userSchema.validate(this);
        if(error)
            return console.log(error);
        User.users.push(this);
    }

    validateUser(){
        return User.userSchema.validate(this);
    }

    generateAuthToken(){
        return jwt.sign({email:this.email},envVars.jwtPrivateKey);
    }

    fetchAllCustomers(){
        return this.customers;
    }
    removeCustomer(nID){
        this.customers = this.customers.filter( customer => customer.nID !== nID);
    }
    searchCustomer(name){
        return this.customers.filter( customer => {
            const fullName = customer.fName + ' ' + customer.lName; 
            return fullName.includes(name)
        })
    }
    addCustomer(customer){
        this.customers.push(customer);
    }
    editCustomer(nID,newCustomer){
        this.customers =this.customers.map(customer =>{
            if(customer.nID == nID)
                return newCustomer;
            return customer;  
        })
    }

}

