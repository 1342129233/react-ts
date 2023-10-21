export interface DataType {
	description: null | string;
	icon: null | string;
	id: number;
	keywords: string;
	level: number;
	name: string;
	navStatus: number;
	parentId: number;
	productCount: number;
	productUnit: string;
	showStatus: number;
	sort: number;
}

export interface ProductResolve {
    code: number;
    message: string;
    data: {
        list: DataType[];
        pageNum: number;
        pageSize: number;
        total: number;
        totalPage: number;
    }
}
