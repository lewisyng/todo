import styles from "./CustomModalActions.module.sass"

export const CustomModalActions = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className={styles.customModalActions}>{children}</div>;
};

export default CustomModalActions;
