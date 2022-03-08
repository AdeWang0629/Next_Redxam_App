import React from 'react';

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  id: string;
}

const InputWrapper = ({ value, setValue, label, id }: Props) => {
  return (
    <div className="input-wrapper">
      <input
        type="text"
        className="font-secondary"
        onChange={e => setValue(e.target.value)}
        value={value}
        id={id}
      />
      <label className="font-primary" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default InputWrapper;
