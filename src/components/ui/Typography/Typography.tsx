import styles from './Typography.module.css';
import cs from 'classnames';
import { TypographyProps } from './Typography.types';

export const Typography = ({
    as = 'p',
    size,
    weight = 'normal',
    className,
    children,
    uppercase,
    style,
}: TypographyProps) => {
    const ComponentType = as;

    return (
        <ComponentType
            className={cs(
                styles.typography,
                styles[`typography--${size}`],
                styles[`typography--${weight}`],
                uppercase && styles.typography__uppercase,
                className
            )}
            style={style}
        >
            {children}
        </ComponentType>
    );
};
