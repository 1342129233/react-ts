// 登录
import { post } from '@/common/axios/index';
interface DataType {
    tokenHead: string;
    token: string;
}

interface LoginResolve {
    code: number;
    data: DataType;
    message: string;
}

export const login = (params: { password: string; username: string }) => {
    return post<LoginResolve>(`/api/admin/login`, { ...params });
}
