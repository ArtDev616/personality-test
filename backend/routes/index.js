const express = require("express");
const router = express.Router();

const { getAllQuestions } = require("../controllers/questionsController");
const { submitPersonalityTest } = require("../controllers/personalityTestController");

router.get('/all/questions', getAllQuestions);
router.post('/personality-test', submitPersonalityTest)

module.exports = router;