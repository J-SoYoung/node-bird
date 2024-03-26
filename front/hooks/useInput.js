import { useCallback, useState } from "react";

const useInput = ({ initialValue = null }) => {
  const [value, setValue] = useState(initialValue);

  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return [value, handler, reset];
};

export default useInput;
