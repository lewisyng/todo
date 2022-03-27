import styles from './PopupWrapper.module.sass';
import CloseIcon from '@mui/icons-material/Close';

export const PopupWrapper = ({
    title,
    children,
    handleClose
}: {
    title: string;
    children: React.ReactNode;
    handleClose: () => void;
}) => {
    return (
        <div className={styles.popup}>
            <div className={styles.popup__header}>{title}</div>

            <CloseIcon className={styles.popup__close} onClick={handleClose} />

            {children}
        </div>
    );
};

export default PopupWrapper;
