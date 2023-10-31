import { Response } from '@/common/axios';

export interface FormType {
    commentOvertime: number | string;
    confirmOvertime: number | string;
    finishOvertime: number | string;
    flashOrderOvertime: number | string;
    id: number | string;
    normalOrderOvertime: number | string;
}

export interface OrderSettingResolve extends Response{
    data: FormType;
}