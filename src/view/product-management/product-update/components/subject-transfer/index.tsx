import React, { useState, useEffect } from 'react';
import { Transfer } from 'antd';
import type { TransferDirection } from 'antd/es/transfer';
import { subjectList } from '@/common/public-fetch/index';
import { SubjectType } from '@/common/public-fetch/subject';
import { DataInfoType, subjectProductRelationList } from '../../types';

function SubjectTransfer(props: { dataInfo: DataInfoType; salesPromotionClick: Function}) {
	const { dataInfo, salesPromotionClick } = props;
	const [subject, setSubject]= useState<SubjectType[]>([]);
	const [targetKeys, setTargetKeys] = useState<string[]>([]) // 右
	const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
	const options = async () => {
		try {
			// 
			const resSubjectList =  await subjectList();
			setSubject([...resSubjectList.data]);
		} catch (error) {
			console.log('error', error)
		}
	}
	useEffect(() => {
		options();
		const list: string[] = [];
		dataInfo.subjectProductRelationList.forEach((item: subjectProductRelationList) => {
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
		salesPromotionClick('subjectProductRelationList', newSubject)
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
			render={(item) => item.title}
		/>
    );
}

export default SubjectTransfer;
