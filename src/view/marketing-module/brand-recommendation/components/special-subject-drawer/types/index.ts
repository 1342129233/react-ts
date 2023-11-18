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
    bigPic: string;
    brandStory?: number;
    factoryStatus: number;
    firstLetter: string;
    id: number;
    logo: string;
    name: string;
    productCommentCount: number;
    productCount: number;
    showStatus: number;
    sort: number;
}

export interface RecommendSubjectCreateParams {
    brandId: number;
    brandName: string;
}

