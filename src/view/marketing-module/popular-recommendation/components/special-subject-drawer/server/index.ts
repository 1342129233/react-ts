import { get, post, Response } from '@/common/axios';
import { SubjectListResolve, RecommendSubjectCreateParams } from '../types';
 
// 获取专题列表
export function fetchConfig(params: { pageNum: number; pageSize: number; }) {
    return get<SubjectListResolve>(`/api/product/list?pageNum=1&pageSize=5`, { ...params })
}

// 提交选中专题
export function recommendProductCreate(params: RecommendSubjectCreateParams[]) {
    return post<Response>(`/api/home/recommendProduct/create`, params)
}




