const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.protect = async(req,res,next) => {
    let token = req.headers.authorization
}