import { FormEvent, FunctionComponent } from 'react';
import styles from './Button.module.sass';
import cn from 'classnames';

type Props = {
  children: React.ReactNode;
  color?: 'default' | 'warning' | 'info';
  fullWidth?: boolean;
  type?: 'submit' | undefined;
  className?: string;
  variant?: 'default' | 'secondary' | 'tertiary' | 'disabled';
  onClick?: (e?: FormEvent) => void;
};

const Button: FunctionComponent<Props> = ({
  children,
  fullWidth,
  variant = 'default',
  type,
  onClick,
}) => {
  return (
    <button
      className={cn(styles.button, fullWidth && styles.button__fullWidth)}
      data-type={type}
      data-variant={variant}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
