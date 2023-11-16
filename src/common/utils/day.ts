import moment from 'moment';
import { format } from 'date-fns';
import dayjs from 'dayjs';

export function momentFormat(value: string | number) {
    return moment(value).format('x');
}

export const formatDate = (timestamp: string | number, defaultFormat?: unknown) => {
    if(timestamp) {
        return format(new Date(+timestamp), 'yyyy-MM-dd HH:mm');
    }
    return defaultFormat;
};

export const dayjsDate  = (timestamp: string | number) => {
    return dayjs(timestamp, "YYYY-MM-DD HH:mm:ss")
};

