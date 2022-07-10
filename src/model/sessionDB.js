// *********For saving sessions into database********

//accessing mongoose package
const mongoose = require('mongoose');
const session = require('express-session');
const MongodbSession = require('connect-mongodb-session')(session);

const uri = 'mongodb+srv://sjdsaj:sjdsaj@ictakfiles.jjmdhlp.mongodb.net/?retryWrites=true&w=majority';
//Connecting to mongodb serever and database 
mongoose.connect(uri);


const store = new MongodbSession({
    uri:uri,
    collection:'mysessions',

});

module.exports = store;