import styles from './CustomModal.module.sass';
import { Modal } from '@mui/material';
import cn from 'classnames';

export const CustomModal = ({
  children,
  className,
  open,
  onClose,
}: {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  className?: string;
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal open={open} onClose={onClose} className={cn(className, styles.modal)}>
      {children}
    </Modal>
  );
};

export default CustomModal;
