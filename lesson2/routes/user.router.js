const router = require('express').Router();

const {ADMIN} = require('../consts/user-roles.enum');
const { userController } = require('../controllers/');
const { authMiddleware, userMiddleware }= require('../middelwares/');
const { userValidator } = require('../validators/');

router.get('/', userController.getUsers);
router.post('/',
    userMiddleware.userBodyValidation(userValidator.createUserValidator),
    userMiddleware.isEmailUnique,
    userController.createUser);

router.patch('/:user_id',
    userMiddleware.userBodyValidation(userValidator.updateUserValidator),
    authMiddleware.checkAccessToken,
    userMiddleware.isEmailUnique,
    userMiddleware.isUserIdPresent,
    userController.updateUser);
router.get('/:user_id',
    userMiddleware.isUserIdPresent,
    userController.getUserById);
router.delete('/:user_id',
    authMiddleware.checkAccessToken,
    userMiddleware.isUserIdPresent,
    userMiddleware.checkUserRole([ADMIN]),
    userController.deleteUser);

module.exports = router;
