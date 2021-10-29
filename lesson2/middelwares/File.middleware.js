const ErrorHandler = require('../errors/ErrorHandler');
const { PHOTOS_MIMETYPES, PHOTO_MAX_SIZE } = require('../consts/constants');

module.exports = {
    checkUserAvatar: (req, res, next) => {
        try {
            const { avatar } = req.files;

            if(!avatar) {
                next();
                return;
            }

            const {name, size, mimetype} = avatar;

            if(!PHOTOS_MIMETYPES.includes(mimetype)) {
                throw new ErrorHandler('NOT supported format', 400);
            }

            if(size > PHOTO_MAX_SIZE) {
                throw new ErrorHandler(`The file ${name} is too big`, 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
