var config = {
  development: {
    server: 'http://127.0.0.1:3322',
    clientHost: 'http://127.0.0.1:9966'
  },
  production: {
    server: 'https://api.static.land',
    clientHost: 'https://app.static.land'
  }
}

var env = process.env.NODE_ENV || 'development'
module.exports = config[env]
