import React from 'react';

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function TextInput({ className = '', id, label, ...props }: TextInputProps) {
  const inputId = id ?? props.name;
  const classes = ['erp-input', className].filter(Boolean).join(' ');

  return (
    <div className="erp-form-group">
      <label className="erp-label" htmlFor={inputId}>
        {label}
      </label>
      <input className={classes} id={inputId} {...props} />
    </div>
  );
}

export default TextInput;
