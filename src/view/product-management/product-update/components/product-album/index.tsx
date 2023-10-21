import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { DataInfoType } from '../../types';

const getBase64 = (file: RcFile): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});

function ProductAlbum(props: { dataInfo: DataInfoType; ProductAlbumListClick: Function }) {
	const { dataInfo, ProductAlbumListClick } = props;
	const uploadButton = (
		<div>
		  <PlusOutlined />
		  <div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);
	const [previewOpen, setPreviewOpen] = useState(false);
  	const [previewImage, setPreviewImage] = useState('');
  	const [previewTitle, setPreviewTitle] = useState('');
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as RcFile);
		}
	  
		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
		setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
	}
	const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
		setFileList(newFileList);
		ProductAlbumListClick(newFileList[0].url)
	}
	const handleCancel = () => setPreviewOpen(false);
	useEffect(() => {
		const item = dataInfo.pic;
		const list: UploadFile[] = [{
			uid: '1',
			name: item.substring(item.lastIndexOf('/') + 1),
			status: 'done',
			url: item
		}];
		setFileList([...list]);
	}, []);
	return (
		<>
			<Upload
				action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
				listType="picture-card"
				fileList={fileList}
				onPreview={handlePreview}
				onChange={handleChange}
			>
				{fileList.length >= 1 ? null : uploadButton }
			</Upload>
			<Modal
				open={previewOpen}
				title={previewTitle}
				footer={null}
				onCancel={handleCancel}
			>
				<img alt="example" style={{ width: '100%' }} src={previewImage} />
			</Modal>
		</>
	);
}

export default ProductAlbum;
