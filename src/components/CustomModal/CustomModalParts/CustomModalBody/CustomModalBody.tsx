import styles from './CustomModalBody.module.sass';
import cn from 'classnames';

export const CustomModalBody = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn(className, styles.customModalBody)}>{children}</div>
    );
};

export default CustomModalBody;
