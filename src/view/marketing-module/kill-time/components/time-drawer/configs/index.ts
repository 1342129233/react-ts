export const info = {
    createTime: '',
    endTime: '',
    name: '',
    startTime: '',
    status: 0
}

export enum statusEnum {
    NO = 0,
    YES = 1
}

export const statusMap: {[key in statusEnum]: string} = {
    [statusEnum.NO]: '不启用',
    [statusEnum.YES]: '启用'
}
