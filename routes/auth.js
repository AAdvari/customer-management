const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


router.post('/', async (req,res)=>{
    const {error} = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = User.users.find(user => user.email === req.body.email);
    if(!user) return res.status(400).send('Invalid Email Or Password');

    const validPass = await bcrypt.compare(req.body.password,user.password);
    if (!validPass) return res.status(400).send('Invalid Email Or Password');

    return res.send(user.generateAuthToken());
})
function validate(req){
    const schema = Joi.object({
        email: Joi.string().minLength(5).maxLength(255).required().email(),
        password: Joi.string().minLength(5).maxLength(255).required()
    });
    return schema.validate(req);
}


module.exports = router;