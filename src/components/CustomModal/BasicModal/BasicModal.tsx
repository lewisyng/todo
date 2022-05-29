import { Modal } from '@mui/material';
import styles from './BasicModal.module.css';
import cs from 'classnames';
import Button from 'src/components/ui/Button/Button';
import { Typography } from 'src/components/ui/Typography/Typography';

export const BasicModal = ({
    className,
    open,
    icon,
    header,
    subheader,
    body,
    mainActionTitle = '',
    secondaryActionTitle = '',
    mainAction,
    secondaryAction,
    onClose,
}: {
    className?: string;
    open: boolean;
    icon?: React.ReactElement;
    header: React.ReactNode;
    subheader?: React.ReactNode;
    body?: React.ReactNode;
    mainActionTitle?: string;
    secondaryActionTitle?: string;
    mainAction?: () => void;
    secondaryAction?: () => void;
    onClose: () => void;
}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            className={cs(className, styles.basicModal__wrapper)}
        >
            <div className={styles.basicModal}>
                {icon && <div className={styles.basicModal__icon}>{icon}</div>}

                {header && (
                    <Typography
                        className={styles.basicModal__header}
                        size="text-lg"
                        weight="medium"
                    >
                        {header}
                    </Typography>
                )}

                {subheader && (
                    <div className={styles.basicModal__body}>
                        <Typography
                            className={styles.basicModal__header}
                            size="text-sm"
                            weight="normal"
                        >
                            {subheader}
                        </Typography>
                    </div>
                )}

                {body && body}

                <div className={styles.basicModal__actions}>
                    {secondaryAction && (
                        <Button variant="secondary" onClick={secondaryAction}>
                            {secondaryActionTitle}
                        </Button>
                    )}
                    {mainAction && (
                        <Button variant="warning" onClick={mainAction}>
                            {mainActionTitle}
                        </Button>
                    )}
                </div>
            </div>
        </Modal>
    );
};
