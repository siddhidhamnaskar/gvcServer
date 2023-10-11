'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    machine: DataTypes.STRING,
    command: DataTypes.STRING,
    // p1: DataTypes.INTEGER,
    // p2: DataTypes.INTEGER,
    // p3: DataTypes.INTEGER,
    // p4: DataTypes.INTEGER,
    // p5: DataTypes.INTEGER,
    // p6: DataTypes.INTEGER
    p1: DataTypes.STRING,
    p2: DataTypes.STRING,
    p3: DataTypes.STRING,
    p4: DataTypes.STRING,
    p5: DataTypes.STRING,
    p6: DataTypes.STRING,
    p7: DataTypes.STRING,
    p8: DataTypes.STRING,
    p9: DataTypes.STRING,
    p10: DataTypes.STRING,
    p11: DataTypes.STRING,
    p12: DataTypes.STRING
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};