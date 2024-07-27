const JWT = require('jsonwebtoken');
const secret = "$uper@123";

function createtokenforuser(user){
    const payload = {
        _id :user._id ,
        email : user.email ,
        profileImageURL :user.profileImageURL ,
        role : user.role
    };
    const token =JWT.sign(payload,secret);
    return token;
}

function validatetoken(token){
const payload =JWT.verify(token,secret);
return payload;
}

module.exports = {
    createtokenforuser,
    validatetoken
};