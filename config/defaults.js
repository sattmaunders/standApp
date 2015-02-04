module.exports = {
  port: process.env.PORT || 8000,
  mongo: {
    options: {
      db: {safe: true},
      auto_reconnect: true
    },
    uri: process.env.MONGO || 'mongodb://localhost/standapp-api'
  }
};
