//require the library
 mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/contact_list_db');


//db is used gor accessing the database ot checking whrter connexted or not
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console, 'error connecting to db'));

//up and running then print the message
db.once('open', function(){
  console.log('Successfully connected to the database');
});