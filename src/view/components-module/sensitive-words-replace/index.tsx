import React, { useState, useEffect, useMemo, useRef } from "react";
import { Input } from 'antd';
import styles from './style/index.module.less';
// import { customRef } from "vue";

const sensitiveWords = ['搞笑', '恼火'];
function SensitiveWordsReplace() {
    const [text, setText] = useState('');

    const handleInputChange = (event: { target: { value: string } }) => {
        let text = event.target.value;
        // 使用正则表达式替换敏感词
        const regex = new RegExp(sensitiveWords.join('|'), 'g');
        const sanitizedText = text.replace(regex, '**');
        setText(sanitizedText);
    }

    // vue3 实现
    // const replaceStr = (str: string) => {
    //     sensitiveWords.forEach((keyword: string) => {
    //         str = str.replaceAll(keyword, '**')
    //     })
    //     return str;
    // }
    // const useReplaceRef = (value: string) => {
    //     return customRef((track, trigger) => {
    //         return {
    //             get() {
    //                 track();
    //                 return value;
    //             },
    //             set(newValue: string) {
    //                 value = replaceStr(newValue)
    //                 trigger();
    //             }
    //         }
    //     })
    // }
    
    return <>
        <div>敏感词: 搞笑 恼火</div>
        <div className={styles.content}>
            <Input placeholder="请输入内容" type="text" value={text} onChange={handleInputChange} />
        </div>
    </>
}

export default SensitiveWordsReplace;
