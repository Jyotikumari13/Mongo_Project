const file = require('./controllers/file/file.service');


module.exports = function (app) {
  app.use('/file', file);
};
