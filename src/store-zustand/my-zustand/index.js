import React, { useState, useEffect, useSyncExternalStore } from 'react';

const createStore = (createState) => {
    // 全局状态
    let state; // 全局状态
    const listeners = new Set(); // 监听器

    // 修改状态 partial 传入的可以是对象,函数 replace = true的时候为替换
    const setState = (partial, replace = false) => {
        const nextState = typeof partial === 'function' ? partial(state) : partial;

        // 判断是否相等 Object.is() 和 === 运算符行为相同，即严格相等
        if(!Object.is(nextState, state)) {
            const previousState = state; 

            if(!replace) {
                state = (typeof nextState !== 'object' || nextState === null) ? nextState : Object.assign({}, state, nextState);
            } else {
                state = nextState;
            }
            listeners.forEach((listener) => listener(state, previousState));
        }
    }

    // 读取状态
    const getState = () => state;

    // 添加监听器
    const subscribe = (listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener)
    }

    // 清除所有监听器
    const destroy= () => {
        listeners.clear()
    }

    // 初始化 state 会立即执行
    const api = { setState, getState, subscribe, destroy };

    state = createState(setState, getState, api);

    return api;
}

function useStore(api, selector) {
    // 监听 store 的新老变化
    // const [, forceRender] = useState(0);
    // useEffect(() => {
    //     api.subscribe((state, prevState) => {
    //         const newObj = selector(state);
    //         const oldobj = selector(prevState);

    //         if(newObj !== oldobj) {
    //             forceRender(Math.random());
    //         }
    //     })
    // }, [])
    // return selector(api.getState());
    
    // 使用 useSyncExternalStore 替代上面的实现
    // const [value, setValue] = React.useState(selector(api.getState()));
    function getState() {
        return selector(api.getState());
    }

    return useSyncExternalStore(api.subscribe, getState);
}

// createState 箭头函数用户创建使用
export const create = (createState) => {
    // createState (set) => ({ aaa: '', bbb: '', updateAaa, updateBbb })
    const api = createStore(createState);

    const useBoundStore = (selector) => useStore(api, selector);

    Object.assign(useBoundStore, api);

    return useBoundStore;
}



// import { create } from 'zustand'

// const useXxxStore = create((set) => ({
//     aaa: '',
//     bbb: '',
//     updateAaa: (value) => set(() => ({ aaa: value })),
//     updateBbb: (value) => set(() => ({ bbb: value })),
// }))
// const aaa = useXxxStore((state) => state.aaa)

