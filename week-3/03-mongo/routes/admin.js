const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, User, Course } = require('../db/index');
const uuid = require('uuid');

// Admin Routes
router.post('/signup', (req, res) => {
    try {
        // Implement admin signup logic
        const username = req.body.username;
        const password = req.body.password;

        const new_admin = ({ "username": username, "password": password });

        Admin.create(new_admin);

        res.status(201).json({ "message": "Admin created successfully" });
    } catch (err) {
        res.sttaus(500).json({ "message": err });
    }
});

router.post('/courses', adminMiddleware, (req, res) => {
    try {
        // Implement course creation logic
        const courseId = uuid.v4();
        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        const imageLink = req.body.imageLink;
        const publshed = false;

        Course.create({
            courseId: courseId,
            title: title,
            description: description,
            price: price,
            imageLink: imageLink,
            published: publshed
        });

        res.status(201).json({"message": 'Course created successfully', "id": courseId});
    } catch (err) {
        res.status(500).json({"messgae": err});
     };

});

router.get('/courses', adminMiddleware, (req, res) => {
    try{
    // Implement fetching all courses logic
    Course.find().then((courses) => {res.json(courses)});
    }catch(err){
        res.sttaus(500).json({ "message": err });
    }
});

module.exports = router;