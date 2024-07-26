const {Schema , Model} = require('mongoose');
const {createHmac , randomBytes} = require('crypto');


const userschema = newSchema({
    fullName : { type: String , require:true },
    email :{ type : String  , require :true , unique :true},
    salt: {type : String , require :true},
    password : { type : String , require :true },
    profileImageUrl : { type: String ,default :'/images/user.png',},
    role : {type :String },
    enum: ["user","Admin"],
    default: "user",
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
    
    this.salt =salt;
    this.password = hashedPassword ;

    next();
});

const User = model('user',userschema);

module.exports = User;