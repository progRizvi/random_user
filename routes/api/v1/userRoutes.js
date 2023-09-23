const express = require('express');
const userController = require("../../../controllers/api/userController.js");
const router = express.Router();
const limiter = require("../../../middlewares/rateLimiterMiddleware.js");
/**
 * @api {get} /user/random Get Random user
 * @route GET /user
 * @description Get Random user
 * @access Public
 *   
 * */
router.route("/random").get(userController.randomUser)

/**
 * @api {post} /user/create/random Create fake user
 * @route POST /user/create/random
 * @description Create fake user
 * @access Public
 * 
 * */
router.route("/create/random").post(limiter, userController.createFakeUser)

module.exports = router;