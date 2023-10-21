export interface OptionMapType { 
    value: number; 
    label: string;
    children?: OptionMapType[];
}

export interface OptionKeyType { 
    value: string; 
    label: string;
    children: string
}

export function convertMap(data: { [key in string]: string }) {
    const optionMap: Array<OptionMapType> = [];
    Object.keys(data).forEach((val: string) => {
        optionMap.push({
            value: +val,
            label: data[val]
        });
    });
    return optionMap;
};

export function serverToOption(array: Array<Record<string, any>>, optionsType: OptionKeyType): OptionMapType[] {
    const list = array.map((item, index: number) => {
        const Obj: OptionMapType = {
            value: 0,
            label: '',
            children: []
        };
        Obj.value = item[optionsType.value];
        Obj.label = item[optionsType.label];
        Obj.children = item[optionsType.children] ? serverToOption(item[optionsType.children], optionsType) : [];
        return Obj;
    });
    return list;
}

// 数组查找
export const findCascaderValue = (value: number, list: OptionMapType[] = []) => {    
    for (const node of list) {
        const findValue = traverse(value, node);
        if(findValue.length > 0) {
            return findValue;
        }
    }
    return [];
}

// 链表查找父链相关
export const traverse = (value: number | string, item: OptionMapType, result: number[] = []) => {
    if(item.value === value) {
        result.unshift(item.value);
        return result;
    }
    if(item.children) {
        for (const childNode of item.children) {
            result = traverse(value, childNode)
            if(result.length > 0) {
                result.unshift(item.value)
                return result;
            }
        }
    }
    return result;
}
