import styles from './ManageTagsModal.module.sass';
import CustomModal from '../CustomModal';
import { useLiveQuery } from 'dexie-react-hooks';
import { database } from 'src/database';
import { useState } from 'react';
import CustomModalBody from '../CustomModalParts/CustomModalBody/CustomModalBody';
import TagTile from 'src/components/TagTile/TagTile';
import CreateTagModal from '../CreateTagModal/CreateTagModal';
import EditTagModal from '../EditTagModal/EditTagModal';

export const ManageTagsModal = ({
    open,
    handleClose,
}: {
    open: boolean;
    handleClose: () => void;
}) => {
    const tags = useLiveQuery(() => database.tags.toArray());
    const [createTagModalOpen, setCreateTagModalOpen] = useState(false);

    const [clickedTagTile, setClickedTagTile] = useState<number | null>(null);

    const addTile = () => {
        setCreateTagModalOpen(true);
    };

    const deleteTag = (id: number) => {
        database.tags.delete(id);
    };

    return (
        <>
            <CustomModal
                open={open}
                onClose={handleClose}
                title="Manage your tags"
            >
                <CustomModalBody>
                    <div className={styles.manageTagsModal__content}>
                        <div className={styles.manageTagsModal__tagTiles}>
                            <TagTile type="addTile" handleAddTile={addTile} />

                            {tags?.map((tag: any, idx: number) => {
                                return (
                                    <TagTile
                                        key={idx}
                                        title={tag.title}
                                        color={tag.color}
                                        deleteTag={() =>
                                            deleteTag(tag.id as number)
                                        }
                                        editTag={() =>
                                            setClickedTagTile(tag.id)
                                        }
                                    />
                                );
                            })}
                        </div>
                    </div>
                </CustomModalBody>
            </CustomModal>

            <CreateTagModal
                open={createTagModalOpen}
                handleClose={() => setCreateTagModalOpen(false)}
            />

            {clickedTagTile && (
                <EditTagModal
                    id={clickedTagTile as number}
                    open={Boolean(clickedTagTile)}
                    handleClose={() => setClickedTagTile(null)}
                />
            )}
        </>
    );
};

export default ManageTagsModal;
