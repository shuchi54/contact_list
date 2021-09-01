const express = require('express');
const path = require('path');
const port = 5000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');

//hv to provide path for views
app.set('views', path.join(__dirname, 'views')); 
app.use(express.urlencoded())
app.use(express.static('assets'));





var contactList = [
  {
    name: "shuchi",
    phone: "1111111111111"
  },
  {
    name:"Tony Stark",
    phone:"1234567890"
  },
  {
    name:"coding ninjas",
    phone:"23454334443"
  },
  {
    name:"abcd",
    phone:"0987654321"
  }

]


app.get('/', function(req,res){
  // res.send('the web pageeee');

  //no query given all { }
  Contact.find({}, function(err, contacts){
    if(err){
      console.log('error in fetching the contacts from db');
      return;
    }

    return res.render('home', {
      title:"mine contact list",
      contact_list: contacts
    });

  });


  //render ejs page


}); 


app.post('/create-contact', function(req,res){
  // contactList.push({
  //   name: req.body.name,
  //   phone: req.body.phone
  // });

  // contactList.push(req.body);

  Contact.create({
    name: req.body.name,
    phone: req.body.phone
  }, function(err, newContact){

    if(err){ console.log('error in creating a contact!');
            return;
           }

    console.log('*********', newContact);
    return res.redirect('back');



  });


});

app.get('/delete-contact/', function(req,res){
  // console.log(req.params.phone);
  // let phone = req.params.phone;


  //get the id from query in the url

  let id = req.query.id;

  // find the contact in the db using id and delete it

  //i traversing on contactlist

  Contact.findByIdAndDelete(id, function(err){
    //handling that error
    if(err){
      console.log('error in creating the database');
      return;
    }
    //no sec para bcz just deleting

    res.redirect('back');


  });
 


  
  
});





app.listen(port, function(err) {
  if(err) {console.log('Error in running the server')};

  console.log('my server is running on port: ', port);
}); 
