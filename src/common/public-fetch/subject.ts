import { get } from '@/common/axios/index';

export interface SubjectType {
    id: number;
    categoryId: number;
    categoryName: string;
    createTime: string;
    title: string;
}

export interface SubjectResolve {
    code: number;
    message: string;
    data: SubjectType[];
}


export const subjectList = () => {
    return get<SubjectResolve>('/api/subject/listAll')
}

