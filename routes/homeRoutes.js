const showHomePage = require("../controllers/homeControllers");

const express = require('express');

// init router

router = express.Router()

// routing


router.get('/',showHomePage)





// ============> export  <============

module.exports = router