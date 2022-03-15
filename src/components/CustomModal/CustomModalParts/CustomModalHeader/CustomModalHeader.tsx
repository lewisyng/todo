import styles from './CustomModalHeader.module.sass';

export const CustomModalHeader = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className={styles.customModal__header}>{children}</div>;
};

export default CustomModalHeader;
