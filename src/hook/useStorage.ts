import { useEffect, useState } from 'react'

const useStorage = (storageKey: any, fallbackState: any) => {
    const [value, setValue] = useState(
      JSON.parse(localStorage.getItem(storageKey) as any) ?? fallbackState);
  
    useEffect(() => {
      localStorage.setItem(storageKey, JSON.stringify(value));
    }, [value, storageKey]);
  
    return [value, setValue];
  };
 
export default useStorage;
