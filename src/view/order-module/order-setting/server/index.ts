import { get, Response, post } from '@/common/axios';
import { OrderSettingResolve, FormType } from '../types';

export const getOrderSetting = () => {
    return get<OrderSettingResolve>('/api/orderSetting/1')
}

export const orderSettingFinish = (params: FormType) => {
    return post<Response>('/api/orderSetting/update/1', { ...params })
}

