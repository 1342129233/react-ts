import dayjs from 'dayjs';
import { usableProductEnum } from '@/common/public-type';
import { FormData } from '../types';

export const info = {
    amount: '',
    minPoint: '',
    name: '',
    note: '',
    perLimit: 1,
    platform: 0,
    productCategoryRelationList: [],
    productRelationList: [],
    publishCount: '',
    type: 0,
    useType: 0,
    radio: 0,
    time: []
}

export function feToServer(formValue: FormData) {
    const timeStart = formValue.time ? formValue?.time[0] : 0;
    const timeEnd = formValue.time ? formValue.time[1] : 0;
    const timeEnable = formValue['enableTime']|| 0;
    const startTime = timeStart ? +dayjs(timeStart).startOf('day').format('x') : '';
    const endTime = timeEnd ? +dayjs(timeEnd).startOf('day').format('x') : '';
    const enableTime = timeEnd ? +dayjs(timeEnable).startOf('day').format('x') : '';
    
    const { time, ...data } = {
        ...formValue,
        startTime: startTime,
        endTime: endTime,
        enableTime
    }
    return data;
}

export function serverToFe(data: FormData) {
    const startTime = data.startTime ? dayjs(data.startTime) : '';
    const endTime = data.endTime ? dayjs(data.endTime): '';
    const time = [startTime, endTime]
    const enableTime = data.enableTime ? dayjs(data.enableTime): '';
    let radio = 0
    if(data.productCategoryRelationList && data.productCategoryRelationList.length > 0) {
        radio === usableProductEnum.APPOINT_TYPE
    }
    if(data.productRelationList && data.productRelationList.length > 0) {
        radio === usableProductEnum.APPOINT_PRODUCT
    }
    
    return {
        amount: data.amount,
        minPoint: data.minPoint,
        name: data.name,
        note: data.note,
        perLimit: data.perLimit,
        platform: data.platform,
        productCategoryRelationList: data.productCategoryRelationList || [],
        productRelationList: data.productRelationList || [],
        publishCount: data.publishCount,
        startTime: data.startTime,
        type: data.type,
        useType: data.useType,
        radio: radio,
        time: time,
        enableTime: enableTime
    }
}
