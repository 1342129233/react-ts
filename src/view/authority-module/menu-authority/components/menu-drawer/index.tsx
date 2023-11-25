import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, Ref } from "react";
import { message } from 'antd';
import TheDrawer from '@/common/components/the-drawer/index';
import LiveForm from '@/common/components/live-form/index';
import { formItemFn, info } from './configs';
import { DataType } from '../../types'; 
import { Options } from './types';
import { updateMenu, menuId, menuList, createMenu } from './server';

function MenuDrawer(props: PropsType, ref: Ref<unknown>) {
    const { id, getList } = props;
    const [openDrawer, setOpenDrawer] = useState(false);
    const LiveFormRef = useRef<HTMLDivElement & { getFormValue: Function }>(null);
    const [dataInfo, setDataInfo] = useState<DataType>(info);
    const [menuOptions, setMenuOptions] = useState<Options[]>([]);
    const { config } = formItemFn(menuOptions);

    const onSubmit = async () => {
        const fieldsValue = LiveFormRef.current?.getFormValue();
        const value = {
            ...info,
            ...dataInfo,
            ...fieldsValue
        }
        try {
			id ? await updateMenu(value) : await createMenu(value);
			getList();
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
    }

    const getMenuId = async () => {
        try {
			const res = await menuId(id!);
			setDataInfo({
				...res.data
			})
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
    }

    const getMenuList = async () => {
        try {
			const res = await menuList();
            const options = [];
            res.data.list.forEach((item) => {
                options.push({
                    value: item.id,
                    label: item.title
                })
            })
            options.unshift({
                value: 0,
                label: '无上级菜单'
            })
            setMenuOptions([
                ...options
            ])
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
    }

    useEffect(() => {
		if(id) {
            getMenuList();
			getMenuId();
		}
	}, [id])

    useImperativeHandle(ref, () => {
		return {
			isOpen: () => {
				setOpenDrawer(!openDrawer)
			}
		}
	})
    
    return <TheDrawer
        title="菜单"
        open={openDrawer}
        onOpenClose={(value) => setOpenDrawer(value)}
        onSave={() => onSubmit()}
    >
        <LiveForm
            ref={LiveFormRef}
            config={config}
            dataInfo={dataInfo}
            inlineOperate={<></>}
        />
    </TheDrawer>
}

interface PropsType {
    id: number | null;
    getList: () => void;
}

export default forwardRef<HTMLDivElement, PropsType>(MenuDrawer);

