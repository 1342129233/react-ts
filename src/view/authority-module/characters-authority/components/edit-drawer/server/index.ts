import { get, post, Response } from '@/common/axios';
import { DataType } from '../../../types';

export const roleUpdateId = (params: DataType) => {
    return post<Response>(`/api/role/update/${params.id}`, { ...params })
}

export const roleCreate = (params: DataType) => {
    return post<Response>(`/api/role/create`, { ...params })
}



