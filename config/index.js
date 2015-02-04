var environment = process.env.NODE_ENV || 'development',
    fs = require('fs');

try {
  require.resolve('./' + environment);
  module.exports = require('./' + environment);
} catch (e) {
  console.warn('./config/' + environment + '.js not found. Using default.js...');

  module.exports = require('./defaults');
}

module.exports.env = module.exports.environment = environment;
