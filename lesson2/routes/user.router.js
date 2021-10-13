const router = require('express').Router();

const {ADMIN} = require("../consts/user-roles.enum");
const { userController } = require('../controllers/');
const { userMiddleware }= require('../middelwares/');

router.get('/', userController.getUsers);
router.post('/',
    userMiddleware.isUserBodyValid,
    userMiddleware.createUserMiddleware,
    userController.createUser);

router.patch('/:user_id',
    userMiddleware.updateUserBodyValidation,
    userMiddleware.isUserIdPresent,
    userController.updateUser);
router.get('/:user_id',
    userMiddleware.isUserIdPresent,
    userController.getUserById);
router.delete('/:user_id',
    userMiddleware.checkUserRole([ADMIN]),
    userMiddleware.isUserIdPresent,
    userController.deleteUser);

module.exports = router;
