const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Admin, User, Course } = require('../db/index');

// User Routes
router.post('/signup', (req, res) => {
    try {
        // Implement user signup logic
        const username = req.body.username;
        const password = req.body.password;

        User.create({
            username: username,
            password: password,
            coursespurchased: []
        })

        res.status(201).json({ "message": 'User created successfully' });
    } catch (err) {
        res.sttaus(500).json({ "message": err });
    };
});

router.get('/courses', (req, res) => {
    try {
        // Implement listing all courses logic
        Course.find().then((courses) => { res.json(courses) });
    } catch (err) {
        res.sttaus(500).json({ "message": err });
    }
});

router.post('/courses/:courseid', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const username = req.headers['username'];
    const courseid = req.params['courseid'];
    try{
        const result = await User.updateOne(
            { username: username }, 
            { $push: {coursesPurchased: courseid } }
        );
        res.json({
            message: "Course purchased successfully"
        });
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    try {
        // Implement fetching purchased courses logic
        const username = req.headers.username;

        const user = User.findOne({username: username});

        if(user){
            Course.find({courseId: {$in: user.coursespurchased}}).then((courses) => {res.status(200).json(courses)});
        }else{
            res.status(404).json({"message": "No such user."});
        }

    } catch (err) {
        res.status(500).json({ "message": err });
    }
});

module.exports = router;