import { get, post, Response } from '@/common/axios';

interface LoginResolve extends Response {
    data: {
        token: string;
        tokenHead: string;
    }
}

export function login(parmas: {username: string; password: string }) {
    return post<LoginResolve>('/api/admin/login', { ...parmas });
}

