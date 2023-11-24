import React, { useState, useEffect, forwardRef, Ref, useImperativeHandle, useRef, useMemo  } from 'react';
import { Tree, message, Card, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Options } from '../../types';

const CheckboxGroup = Checkbox.Group;

function CardCheck(props: PropsType, ref: Ref<unknown>) {
    const { id, resourceData, item, data } = props;

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

    useEffect(() => {
        const list = data[id] || [];
        setCheckedList([...list])
     }, [data])

    useImperativeHandle(ref, () => {
		return {
            checkedList: checkedList
		}
	})
    const indeterminate = checkedList.length > 0 && checkedList.length < optionsItem.length;
    const checkAll = optionsItem.length === checkedList.length;
    const onCheckAllChange = (e: CheckboxChangeEvent) => {
        const list: CheckboxValueType[] = [];
        if(e.target.checked) {
            optionsItem.forEach((item) => {
                list.push(item.value)
            })
            setCheckedList([...list]);
            return;
        }
        setCheckedList([]);
    };
    return (
        <Card
            style={{ marginTop: 16 }}
            key={item.value}
            type="inner"
            title={<Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                { item.label }
            </Checkbox>}
        >
            <CheckboxGroup options={optionsItem} value={checkedList} onChange={onChange} />
        </Card>
    );
}

interface PropsType {
    resourceData: Options[]
    item: Options
    id: number;
    data: { [key in number]: number[] }
}

export default forwardRef<HTMLDivElement, PropsType>(CardCheck);
