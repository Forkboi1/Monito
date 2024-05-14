const path = require('path');

module.exports = {
  entry: './frontendJS.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Output bundle file
  },
};