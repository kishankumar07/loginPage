let express = require('express');
let app = express();
let path = require('path');
let router = require('./router')
let session = require('express-session');
const flash = require('connect-flash');


require('dotenv').config();
let port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(session({
    secret:process.env.SESSION_SECRET_KEY,
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:72*60*1000,      //Session expires in 72 hours
        httpOnly:true
    },
}));

// Initialize connect-flash to use flash messages stored in session
app.use(flash());


app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');




app.use('/',router);



const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  
   
});