export enum StatusEnum {
    NO = 0,
    YES = 1
}

export const statusMap: { [key in StatusEnum]: string} =  {
    [StatusEnum.NO]: '否',
    [StatusEnum.YES]: '是'
}
