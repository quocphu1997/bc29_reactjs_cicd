import moment from "moment";

export const formatDate = (date,format = 'llll') => {
    return moment(date).format(format)
};