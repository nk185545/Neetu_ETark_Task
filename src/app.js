require("dotenv").config() ;

const express = require("express") ;
const path = require("path") ;
const hbs = require("hbs") ;
const app = express() ;
const port = process.env.PORT || 3000 ;
let alert=require('alert')
const bcrypt = require("bcryptjs")
const cookieParser = require("cookie-parser")
const auth=require("./auth")

const bodyParser = require('body-parser');
const {Registerlist}= require("./connection");

app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//public static path
const staticPath = path.join(__dirname, "../public") ;
const template_path = path.join(__dirname, "../templates/views") ;
const partials_Path = path.join(__dirname, "../templates/partials") ;

app.set("view engine","hbs") ;
app.set("views",template_path)

// hbs register partials
hbs.registerPartials(partials_Path) ;

app.use(express.static(staticPath)) ;


app.get("",(req,res)=> {
    res.render('index')
}) ;

app.get("/signup",(req,res)=> {
    res.render('signup')
}) ;

app.get("/login",(req,res)=> {
    res.render('login')
}) ;

app.get("/logout",(req,res)=>{
    res.clearCookie("jwt") ;
    res.render("index") ;
})

app.post('/saveData', function(req, res) {
    var name = req.body.fullname
    var email = req.body.email
    var password = req.body.password
    const createDocument=async ()=>{
        try{
            const rlist = new Registerlist({
                name:name,
                email:email,
                password:password,
            })

          //  console.log("the success part"+rlist) ;

            const token = await rlist.generateAuthToken() ;

            //cookie
            res.cookie("jwt",token,{
                httpOnly:true
            }) ;

            const result = await rlist.save();
           
            res.render("home",{name:name})

        }   
        catch(err){
            console.log(err);
            
            res.render("signup",{errorMsg:"Email already exist !"});
        }

    }
    createDocument()
});

app.post('/checkLogin', function(req, res) {
    var email = req.body.email
    var password = req.body.password
    const checkDocument=async ()=>{
        const useremail = await Registerlist.findOne({email:email}) ;
       // console.log(useremail)
        if(useremail){
            const isMatch =await  bcrypt.compare(password,useremail.password) ;

            const token = await useremail.generateAuthToken() ;
            
            res.cookie("jwt",token,{
                httpOnly:true
            }) ;
            //console.log(`this is the cookie awesome ${req.cookies.jwt}`)

            if(isMatch){
                res.render("home",{name:useremail.name}) ;
            }
            else{
                //alert("wrong username or password")
                res.render("login",{errorMsg:"wrong username or password"}) ;
            }
        }
        else{
            res.render("login",{errorMsg:"wrong username or password"}) ;

        }
        
    }
    checkDocument() ;
});

app.get("/mainpage",function(req,res){
    res.render("mainpage") ;
})

app.get("/home",auth,function(req,res){
    res.render("home") ;
})

app.get("/knowmore",auth,function(req,res){
    res.render("knowmore") ;
})

app.get("*",(req,res)=> {
    res.render('404error',{
        errorMsg:"Oops! Page Not Found"
    })
}) ;

app.listen(port,() => {
    console.log(`listening to the port at ${port} `)
})

