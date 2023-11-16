import { get, post, Response } from '@/common/axios';
import { GetFormResolve, FormData } from '../types';

export function advertiseUpdate(id: number) {
    return get<GetFormResolve>(`/api/home/advertise/${id}`);
}

export function advertiseUpdated(params: FormData) {
    return post<Response>(`/api/home/advertise/update/${params.id}`, { ...params });
}

export function advertiseCreate(params: FormData) {
    return post<Response>(`/api/home/advertise/create`, { ...params });
}
