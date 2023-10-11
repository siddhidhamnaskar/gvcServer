'use strict';
module.exports = (sequelize, DataTypes) => {
  const Records = sequelize.define('MinuteData', {
     machines_running:DataTypes.INTEGER,
     cashCollected:DataTypes.INTEGER,
     items_vend:DataTypes.INTEGER
  }, {
    tableName: 'MinuteData',
    timeStamps:true
  });
  Records.associate = function(models) {
    // associations can be defined here
  };
  return Records;
};