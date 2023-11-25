import { get, Response, post } from '@/common/axios';
import dayjs from 'dayjs';

export interface FlashSessionListResolve extends Response {
    data: DataType[];
}

export interface DataType {
    createTime: string | dayjs.Dayjs;
    endTime: string | dayjs.Dayjs;
    id?: number;
    name: string;
    startTime: string | dayjs.Dayjs;
    status: number;
}

export interface UpdateStatusType {
    id: number;
    status: number;
}

