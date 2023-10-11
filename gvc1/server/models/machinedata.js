"use strict"

module.exports = (sequelize, DataTypes) => {
  const MachineData = sequelize.define('MachineData', {
    machineId: DataTypes.INTEGER,
    heater_A_On: DataTypes.BOOLEAN,
    heater_A_Temp: DataTypes.INTEGER,
    heater_B_On: DataTypes.BOOLEAN,
    heater_B_Temp: DataTypes.INTEGER,
    doorCurrent: DataTypes.INTEGER,
    doorLife: DataTypes.INTEGER,
    qtyCurrent: DataTypes.INTEGER,
    qtyLife: DataTypes.INTEGER,
    burnCycleCurrent: DataTypes.INTEGER,
    burnCycleLife: DataTypes.INTEGER,
    cashCurrent: DataTypes.INTEGER,
    cashLife: DataTypes.INTEGER,
    lastOnTime: DataTypes.DATE,
    lastHeartbeatTime: DataTypes.DATE,
    status: DataTypes.BOOLEAN,
    last_status: DataTypes.STRING,
    status_type: DataTypes.STRING,
    spiral_a_status: DataTypes.INTEGER,
    spiral_b_status: DataTypes.INTEGER,
    burn_status: DataTypes.INTEGER,
    sim_number: DataTypes.STRING,
    rssi: DataTypes.STRING,
    reset_ts: DataTypes.STRING,
  }, {
    freezTableName:true
  });
  MachineData.associate = function(models) {
    // associations can be defined here
  };
  return MachineData;
};