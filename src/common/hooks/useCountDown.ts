import React, { useState, useMemo, useEffect, useRef } from 'react';
import { parseTime, formatTime, TimeString } from '@/common/utils/day'

export function useCountDown(options: PropsType) {
    // time 剩余时间
    const [time, setTime] = useState<number>(options.time);
    useEffect(() => {
        setTime(options.time)
    }, [options.time])

    // 是否正在倒计时    
    let counting = false;

    // 结束时间
    let endTime = 0;

    // 格式化输出的日期时间
    const currentTime = useMemo(() => {
        return formatTime(options.format, parseTime(time))
    }, [time])

    // 获取当前剩余时间
    const getCurrentRemain = () => Math.max(endTime - Date.now(), 0);

    // 设置剩余时间
    const remainChange = (value: number) => {
        // 更新剩余时间
        setTime(value)

        // 倒计时结束
        if (value === 0 && counting) {
            // 触发 Finish 事件
            options.onFinish?.()

            // 正在倒计时标志为 false
            counting = false
        }
    }

    // 倒计时
    const tickTime = () => {
        // 使用 requestAnimationFrame 代替 setTimeout, 执行每帧操作
        requestAnimationFrame(() => {
            // 更新剩余时间
            remainChange(getCurrentRemain());

            // 倒计时没结束，就继续
            if (time > 0 && counting) {
                tickTime();
            }
        })
    }

    // 启动
    const start = () => {
        // 正在倒计时,忽略多次调用 start
        if(counting) return;

        // 正在倒计时标志为 true
        counting = true

        // 设置结束时间
        const end = Date.now() + time;
        endTime = end
        
        // 开启倒计时
        tickTime();
    }

    return {
        currentTime,
        start
    }
}

type PropsType = {
    time: number;
    format: string;
    immediate: boolean;
    onFinish: () => void
}
