import moment from "moment";

// export const getTimeFromDate = timestamp => {
//     const pad = num => ("0" + num).slice(-2);
//     const date = new Date(timestamp * 1000);
//     let hours = date.getHours() % 12 || 12,
//         minutes = date.getMinutes()
//         // seconds = date.getSeconds();
//         // + ":" + pad(seconds)
//     return pad(hours) + ":" + pad(minutes)
// }

export const chatDateFormat = myDate => {
    var fromNow = moment(myDate).fromNow();
    return moment(myDate).calendar(null, {
        lastWeek: '[Last] dddd',
        lastDay: '[Yesterday]',
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',           
        sameElse: function () {
            return "[" + fromNow + "]";
        }
    });
}

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}