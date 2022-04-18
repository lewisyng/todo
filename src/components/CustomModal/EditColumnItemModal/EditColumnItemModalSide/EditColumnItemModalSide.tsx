import { Button } from '@mui/material';
import { useState } from 'react';
import DatePopup from 'src/Popups/DatePopup/DatePopup';
import TagsModal from '../../../../Popups/TagsModal/TagsModal';
import styles from './EditColumnItemModalSide.module.sass';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { DateRange } from '@mui/icons-material';
import { colors } from '../../../../styles/colors';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ChecklistModal from '../../ChecklistModal/ChecklistModal';

export const EditColumnItemModalSide = ({
    columnItemId,
}: {
    columnItemId: number;
}) => {
    const [currentPopup, setCurrentPopup] = useState<string | null>(null);
    const [tagsModalOpen, setTagsModalOpen] = useState(false);
    const [checklistModalOpen, setChecklistModalOpen] = useState(false);

    return (
        <div className={styles.editColumnItemModalContent__side}>
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setTagsModalOpen(true)}
                >
                    <LocalOfferIcon />
                </Button>

                {tagsModalOpen && (
                    <TagsModal
                        open={tagsModalOpen}
                        handleClose={() => setTagsModalOpen(false)}
                        columnItemId={columnItemId}
                    />
                )}
            </div>

            <div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setCurrentPopup('date')}
                >
                    <DateRange />
                </Button>

                {currentPopup === 'date' && (
                    <DatePopup
                        handleClose={() => setCurrentPopup(null)}
                        columnItemId={columnItemId}
                    />
                )}
            </div>

            <div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setChecklistModalOpen(true)}
                >
                    <CheckBoxIcon />
                </Button>

                <ChecklistModal
                    columnItemId={columnItemId}
                    open={checklistModalOpen}
                    handleClose={() => setChecklistModalOpen(false)}
                />
            </div>
        </div>
    );
};

export default EditColumnItemModalSide;
