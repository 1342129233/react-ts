import React, { Suspense, useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, matchRoutes, Outlet, Navigate } from 'react-router-dom';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { router, filterMenu } from '@/router/index';
import { RouterType } from '@/router/type';
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	DownOutlined,
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Tabs, Breadcrumb, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { adminRoles } from '@/common/axios/login';
import { removeCookie } from '@/common/utils';
import styles from './style/index.module.less';

interface ItemTabsType {
	label: string;
	key: string;
	closable?: boolean
	children?: string
}

const { Header, Sider, Content } = Layout;


let routersList: RouterType[] = [];


function navigation() {
	const location = useLocation();
	const navigate = useNavigate(); // 请求切换
	const [collapsed, setCollapsed] = useState<boolean>(false);
	const [itemsMenu, setItemsMenu] = useState<RouterType[]>([]);
	const [defaultKey, setDefaultKey] = useState<string[]>(['/home']);
	const [breadcrumb, setBreadcrumb] = useState<string[]>(['']);
	// 设置只能有一个展开项
	const [openKeys, setOpenKeys] = useState(['']);
	const [itemTabs, setItemTabs] = useState<ItemTabsType[]>([
		{ label: '首页', key: '/home', closable: false }
	]);
	const dropdownItems = {
		items: [
			{
				key: '1',
				label: (
					<div onClick={() => quit()}>
						退出
					</div>
				),
			}
		]
	}

	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const quit = () => {
		removeCookie('loginToken');
		navigate('/login')
	}
	// 平铺路由
	const parallelGradeRouters = (router: RouterType[]) => {
		let list:RouterType [] = [];
		router.forEach((item: RouterType) => {
			list.push({
				...item
			})
			if(item.children && item.children.length) {
				const value = parallelGradeRouters(item.children);
				list = list.concat(value);
			}
		});
		return list;
	}
	// 切换路由
	const toggleRouter = (key: string) => {
		navigate(key, { replace: true })
		setDefaultKey([key])
	}
	// 判断顶部 tabs 是否存在不存在则加到最后(多级路由需要抹平层级)
	const isTopTabs = (key: string) => {
		
		const isTab = itemTabs.find((item) => (item.key === key));
		if(isTab) {
			return;
		}
		const tabs = routersList.find(item => item.key === key);
		if(!tabs) {
			return;
		}
		itemTabs.push({
			label: tabs.label || '',
			key: tabs.path || ''
		})
		setItemTabs([...itemTabs])
	}
	// 左侧路由点击
	const menuClick = (e: { key: string }) => {
		toggleRouter(e.key)
		// // 判断 tab 是否有标签
		isTopTabs(e.key)
	}

	// tab
	const onChange = (newActiveKey: string) => {
		if(location.pathname === newActiveKey) {
			return
		}
		toggleRouter(newActiveKey);
	}
	const onEdit = (targetKey: React.MouseEvent | React.KeyboardEvent | string) => {
		let newActiveKey = '';
		let lastIndex = -1;
		itemTabs.forEach((item, i) => {
			if (item.key === targetKey) {
				lastIndex = i - 1;
			}
		});
		const newPanes = itemTabs.filter((item) => item.key !== targetKey && item.key !== '/login' );
		if (newPanes.length) {
			if (lastIndex >= 0) { // targetKey, location.pathname
				newActiveKey = newPanes[lastIndex].key;
			} else {
				newActiveKey = newPanes[0].key;
			}
		}
		setItemTabs([...newPanes])
		if(targetKey === location.pathname) {
			toggleRouter(newActiveKey);
		}
	};
	const handleOpen=(keys:string[])=>{
		setOpenKeys([keys[keys.length-1]])
	}

	const setItems = (routers: RouterType[], list: RouterType[]) => {
		routers = routers.filter(item => item.path !== '/login')
		routers.map((menu: RouterType, index: number) => { //map不改变原数组
			const children: RouterType[] = [];
			list.push({
				...menu
			})
			if(menu.children && menu.children.length) {
				setItems(menu.children, children!)
			}
			if(children.length > 0) {
				list[index].children = children;
			} 
		});
	}

	useEffect(() => {
		// 平级路由
		routersList = parallelGradeRouters(router)
		// 左侧列表
		const itemsMenu: RouterType[] = [];
		setItems(router, itemsMenu)
		setItemsMenu([...itemsMenu])
		adminRoles();
	}, [])

	// 面包屑
	useEffect(() => {
		// 刷新时被选中的menu二级菜单初始化的展开问题
		const refreshThePage=()=>{
			const matched = matchRoutes(router, location.pathname)
			const n = matched ? matched.length : 0;
			setBreadcrumb([]);
			if(matched && n > 0) {
				const routes = matched[n - 1].route;
				const breadcrumb  = routes.meta.path || [];
				setBreadcrumb([...breadcrumb]);
			}

			let rank = location.pathname.split('/')
			let newOpenkeys=rank.slice(0,rank.length - 1).join('/')
			setOpenKeys([newOpenkeys])
		}
		refreshThePage()
		// 定位高亮
		setDefaultKey([location.pathname])
		isTopTabs(location.pathname)
	}, [location.pathname])
	const breadcrumbItem = (): BreadcrumbItemType[] => {
		const itemList: BreadcrumbItemType[] = [];
		breadcrumb.forEach((item: string) => {
			itemList.push({
				title: item
			})
		})
		return itemList;
	}
	return (
		<div className="app">
		<Layout className="app" >
			<Sider collapsible collapsed={collapsed} className="sider">
				<div className="logo">
				</div>
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={defaultKey}
					selectedKeys={defaultKey}
					items={itemsMenu}
					onClick={menuClick}
					openKeys={openKeys}
					onOpenChange={handleOpen}
				>
				</Menu>
			</Sider>
			<Layout>
        		<Header className={styles.headers} style={{ background: colorBgContainer }}>
					<div className={styles.headersLeft}>
						<Button
							type="text"
							icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
							onClick={() => setCollapsed(!collapsed)}
							className={styles.headersLeftButton}
						/>
						<div className={styles.headBreadcrumb}>
							<Breadcrumb items={breadcrumbItem()} />
						</div>
					</div>
					<div className={styles.headersRight}>
						<div className={styles.headersRightImg}>
							<img src={process.env.PUBLIC_URL + '/images/user.png'} />
						</div>
						<div className={styles.headersRightDropdown} style={{ marginTop: "15px" }}>
							<Dropdown menu={ dropdownItems }>
								<a onClick={(e) => e.preventDefault()}>
									<Space>
										<DownOutlined />
									</Space>
								</a>
							</Dropdown>
						</div>
					</div>
				</Header>
				<div className="top-tabs">
					<Tabs
						type="editable-card"
						hideAdd
						onChange={onChange}
						activeKey={defaultKey[0]}
						onEdit={onEdit}
						items={itemTabs}
					/>
				</div>
				<Content
					style={{
						margin: '0px 10px',
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
						overflow: 'hidden',
						overflowY: 'scroll'
					}}
				>
					<Routes>
						{
							router.map((item) => (
								<Route key={item.path} path={item.path} element={item.element}>
									{ (item.children && item.children.length) 
										? 
										(item.children.map((child) => <Route path={child.path} element={child.element} key={child.path}></Route>)) 
										: 
										null }
								</Route>
							))
						}
						<Route path="*" element={<Navigate to="/home" />}/>
					</Routes>
				</Content>
			</Layout>
		</Layout>
		</div>
	)
  	
}

export default navigation;
