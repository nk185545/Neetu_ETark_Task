const mongoose=require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
//  connection creation and create a new db

mongoose.connect(process.env.DATABASE,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>console.log("connecction successful"))
    .catch((err)=>console.log(err))




// schema for registration

const registrationSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
         type:String,
         required:true,
         unique:true,       
    },
    password:{
        type:String,
        required:true,
    },
    tokens:[{
        token:{
            type:String,
            required:true,
        }
    }]
})

//generating tokens
registrationSchema.methods.generateAuthToken= async function(){
    try{
        console.log(this._id) ;
        const token=jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY) ;
        this.tokens=this.tokens.concat({token:token})
        await this.save() ;
        return token ;
    }
    catch(err){
        res.send("the error page"+error) ;
        console.log("the error page"+error) ;
    }
}


registrationSchema.pre("save",async function(next){
    if(this.isModified("password")){
        // const passwordHash = await bcrypt.hash(password,10);
        console.log(this.password) ;
        this.password=await bcrypt.hash(this.password,10) ;
        console.log(this.password) ;
    }
    next() ;
})
//define model  collection craetion for registration

const Registerlist=new mongoose.model("Registerlist",registrationSchema)




module.exports = {Registerlist}