export default () => ({
    jwt: {
        secret: process.env.JWT_SECRET
    },
    mongo: {
        uri: process.env.MONGO_URI,
        connection: process.env.MONGO_CONNECTION
    }
});