import { get } from '@/common/axios/index';

export interface BrandType {
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

export interface BrandResolve {
    code: number;
    message: string;
    data: {
        list: BrandType[];
        pageNum: number;
        pageSize: number;
        total: number;
        totalPage: number;
    }
}

// 商品品牌接口
export const brandList = () => {
    return get<BrandResolve>(`/api/brand/list?pageNum=1&pageSize=100`);
}
