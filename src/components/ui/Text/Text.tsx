import styles from './Text.module.css';
import cn from 'classnames';

type TextType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

type SizeType = 'xs' | 's' | 'base' | 'l' | 'xl';

export const Text = ({
    type = 'p',
    size = 'base',
    children,
    className,
}: {
    type?: TextType;
    size?: SizeType;
    children: React.ReactNode;
    className?: string;
}) => {
    const Component = type;

    return (
        <Component data-size={size} className={cn(className, styles.text)}>
            {children}
        </Component>
    );
};

export default Text;
