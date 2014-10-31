// # Ghost Configuration
var path = require('path'),
    config;

config = {
    development: {
        url: 'http://localhost:2368',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-dev.db')
            },
            debug: false
        },
        server: {
            host: '127.0.0.1',
            port: '2368'
        },
        paths: {
            contentPath: path.join(__dirname, '/content/')
        }
    },
};

module.exports = config;
