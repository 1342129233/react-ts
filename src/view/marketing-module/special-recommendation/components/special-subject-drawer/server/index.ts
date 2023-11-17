import { get, post, Response } from '@/common/axios';
import { SubjectListResolve, RecommendSubjectCreateParams } from '../types';
 
// 获取专题列表
export function fetchConfig(params: { pageNum: number; pageSize: number; keyword?: string  }) {
    return get<SubjectListResolve>(`/api/subject/list`, { ...params })
}

// 提交选中专题
export function recommendSubjectCreate(params: RecommendSubjectCreateParams[]) {
    return post<Response>(`/api/home/recommendSubject/create`, params)
}



