module.exports = {
    app: {
        host: process.env.HOST || '0.0.0.0',
        port: parseInt(process.env.PORT || 4000)
    },
    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost/todos'
    }
}