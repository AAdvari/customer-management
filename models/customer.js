const Joi = require('joi');

module.exports = class Customer{
    constructor(fName,lName,nID,phone){
        this.fName = fName;
        this.lName = lName;
        this.nID = nID;
        this.phone = phone;
    }
    // This Object is used to validate customerObjs 
    static customerSchema = Joi.object({
        fName: Joi.string()
            .alphanum()
            .min(5)
            .max(50)
            .required(),
        lName: Joi.string()
            .alphanum()
            .min(5)
            .max(50)
            .required(),
        nID: Joi.string()
            .length(10)
            .required(),

        phone: Joi.string()
            .length(11)
            .required()
    });


    validateCustomer(){
        return Customer.customerSchema.validate(this);
    }
}