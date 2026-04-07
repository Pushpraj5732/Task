import { useEffect, useState } from "react";

function useStorage(key, initialValue, storageType = "local") {
  
  const storage = storageType === "session" ? sessionStorage : localStorage;

  const [value, setValue] = useState(() => {
    const savedValue = storage.getItem(key);

    if (savedValue !== null) {
      return JSON.parse(savedValue);
    }

    return initialValue;
  });

  useEffect(() => {
    storage.setItem(key, JSON.stringify(value));
  }, [key, value, storage]);

  const clearValue = () => {
    storage.removeItem(key);
    setValue(initialValue);
  };

  return [value, setValue, clearValue];
}

export default useStorage;