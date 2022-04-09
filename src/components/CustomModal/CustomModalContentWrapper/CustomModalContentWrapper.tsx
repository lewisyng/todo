import styles from './CustomModalContentWrapper.module.sass';

export const CustomModalContentWrapper = ({
    children,
}: {
    children: React.ReactElement | React.ReactElement[];
}) => {
    return <div className={styles.customModalContentWrapper}>{children}</div>;
};

export default CustomModalContentWrapper;
