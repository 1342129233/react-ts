import React, { useState, useEffect, forwardRef, Ref, useImperativeHandle, useRef, useMemo  } from 'react';
import { Tree, message, Card, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Options } from '../../types';

const CheckboxGroup = Checkbox.Group;

function CardCheck(props: PropsType, ref: Ref<unknown>) {
    const { id, resourceData } = props;

    const [optionsItem, setOptionsItem] = useState<Options[]>([]);
    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
    const onChange = (list: CheckboxValueType[]) => {
        setCheckedList(list);
    };

    useEffect(() => {  
        const list: Options[] = [];
        resourceData.forEach((item: any) => {
            if(id  === item.categoryId) {
                list.push({
                    value: item.value,
                    label: item.label
                })
            }
        })
        setOptionsItem([...list])
    }, [id, resourceData])

    useImperativeHandle(ref, () => {
		return {
            checkAll: optionsItem.length === checkedList.length,
            checkedList: checkedList,
            optionsItem: optionsItem,
			indeterminate: checkedList.length > 0 && checkedList.length < optionsItem.length,
            checkAllChange: (e: CheckboxChangeEvent) => { 
                const list: number[] = [];
                optionsItem.forEach(item => {
                    list.push(item.value)
                });
                setCheckedList(e.target.checked as boolean ? [...list] : []); 
                
            }
		}
	})
    return (
        <CheckboxGroup options={optionsItem} value={checkedList} onChange={onChange} />
    );
}

interface PropsType {
    resourceData: Options[]
    id: number;
}

export default forwardRef<HTMLDivElement, PropsType>(CardCheck);
