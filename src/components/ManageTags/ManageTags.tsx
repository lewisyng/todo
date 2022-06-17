import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Button } from '@mui/material';
import ManageTagsModal from '../CustomModal/ManageTagsModal/ManageTagsModal';
import { useModal } from '../../hooks/useModal';

export const ManageTags = () => {
    const { openModal } = useModal();

    return (
        <>
            <Button
                variant="outlined"
                startIcon={<LocalOfferIcon />}
                onClick={openModal}
                sx={{ color: 'white', border: '1px solid white' }}
            >
                TAGS
            </Button>

            <ManageTagsModal />
        </>
    );
};

export default ManageTags;
