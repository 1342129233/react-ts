import { useLoading } from '@/common/hooks/useLoading';
import { AxiosConfig, get, post, del, put } from '@/common/axios';

export type FetchModelResult<T, P> = {
    mutate(args0?: P, pathParams?: number | string): Promise<unknown> | void;
    loading: boolean;
    data: T | null;
    error: any;
};

export type FetchModelOptions<P> = {
    immediate?: boolean;
    method?: 'get' | 'post' | 'delete' | 'put';
    params?: P;
    config?: AxiosConfig;
};

export function useFetchModel<T, P>(
    url: string,
    opts: FetchModelOptions<P>
): FetchModelResult<T, P> {
    const { immediate = true, method = 'get', params, config } = opts;
    // const [data, setData] = useState<T | null>(null)
    // const [error, setError] = useState<T | null>(null);
    let data: T | null = null;
    let error: T | null = null;

    const execute = (payload?: P, pathParams?: string) => {
        const completeUrl = pathParams ? `${url}/${pathParams}` : url;
        switch(method) {
            case 'get':
                return get<T, P>(completeUrl, payload, config)
                    .then((res) => {
                        data = res;
                        error = null;
                    })
                    .catch((err) => {
                        error = err;
                    });
            case 'delete':
                return del<T, P>(completeUrl, payload, config)
                    .then((res) => {
                        data = res;
                        error = null;
                    })
                    .catch((err) => {
                        error = err;
                    });
            case 'post':
                return post<T, P>(completeUrl, payload, config)
                    .then((res) => {
                        data = res;
                        error = null;
                    })
                    .catch((err) => {
                        error = err;
                    });
            case 'put':
                return put<T, P>(completeUrl, payload, config)
                    .then((res) => {
                        data = res;
                        error = null;
                    })
                    .catch((err) => {
                        error = err;
                    });
            default:
                break;
        }
    }

    const [loading, mutate] = useLoading(execute);

    if(immediate) mutate(params);

    return {
        mutate,
        loading,
        data,
        error
    };
}

