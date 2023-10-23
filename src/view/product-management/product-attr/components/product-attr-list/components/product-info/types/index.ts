export interface ProductAttributeResolve {
    code: number;
    data: DataType;
    message: number;
}

export interface DataType {
    filterType: number;
    handAddStatus: number;
    id: number;
    inputList: string;
    inputType: number;
    name: string;
    productAttributeCategoryId: number;
    relatedStatus: number;
    searchType: number;
    selectType: number;
    sort: number;
    type: number;
}
