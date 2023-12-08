export type BarInfo = {
    statusBarHeight: number;
    toolBarHeight: number;
    bottomSafeHeight: number;
    bottomHeight: number;
};

interface UAInfoType {
    applewebkit?: string;
    chrome?: string;
    mozilla?: string;
    safari?: string;
    kwai?: string;
    yoda?: string;
    build?: string;
    nettype?: string;
    version?: string;
    mobile?: string;
    ksnebula?: string;
    tbht?: string;
    // 4tab下顶导的值
    ftsfht?: string;
    // 4tab下底导的值
    fbsfht?: string;
    statusht?: string;
    [key: string]: string | undefined;
}

interface IphoneEdition {
    main: number;
    sub: number;
}

/**
 * 判断是否在ios内 
 */
export function isInIOS(userAgent = navigator.userAgent) {
    return /iPhone|iPad|iPod/i.test(userAgent);
}

/**
 * 解析ua
 * 以下底部、顶部安全区域高度等尺寸均和ua相关，可以根据业务需求更改相应逻辑
 * @returns 
 */
function uaGetInfo(): UAInfoType {
    const matchList = window.navigator.userAgent.match(/([a-zA-Z]+)\/(\S+)(:\s)?/g) || [];
    const info: UAInfoType = {};
    for (let i = 0; i < matchList.length; i++) {
        const str = matchList[i];
        const res = str!.split('/');
        const key = res[0]!.toLowerCase();
        info[key] = res[1]!.split(',')[0];
    }
    return info;
}

/**
 * 判断是否在第四tab
 * @returns 
 */
export function isAtFourTab() {
    const { tbht, ftsfht } = uaGetInfo();
    return !!ftsfht || (tbht && location.search.includes('inActivityWeb=1'));
}

function getNewBottomAreaHeight() {
    const { fbsfht } = uaGetInfo();
    return fbsfht ? Number(fbsfht) / window.devicePixelRatio : -1;
}

/**
 * 版本对比
 * @param a 
 * @param b 
 * @returns 
 */
export function compareVersion(a: string, b: string) {
    let v1 = a.split('.').map((i) => +i);
    let v2 = b.split('.').map((i) => +i);
    const maxLen = Math.max(v1.length, v2.length);
    // 补零
    v1 = v1.concat(new Array(maxLen - v1.length).fill(0)).map((item) => Number(item));
    v2 = v2.concat(new Array(maxLen - v2.length).fill(0)).map((item) => Number(item));

    for (let i = 0; i < maxLen; i++) {
        if (v1[i]! < v2[i]!) {
            return 'lt';
        }
        if (v1[i]! > v2[i]!) {
            return 'gt';
        }
    }
    return 'eq';
}

const iosSafeMaxHeight = 38;

function mayNeedBarHeight() {
    // getNewBottomAreaHeight在新版安卓9.10.10之后存在，iOS返回安全区的高度，安卓返回为0的时候说明不存在透明底导的情况
    // 但是9.11.40后底导才开始占位
    // iOS安全区应该是34，这里写大了一些，防止可能有的iOS大于这个值
    const newBottomAreaHeight = getNewBottomAreaHeight();
    const nebulaVersion = uaGetInfo().ksnebula ?? '';
    const poorAndroid = compareVersion(nebulaVersion, '9.11.40') === 'lt';
    if (
        newBottomAreaHeight < 0 ||
        (isInIOS() && newBottomAreaHeight > iosSafeMaxHeight) ||
        (!isInIOS() && newBottomAreaHeight > 0 && poorAndroid && nebulaVersion)
    ) {
        return true;
    }
    return false;
}

//  这里根据业务需求确定browseType类型，可以通过js-cookie获取
function getBrowserType() {
    // return Cookie.get('browseType') ?? '0';
    return '0'
}

/**
 * 是否有底导
 * @returns 
 */
function hasBottomNav() {
    return false
}

function hasTransparentToolbar() {
    return hasBottomNav() && getBrowserType() === '3' && isAtFourTab() && mayNeedBarHeight();
}

function getPhoneModel(model: string): IphoneEdition {
    if (model) {
        const infos = model.split(',');
        if (infos[0] && infos[1]) {
            return {
                main: +infos[0].replace(/\D/g, ''),
                sub: +infos[1],
            };
        }
    }
    return {
        main: 0,
        sub: 0,
    };
}

// 是否存在安全区域
function hasSafeAreaInsetBottom() {
    if (!isInIOS()) {
        return false;
    }

    const phoneModel = '';
    if (phoneModel) {
        const { main, sub } = getPhoneModel(phoneModel);

        if (main < 10 || (main === 10 && sub !== 3 && sub !== 6) || (main === 12 && sub === 8)) {
            return false;
        }
        return true;
    }
}

//  获取状态栏高度
function getToolbarHeight() {
    return hasTransparentToolbar() ? 49 : 0;
}

//  获取底部安全区域高度
function getBottomSafeAreaHeight() {
    return hasSafeAreaInsetBottom() ? 34 : 0;
}

//  获取顶部安全区域高度
function getTopAreaHeight() {
    const { tbht, ftsfht, statusht } = uaGetInfo();
    let topGap = 0;
    if (tbht || ftsfht) {
        topGap = (Number(tbht) || Number(ftsfht)) / window.devicePixelRatio;
    } else if (statusht) {
        topGap = Number(statusht);
    }
    return topGap;
}

//  获取各区域高度
function getAllBarValues() {
    const statusBarHeight = getTopAreaHeight();
    const toolBarHeight = getToolbarHeight();
    const bottomSafeHeight = getBottomSafeAreaHeight();
    const bottomHeight = getToolbarHeight() + getBottomSafeAreaHeight();

    return function () {
        return {
            // 状态栏高度
            statusBarHeight,
            // 操作栏高度
            toolBarHeight,
            // 底部安全区高度
            bottomSafeHeight,
            // 操作栏高度 + 设备安全区高度
            bottomHeight
        }
    }
}

// 获取状态栏高度、操作栏高度、底部安全区域高度和（操作栏高度 + 设备安全区高度）
export function useBarInfo(): BarInfo {
    return getAllBarValues()();
}