const {Schema , model} = require('mongoose');
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

const User = model('user',userschema);

module.exports = User;