import { get, post, Response } from '@/common/axios';
import { ResourceCategoryResolve, ResourceResolve, ListResourceIdResolve, ResourceIdsParams } from '../types';

export const resourceCategoryAll = () => {
    return get<ResourceCategoryResolve>(`/api/resourceCategory/listAll`);
}

export const resourceAll = () => {
    return get<ResourceResolve>(`/api/resource/listAll`);
}

export const listResourceId = (id: number) => {
    return get<ListResourceIdResolve>(`/api/role/listResource/${id}`);
}

export const allocResource = (form: ResourceIdsParams) => {
    const formData = new window.FormData();
    formData.append('roleId', form.roleId as string);
    formData.append('resourceIds', form.resourceIds as string);
    return post<Response>(`/api/role/allocResource`, formData, { headers: {
        'Content-Type': 'multipart/form-data'
    } });
}


