import { get } from '@/common/axios/index';

export interface RessListType {
    addressName: string;
    city: string;
    detailAddress: string;
    id: number;
    name: string;
    phone: string;
    province: string;
    receiveStatus: number;
    region: string;
    sendStatus: number;
}

export interface ProductResolve {
    code: number;
    message: string;
    data: RessListType[];
}

// 收货点接口
export const ressList = () => {
    return get<ProductResolve>('/api/companyAddress/list')
}

