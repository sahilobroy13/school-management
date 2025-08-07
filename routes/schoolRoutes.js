const express = require("express");
const router = express.Router();

const {addSchool, listSchools} = require("../controllers/schoolController");


router.post("/add-school" , addSchool);


router.get('/listschools', listSchools);

module.exports = router;