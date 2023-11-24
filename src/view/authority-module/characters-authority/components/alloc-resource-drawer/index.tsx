import React, { useState, useEffect, forwardRef, Ref, useImperativeHandle, useRef, useMemo  } from 'react';
import { Tree, message, Card, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import TheDrawer from '@/common/components/the-drawer/index';
import CardCheck from './components/card-check/index';
import { resourceCategoryAll, resourceAll, listResourceId, allocResource } from './server';
import { ResourceCategoryDataType, ResourceResolveDataType, Options  } from './types';




function AllocResourceDrawer(props: PropsType, ref: Ref<unknown>) {
    const { id } = props;
    // const cardCheckRefs = useRef<Array<HTMLDivElement & { optionsItem: Options[], indeterminate: boolean, checkAll: boolean, checkAllChange: Function, checkedList: CheckboxValueType[] }>>([]);
    const cardCheckRefs = useRef<any[]>([]);
    const [openDrawer, setOpenDrawer] = useState(true);
    const [resourceCategoryData, setResourceCategoryData] = useState<Options[]>([]);
    const [resourceData, setResourceData] = useState<Options[]>([]);
    const [listResourceData, setListResourceData] = useState<Options[]>([]);
    const getRef=(dom: HTMLElement | null, index: number)=>{
        cardCheckRefs.current[index] = dom;
        // console.log(333, cardCheckRefs.current);
    }

    const onSubmit = async () => {
        try {
			// await allocResource();
            // setOpenDrawer(false);
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
    }

    const getResourceCategory = async () => {
        try {
			const res = await resourceCategoryAll();
            const data: Options[] = [];
            res.data.forEach(element => {
                data.push({
                    value: element.id,
                    label: element.name,
                    children: []
                })
            });
            setResourceCategoryData([
                ...data
            ])
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
    }
    const getResource = async () => {
        try {
			const res = await resourceAll();
            const resourceList: Options[] = [];
            res.data.forEach(item => {
                resourceList.push({
                    value: item.id,
                    label: item.name,
                    categoryId: item.categoryId
                });
            })
            setResourceData([
                ...resourceList
            ])
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
    }
    const getResourceId = async () => {
        try {
			const res = await listResourceId(1);
            // setListResourceData([
            //     ...res.data
            // ])
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
    }

    const all = async () => {
        try {
            await getResourceCategory();
            await getResource();
            await getResourceId();
        } catch(error: any) {
            message.error(error?.message || '请求失败')
        }
    }

    useEffect(() => {
        if(id) {
            all()
        }
    }, [id])
    
    useImperativeHandle(ref, () => {
		return {
			isOpen: () => {
				setOpenDrawer(!openDrawer)
			}
		}
	})

    const onCheckAllChange = (e: CheckboxChangeEvent, index: number) => {
        cardCheckRefs.current[index].checkAllChange(e);
    };

    const indeterminate = (index: number) => {
        return cardCheckRefs.current[index]?.indeterminate
    }

    const checkAll = (index: number) => {
        return cardCheckRefs.current[index]?.checkAll
    }
    

    return (
        <TheDrawer
            title="分配菜单"
            open={openDrawer}
            onOpenClose={(value) => setOpenDrawer(value)}
            onSave={() => onSubmit()}
        >
            {/* {
                resourceCategoryData.length > 0
                ?
                resourceCategoryData.map((item: Options, index: number) => (
                    <Card
                        style={{ marginTop: 16 }}
                        key={item.value}
                        type="inner"
                        title={<Checkbox indeterminate={indeterminate(index)} onChange={(e) => onCheckAllChange(e, index)} checked={checkAll(index)}>
                            { item.label }
                        </Checkbox>}
                    >
                        <CardCheck ref={(ele: HTMLElement | null) => getRef(ele, index)}   key={item.value} resourceData={resourceData} id={item.value} />
                    </Card>
                ))
                :
                null
            } */}
        </TheDrawer>
    )
}

interface PropsType {
    id: number | null
}
// ref={getRef}

export default forwardRef<HTMLDivElement, PropsType>(AllocResourceDrawer);
