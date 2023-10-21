export enum StatusEnum{
    NO = '0',
    YES = '1'
}

export const StatusToBoolean: { [key: string]: boolean } = {
    [StatusEnum.NO]: false,
    [StatusEnum.YES]: true,
}

export const StatusToNUmber: { [key: string]: number } = {
    false: 0,
    true: 1,
}
