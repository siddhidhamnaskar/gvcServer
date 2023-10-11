const schedule = require('node-schedule');
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const logPath = path.resolve(__dirname, 'daily.log')
const  {CalcDailySummary,ArchiveTransactions}=require('./machine.data.controller');

const setup = async function () {
    const job = schedule.scheduleJob('35 11 * * *', function () {
        console.log('Running Daily Schedule!');
        CalcDailySummary().then(list => {
            fs.appendFile(logPath, `[${moment().format()}]\nRunning Now\n${JSON.stringify(list)}\n\n`, err => {
                //console.log(err)
            });
            console.log('Daily Schedule completed');
            console.log('Archiving records');
            ArchiveTransactions();
            console.log('Archiving records completed');
        });
    });
    console.log('Daily Schedule initialized');
    return job;
}
module.exports = setup;