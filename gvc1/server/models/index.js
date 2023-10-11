const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line import/no-dynamic-require
const config = require('../Config/db-config')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

fs.readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  ))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize=Sequelize;
// db.models = {};
// db.models.DailySummary = require('./dailysummary')(sequelize, Sequelize.DataTypes);
// db.models.Machine= require('./machine')(sequelize, Sequelize.DataTypes);
// db.models.MachineData = require('./machinedata')(sequelize, Sequelize.DataTypes);
// db.models.Transaction = require('./transactions')(sequelize, Sequelize.DataTypes);

// relationships for models

//= ==============================
// Define all relationships here below
//= ==============================
// db.User.hasMany(db.Address);
// db.Address.belongsTo(db.User);

module.exports = db;