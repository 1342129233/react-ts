import moment from 'moment';

export function momentFormat(value: string) {
    return moment(value).format('x');
}
