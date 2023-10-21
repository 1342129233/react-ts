export interface Form {
    keyword: string;
    productSn: string;
    productCategoryId: number | string;
    brandId: number | string;
    publishStatus: number | string;
    verifyStatus: number | string;
}

export interface Pagination {
    pageNum: number;
    pageSize: number;
    total?: number;
    pageSizeOptions?: number[];
}

export interface ProductRequest extends Pagination {
    keyword?: string;
    productSn?: string;
    productCategoryId?: number | string;
    brandId?: number | string;
    publishStatus?: number | string;
    verifyStatus?: number | string;
    pageNum: number;
    pageSize: number;
}

export interface ProductResponse {
    code: number;
    message: string;
    data: {
        list: DataTable[];
        pageNum: number;
        pageSize: number;
        total: number;
        totalPage: number;
    }
}

export interface DataTable {
    key: number | string;
    id: number;
    brandId: number;
    productCategoryId: number;
    feightTemplateId: number;
    productAttributeCategoryId: number;
    name: string;
    pic: string;
    productSn: number;
    deleteStatus: number;
    publishStatus: number;
    newStatus: number;
    recommandStatus: number;
    verifyStatus: number;
    sort: number;
    sale: number;
    price: number;
    promotionPrice: number;
    giftGrowth: number;
    giftPoint: number;
    usePointLimit: number;
    subTitle: string;
    originalPrice: number;
    stock:number;
    lowStock: number;
    unit: string;
    weight: number;
    previewStatus: number;
    serviceIds: string;
    keywords: string;
    note: string;
    albumPics: string;
    detailTitle: number;
    promotionStartTime: string;
    promotionEndTime: string;
    promotionPerLimit: number;
    promotionType: number;
    brandName: string;
    productCategoryName: string;
    description: null,
    detailDesc: null,
    detailHtml: null,
    detailMobileHtml: null
}

