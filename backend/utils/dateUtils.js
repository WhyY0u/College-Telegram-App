const {toZonedTime, format} = require('date-fns-tz');

const getCurrentDateInPavlodar = () => {
    const timeZone = 'Asia/Almaty';
    const currentDate = new Date();
    const zonedDate = toZonedTime(currentDate, timeZone);
    return format(zonedDate, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone });
};

module.exports = {getCurrentDateInPavlodar};