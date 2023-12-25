import moment from 'moment';
import { format } from 'date-fns';
import dayjs from 'dayjs';

export function momentFormat(value: string | number) {
    return moment(value).format('x');
}

export const formatDate = (timestamp: string | number, defaultFormat?: unknown) => {
    if(timestamp) {
        return format(new Date(+timestamp), 'yyyy-MM-dd HH:mm:ss');
    }
    return defaultFormat;
};

export const dayjsDate  = (timestamp: string | number) => {
    return dayjs(timestamp, "YYYY-MM-DD HH:mm:ss")
};

// 常量
const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
// 解析时间
type Time = {
    days: number
    hours: number
    minutes: number
    seconds: number
    milliseconds: number
}
export const parseTime = (time: number): Time => {
    const days = Math.floor(time / DAY)
    const hours = Math.floor((time % DAY) / HOUR)
    const minutes = Math.floor((time % HOUR) / MINUTE)
    const seconds = Math.floor((time % MINUTE) / SECOND)
    const milliseconds = Math.floor(time % SECOND)
  
    return {
        days,
        hours,
        minutes,
        seconds,
        milliseconds
    }
}

export type TimeString = {
    format: string
    days: string | number
    hours: string | number
    minutes: string | number
    seconds: string | number
    milliseconds: string | number
}
// 格式化时间
export const formatTime = (format: string, time: Time): TimeString => {
    let { days, hours, minutes, seconds, milliseconds } = time;

    // 判断是否需要展示 天数，需要则补 0，否则将 天数 降级加到 小时 部分
    if(format.includes('DD')) {
        format = format.replace('DD', padZero(days))
    } else {
        hours += days * 24
    }

    // 判断是否需要展示 小时，需要则补 0，否则将 小时 降级加到 分钟 部分
    if (format.includes('HH')) {
        format = format.replace('HH', padZero(hours))
    } else {
        minutes += hours * 60
    }

    // 判断是否需要展示 分钟，需要则补 0，否则将 分钟 降级加到 秒数 部分
    if (format.includes('mm')) {
        format = format.replace('mm', padZero(minutes))
    } else {
        seconds += minutes * 60
    }

    // 判断是否需要展示 秒数，需要则补 0，否则将 秒数 降级加到 毫秒 部分
    if (format.includes('ss')) {
        format = format.replace('ss', padZero(seconds))
    } else {
        milliseconds += seconds * 1000
    }

    // 默认展示 3位 毫秒数
    if (format.includes('SSS')) {
        const ms = padZero(milliseconds, 3)
        format = format.replace('SSS', ms)
    }

    // 最终返回格式化的数据
    return { format, days, hours, minutes, seconds, milliseconds }
}

// 不足位数用 0 填充
export const padZero = (str: number, padLength = 2) => {
    let value: string = str + '';
    if (value.length < padLength) {
        value = '0'.repeat(padLength - value.length) + str
    }
    return value

}

