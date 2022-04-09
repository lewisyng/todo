import styles from './ColorSchemesModal.module.css';
import { colorSchemes } from 'src/lib/constants';
import CustomModal from '../CustomModal';
import CustomModalBody from '../CustomModalParts/CustomModalBody/CustomModalBody';
export const ColorSchemesModal = ({
    open,
    handleClose,
    onSelect,
    className,
}: {
    open: boolean;
    handleClose: () => void;
    onSelect: (colorScheme: string) => void;
    className?: string;
}) => {
    return (
        <CustomModal
            open={open}
            onClose={handleClose}
            title="Select a color scheme"
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <CustomModalBody>
                <div className={styles.colorSchemesModal__colorSchemes}>
                    {colorSchemes.map((colorScheme, idx) => (
                        <div
                            key={idx}
                            className={styles.colorSchemesModal__colorScheme}
                            data-color-scheme={colorScheme}
                            onClick={() => onSelect(colorScheme)}
                        ></div>
                    ))}
                </div>
            </CustomModalBody>
        </CustomModal>
    );
};

export default ColorSchemesModal;
