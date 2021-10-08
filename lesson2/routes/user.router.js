const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middelwares/user.middlewares');

router.get('/', userController.getUsers);
router.post('/',userMiddleware.createUserMiddleware, userController.createUser);
router.put('/', userController.updateUser);

router.get('/:user_id', userController.getUserById);
router.delete('/:user_id', userController.deleteUser);

module.exports = router;
