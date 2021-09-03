const jwt=require("jsonwebtoken") ;

const {Registerlist} = require("./connection") ;

const auth = async(req,res,next)=>{
    try{
        const token = req.cookies.jwt ;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY)
       // console.log(verifyUser)

        const user = await Registerlist.findOne({_id:verifyUser._id}) ;
        //console.log(user);
        res.render("home",{name:user.name})
       // next()
    } catch(error){
        res.render("knowmore");
    }
}

module.exports = auth;