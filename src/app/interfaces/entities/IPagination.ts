export interface IPagination<T> {
    readonly page: number;
    readonly hasMore: boolean;
    readonly items: T[];
}
