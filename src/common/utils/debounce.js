// 防抖
export function debounce(fn, wait, immediate) {
    let timer;
    let result;
    let debounced = function() {
        let context = this;
        let args = argument;
        if(timer) clearTimeout(timer);
        if(immediate) {
            let callNow = !timer;
            timer = setTimeout(() => {
                result = null;
            }, wait);
            if(callNow) result = fn.apply(context, args);
        } else {
            timer = setTimeout(()=>{
                result = fn.apply(context, args)
            }, wait)
        }

        return result;
    }
    debounced.cancel = function() {
        clearTimeout(timer);
        timer = null
    }
}

// 节流
/**
 * 
 * @param {*} func 
 * @param {*} wait 
 * @param {*} options
 *  leading: 一个布尔值,表示是否在第一次调用立即执行函数,不等待延迟时间,默认为 true
 *  trailing: 一个布尔值,表示是否在最后一次调用后再等待延迟时间之后执行函数,默认为 true
 *  delay:一个整数,表示延迟的时间
 *  maxWait: 一个整数,表示最大等待时间,只有当 leading 和 trailing 都设置为 true 的时候才有效
 *  context: 函数执行上下文的绑定
 * @returns 
 */
export function throttle(func, wait, options = {}) {
    let timeout;
    let lastExecutedTime = 0;
    let throttledFunc = function() {
        let context = this;
        let args = arguments;
        let now = +new Date();
        let remaining = wait - (now - lastExecutedTime); // 计算距离上次执行的时间间隔
        // 如果设置了立即执行选项 leading 并且距离上次执行的时间间隔已经超过了设定的等待时间 wait
        if (remaining <= 0 || options.leading) {
            clearTimeout(timeout); // 清除计时器
            timeout = null; // 重置计时器
            lastExecutedTime = now; // 记录上次执行的时间戳
            func.apply(context, args); // 执行函数
        } else if(!timeout && options.trailing !== false) {
            // 如果计时器未被设置，并且设置了结尾调用选项 trailing
            timeout = setTimeout(() => {
                timeout = null; // 重置计时器
                lastExecutedTime = options.leading ? now : 0; // 记录上次执行的时间戳
                func.apply(context, args); // 执行函数
            }, remaining);
        }
    };
    // 添加一个 cancel 方法，用于取消节流
    throttledFunc.cancel = function() {
        clearTimeout(timeout); // 清除计时器
        timeout = null; // 重置计时器
    };
    return throttledFunc;
}

