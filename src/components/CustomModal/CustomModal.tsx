import styles from './CustomModal.module.sass';
import { Modal } from '@mui/material';
import cn from 'classnames';
import CustomModalHeader from './CustomModalParts/CustomModalHeader/CustomModalHeader';

export const CustomModal = ({
    children,
    title,
    className,
    open,
    onClose,
}: {
    children:
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | React.ReactElement[];
    title?: string;
    className?: string;
    open: boolean;
    onClose: () => void;
}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            className={cn(className, styles.customModal)}
        >
            <div className={styles.customModal__content}>
                <CustomModalHeader>{title}</CustomModalHeader>

                {children}
            </div>
        </Modal>
    );
};

export default CustomModal;
