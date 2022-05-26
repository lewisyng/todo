import styles from "./TextareaWrapper.module.css";

export const TextareaWrapper = ({children, label, hint}: {
    children: React.ReactNode;
    label?: string;
    hint?: string;
}) => {
    return (
        <div className={styles.textarea__wrapper}>
            {label && <label className={styles.label}>{label}</label>}

            {children}

            {hint && <div className={styles.hint}>{hint}</div>}
        </div>
    )
}