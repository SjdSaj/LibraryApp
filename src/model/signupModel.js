const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sjdsaj:sjdsaj@ictakfiles.jjmdhlp.mongodb.net/?retryWrites=true&w=majority');

var schema = mongoose.Schema;

const signupSchema = new schema({
    name : String,
    email: String,
    password : String ,
    address : String,
    address2 : String,
    city : String,
    state : String,
    zip : Number

});

const signupData = mongoose.model('userData',signupSchema);

module.exports = signupData;