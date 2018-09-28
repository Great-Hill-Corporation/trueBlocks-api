
const addressBlockRoutes = require('./address_block_routes');
module.exports = function(app, db) {
  addressBlockRoutes(app, db);

};
