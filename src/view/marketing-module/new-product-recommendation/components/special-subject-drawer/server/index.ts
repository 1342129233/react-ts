import { get, post, Response } from '@/common/axios';
import { SubjectListResolve, RecommendSubjectCreateParams } from '../types';
 
// 获取商品列表
export function fetchConfig(params: { pageNum: number; pageSize: number; keyword?: string }) {
    return get<SubjectListResolve>(`/api/product/list`, { ...params })
}

// 提交商品
export function recommendSubjectCreate(params: RecommendSubjectCreateParams[]) {
    return post<Response>(`/api/home/newProduct/create`, params)
}



