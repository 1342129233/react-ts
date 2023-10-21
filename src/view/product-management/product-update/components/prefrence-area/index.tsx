import React, { useState, useEffect } from 'react';
import { Transfer } from 'antd';
import type { TransferDirection } from 'antd/es/transfer';
import { prefrenceAreaList } from '@/common/public-fetch/index';
import { PrefrenceAreaType } from '@/common/public-fetch/prefrenceArea';
import { DataInfoType, subjectProductRelationList } from '../../types';

function PrefrenceArea(props: { dataInfo: DataInfoType; salesPromotionClick: Function }) {
	const { dataInfo, salesPromotionClick } = props;
	const [subject, setSubject]= useState<PrefrenceAreaType[]>([]);
	const [targetKeys, setTargetKeys] = useState<string[]>([]) // 右
	const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
	const options = async () => {
		try {
			// 
			const resPrefrenceArea =  await prefrenceAreaList();
			setSubject([...resPrefrenceArea.data]);
		} catch (error) {
			console.log('error', error)
		}
	}
	useEffect(() => {
		options();
		const list: string[] = [];
		dataInfo.prefrenceAreaProductRelationList.forEach((item: subjectProductRelationList) => {
			list.push(String(item.subjectId))
		})
		setTargetKeys([...list]);
	}, [])
	const onChange = (nextTargetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
		setTargetKeys(nextTargetKeys);
		const value = nextTargetKeys.map(Number)
		const newSubject = subject.filter((item) => {
			if(value.includes(item.id)) {
				return {
					subjectId: item.id, 
					productId: 26
				}
			}
		})
		salesPromotionClick('prefrenceAreaProductRelationList', newSubject)
	};

	const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
		setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
	};
    return (
        <Transfer
            dataSource={subject}
            titles={['待选择', '已选择']}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={onChange}
            onSelectChange={onSelectChange}
            rowKey={(record) => String(record.id)}
            render={(item) => item.name}
        />
    );
}

export default PrefrenceArea;
