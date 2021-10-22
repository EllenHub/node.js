const {Schema, model} = require('mongoose');

const {userModelEnum} = require('../consts');
const ActionTokenTypeEnum = require('../consts/action-token-type.enum');

const ActionTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        trim: true
    },
    token_type: {
        type: String,
        required: true,
        enum: Object.values(ActionTokenTypeEnum),
        trim: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: userModelEnum.USER

    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

ActionTokenSchema.pre('findOne', function() {
    this.populate('user_id');
});

module.exports = model('action_token', ActionTokenSchema);
