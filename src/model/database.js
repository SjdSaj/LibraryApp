//accessing mongoose package
const mongoose = require('mongoose');

//Connecting to mongodb serever and database 
mongoose.connect('mongodb+srv://sjdsaj:sjdsaj@ictakfiles.jjmdhlp.mongodb.net/?retryWrites=true&w=majority');

//Schema definition
const schema = mongoose.Schema;


//model creation for books schema
const bookSchema = new schema({
    name: String,
    author: String,
    genre: String,
    img: String
});


// model for bookSchema
var bookData = mongoose.model('bookData',bookSchema);



//exporting  modules
module.exports = bookData;
