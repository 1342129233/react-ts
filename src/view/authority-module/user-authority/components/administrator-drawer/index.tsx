import React, { useState, useEffect, forwardRef, Ref, useImperativeHandle, useRef  } from 'react';
import { message, Select } from 'antd';
import TheDrawer from '@/common/components/the-drawer/index';
import { adminRoleUpdate, adminRoleId } from './server';
import { roleListAll, RoleType } from '@/common/public-fetch';
import { FormData } from './types';

function AdministratorDrawer(props: PropsType, ref: Ref<unknown>) {
    const { id, getList } = props;
    const [openDrawer, setOpenDrawer] = useState(false);
    const [roleList, setRoleList] = useState<RoleType[]>([]);
    const [dataInfo, setDataInfo] = useState<FormData>({
        adminId: '',
        roleIds: []
    });

    const onSubmit = async () => {
        try {
			 await adminRoleUpdate(dataInfo)
			getList();
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
    }
    useImperativeHandle(ref, () => {
		return {
			isOpen: () => {
				setOpenDrawer(!openDrawer)
			}
		}
	})
    const getAdminRole = async () => {
        try {
			const res = await adminRoleId(id!);
            const data: number[] = [];
            res.data.forEach(item => {
                data.push(item.id);
            })
            setDataInfo({
                adminId: id!,
                roleIds: [...data]
            })
		} catch(error: any) {
			message.error(error.message || '请求失败')
		}
    }
    const getRoleListAll = async () => {
        try {
			const res = await roleListAll();
            setRoleList([
                ...res.data
            ])
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
    }
    const handleChange = (value: number[]) => {
        setDataInfo(prev => ({
            ...prev,
            roleIds: [...value]
        }))
    };
    useEffect(() => {
        if(id) {
            getRoleListAll();
            getAdminRole()
        }
    }, [id])

    return <TheDrawer
        title="分配角色"
        open={openDrawer}
        onOpenClose={(value) => setOpenDrawer(value)}
        onSave={() => onSubmit()}
    >
        <Select
            value={dataInfo.roleIds as number[]}
            mode="multiple"
            style={{ width: 300 }}
            allowClear
            onChange={handleChange}
            options={(roleList || []).map((d) => ({
                    value: d.id,
                    label: d.name,
                }))
            }
        />

    </TheDrawer>
}

interface PropsType {
    id: number | null;
    getList: () => void;
}

export default forwardRef<HTMLDivElement, PropsType>(AdministratorDrawer);
