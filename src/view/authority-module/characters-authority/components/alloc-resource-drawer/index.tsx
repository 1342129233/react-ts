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
    const CardCheckRefList = useRef<Array<HTMLDivElement & { checkedList: number[] }>>([]);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [resourceCategoryData, setResourceCategoryData] = useState<Options[]>([]);
    const [resourceData, setResourceData] = useState<Options[]>([]);
    const [listResourceData, setListResourceData] = useState<{ [key in number]: number[] }>({});
    const getRef=(ele: HTMLDivElement & { checkedList: number[] }, i:number)=>{
        CardCheckRefList.current[i] = ele
    }
    const onSubmit = async () => {
        console.log(CardCheckRefList.current)
        let resourceIdList: number[] = [];
        const cardCheckRef= CardCheckRefList.current;
        cardCheckRef.forEach((item: { checkedList: number[] }) => {
            resourceIdList = resourceIdList.concat(item.checkedList)
        })
        const resourceAll = {
            roleId: id!,
            resourceIds: resourceIdList.toString()
        }
        try {
			await allocResource(resourceAll);
            setOpenDrawer(false);
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
			const res = await listResourceId(id!);
            const list: { [key in number]: number[] } = {};
            res.data.forEach((item) => {
                if(!list[item.categoryId]) {
                    list[item.categoryId] = [];
                }
                list[item.categoryId].push(item.id)
            })
            setListResourceData({
                ...list
            })
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

    return (
        <TheDrawer
            title="分配菜单"
            open={openDrawer}
            onOpenClose={(value) => setOpenDrawer(value)}
            onSave={() => onSubmit()}
        >
            {
                resourceCategoryData.length > 0
                ?
                resourceCategoryData.map((item: Options, index: number) => (
                    <CardCheck
                        key={item.label}
                        ref={(dom: HTMLDivElement & { checkedList: number[] }) => getRef(dom, index)} 
                        item={item} id={item.value} 
                        resourceData={resourceData} 
                        data={listResourceData} 
                    />
                ))
                :
                null
            }
        </TheDrawer>
    )
}

interface PropsType {
    id: number | null
}

export default forwardRef<HTMLDivElement, PropsType>(AllocResourceDrawer);
