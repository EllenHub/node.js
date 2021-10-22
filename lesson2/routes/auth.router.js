const router = require('express').Router();

const { authController } = require('../controllers/');
const { authMiddleware } = require('../middelwares/');

router.post('/login',
    authMiddleware.validateLoginData,
    authMiddleware.isEmailValid,
    authController.login);
router.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh);
router.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout);
router.post('/password/forgot',
    authController.forgotPasswordEmail);
router.patch('/password/forgot/set',
    authMiddleware.checkActiveToken,
    authController.setNewPasswordAfterForgot);

module.exports = router;
