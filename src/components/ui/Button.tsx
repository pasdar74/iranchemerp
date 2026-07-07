import React from 'react';

type ButtonVariant = 'primary' | 'facebook' | 'info';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
};

function Button({
  children,
  className = '',
  fullWidth = false,
  icon,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const classes = ['erp-btn', `erp-btn-${variant}`, fullWidth ? 'erp-btn-block' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...props}>
      {icon ? <span className="erp-btn-icon" aria-hidden="true">{icon}</span> : null}
      {children}
    </button>
  );
}

export default Button;
