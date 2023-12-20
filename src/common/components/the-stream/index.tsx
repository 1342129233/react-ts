import React, { useState, useEffect, Ref,forwardRef, useImperativeHandle, useRef, useMemo } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { throttle } from 'lodash-es';
import { useWatch } from '@/common/hooks/useWatch';
import styles from './style/index.module.less';

// 自动解锁的定时器
let timer: ReturnType<typeof setTimeout> | null = null;
const bufferList: any[] = [];
let lastLen = 0;

function TheStream(props: Props, ref: Ref<unknown>) {
    const { 
        list, 
        uniqueKey, 
        hideScrollbar = false, 
        maxCount = 100, 
        autoScrollTimeout = 15 * 1000, 
        throttleTimeout = 200,
        duration = '0.2s',
        delay = 1000,
        streamSlot,
        update
    } = props;
    const boxRef = useRef<HTMLDivElement | null>(null);
    const [autoScroll, setAutoScroll] = useState(true); // 判断是否滚动到底部
    const [newMessageCount, setNewMessageCount] = useState(0); // 新消息数
    const [showList, setShowList] = useState<any[]>([]); // 
    
    useEffect(() => {
        update(showList.length)
    }, [showList.length || 0]);

    // 此处使用外置的变量 lastLen 记录上一次的长度 通过对比以获取增量数据
    useWatch<IComment[]>(list, (newVal, prevVal) => {
        if(!newVal) {
            return;
        }
        // debugger;
        // 外部对进行了截取/清空操作
        if(newVal.length < lastLen) {
            lastLen = newVal.length;
            return;
        }
        
        // 获取增量数据
        const diff = newVal.slice(lastLen);
        // 将增量数据推入 bufferList
        if(diff.length) {
            bufferList.push(...diff);
            for(let i = 0; i < bufferList.length; i++){
                setTimeout(function(){
                    pushComment()
                },i * delay)
            }
        }

        // 从bufferList中取出数据，添加到showList中
        // 后续触发由钩子函数handleAfterEnter触发
        // pushComment();

        // 更新浮标
        lastLen = newVal.length;
    })

    // 处理自动滚动逻辑
    // 有新数据被推入 showList 时，自动滚动到底部
    useWatch(showList, async (newVal, prevVal) => {
        if(!newVal) {
            return;
        }
        // 限制showList的大小
        if(newVal.length > maxCount) {
            showList.splice(0, showList.length - maxCount);
        }

        // 数据处理完毕 统一等待DOM更新 执行滚动逻辑
        // await nextTick();

        if (!autoScroll) return;
        scrollToBottom();
    })

    useEffect(() => {
        return () => {
            if(timer) clearTimeout(timer);
        }
    }, [])

    /**
     * 推送消息到响应式数据 触发视图更新
     */
    const pushComment = throttle(
        () => {
            // 如果 throttleTimeout 为 0 则每次都将bufferList中的全部数据推入showList
            // 否则 逐条推入数据
            const data = bufferList.splice(0, props.throttleTimeout === 0 ? bufferList.length : 1);
            const list = showList;
            list.push(...data);
            setShowList([...list]);

            // 如果当前不在底部 则更新新消息数量
            if(!autoScroll) {
                // const count = newMessageCount + data.length;
                setNewMessageCount(prev => prev += data.length);
            }
        },
        throttleTimeout
        // {
        //     // 是否立即调用
        //     leading: false,
        //     // 是否在延迟后调用
        //     trailing: false
        // }
    );

    /**
     * 监听上一条动画结束事件，触发pushComment
     */
    const handleAfterEnter = async () => {
        // 如果传入了 delay 则当前数据停留指定时间后 再推入新数据
        delay && (await new Promise((resolve) => setTimeout(resolve, delay)));

        pushComment();
    }

    /**
     * 处理.box的滚动事件
     */
    const handleBoxScroll = throttle(() => {
        // 根据当前滚动条位置 更新自动滚动状态
        const isSutoScroll = isScrollToTheEnd();
        setAutoScroll(isSutoScroll);

        if(isSutoScroll) return;
        // 不在底部: 每次滚动都会更新定时器
        autoScrollTimeout && waitForScrollEnd();
    }, 50);

    /**
     * 自动滚动到底部
     */
    const waitForScrollEnd = () => {
        if(timer) clearTimeout(timer);

        timer = setTimeout(() => {
            if(!isScrollToTheEnd()) {
                scrollToBottom();
            }
        }, autoScrollTimeout);
    }

    /**
     * 判断是否滚动到底部
     */
    const isScrollToTheEnd = () => {
        const box = boxRef.current;
        
        if(!box) return false;

        const boxHeight = box?.clientHeight || 0; // 滚动条高度
        const boxScrollTop = box?.scrollTop || 0; // 滚动条位置
        const boxScrollHeight = box?.scrollHeight || 0; // 获取元素的高度
        // 增加 5px 的误差，防止快速滚动时计算不准确
        return boxHeight + boxScrollTop >= boxScrollHeight - 5;
    }

    /**
     * 点击滚动到底部
     */
    const scrollToBottom = () => {
        // 使用 offsetTop 代替 scrollIntoView
        // fix: https://stackoverflow.com/questions/11039885/scrollintoview-causing-the-whole-page-to-move
        const targetHTML = boxRef.current?.lastElementChild as HTMLElement;
        const target = targetHTML?.lastElementChild as HTMLElement;
        boxRef.current!.scrollTop = target?.offsetTop || 0;
        
        setAutoScroll(true);
        setNewMessageCount(0);
    }

    /**
     * 清空showList
     */
    const clearShowlist = () => {
        setShowList([]);
    }

    useImperativeHandle(ref, () => {
        return {
			bufferList,
            showList,
            boxRef,
            autoScroll,
            newMessageCount,
            scrollToBottom,
            clearShowlist
        }
    });

    return (
        <div
            ref={boxRef}
            onScroll={handleBoxScroll}
            className={styles.streamWrapper}
            style={{
                overflowY: hideScrollbar ? 'hidden' : 'auto'
            }}
        >
            <TransitionGroup>
                {
                    showList.map((item, index) => {
                        return (
                            <CSSTransition 
                                timeout={500} 
                                key={index}
                                classNames={{
                                    enter: "alert-enter",
                                    enterActive: "alert-enter-active",
                                    exit: "alert-exit",
                                    exitActive: "alert-exit-active",
                                }}
                            >
                                <div className={styles.streamItem}>{item.from} - {item.content}</div>
                            </CSSTransition>
                        )
                    })
                }
            </TransitionGroup>

        </div>
    );
}

interface Props {
    list: IComment[]; // 完整数据列表
    uniqueKey: string; // 每条数据的唯一标识
    hideScrollbar?: boolean; // 是否隐藏滚动条
    maxCount?: number; // 最大显示数量
    autoScrollTimeout?: number; // // 指定时间内无操作则自动滚回底部 传0则不自动滚动
    throttleTimeout?: number; // 间隔多少毫秒推入一条数据
    duration?: string// transition动画持续时间
    delay?: number; // 动画延迟时间
    streamSlot: Function,
    update: Function
}

export default forwardRef<HTMLDivElement, Props>(TheStream);

interface IComment {
    id: number;
    from: string;
    content: string;
}




  