var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'myflix'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/myflix-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'myflix'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/myflix-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'myflix'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/myflix-production'
  }
};

module.exports = config[env];
