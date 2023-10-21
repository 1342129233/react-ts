import React, { useEffect, useRef, useState } from 'react';
import { Input, Radio, Tabs, DatePicker, Form, Table, Space, Checkbox, Button, message } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { SkuStockListType, DataInfoType, ProductFullReductionListType, SpDataType} from '../../types';
import { ProductFullReductionColumnsType } from './types';
 
function CommoditySpecification(props: { dataInfo: DataInfoType; salesPromotionClick: Function }) {
	const { dataInfo, salesPromotionClick } = props;
	const [group, setGroup] = useState<CheckboxValueType[]>(['16G', '32G']);
	const [colorOptions, setColorOptions] = useState(['金色', '银色']);
    const capacityOptions = ['16G', '32G', '64G', '128G', '256G', '512G'];
    const colorCheckbox = (checkedValues: CheckboxValueType[]) => {
		const list = [...dataInfo.productAttributeValueList];
		list[0].value = checkedValues.toString();
		salesPromotionClick('productAttributeValueList', list)

    }
    const capacityCheckbox = (checkedValues: CheckboxValueType[]) => {
		setGroup([
			...checkedValues
		])
    }
    const colorInputRef = useRef<any>(null);
	const addColor = () => {
		const value = colorInputRef?.current.input.value;
		if(!colorOptions.find((color => color === value))) {
            setColorOptions([
                ...colorOptions,
                value
            ])
        } else {
            message.warning('颜色已存在', 2)
        }
	}
	
	// 颜色 * 规格
	const [commodity, setCommodity] = useState([]);
	const addCommoditySpecification = () => {
		const list: SkuStockListType[] = []
		let id = 110;
		const colorArray = dataInfo.productAttributeValueList[0].value.split(',');
		colorArray.forEach((productItem: CheckboxValueType) => {
			group.forEach((groupItem: CheckboxValueType) => {
				list.push({
					id: id,
					productId: 26,
					skuCode: "201806070026001",
					price: 3788,
					stock: 487,
					lowStock: "",
					pic: '',
					sale: '',
					promotionPrice: 3699,
					lockStock: '',
					spData: [
						{ key: "颜色", value: String(productItem) },
						{ key: "容量", value: String(groupItem) }
					]
				})
				id += 1;
			});
		});
		salesPromotionClick('skuStockList', list)
	}
	const handleChange = (value: { [key: string]: string | number }, record: SkuStockListType, index: number, name: string) => {
		for (var i in value) {
			record[i] = value[i];
		}
		const list = [
			...dataInfo[name]
		]
		list[index] = record;
		salesPromotionClick(name, list)
	}
	const productFullReductionColumns: ProductFullReductionColumnsType<number | string, SkuStockListType>[] = [
		{
			title: '颜色 * 容量',
			dataIndex: 'spData',
			key: 'spData',
			render: (text: number | string, record: SkuStockListType, index: number) => {
				return (
					<div>{record.spData[0].value} * {record.spData[1].value}</div>
				)
			}
		},
		{
			title: '销售价格',
			dataIndex: 'price',
			key: 'price',
			render: (text: number | string, record: SkuStockListType, index: number) => {
				return (
					<Input value ={dataInfo.skuStockList[index].price} placeholder="请输入数量" onChange={(e) => handleChange({price: e.target.value}, record, index, 'skuStockList')} />
				)
			}
		},
		{
			title: '促销价格',
			dataIndex: 'promotionPrice',
			key: 'promotionPrice',
			render: (text: number | string, record: SkuStockListType, index: number) => {
				return (
					<Input value ={dataInfo.skuStockList[index].promotionPrice} placeholder="请输入数量" onChange={(e) => handleChange({promotionPrice: e.target.value}, record, index, 'skuStockList')} />
				)
			}
		},
		{
			title: '商品库存',
			dataIndex: 'stock',
			key: 'stock',
			render: (text: number | string, record: SkuStockListType, index: number)=> {
				return (
					<Input value ={dataInfo.skuStockList[index].stock} placeholder="请输入数量" onChange={(e) => handleChange({stock: e.target.value}, record, index, 'skuStockList')} />
				)
			}
		},
		{
			title: '库存预警值',
			dataIndex: 'lockStock',
			key: 'lockStock',
			render: (text: number | string, record: SkuStockListType, index: number) => {
				return (
					<Input value ={dataInfo.skuStockList[index].lockStock} placeholder="请输入数量" onChange={(e) => handleChange({lockStock: e.target.value}, record, index, 'skuStockList')} />
				)
			}
		},
		{
			title: 'SKU编号',
			dataIndex: 'skuCode',
			key: 'skuCode',
			render: (text: number | string, record: SkuStockListType, index: number) => {
				return (
					<Input value ={dataInfo.skuStockList[index].skuCode} placeholder="请输入数量" onChange={(e) => handleChange({skuCode: e.target.value}, record, index, 'skuStockList')} />
				)
			}
		}
	]
  	return (
    	<div>
        	<div style={{ background: '#f8f9fc',padding: '20px' }}>
                <div>
                    <div>颜色：</div>
                    <Checkbox.Group options={colorOptions} defaultValue={['金色']} onChange={colorCheckbox} />
                    <Space.Compact style={{ width: '100%' }}>
                        <Input ref={colorInputRef} allowClear />
                        <Button type="primary" onClick={addColor}>增加</Button>
                    </Space.Compact>
                </div>
                <div>
                    <div>容量：</div>
                    <Checkbox.Group options={capacityOptions} defaultValue={group} onChange={capacityCheckbox} />
                </div>
            </div>
			<Button type="primary" onClick={addCommoditySpecification}  style={{ marginTop: "20px"}}>生成产品规格详情</Button>
			<div style={{ marginTop: "20px"}}>
				<Table 
					columns={productFullReductionColumns} 
					dataSource={dataInfo.skuStockList} 
					rowKey={(record: SkuStockListType) => record.id}
					pagination={false}
				/>
			</div>
    	</div>
  	);
}

export default CommoditySpecification;
