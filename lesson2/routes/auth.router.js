const router = require('express').Router();

const { authController } = require('../controllers/');
const { authMiddleware } = require('../middelwares/');

router.post('/login',
    authMiddleware.validateLoginData,
    authMiddleware.isEmailValid,
    authController.userLogination);
router.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.userLogination);
router.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout
);

module.exports = router;
