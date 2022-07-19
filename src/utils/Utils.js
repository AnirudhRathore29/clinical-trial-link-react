import moment from "moment";

export const getTimeFromDate = timestamp => {
    const pad = num => ("0" + num).slice(-2);
    const date = new Date(timestamp * 1000);
    let hours = date.getHours() % 12 || 12,
        minutes = date.getMinutes()
        // seconds = date.getSeconds();
        // + ":" + pad(seconds)
    return pad(hours) + ":" + pad(minutes)
}

export const chatDateFormat = date => {
    var formats = {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse: 'DD/MM/YYYY'
    }
    var dateFromat = moment().calendar(date, formats)
    console.log("dateFromat",dateFromat)
    return dateFromat;
}