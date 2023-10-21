export interface ProductLadderListType {
    id: number;
    productId: number;
    count: number;
    discount: number;
    price: number;
}

export interface ProductFullReductionListType {
    id: number;
    productId: number;
    fullPrice: number;
    reducePrice: number;
}

export interface MemberPriceListType {
    id?: number;
    productId?: number;
    memberLevelId: number;
    memberPrice: string;
    memberLevelName: string;
}

export interface SpDataType {
    key: string; value: string;
}

export interface SkuStockListType {
    [key: string]: number | string | SpDataType[];
    id: number;
    productId: number;
    skuCode: string;
    price: number;
    stock: number;
    lowStock: string;
    pic: string;
    sale: string;
    promotionPrice: number;
    lockStock: string;
    spData: SpDataType[];
}

export interface ProductAttributeValueListType {
    id: number;
    productId: number;
    productAttributeId: number;
    value: string;
}

export interface subjectProductRelationList {
    id?: number;
    subjectId: number | string;
    productId: number;
}

export interface DataInfoType {
    [key: string]: any;
    id: number | string;
    brandId: number;
    productCategoryId: number | number[];
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
    promotionPrice:number;
    giftGrowth:number;
    giftPoint:number;
    usePointLimit:number;
    subTitle: string;
    originalPrice:number;
    stock:number;
    lowStock: number;
    unit: string;
    weight: number;
    previewStatus: number;
    serviceIds:string;
    keywords: string;
    note: string;
    albumPics: string;
    detailTitle: string;
    promotionStartTime: string;
    promotionEndTime:string;
    promotionPerLimit: number;
    promotionType: number;
    brandName: string;
    productCategoryName:string;
    description: string;
    detailDesc: string;
    detailHtml: string;
    detailMobileHtml: string;
    productLadderList: ProductLadderListType[];
    productFullReductionList: ProductFullReductionListType[];
    memberPriceList: MemberPriceListType[];
    skuStockList: SkuStockListType[];
    productAttributeValueList: ProductAttributeValueListType[],
    subjectProductRelationList: subjectProductRelationList[],
    prefrenceAreaProductRelationList: subjectProductRelationList[];
    cateParentId: number;
}

export interface GetProductInfoResponse {
    code: number;
    message: string;
    error: string;
    data: DataInfoType;
}

