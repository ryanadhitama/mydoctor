import { useState } from 'react';

export const useForm = (initialValue: any) => {
  const [values, setValues] = useState(initialValue);
  return [
    values,
    (formType: any, formValue: any) => {
      if (formType === 'reset') {
        return setValues(initialValue);
      }
      return setValues({ ...values, [formType]: formValue });
    }
  ];
};
