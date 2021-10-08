const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middelwares/auth.middlewares');

router.post('/login', authMiddleware.isEmailValid, authController.userLogination);

module.exports = router;
