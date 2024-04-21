export interface IAxiosResponse<T> {
    payload: T;
}

export type TFetch = "fetch" | "refetch"