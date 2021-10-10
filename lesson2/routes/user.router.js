const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middelwares/user.middlewares');

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
    userMiddleware.isUserIdPresent,
    userController.deleteUser);

module.exports = router;
