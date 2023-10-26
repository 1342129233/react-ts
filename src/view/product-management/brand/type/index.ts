import { Response } from '@/common/axios';

export interface DataType {
    bigPic: string;
    brandStory: string | null;
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

export interface BrandListResponse extends Response {
    data: {
        list: DataType[];
        pageNum: number;
        pageSize: number;
        total: number;
        totalPage: number;
    };
}
