import { Button } from '@mui/material';
import { useState } from 'react';
import TagsPopup from '../../../../Popups/TagsPopup/TagsPopup';
import styles from './EditColumnItemModalSide.module.sass';

export const EditColumnItemModalSide = ({
    columnItemId,
}: {
    columnItemId: number;
}) => {
    const [currentPopup, setCurrentPopup] = useState<string | null>(null);

    return (
        <div className={styles.editColumnItemModalContent__side}>
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => setCurrentPopup('tags')}
                >
                    Tags
                </Button>

                {currentPopup === 'tags' && (
                    <TagsPopup handleClose={() => setCurrentPopup(null)} columnItemId={columnItemId} />
                )}
            </div>
        </div>
    );
};

export default EditColumnItemModalSide;