import { post, Response } from '@/common/axios';
import { FormData } from '../types';
 
export function updateSort(params: FormData) {
    return post<Response>(`/api/home/recommendSubject/update/sort/${params.id}?sort=${params.sort}&id=${params.id}`);
}

