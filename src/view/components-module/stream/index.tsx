import React, { useState, useEffect, useMemo, useRef } from "react";
import TheStream from '@/common/components/the-stream';
import { CSSTransition } from "react-transition-group";
import styles from './style/index.module.less';

interface IComment {
    id: number;
    from: string;
    content: string;
}

// 模拟弹幕数据源 每 2s 生成 5 条数据
let globalId = 0;
const count = 3;


function Stream() {
    const [commentList, setCommentList] = useState<IComment[]>([]);
    const theStreamRef = useRef<HTMLDivElement & { autoScroll: boolean, newMessageCount: number, scrollToBottom: Function, showList: any[] }>(null);
    const [showListLength, setShowListLength] = useState(0);

    const showTip = useMemo(() => {
        return !theStreamRef.current?.autoScroll && theStreamRef.current?.newMessageCount! > 0;
    }, [theStreamRef.current?.autoScroll, theStreamRef.current?.newMessageCount]);

    
    
    useEffect(() => {
        let interval: any = null;
        interval = setInterval(() => {
            const data: IComment[] = [];
            for (let i = 0; i < count; i++) {
                data.push({
                    id: Date.now() + i,
                    from: '用户' + globalId,
                    content: '弹幕内容' + Math.floor(Math.random() * 1000)
                })
                globalId++;
            }
            setCommentList(prev => [...prev, ...data])
          }, 3000);
        return () => clearInterval(interval);
    }, [])

    const streamSlot = (data: any) => {
        return (
            <div>{ data.from }: { data.content }</div>
        )
    }

    const showListUpdateLength = (index: number) => {
        setShowListLength(index);
    }
    

    return (
        <div className={[styles.chatHistory, styles.history].join(" ")}>
            <TheStream 
                ref={theStreamRef}
                list={[...commentList]}
                uniqueKey="id"
                streamSlot={streamSlot}
                update={showListUpdateLength}
            />

            <CSSTransition
                in={showTip}
                timeout={ 400 }
                classNames={{
                    enter: styles.fadeEnter,
                    enterActive: styles.fadeEnterActive,
                    enterDone: styles.fadeEnterDone,
                    exit: styles.fadeExit,
                    exitActive: styles.fadeExitActive,
                    exitDone: styles.fadeExitDone,
                }}
            >
                <div className={styles.newMsgTip} onClick={() => theStreamRef.current?.scrollToBottom()}>
                    <span>{ theStreamRef.current?.newMessageCount }条新消息</span>
                </div>
            </CSSTransition>
            
            <h4>
                Origin: { commentList.length }
                Shown: { showListLength }
            </h4>
        </div>
    )
}

export default Stream;

