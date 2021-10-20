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
    authController.logout
);

module.exports = router;
