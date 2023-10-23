export enum FilterEnum {
    NORMAL = 0,
    COLOR = 1
}

export const FilterOptionMap: {[key in FilterEnum]: string} = {
    [FilterEnum.COLOR]: '颜色',
    [FilterEnum.NORMAL]: '普通'
}

export enum SearchEnum {
    NO_SEARCH = 0,
    KEYWORD_SEARCH = 1,
    RADIUS_SEARCH = 2
}

export const SearchOptionMap: {[key in SearchEnum]: string} = {
    [SearchEnum.NO_SEARCH]: '不需要检索',
    [SearchEnum.KEYWORD_SEARCH]: '关键字检索',
    [SearchEnum.RADIUS_SEARCH]: '范围检索'
}

export enum RelatedEnum {
    NO = 0,
    YES = 1
}

export const RelatedOptionMap: {[key in RelatedEnum]: string} = {
    [RelatedEnum.NO]: '否',
    [RelatedEnum.YES]: '是'
}

export enum SelectEnum {
    SOLE = 0,
    SINGLE_CHOICE = 1,
    MULTIPLE_CHOICE = 2
}

export const SelectOptionMap: {[key in SelectEnum]: string} = {
    [SelectEnum.SOLE]: '唯一',
    [SelectEnum.SINGLE_CHOICE]: '单选',
    [SelectEnum.MULTIPLE_CHOICE]: '复选'
}

export enum InputTypeEnum {
    INPUT = 0,
    SELECT = 1
}

export const InputTypeOptionMap: {[key in InputTypeEnum]: string} = {
    [InputTypeEnum.INPUT]: '手工录入',
    [InputTypeEnum.SELECT]: '从下面列表中选择'
}





