import { useEffect, useState } from "react";

export default function useDebounce(init = "",delay = 1000){
    const [debounceValue,setDebounceValue] = useState(init);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(init);
        },delay);
        return () => {
            clearTimeout(timer);
        };
    },[delay,init]);
    return debounceValue;
}