import { Response } from '@/common/axios';
import type { UploadFile } from 'antd/es/upload/interface';


export interface FormData {
    clickCount: number;
    endTime: string;
    id: number | null;
    name: string;
    note: string;
    orderCount: number;
    pic: string;
    sort: number;
    startTime: string;
    status: number;
    type: number;
    url: string;
    fileList?: UploadFile[];
}

export interface GetFormResolve extends Response {
    data: FormData
}
