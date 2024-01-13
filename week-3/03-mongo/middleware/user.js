const {Admin, User, Course} = require('../db/index');
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const userUsername = req.headers.username;
    const userPassword = req.headers.password;

    const user = await User.find({"username": userUsername, "password": userPassword});

    if(user.length !== 1){
        res.status(404).json({"message": "User does not exist."});
    }
    else{
        next();
    }
}

module.exports = userMiddleware;