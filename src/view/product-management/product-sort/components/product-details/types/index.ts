export interface FormType {
    description: string;
    icon: string;
    keywords: string;
    name: string;
    navStatus: number;
    parentId: number;
    productAttributeIdList: { value: number }[] | { value: string }[] | string[] | number[];
    productUnit: string;
    showStatus: number;
    sort: number;
}

export interface OptionsType {
    value: number;
    label: string;
    children?: OptionsType[];
}

export interface FormListFieldDataType {
    name: number;
    key: number;
    /** @deprecated No need anymore Use key instead */
    fieldKey?: number;
    initValues?: any
}

export interface ProductCategoryResolve {
    code: number;
    data: FormType;
    message: string;
}

export interface ProductAttributeOptions {
    attributeCount: string;
    id: number;
    name: string;
    paramCount: number;
    productAttributeList: ProductAttributeOptions[]
}

export interface ProductAttributeResolve {
    code: number;
    message: string;
    data: ProductAttributeOptions[];
}
