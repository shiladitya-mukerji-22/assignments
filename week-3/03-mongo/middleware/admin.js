const{Admin, User, Course} = require('../db/index.js');
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    let adminUsername = req.headers.username;
    let adminPassword = req.headers.password;

    const admin = await Admin.find({'username': adminUsername, 'password': adminPassword});

    if(admin.length !== 1){
        res.status(404).json({"message": "Invalid Username or Password."});
    }
    else{
        next();
    }
}

module.exports = adminMiddleware;