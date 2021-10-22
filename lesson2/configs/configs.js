module.exports = {
    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/june_2021',
    PORT: process.env.PORT || 5000,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'accessToken',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'refreshToken',
    JWT_ACTION_SECRET: process.env.JWT_ACTION_SECRET || 'actionToken',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL
};
