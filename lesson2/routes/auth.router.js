const router = require('express').Router();

const { authController } = require('../controllers/');
const { authMiddleware } = require('../middelwares/');

router.post('/login',
    authMiddleware.validateLoginData,
    authMiddleware.isEmailValid,
    authController.userLogination);

module.exports = router;
