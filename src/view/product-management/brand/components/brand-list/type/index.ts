import { Response } from '@/common/axios';

export interface PropsType {
	id: number
}

export interface BrandListIdResponse extends Response {
    data: DataType;
}

export interface DataType {
    bigPic: string;
    brandStory: string;
    factoryStatus: number;
    firstLetter: string;
    id: number | string;
    logo: string;
    name: string;
    productCommentCount: number;
    productCount: number;
    showStatus: number;
    sort: number;
}
