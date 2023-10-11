'use strict';
module.exports = (sequelize, DataTypes) => {
  const DailySummary = sequelize.define('DailySummary', {
    machineId: DataTypes.INTEGER,
    logDate: DataTypes.DATEONLY,
    doorCurrent: DataTypes.INTEGER,
    doorLife: DataTypes.INTEGER,
    qtyCurrent: DataTypes.INTEGER,
    qtyLife: DataTypes.INTEGER,
    burnCycleCurrent: DataTypes.INTEGER,
    burnCycleLife: DataTypes.INTEGER,
    cashCurrent: DataTypes.INTEGER,
    cashLife: DataTypes.INTEGER,
    onMinutes: DataTypes.INTEGER,
  }, {
    tableName: 'DailySummary'
  });
  DailySummary.associate = function(models) {
    // associations can be defined here
  };
  return DailySummary;
};