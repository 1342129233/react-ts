import { Response } from '@/common/axios';

export interface SubjectListResolve extends Response {
    data: {
        list: DataType[];
        pageNum: number;
        pageSize: number;
        total: number;
        totalPage: number;
    }
}

export interface DataType {
    albumPics?: null;
    categoryId: number;
    categoryName: string;
    collectCount?: null;
    commentCount?: null;
    content?: null;
    createTime: string;
    description?: null;
    forwardCount?: null;
    id: number;
    pic?: null;
    productCount?: null;
    readCount?: null;
    recommendStatus?: null;
    showStatus?: null;
    title: string;
}

export interface RecommendSubjectCreateParams {
    subjectId: number;
    subjectName: string;
}

