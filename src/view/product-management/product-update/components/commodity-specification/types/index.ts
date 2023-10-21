export interface ProductFullReductionColumnsType<U, T> {
    title: string;
    key: string;
    render: (_: U, record: T, index: number) => JSX.Element;
    dataIndex?: undefined | string;
}
