import styles from './Toast.module.sass';

export const Toast = ({ content }: { content: string }) => {
    return (
        <output className={styles.toast}>
            {content}
        </output>
    );
};

export default Toast;
