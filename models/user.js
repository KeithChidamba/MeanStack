const mongoose = require("mongoose");
const Schema  = mongoose.Schema;
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');


let passwordLengthChecker = (password)=>{
    if(!password){
        return false;
    }else{
        if (password.length < 8 || password.length>35)
        {
            return false;
        }else{
            return true;
        }    
    }
}

let validPassword = (password)=>{
    if(!password)
    {
        return false;
    }else{
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
           return regExp.test(password);
    } 
}

const passwordValidators = [
    {   validator: passwordLengthChecker, message:'password must be between 8 and 35 characters'},
        {validator: validPassword, message:'password must have at least one : uppercase,lowercase,number and scpecial character'}
];

let usernameLengthCheckers = (username)=>{
    if(!username){
        return false;
    }else{
        if (username.length < 3 || username.length>15)
        {
            return false;
        }else{
            return true;
        }    
    }
}

let validUsername = (username) => {
    if(!username)
    {
            return false;
    }else{
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
           return regExp.test(username);
        }   
}

const usernameValidators =[
    {   validator: usernameLengthCheckers, message:'username must be between 3 and 15 characters'},
    {validator: validUsername, message:'must be valid username, only :a-z, 0-9, A-Z, no spaces'}
]

let emailLengthChecker = (email) =>{
    if(!email){
       return false;
    }else{
        if (email.length < 5 || email.length>30)
        {
            return false;
        }else{
            return true;
        }
    }
}

let validEmailCheckers = (email) =>{
    if(!email){
        return false;
    }else{
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
       return regExp.test(email);
    }
}

emailValidators = [
    {validator: emailLengthChecker, message:'email must be between 5 and 30 characters'},
    {
        validator: validEmailCheckers,
        message: 'must be a valid email'
    }
];

const userSchema = new Schema({
  email:{type: String,required:true,unique:true,lowercase:true, validate: emailValidators},
  username:{type: String,required:true,unique:true,lowercase:true, validate:usernameValidators},
  password:{type: String,required:true,required:true,validate:passwordValidators},
  saltSecret: String
});

userSchema.pre('save', function(next) {
    if(!this.isModified('password'))
    return next();
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});
//login
userSchema.methods.comparePassword = (password) =>{
    return bcrypt.compareSync(password,this.password);
}

module.exports= mongoose.model('User',userSchema);