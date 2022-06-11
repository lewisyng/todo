import styles from './Button.module.css';
import cn from 'classnames';
import { ButtonProps } from './Button.types';

const Button = ({
    children,
    variant = 'default',
    type = 'button',
    onClick,
}: ButtonProps) => {
    return (
        <button
            type={type}
            className={cn(
                styles.button,
                styles[`button--${type}`],
                styles[`button--${variant}`]
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
