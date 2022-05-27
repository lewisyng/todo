import styles from './Button.module.css';
import cn from 'classnames';
import { ButtonProps } from './Button.types';

const Button = ({
    children,
    variant = 'default',
    type,
    onClick,
}: ButtonProps) => {
    return (
        <button
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
