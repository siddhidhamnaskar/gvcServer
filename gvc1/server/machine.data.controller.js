const { sequelize, MachineData, Machine, Transaction, DailySummary }=require('./models');

// const DailySummary =require('./models/dailysummary');
// const Machine=require("./models/machine");
// const sequelize = require('./squelize');
// const MachineData=require("./models/machinedata");
// const Transaction=require("./models/transactions");

// import { successResponse, errorResponse, uniqueId } from '../../helpers';
const { Op } = require("sequelize");
const moment = require('moment');




 const CalcDailySummary = async () => {
  var dt = moment().format('YYYY-MM-DD');
  var now = moment();
  
  var machineDatas = await MachineData.findAll({ where: { status: 1 } });
  var machines = await Machine.findAll({ where: { id: { [Op.in]: machineDatas.map(q => q.machineId) } } });
  var transactions = await Transaction.findAll({
    where: {
      command: 'SUM',
      machine: { [Op.in]: machines.map(q => q.serial) },
      createdAt: { [Op.between]: [now.add(-24, 'hour'), moment(dt).add(1, 'day')] }
    }
  });
  machines = JSON.parse(JSON.stringify(machines));
  machineDatas = JSON.parse(JSON.stringify(machineDatas));
  transactions = JSON.parse(JSON.stringify(transactions));
  var list = []
  for (var i = 0; i < machineDatas.length; i++) {
    try {
      var m = machineDatas[i];
      var mc = machines.filter(q => q.id == m.machineId)[0]
      if (!mc) { console.log(m.id + ' not found'); continue; }
      var trns = transactions.filter(q => q.machine == mc.serial && moment(q.createdAt) > now.add(-24, 'hour'));
      if (!trns || !trns.length) { console.log(m.id + ' does not have any transactions'); }
      var count = 0;
      try {
        count = trns.map(q => moment(q.createdAt).format('DD-MMM-YYYY HH:mm')).filter(onlyUnique).length;
      } catch (ex) {
        console.log(m.id + ' count issue');
      }

      // Fix for amount mismatch from machine
      if (m.cashCurrent > ((m.qtyCurrent * 10) + 50) || m.cashCurrent < ((m.qtyCurrent * 10) - 50))
        m.cashCurrent = m.qtyCurrent * 10;
      if (m.cashLife > ((m.qtyLife * 10) + 50) || m.cashLife < ((m.qtyLife * 10) - 50))
        m.cashLife = m.qtyLife * 10;
      // Fix end

      var obj = {
        machineId: m.machineId,
        logDate: dt,
        doorCurrent: m.doorCurrent + m.doorLife,
        doorLife: m.doorCurrent + m.doorLife,
        qtyCurrent: m.qtyCurrent + m.qtyLife,
        qtyLife: m.qtyCurrent + m.qtyLife,
        burnCycleCurrent: m.burnCycleCurrent + m.burnCycleLife,
        burnCycleLife: m.burnCycleCurrent + m.burnCycleLife,
        cashCurrent: m.cashCurrent + m.cashLife,
        cashLife: m.cashCurrent + m.cashLife,
        onMinutes: count,
      };
      var objOld = await DailySummary.findOne({
        where: { machineId: m.machineId },
        order: [['logDate', 'DESC']]
      });

      if (objOld) {
        obj.doorCurrent -= objOld.doorLife;
        obj.burnCycleCurrent -= objOld.burnCycleLife;
        obj.qtyCurrent -= objOld.qtyLife;
        obj.cashCurrent -= objOld.cashLife;
      }

      list.push(obj);
      await DailySummary.create(obj);
    }
    catch (ex) {
      console.log('Exception in Daily Summary:\n');
      console.log(ex);
    }
  }
  return list;
}

 const ArchiveTransactions = async () => {
  try {
    await sequelize.query(`
      insert into TransactionHistory 
      select * from Transactions 
      where createdAt < adddate(date(NOW()), INTERVAL -7 DAY)
    `);
    await sequelize.query(`delete from Transactions where createdAt < adddate(date(NOW()), INTERVAL -7 DAY)`)
  } catch (ex) {
    console.log('An error occurred while archiving transactions')
  }
}
module.exports={CalcDailySummary,ArchiveTransactions}

