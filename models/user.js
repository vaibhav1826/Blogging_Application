const {Schema , model, Error} = require('mongoose');
const {createHmac , randomBytes} = require('crypto');


const userschema = new Schema({
    fullName : { type: String , require:true },

    email :{ type : String  , require :true , unique :true},

    salt: {type : String },

    password : { type : String , require :true },
    
    profileImageUrl : { type: String ,default :'/images/user.png',},
    
    role : {type :String, enum: ["USER","Admin"],default: "USER"},
},
{timestamps:true}
);

userschema.pre("save",function(next){
    const user = this;
    if(!user.isModified('password')) return ;

    const salt = randomBytes(16).toString();
    const hashedPassword =createHmac('sha256',salt)
    .update(user.password)
    .digest("hex");
    
    this.salt = salt;
    this.password = hashedPassword ;

    next();
});

userschema.static('matchpassword',async function(email,password){
const user = await this.findOne({email});
if(!user) throw new Error('user not found !');

const salt = user.salt
const hashedPassword = user.password;


const userprovidehash =createHmac('sha256',salt)
    .update(password)
    .digest("hex");
 
    if(hashedPassword !== userprovidehash) 
        throw new Error("Incorrect Password");

    return {...user._doc, password: undefined , salt:undefined};

});

const User = model('user',userschema);

module.exports = User;