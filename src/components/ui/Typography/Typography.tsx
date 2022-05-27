import styles from './Typography.module.css';
import cs from 'classnames';
import { TypographyProps } from './Typography.types';

export const Typography = ({
    as = 'p',
    size,
    weight = 'normal',
    className,
    children,
}: TypographyProps) => {
    const ComponentType = as;

    return (
        <ComponentType
            className={cs(
                styles.typography,
                styles[`typography--${size}`],
                styles[`typography--${weight}`],
                className
            )}
        >
            {children}
        </ComponentType>
    );
};
