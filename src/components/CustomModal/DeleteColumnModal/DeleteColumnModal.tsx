import { BasicModal } from '../BasicModal/BasicModal';

export const DeleteColumnModal = ({
    open,
    handleClose,
    deleteColumn,
}: {
    open: boolean;
    handleClose: () => void;
    deleteColumn: () => void;
}) => {
    return (
        <BasicModal
            open={open}
            onClose={handleClose}
            header="Delete Column"
            subheader="Are you sure you want to delete this column? This action cannot be undone."
            mainActionTitle="Column löschen"
            secondaryActionTitle="Abbrechen"
            mainAction={deleteColumn}
            secondaryAction={handleClose}
        />
    );
};

export default DeleteColumnModal;
