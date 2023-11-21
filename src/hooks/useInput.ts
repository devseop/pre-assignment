import { useState } from 'react';
import { IValues } from 'src/types/types';

interface UseInputReturnType {
  values: IValues;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function useInput(initialValue: IValues): UseInputReturnType {
  const [values, setValues] = useState<IValues>(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === 'phone') {
      if (value.length === 10) {
        processedValue = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      }
      if (value.length === 13) {
        processedValue = value
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      }
    }

    if (name === 'businessNumber') {
      processedValue = value.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');
    }

    setValues(prevValues => ({
      ...prevValues,
      [name]: processedValue,
    }));
  };

  return { values, handleChange } as const;
}

export default useInput;
