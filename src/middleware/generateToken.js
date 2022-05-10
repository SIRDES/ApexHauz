const jwt = require("jsonwebtoken")

module.exports = function(userId){
const token = jwt.sign({id:userId}, process.env.JWT_SECRET)
return token
}