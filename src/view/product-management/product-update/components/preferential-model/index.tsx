import React, { useState } from 'react';
import { Input, Radio, Tabs, DatePicker, Form, Table, Space, Button, message } from 'antd';
import type { TabsProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { initialize } from '../../configs/info';
import styles from '../../style/index.module.less';
import { DataInfoType, ProductFullReductionListType, ProductLadderListType } from '../../types';
import { ProductFullReductionColumnsType, FormListFieldDataType } from './types';


function PreferentialModel(props: { dataInfo: DataInfoType, salesPromotionClick: Function }) {
	const { dataInfo, salesPromotionClick } = props;
	const productLadderColumns: ProductFullReductionColumnsType<number | string, ProductLadderListType>[] = [
		{
			title: '数量',
			dataIndex: 'count',
			key: 'count',
			render: (text: number | string, record: ProductLadderListType, index: number) => {
				return (
					<Input value ={dataInfo.productLadderList[index].count} placeholder="请输入数量" onChange={(e) => handleChange({count: e.target.value}, record, index, 'productLadderList')}/>
				)
			}
		},
		{
			title: '折扣',
			dataIndex: 'discount',
			key: 'discount',
			render: (text: number | string, record: ProductLadderListType, index: number) => {
				return (
					<Input value ={dataInfo.productLadderList[index].discount} placeholder="请输入数量" onChange={(e) => handleChange({discount: e.target.value}, record, index, 'productLadderList')}/>
				)
			}
		},
		{
			title: 'Action',
			key: 'action',
			render: (_: number | string, record: ProductLadderListType, index: number) => (
				<Space size="middle">
					<Button type="link" onClick={productLadderAdd}>添加</Button>
					<Button type="link" onClick={() => productLadderDel(index)}>删除</Button>
				</Space>
			),
		},
	]
	const productLadderAdd = () => {
		if(dataInfo.productLadderList.length >= 3) {
			message.warning('最多只能添加三条', 2)
			return;
		}
		const list = [
			...dataInfo.productLadderList,
			{
				count: 0,
				discount: 0,
				id: dataInfo.productLadderList[(dataInfo.productLadderList.length - 1)].id + 1,
				price: 0,
				productId: 26
			}
		]
		salesPromotionClick('productLadderList', list)
	}
	const productLadderDel = (index: number) => {
		if(dataInfo.productLadderList.length === 1) {
			message.warning('最少有一条', 2)
			return;
		}
		const _arr = [...dataInfo.productLadderList];
		_arr.splice(index, 1)
		salesPromotionClick('productLadderList', _arr)
	}
	const handleChange = (value: Record<string, unknown>, record: ProductFullReductionListType | ProductLadderListType, index: number, name: string) => {
		for (var i in value) {
			record = {
				...record,
				[i]: value[i]
			}
		}
		const list = [
			...dataInfo[name]
		]
		list[index] = record;
		salesPromotionClick(name, list)
	}
	const productFullReductionColumns: ProductFullReductionColumnsType<number, ProductFullReductionListType>[] = [
		{
			title: '满减',
			dataIndex: 'fullPrice',
			key: 'fullPrice',
			render: (text: number, record: ProductFullReductionListType, index: number) => {
				return (
					<Input value ={dataInfo.productFullReductionList[index].fullPrice} placeholder="请输入数量" onChange={(e) => handleChange({fullPrice: e.target.value}, record, index, 'productFullReductionList')}/>
				)
			}
		},
		{
			title: '立减',
			dataIndex: 'reducePrice',
			key: 'reducePrice',
			render: (text: number, record: ProductFullReductionListType, index: number) => (
				<Input value ={dataInfo.productFullReductionList[index].reducePrice} placeholder="请输入数量" onChange={(e) => handleChange({reducePrice: e.target.value}, record, index, 'productFullReductionList')}/>
			)
		},
		{
			title: 'Action',
			key: 'action',
			render: (_: number, record: ProductFullReductionListType, index: number) => (
				<Space size="middle">
					<Button type="link" onClick={productFullReductionAdd}>添加</Button>
					<Button type="link" onClick={() => productFullReductionDel(index)}>删除</Button>
				</Space>
			),
		}
	];
	const productFullReductionAdd = () => {
		if(dataInfo.productFullReductionList.length >= 3) {
			message.warning('最多只能添加三条', 2)
			return;
		}
		const list = [
			...dataInfo.productFullReductionList,
			{
				fullPrice: 3000,
				id: dataInfo.productFullReductionList[(dataInfo.productFullReductionList.length - 1)].id + 1,
				productId: 26,
				reducePrice: 300
			}
		]
		salesPromotionClick('productFullReductionList', list)
	}
	const productFullReductionDel = (index: number) => {
		if(dataInfo.productFullReductionList.length === 1) {
			message.warning('最少保持一条', 2)
			return;
		}
		const _arr = [...dataInfo.productFullReductionList];
		_arr.splice(index, 1)
		salesPromotionClick('productFullReductionList', _arr)
	}

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: '无优惠',
			children: <div className={styles.preferential}></div>
		},
		{
			key: '2',
			label: '特惠促销',
			children: <div className={styles.preferential}>
				<Form.Item 
					label="开始时间:" 
					name="promotionStartTime"
					getValueFromEvent={(value) => 
						moment(value).format('YYYY-MM-DD HH:mm:ss')
					}
					getValueProps={(value) => ({
						value: value ? moment(value) : undefined
					})}
				 >
					<DatePicker
						format="YYYY-MM-DD HH:mm:ss"
					/>
				</Form.Item>
				<Form.Item 
					label="结束时间:" 
					name="promotionEndTime"
					getValueFromEvent={(value) => 
						moment(value).format('YYYY-MM-DD HH:mm:ss')
					}
					getValueProps={(value) => ({
						value: value ? moment(value) : undefined
					})}
				 >
					<DatePicker
						format="YYYY-MM-DD HH:mm:ss"
					/>
				</Form.Item>
				<Form.Item label="促销价格:" name="promotionPrice">
					<Input allowClear />
				</Form.Item>
			</div>
		},
		{
			key: '3',
			label: '会员价格',
			children: <div className={styles.preferential}>
				<Form.List name="memberPriceList">
					{(fields, { add, remove }) => (
						fields.map((field: FormListFieldDataType, index: number) => {
							field.initValues = initialize.memberPriceList;
							return (
								<Form.Item
									label={ field.initValues[index].memberLevelName }
									name={ [field.name, 'memberPrice'] }
									key={ index }
								>
									<Input />
								</Form.Item>
							)
						})
					)}
				</Form.List>
			</div>
		},
		{
			key: '4',
			label: '阶梯价格',
			children: <div className={styles.preferential}>
				<Table 
					columns={productLadderColumns} 
					dataSource={dataInfo.productLadderList} 
					rowKey={record => record.id}
					pagination={false}
				/>
			</div>
		},
		{
			key: '5',
			label: '满减价格',
			children: <div className={styles.preferential}>
				<Table 
					columns={productFullReductionColumns}
					dataSource={dataInfo.productFullReductionList} 
					rowKey={record => record.id}
					pagination={false}
				/>
			</div>
		}
	];
	return (
		<div>
			<Tabs defaultActiveKey="1" type="card" items={items} />
		</div>
	);
}
export default PreferentialModel;
