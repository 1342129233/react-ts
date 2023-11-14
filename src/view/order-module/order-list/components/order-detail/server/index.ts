import { get } from '@/common/axios';
import { OrderIdResolve } from '../types';

export function orderId(id: string) {
    return get<OrderIdResolve>(`/api/order/${id}`);
}
