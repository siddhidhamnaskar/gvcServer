'use strict';
module.exports = (sequelize, DataTypes) => {
  const Machine = sequelize.define('Machine', {
    serial: DataTypes.STRING,
    uid: DataTypes.STRING,
    zone: DataTypes.STRING,
    ward: DataTypes.STRING,
    beat: DataTypes.STRING,
    address: DataTypes.STRING,
    lat: DataTypes.STRING,
    lon: DataTypes.STRING,
    data1: DataTypes.STRING,
    data2: DataTypes.STRING,
    data3: DataTypes.STRING,
    data4: DataTypes.STRING,
    data5: DataTypes.INTEGER,
    data6: DataTypes.INTEGER,
    data7: DataTypes.INTEGER,
    data8: DataTypes.INTEGER,
    data9: DataTypes.DATE,
    data10: DataTypes.DATE,
  }, {});
  Machine.associate = function(models) {
    // associations can be defined here
  };
  return Machine;
};