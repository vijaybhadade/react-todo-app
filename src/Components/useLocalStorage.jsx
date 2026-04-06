import { useState } from "react";

export default function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const storeData = localStorage.getItem(key);
            return storeData ? JSON.parse(storeData) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setStoredValue = (newValue) => {
        try {
            setValue(newValue);
            localStorage.setItem(key, JSON.stringify(newValue));
        } catch (error) {
            console.error(error);
        }
    };

    return [value, setStoredValue];
}