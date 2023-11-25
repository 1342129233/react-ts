export interface DataType {
    adminCount: number;
    createTime: string | number;
    description: string;
    id?: number;
    name: string;
    sort: number;
    status: number;
}

export interface RoleResolve {
    code: number;
    message: string;
    data: DataType[];
}

export interface UpdateStatus {
    id: number;
    status: number;
}
