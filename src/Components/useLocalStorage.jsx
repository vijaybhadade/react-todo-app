import { useState } from "react";

export default function useLocalStorage(key, initailValue) {
    const [value, setValue] = useState(() => {
        try {
            const storeData = localStorage.getItem(key);
            return storeData ? JSON.parse(storeData) : initailValue;
        }catch{
            return initailValue;
        }
        
    });

    const setStoredValue = (newValue) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    }

    return [value, setStoredValue]
}