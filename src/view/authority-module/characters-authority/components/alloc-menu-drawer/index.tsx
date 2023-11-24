import React, { useState, useEffect, forwardRef, Ref, useImperativeHandle, useRef  } from 'react';
import { Tree, message } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import TheDrawer from '@/common/components/the-drawer/index';
import { menuTreeList, listMenuList, allocMenu } from './server';
import { MenuDataType } from './types';

function AllocMenuDrawer(props: PropsType, ref: Ref<unknown>) {
    const { id } = props;
    const [openDrawer, setOpenDrawer] = useState(false);
    const [treeData, setTreeData] = useState<MenuDataType[]>([]);
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

    const onExpand = (expandedKeysValue: React.Key[]) => {
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onCheck = (checkedKeysValue: React.Key[] | any) => {
        setCheckedKeys(checkedKeysValue);
    };


    const onSubmit = async () => {
        const form = {
            roleId: id + '',
            menuIds: checkedKeys.toString()
        }
        try {
			await allocMenu(form);
            setOpenDrawer(false)
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
    }
    const getTreeList = async () => {
        try {
			const res = await menuTreeList();
            setTreeData([
                ...res.data
            ])
            const expandedKeys: number[] = [];
            res.data.forEach(item => {
                expandedKeys.push(item.id)
            })
            onExpand(expandedKeys);
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
    }
    const getMenuList = async () => {
        try {
			const res = await listMenuList(1);
            const checkedKeysList: number[] = [];
            res.data.forEach(item => {
                checkedKeysList.push(item.id)
            })
            onCheck(checkedKeysList)
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
        
    }
    useEffect(() => {
        if(id) {
            getMenuList();
            getTreeList();
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
            { treeData .length > 0 
                ?
                <Tree
                    checkable
                    defaultExpandedKeys={expandedKeys}
                    onExpand={onExpand}
                    autoExpandParent={autoExpandParent}
                    onCheck={onCheck}
                    checkedKeys={checkedKeys}
                    // onSelect={onSelect}
                    // selectedKeys={selectedKeys}
                    treeData={treeData}
                    fieldNames={
                        {
                            title: 'title',
                            key: 'id',
                            children: 'children',
                        }
                    }
                />
                :
                "暂无数据"
            }
        </TheDrawer>
    )
}

interface PropsType {
    id: number | null
}

export default forwardRef<HTMLDivElement, PropsType>(AllocMenuDrawer);
