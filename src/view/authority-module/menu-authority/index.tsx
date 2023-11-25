import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation, useSearchParams } from 'react-router-dom';
import { Button, message } from 'antd';
import LiveTable from '@/common/components/live-table/index';
import { usePage, PageType } from '@/common/hooks/usePage';
import MenuDrawer from './components/menu-drawer/index';
import { tableConfig } from './configs';
import { menuList, menuHidden, menuDelete } from './server';
import { DataType, UpdateStatus } from './types';

function MenuAuthority() {
	const params = useParams(); // { parentId = 0 }
	let [searchParams, setSearchParams] = useSearchParams(); // searchParams.get('parentId')
	const navigate = useNavigate();
	const location = useLocation();
	const liveTableRef = useRef<HTMLDivElement & { keys: Function }>(null);
	const menuDrawerRef = useRef<HTMLDivElement & { isOpen: Function }>(null);
	const [data, setData] = useState<DataType[]>([]);
	const [menuId, setMenuId] = useState<number | null>(null)
	const [parent, setParent] = useState<number | string>()
	const pageParams = useRef({
        pageNum: 1, 
        pageSize: 5
    });
	
	const add = () => {
		setMenuId(null);
		menuDrawerRef.current?.isOpen();
	}
	const handleEdit = (id: number) => {
		setMenuId(id);
		menuDrawerRef.current?.isOpen();
	}
	const handleDelete = async (id: number) => {
		try {
			await menuDelete(id);
			getMenuList();
	   } catch(error: any) {
		   message.error(error?.message || '请求失败')
	   }
	}
	const updateStatus = async (value: UpdateStatus) => {
		try {
			 await menuHidden(value);
			 getMenuList();
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
	}
	const handlJunior = (id: number) => {
		navigate(`/authority-module/menu-authority?parentId=${id}`)
		// setParent(id)
	}
	
	// 获取列表
    const getMenuList = async() => {
		const parentId = searchParams.get('parentId') || 0;
        try {
			const res = await menuList(parentId, pageParams.current);
			setData([
                ...res.data.list
            ])
            const { pageNum, pageSize, total } = res.data
            setPage(prev => ({
                ...prev,
                pageNum,
                pageSize,
                total
            }))
		} catch(error: any) {
			message.error(error?.message || '请求失败')
		}
    }
	const handlePageChange = (paramsPage: PageType) => {
        pageParams.current = Object.assign({...pageParams.current}, {
            pageNum: paramsPage.pageNum,
            pageSize: paramsPage.pageSize
        })
        getMenuList();
    }
	const { row } = tableConfig({ handleEdit, handleDelete, updateStatus, handlJunior });
	const { paginationProps, page, setPage } = usePage(handlePageChange);
	useEffect(() => {
		const parentId = searchParams.get('parentId') || 0;
		setParent(parentId)
        pageParams.current = Object.assign({...pageParams.current}, {
            pageNum: page.pageNum,
            pageSize: page.pageSize
        })
        getMenuList()
    }, [location])
	return (
		<div>
			<LiveTable 
				ref={liveTableRef}
				config={row}
				data={data}
				pagination={paginationProps}
				tableLeftButton={<div className='tableLeftButton'>
					<Button onClick={() => add()}>添加</Button>
				</div>}
			/>
			<MenuDrawer ref={menuDrawerRef} id={menuId} getList={() => getMenuList()} />
		</div>
	);
}

export default MenuAuthority;
