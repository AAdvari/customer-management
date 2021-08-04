const Joi = require('joi');
const jwt = require('jsonwebtoken');
const envVars = require('dotenv').config().parsed;

class User{
    constructor(name,email,password){
        this.name=name;
        this.email=email;
        this.password=password;
        this.customers=[];
    }

    static users = []; 
    static userSchema = Joi.object({
        name: Joi.string()
            .minLength(5)
            .maxLength(50)
            .required(),
        email: Joi.string()
            .minLength(5)
            .maxLength(255)
            .required()
            .email(),
        password: Joi.string()
            .minLength(5)
            .maxLength(50)
            .required()
    })

    saveUser(){
        const {error} = userSchema.validate(this);
        if(error)
            return console.log(error);
        users.push(this);
    }

    validate(){
        return userSchema.validate(this);
    }

    generateAuthToken(){
        return jwt.sign({email:this.email},envVars.jwtPrivateKey);
    }





    // This Object is used to validate customerObjs 
    static customerSchema = Joi.object({
            fName: Joi.string()
                .alphanum()
                .minLength(5)
                .maxLength(50)
                .required(),
            lName: Joi.string()
                .alphanum()
                .minLength(5)
                .maxLength(50)
                .required(),
            nID: Joi.string()
                .numeric()
                .length(10)
                .required(),
    
            phone: Joi.string()
                .numeric()
                .length(11)
                .required()
        });


        fetchAllCustomers(){
            return this.customers;
        }
        removeCustomer(nID){
            this.customers = this.customers.filter( customer => customer.nID !== nID);
        }
        searchCustomer(name){
            return this.customers.filter( customer => {
                const fullName = customer.fName + ' ' + customer.lName; 
                return fullName.match(`/${name}/`); 
            })
        }
        addCustomer(customer){
            const {error} = customerSchema.validate(customer);
            if(error)
                 console.log(error);
    
            this.customers.push(customer);
            return {err:error,data:customer};
        }
        editCustomer(nID,newCustomer){
            this.customers =this.customers.map(customer =>{
                if(customer.nID == nID)
                    return newCustomer;
                return customer;  
            })
        }
}