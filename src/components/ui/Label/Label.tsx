import styles from './Label.module.sass';
import cn from 'classnames';

export const Label = ({
    htmlFor,
    title,
    small,
    className,
    children,
}: {
    htmlFor?: string;
    title: string;
    small?: boolean;
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <label
            htmlFor={htmlFor}
            className={cn(
                className,
                styles.label,
                small && styles.label__small
            )}
        >
            {title}
            {children}
        </label>
    );
};
