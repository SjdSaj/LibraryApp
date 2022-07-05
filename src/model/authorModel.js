const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sjdsaj:sjdsaj@ictakfiles.jjmdhlp.mongodb.net/?retryWrites=true&w=majority');

var schema = mongoose.Schema;

const authorSchema = new schema({
    name : String,
    work : String,
    genre : String,
    age : Number,
    img : String,
    desc : String,
});

const authorData = mongoose.model('authorData',authorSchema);

module.exports = authorData;