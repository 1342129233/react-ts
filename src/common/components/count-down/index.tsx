import React, { useState, useEffect, Ref, forwardRef, useImperativeHandle} from 'react';
import { useCountDown } from '@/common/hooks/useCountDown';

function CountDown(props: PropsType, ref: Ref<unknown>) {
    const { time = 0, format = 'DD:HH:mm:ss:SSS', immediate = true, finish } = props;

    const { start, currentTime } = useCountDown({
        time: time * 1000,
        format,
        immediate,
        onFinish: () => finish(),
    })

    // 判断是否需要立即执行
    useEffect(() => {
        if (immediate) start()
    }, [])

    useImperativeHandle(ref, () => {
        return {
            start,
            currentTime
        }
    })

    return <div>
        <h1>{ currentTime.format }</h1>
    </div>
}

type PropsType = {
    time: number; // 即需要倒计时的时间毫秒
    format?: string; // 输出的时间格式
    immediate?: boolean; 
    finish: Function; // 倒计时结束时会被执行的事件
}

export default forwardRef<any, PropsType>(CountDown);
