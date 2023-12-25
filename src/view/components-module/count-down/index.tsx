import React, { useState, useEffect, useMemo, useRef } from "react";
import { InputNumber, Button } from 'antd';
import CountDown from '@/common/components/count-down';
import { TimeString } from '@/common/utils/day';

function CountDownComponent() {
    const countDownRef = useRef<{ start: Function, currentTime: TimeString  }>()
    const [time, setTime] = useState(1); // 秒
    const [timeDisabled, setTimeDisabled] = useState(false);

    const onChange = (value: number | null) => {
        if (value === null) return;
        setTime(value)
    }
    // 开始倒计时
    const startTime = () => {
        setTimeDisabled(true);
        countDownRef.current?.start();
    }
    const countDownChange = () => {
        onChange(1)
        setTimeDisabled(false);
    }
    return (
        <div>
            <InputNumber min={1} value={time} addonAfter="秒" disabled={timeDisabled} onChange={onChange} />
            <Button type="primary" onClick={() => startTime()} disabled={timeDisabled}>开始倒计时</Button>
            <CountDown
                ref={countDownRef}
                time={time}
                immediate={false}
                finish={() => countDownChange()}
            />
        </div>
    )
}

export default CountDownComponent;
