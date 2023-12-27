// isArray 判断数组
export function isArray(val: unknown) {
    return Object.prototype.toString.call(val) === '[object Array]';
}

// isUndefined 判断Undefined
// 注意 typeof null === 'object'
export function isUndefined(val: unknown) {
    return typeof val === 'undefined';
}

// isObject 判断对象
// 排除 `null`的情况
export function isObject(val: unknown) {
    return val !== null && typeof val === 'object';
}

// isPlainObject 判断 纯对象
// 其实就是判断目标对象的原型是不是`null` 或 `Object.prototype`
export function isPlainObject(val: unknown) {
    if(Object.prototype.toString.call(val) !== '[object Object]') {
        return false;
    }

    const prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
}

// isDate 判断Date
export function isDate(val: unknown) {
    return Object.prototype.toString.call(val) === '[object Date]';
}

// isFile 判断文件类型
export function isFile(val: unknown) {
    return Object.prototype.toString.call(val) === '[object File]';
}

// isBlob 判断Blob
export function isBlob(val: unknown) {
    return Object.prototype.toString.call(val) === '[object Blob]';
}

// isFunction 判断函数
export function isFunction(val: unknown) {
    return Object.prototype.toString.call(val) === '[object Function]';
}

// isStream 判断是否是流
export function isStream(val: any) {
    return isObject(val) && isFunction(val.pipe);
}

// trim 去除首尾空格
// `trim`方法不存在的话，用正则
export function trim(str: string) {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}
  

