import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { cacheHelper } from "../../helpers/custom-cache";
import { IAxiosResponse, TFetch } from "./use-fetch.types";

export const useFetch = <T>(url: string) => {
    const [data, setData] = useState<T>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>()

    const handleFetchData = useCallback(async (type: TFetch) => {
        if (type === "fetch") { // If we have cached data we should not send request. 
            const cachedData = cacheHelper.get(url)

            if (cachedData) {
                setData(cachedData.value)
                setLoading(false)
                return
            }
        }

        try {
            setLoading(true)
            const response = await axios.get<IAxiosResponse<T>>(url)

            if (response.data.payload) {
                cacheHelper.set<T>(url, response.data.payload)
                setData(response.data.payload)
            }
        } catch (error: any) {
            setError(error?.message)
        } finally {
            setLoading(false)
        }
    }, [url])

    useEffect(() => {
        handleFetchData("fetch")
    }, [handleFetchData])

    return {
        refetch: () => handleFetchData("refetch"),
        loading,
        error,
        data
    }
}