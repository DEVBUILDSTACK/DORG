export type ApiResponse<T> = {
    message: string;
    data: T;
};

export type PaginationData = {
    hasnext: boolean;
    total: number;
};
