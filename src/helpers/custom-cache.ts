import { staleTime } from "../constants/cache-config";

export const cacheHelper = {
    currentTime: new Date().getTime(),
    set: function <T>(url: string, data: T) {
        // Using function declaration to use currentTime from this object. 

        const tempData = {
            savedTime: this.currentTime,
            value: data,
            staleTime,
        }

        setTimeout(() => { // Removing staled data after reaching staleTime
            localStorage.removeItem(url);
        }, staleTime);

        localStorage.setItem(url, JSON.stringify(tempData));
    },
    get: function (url: string) {
        const cachedData = localStorage.getItem(url)

        if (cachedData) { // Checking we even have data in cache or not. 
            const parsedData = JSON.parse(cachedData)
            const savedTimestamp = parseInt(parsedData.savedTime);

            if (this.currentTime - savedTimestamp > staleTime) {
                // If cached data is staled we should remove it and return nothing! 

                localStorage.removeItem(url);
                return undefined
            }

            return JSON.parse(cachedData) // Otherwise we can send out the data. 
        }
        else return undefined
    }
}

