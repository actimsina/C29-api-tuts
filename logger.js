const {format} = require('date-fns')
const {v4: uuid} = require('uuid')
const fs = require('fs')
const path = require('path')

const createLogItem = (message) => {
    const dateTime = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`
    return `${uuid()}\t${dateTime}\t${message}\n`
}

const saveLogItem = (logItem) => {
    if(!fs.existsSync('logs'))
        fs.mkdir(path.join(__dirname, 'logs'), (err) => console.error(err))
    
   fs.appendFile(path.join(__dirname, 'logs', 'event-logs.txt'), logItem, (err) => {
        if(err) console.error(err)
   })
}

const log = (message) => saveLogItem(createLogItem(message))

module.exports = {log}