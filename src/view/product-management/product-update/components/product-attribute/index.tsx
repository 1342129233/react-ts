import React, { useState, useEffect } from 'react';
import { Input, Form, Select } from 'antd';
import { cloneDeep } from 'lodash';
import { DataInfoType } from '../../types';

function ProductAttributeList(props: { dataInfo: DataInfoType; productAttributeListClick: Function }) {
	const { dataInfo, productAttributeListClick } = props;
	const [screenSize, setScreenSize] = useState(dataInfo.productAttributeValueList[1].value || '');
	const [network, setNetwork] = useState(dataInfo.productAttributeValueList[2].value || '4G');
	const [system, setSystem] = useState(dataInfo.productAttributeValueList[3].value || '');
	const [batteryCapacity, setBatteryCapacity] = useState(dataInfo.productAttributeValueList[4].value || '');
	const screenSizeHandleChange = (value: string, index: number) => {
		setScreenSize(value)
		productAttributeListClick('productAttributeValueList', index, value)
	}
	const batteryCapacityHandleChange = (value: string, index: number) => {
		setBatteryCapacity(value)
		productAttributeListClick('productAttributeValueList', index, value)
	}
	const networkHandleChange = (value: string) => {
		setNetwork(value)
		productAttributeListClick('productAttributeValueList', 2, value)
	}
	const systemHandleChange = (value: string) => {
		setSystem(value)
		productAttributeListClick('productAttributeValueList', 3, value)
	}
	return (
		<div style={{ background: '#f8f9fc', padding: '20px' }}>
			<Form.Item label="屏幕尺寸:" labelCol={{ span: 4 }}>
				<Input value ={screenSize} onChange={(e) => screenSizeHandleChange(e.target.value, 1)} />
			</Form.Item>
			<Form.Item label="网络:" labelCol={{ span: 4 }}>
				<Select
					value={network}
					onChange={networkHandleChange}
					options={[
						{ value: '3G', label: '3G' },
						{ value: '4G', label: '4G' },
						{ value: '5G', label: '5G' },
						{ value: 'WLAN', label: 'WLAN' },
					]}
				>
				</Select>
			</Form.Item>
			<Form.Item label="系统:" labelCol={{ span: 4 }}>
				<Select
					value={system}
					onChange={systemHandleChange}
					options={[
						{ value: 'Android', label: 'Android' },
						{ value: 'IOS', label: 'IOS' }
					]}
				>
				</Select>
			</Form.Item>
			<Form.Item label="电池容量:" labelCol={{ span: 4 }}>
				<Input value ={batteryCapacity} onChange={(e) => batteryCapacityHandleChange(e.target.value, 4)} />
			</Form.Item>
		</div>
	);
}

export default ProductAttributeList;
