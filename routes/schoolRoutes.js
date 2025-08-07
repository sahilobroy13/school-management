const express = require("express");
const router = express.Router();

const {addSchool} = require("../controllers/schoolController");

router.post("/add-school" , addSchool);
module.exports = router;