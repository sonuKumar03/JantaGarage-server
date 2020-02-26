const functions = require('firebase-functions');
const app = require('express')();
const fbAuth = require('./util/auth') ;

const {stores ,createStore} = require('./handlers/stores');
const {login,signup,uploadImage}=require('./handlers/users');

app.set('view engine','ejs') ;
// stores route
app.get('/stores',stores);
app.post('/store',createStore);


// user login routes 
app.post('/signup',signup);

app.get('/login',(req,res)=>{
    res.render('login');
})
app.post('/login',login);

app.post('/uploadImage',uploadImage);

app.get('/addMap',fbAuth,(req,res)=>{
    res.render('index');
});



module.exports.api = functions.https.onRequest(app); 
